import { getSiteConfig } from '@/lib/site-config'

/**
 * Integración oficial con Mercado Pago Uruguay (UYU).
 * Documentación API: https://www.mercadopago.com.uy/developers/es/reference/preferences/_checkout_preferences/post
 */

export interface MPItem {
  id: string
  title: string
  quantity: number
  unit_price: number
  currency_id: 'UYU'
  picture_url?: string
  description?: string
}

export interface MPPayer {
  name?: string
  surname?: string
  email: string
  phone?: {
    area_code?: string
    number?: string
  }
  address?: {
    street_name?: string
    street_number?: number
    zip_code?: string
  }
}

export interface CreatePreferenceParams {
  items: MPItem[]
  payer: MPPayer
  orderId: string
  baseUrl: string
}

export interface PreferenceResult {
  id: string
  init_point: string
  sandbox_init_point?: string
}

/**
 * Crea una preferencia de pago en Mercado Pago Uruguay.
 * Si las credenciales aún no están configuradas en Vercel/.env.local,
 * devuelve una respuesta estructurada para pruebas sin romper la experiencia.
 */
export async function createPreference({
  items,
  payer,
  orderId,
  baseUrl,
}: CreatePreferenceParams): Promise<PreferenceResult> {
  const siteConfig = await getSiteConfig()
  const accessToken =
    process.env.MERCADO_PAGO_ACCESS_TOKEN?.trim() || siteConfig.mercadoPago?.accessToken?.trim()

  if (!accessToken) {
    console.warn('⚠️ MERCADO_PAGO_ACCESS_TOKEN no configurado en el servidor. Modo simulación activo.')
    return {
      id: `sim_pref_${orderId}`,
      init_point: `${baseUrl}/checkout/pendiente?simulated=true&order_id=${orderId}`,
      sandbox_init_point: `${baseUrl}/checkout/pendiente?simulated=true&order_id=${orderId}`,
    }
  }

  const payload = {
    items: items.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: Math.max(1, item.quantity),
      unit_price: Math.max(1, Number(item.unit_price)),
      currency_id: 'UYU',
      picture_url: item.picture_url,
      description: item.description,
    })),
    payer: {
      name: payer.name || 'Cliente',
      surname: payer.surname || 'Seal Step',
      email: payer.email || 'cliente@sealstep.uy',
      phone: payer.phone,
      address: payer.address,
    },
    back_urls: {
      success: `${baseUrl}/checkout/exito?order_id=${orderId}`,
      failure: `${baseUrl}/checkout/fallo?order_id=${orderId}`,
      pending: `${baseUrl}/checkout/pendiente?order_id=${orderId}`,
    },
    auto_return: 'approved',
    external_reference: orderId,
    statement_descriptor: 'SEAL STEP',
    notification_url: `${baseUrl}/api/webhooks/mercadopago`,
    payment_methods: {
      excluded_payment_types: [],
      installments: 12,
    },
  }

  const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('❌ Error de respuesta desde Mercado Pago API:', response.status, errorBody)
    throw new Error(`Error de Mercado Pago (${response.status}): ${errorBody}`)
  }

  const data = await response.json()
  return {
    id: data.id,
    init_point: data.init_point,
    sandbox_init_point: data.sandbox_init_point,
  }
}
