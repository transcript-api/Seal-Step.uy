import { NextResponse } from 'next/server'
import { createPreference, type MPItem } from '@/lib/mercadopago'
import { getSiteConfig } from '@/lib/site-config'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { OrderItem } from '@/lib/order-context'

export const dynamic = 'force-dynamic'

function parsePrecioUYU(precioStr: string | null | undefined): number {
  if (!precioStr) return 2490 // Precio estándar promedio si no tiene precio explícito
  const digitsOnly = precioStr.replace(/[^0-9]/g, '')
  const parsed = parseInt(digitsOnly, 10)
  return isNaN(parsed) || parsed <= 0 ? 2490 : parsed
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, customer } = body as {
      items: OrderItem[]
      customer?: {
        name?: string
        email?: string
        phone?: string
        address?: string
        city?: string
      }
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'El carrito no contiene productos.' },
        { status: 400 }
      )
    }

    const config = await getSiteConfig()
    const orderId = `SS-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // Construir ítems de Mercado Pago
    const mpItems: MPItem[] = items.map((item) => {
      const unitPrice = parsePrecioUYU(item.producto.precio)
      const title = `${item.producto.nombre} (Talle: ${item.talle}${item.color ? `, Color: ${item.color}` : ''})`
      return {
        id: item.id || item.producto.slug,
        title,
        quantity: item.cantidad || 1,
        unit_price: unitPrice,
        currency_id: 'UYU',
        picture_url: item.producto.imagenes[0]?.src?.startsWith('http')
          ? item.producto.imagenes[0]?.src
          : undefined,
        description: `Calzado Seal Step - Rivera, Uruguay`,
      }
    })

    // Calcular subtotal
    const subtotal = mpItems.reduce((acc, it) => acc + it.unit_price * it.quantity, 0)
    const envioCosto =
      subtotal >= config.envios.envioGratisMinimoUYU ? 0 : config.envios.costoEnvioBaseUYU

    // Si tiene costo de envío, agregarlo como ítem de logística
    if (envioCosto > 0) {
      mpItems.push({
        id: 'envio-estandar-uruguay',
        title: `Envío a todo el país (${config.envios.plazoEstimado})`,
        quantity: 1,
        unit_price: envioCosto,
        currency_id: 'UYU',
        description: `Entrega por ${config.envios.transportistas}`,
      })
    }

    // Determinar URL base (producción o desarrollo)
    const host = req.headers.get('host') || 'localhost:3000'
    const protocol = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https')
    const baseUrl = `${protocol}://${host}`

    // Guardar orden preliminar en Supabase si está disponible
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('pedidos').insert({
          id_pedido: orderId,
          cliente_nombre: customer?.name || 'Cliente Web',
          cliente_email: customer?.email || 'sin-email@sealstep.uy',
          cliente_telefono: customer?.phone || '',
          cliente_ciudad: customer?.city || 'Uruguay',
          cliente_direccion: customer?.address || '',
          items: mpItems,
          total: subtotal + envioCosto,
          metodo_pago: 'mercadopago',
          estado: 'pendiente_pago',
          created_at: new Date().toISOString(),
        })
      } catch (dbErr) {
        console.warn('Aviso: no se pudo persistir pedido preliminar en tabla pedidos:', dbErr)
      }
    }

    // Crear la preferencia en Mercado Pago
    const prefResult = await createPreference({
      items: mpItems,
      payer: {
        name: customer?.name || 'Cliente',
        email: customer?.email || 'cliente@sealstep.uy',
        phone: customer?.phone ? { number: customer.phone } : undefined,
        address: customer?.address ? { street_name: customer.address } : undefined,
      },
      orderId,
      baseUrl,
    })

    return NextResponse.json({
      success: true,
      orderId,
      preferenceId: prefResult.id,
      initPoint: prefResult.init_point,
      sandboxInitPoint: prefResult.sandbox_init_point,
      subtotal,
      envioCosto,
      total: subtotal + envioCosto,
    })
  } catch (error) {
    console.error('Error al procesar checkout de Mercado Pago:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error al procesar el pago.',
      },
      { status: 500 }
    )
  }
}
