import { NextResponse } from 'next/server'
import { createPreference, type MPItem } from '@/lib/mercadopago'
import { createClient } from '@supabase/supabase-js'
import type { OrderItem } from '@/lib/order-context'

export const dynamic = 'force-dynamic'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

function parsePrecioUYU(precioStr: string | null | undefined): number {
  if (!precioStr) return 2490
  const digitsOnly = precioStr.replace(/[^0-9]/g, '')
  const parsed = parseInt(digitsOnly, 10)
  return isNaN(parsed) || parsed <= 0 ? 2490 : parsed
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      contacto,
      entrega,
      metodoEnvio = 'DAC / UES / Mirtrans (Envío Gratis a todo Uruguay)',
      metodoPago = 'mercadopago',
      direccionFacturacion = 'misma',
      items,
      cupon = null,
      descuentoPorcentaje = 0,
    } = body as {
      contacto: { email: string; newsOptIn?: boolean }
      entrega: {
        pais: string
        nombre: string
        apellidos: string
        direccion: string
        apartamento?: string
        codigoPostal?: string
        ciudad: string
        departamento: string
        telefono: string
      }
      metodoEnvio?: string
      metodoPago?: 'mercadopago' | 'transferencia' | 'efectivo'
      direccionFacturacion?: 'misma' | 'distinta'
      items: OrderItem[]
      cupon?: string | null
      descuentoPorcentaje?: number
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'El carrito está vacío.' },
        { status: 400 }
      )
    }

    if (!contacto?.email || !entrega?.nombre || !entrega?.direccion || !entrega?.ciudad || !entrega?.telefono) {
      return NextResponse.json(
        { success: false, error: 'Completá todos los campos obligatorios de contacto, dirección y teléfono.' },
        { status: 400 }
      )
    }

    // Calcular subtotal
    const subtotal = items.reduce((acc, it) => {
      const p = parsePrecioUYU(it.producto.precio)
      return acc + p * (it.cantidad || 1)
    }, 0)

    const montoDescuento = descuentoPorcentaje > 0 ? Math.round((subtotal * descuentoPorcentaje) / 100) : 0
    const total = Math.max(0, subtotal - montoDescuento)
    const orderNumber = `SS-${Date.now().toString().slice(-6)}${Math.floor(100 + Math.random() * 900)}`
    const clienteNombreCompleto = `${entrega.nombre.trim()} ${entrega.apellidos?.trim() || ''}`.trim()

    // 1. Guardar el pedido en Supabase
    const { data: pedidoData, error: pedidoError } = await supabaseAdmin
      .from('pedidos')
      .insert({
        numero_pedido: orderNumber,
        cliente_nombre: clienteNombreCompleto,
        cliente_email: contacto.email.trim().toLowerCase(),
        cliente_telefono: entrega.telefono.trim(),
        direccion_envio: {
          pais: entrega.pais || 'Uruguay',
          direccion: entrega.direccion.trim(),
          apartamento: entrega.apartamento?.trim() || '',
          ciudad: entrega.ciudad.trim(),
          departamento: entrega.departamento || 'Montevideo',
          codigo_postal: entrega.codigoPostal?.trim() || '',
        },
        metodo_envio: metodoEnvio,
        costo_envio: 0,
        subtotal: subtotal,
        monto_descuento: montoDescuento,
        total: total,
        moneda: 'UYU',
        metodo_pago: metodoPago,
        estado_pago: 'pendiente',
        estado_pedido: 'pendiente',
        metadata: {
          newsOptIn: Boolean(contacto.newsOptIn),
          cuponAplicado: cupon,
          descuentoPorcentaje,
          items_snapshot: items.map(it => ({
            id: it.id,
            slug: it.producto.slug,
            nombre: it.producto.nombre,
            talle: it.talle,
            color: it.color,
            cantidad: it.cantidad,
            precio_unitario: parsePrecioUYU(it.producto.precio),
            imagen: it.producto.imagenes[0]?.src || '',
          })),
        },
      })
      .select('id, numero_pedido')
      .single()

    if (pedidoError) {
      console.error('[Create Order] Supabase insert error:', pedidoError)
    }

    // 2. Si el método es Mercado Pago, generar la pasarela de pago
    if (metodoPago === 'mercadopago') {
      const mpItems: MPItem[] = items.map((item) => {
        const basePrice = parsePrecioUYU(item.producto.precio)
        const unitPrice = descuentoPorcentaje > 0
          ? Math.round(basePrice * (1 - descuentoPorcentaje / 100))
          : basePrice

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

      const origin = req.headers.get('origin') || 'https://seal-step-uy.vercel.app'
      const preference = await createPreference({
        items: mpItems,
        orderId: orderNumber,
        baseUrl: origin,
        payer: {
          name: entrega.nombre,
          surname: entrega.apellidos,
          email: contacto.email,
          phone: {
            number: entrega.telefono,
          },
          address: {
            street_name: entrega.direccion,
            zip_code: entrega.codigoPostal,
          },
        },
      })

      if (preference?.id && pedidoData?.id) {
        await supabaseAdmin
          .from('pedidos')
          .update({ mercadopago_preference_id: preference.id })
          .eq('id', pedidoData.id)
      }

      const checkoutUrl = preference?.init_point || preference?.sandbox_init_point
      return NextResponse.json({
        success: true,
        orderId: orderNumber,
        metodoPago: 'mercadopago',
        initPoint: checkoutUrl,
      })
    }

    // 3. Si el método es Transferencia Bancaria o Efectivo
    const origin = req.headers.get('origin') || 'https://seal-step-uy.vercel.app'
    return NextResponse.json({
      success: true,
      orderId: orderNumber,
      metodoPago,
      redirectUrl: `${origin}/checkout/exito?order_id=${orderNumber}&metodo=${metodoPago}`,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error al procesar el pedido'
    console.error('[Create Order] Error:', err)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}
