import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!url || !key) {
    throw new Error('Variables de entorno Supabase no configuradas')
  }

  return createClient(url, key)
}


export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    // 1. Obtener clientes de la tabla clientes
    const { data: clientesData, error: clientesError } = await supabaseAdmin
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false })

    if (clientesError) {
      console.error('[CRM API] Error al consultar clientes:', clientesError)
    }

    // 2. Obtener pedidos para computar compras reales por email/teléfono
    const { data: pedidosData } = await supabaseAdmin
      .from('pedidos')
      .select('id, numero_pedido, cliente_nombre, cliente_email, cliente_telefono, direccion_envio, total, created_at, metadata')
      .order('created_at', { ascending: false })

    const pedidos = pedidosData || []
    const clientes = clientesData || []

    // Map para agrupar métricas de pedidos por email
    const comprasPorEmail: Record<string, { totalGastado: number; cantidadCompras: number; ultimaCompra: string; ultimoModelo: string; ciudad: string }> = {}

    for (const p of pedidos) {
      const email = p.cliente_email?.toLowerCase() || 'desconocido'
      if (!comprasPorEmail[email]) {
        let modelo = 'Calzado Seal Step'
        try {
          const snapshot = p.metadata?.items_snapshot
          if (Array.isArray(snapshot) && snapshot.length > 0) {
            modelo = snapshot[0].nombre || modelo
          }
        } catch {}

        comprasPorEmail[email] = {
          totalGastado: 0,
          cantidadCompras: 0,
          ultimaCompra: new Date(p.created_at).toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          ultimoModelo: modelo,
          ciudad: p.direccion_envio?.ciudad || p.direccion_envio?.departamento || 'Montevideo',
        }
      }
      comprasPorEmail[email].totalGastado += Number(p.total) || 0
      comprasPorEmail[email].cantidadCompras += 1
    }

    // Unir clientes registrados con sus métricas
    const listaFinal = clientes.map((c, idx) => {
      const email = c.email?.toLowerCase() || ''
      const metrics = comprasPorEmail[email]
      const gasto = metrics ? metrics.totalGastado : (c.total_gastado || 0)
      const compras = metrics ? metrics.cantidadCompras : (c.total_compras_count || 0)
      const ciudad = c.ciudad || (metrics ? metrics.ciudad : 'Uruguay')
      const modelo = metrics ? metrics.ultimoModelo : 'Registro Web'

      let estado = 'novo'
      if (gasto >= 10000 || compras >= 3) estado = 'vip'
      else if (compras > 0) estado = 'activo'
      else estado = 'novo'

      const nombreParts = (c.nombre || 'Cliente').split(' ')
      const avatar = (nombreParts[0]?.[0] || 'C') + (nombreParts[1]?.[0] || '')

      return {
        id: c.id || idx + 1,
        nombre: c.nombre || 'Cliente Registrado',
        email: c.email || '',
        telefono: c.telefono || 'Sin teléfono',
        ciudad,
        compras,
        totalGastado: gasto,
        ultimaCompra: metrics ? metrics.ultimaCompra : new Date(c.created_at).toLocaleDateString('es-UY'),
        estado,
        modelo,
        canal: 'Web' as const,
        avatar: avatar.toUpperCase(),
        notas: c.notas || '',
        esReal: true,
      }
    })

    return NextResponse.json({
      success: true,
      clientes: listaFinal,
      totalPedidos: pedidos.length,
    })
  } catch (err: unknown) {
    console.error('[CRM API] Error:', err)
    return NextResponse.json(
      { success: false, error: 'Error al cargar clientes del CRM' },
      { status: 500 }
    )
  }
}
