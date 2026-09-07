import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const topic = url.searchParams.get('topic') || url.searchParams.get('type')
    const paymentId = url.searchParams.get('data.id') || url.searchParams.get('id')

    // Mercado Pago envía notificaciones con topic "payment" o query params
    if (paymentId && process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      try {
        const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        })

        if (mpRes.ok) {
          const paymentData = await mpRes.json()
          const orderId = paymentData.external_reference
          const status = paymentData.status // 'approved', 'rejected', 'in_process', etc.

          console.log(`🔔 Notificación Mercado Pago recibida - Pedido: ${orderId}, Estado: ${status}, ID Pago: ${paymentId}`)

          if (isSupabaseConfigured() && orderId) {
            await supabase
              .from('pedidos')
              .update({
                estado: status === 'approved' ? 'pagado' : status,
                mercadopago_id: paymentId,
                fecha_pago: new Date().toISOString(),
                datos_pago: paymentData,
              })
              .eq('id_pedido', orderId)
          }
        }
      } catch (mpErr) {
        console.warn('Aviso procesando detalle de pago en webhook MP:', mpErr)
      }
    }

    // Siempre retornar 200 OK a Mercado Pago para evitar reintentos continuos
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Error en webhook de Mercado Pago:', error)
    return NextResponse.json({ received: true }, { status: 200 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Webhook de Mercado Pago activo' })
}
