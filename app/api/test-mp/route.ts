import { NextResponse } from 'next/server'
import { getSiteConfig } from '@/lib/site-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  const siteConfig = await getSiteConfig()
  const accessToken =
    process.env.MERCADO_PAGO_ACCESS_TOKEN?.trim() ||
    siteConfig.mercadoPago?.accessToken?.trim()

  if (!accessToken) {
    return NextResponse.json({
      ok: false,
      error: 'MERCADO_PAGO_ACCESS_TOKEN no configurado',
      envKeys: Object.keys(process.env).filter(k => k.includes('MERCADO')),
    })
  }

  // Crear una preferencia de prueba mínima
  const testPayload = {
    items: [
      {
        id: 'test-item-1',
        title: 'Test Seal Step',
        quantity: 1,
        unit_price: 100,
        currency_id: 'UYU',
      },
    ],
    payer: { email: 'test@sealstep.uy' },
    back_urls: {
      success: 'https://sealstep.vercel.app/checkout/exito',
      failure: 'https://sealstep.vercel.app/checkout/fallo',
      pending: 'https://sealstep.vercel.app/checkout/pendiente',
    },
    external_reference: `test-${Date.now()}`,
    statement_descriptor: 'SEAL STEP',
  }

  try {
    const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(testPayload),
    })

    const body = await res.json()

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      tokenUsed: `${accessToken.substring(0, 20)}...`,
      initPoint: body.init_point,
      preferenceId: body.id,
      error: res.ok ? null : body,
    })
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: String(err),
    })
  }
}
