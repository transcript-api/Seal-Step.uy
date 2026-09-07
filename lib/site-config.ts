import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export interface SiteConfig {
  // Información de contacto y WhatsApp
  whatsappNumber: string
  whatsappDisplay: string
  whatsappMensajeBienvenida: string
  emailContacto: string
  ciudadBase: string
  horarioAtencion: string

  // Métricas del Hero
  statsHero: {
    paresEnviados: number
    departamentos: number
    compraSeguraPorcentaje: number
    revendedoresActivos: number
  }

  // Logística y envíos
  envios: {
    plazoEstimado: string
    costoEnvioBaseUYU: number
    envioGratisMinimoUYU: number
    transportistas: string
  }

  // Anuncios y marquesina
  anuncios: {
    cintilloMarquesina: string
    promoActiva: boolean
    promoBannerTexto: string
  }

  // Pasarela Mercado Pago Uruguay
  mercadoPago: {
    habilitado: boolean
    moneda: 'UYU'
    publicKey: string
    accessToken: string
    cuotasSinInteres: boolean
  }
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  whatsappNumber: '59895843091',
  whatsappDisplay: '+598 95 843 091',
  whatsappMensajeBienvenida: 'Hola Seal Step! Quiero consultar modelos, talles y precios de championes.',
  emailContacto: 'contacto@sealstep.uy',
  ciudadBase: 'Rivera, Uruguay',
  horarioAtencion: 'Lunes a Sábado de 09:00 a 20:00 hs',

  statsHero: {
    paresEnviados: 5000,
    departamentos: 19,
    compraSeguraPorcentaje: 100,
    revendedoresActivos: 50,
  },

  envios: {
    plazoEstimado: '24 a 72 hs',
    costoEnvioBaseUYU: 250,
    envioGratisMinimoUYU: 3500,
    transportistas: 'DAC, Correo Uruguayo, DePunta, Mirtrans',
  },

  anuncios: {
    cintilloMarquesina: 'ENTREGAS EN 24 A 72 HS · CALIDAD-PRECIO · COMPRA SEGURA · ENVÍOS A TODO URUGUAY · VENTAS POR MAYOR · ATENCIÓN PERSONALIZADA',
    promoActiva: true,
    promoBannerTexto: 'Envíos a todo el país. Consultá por precios mayoristas para revendedores.',
  },

  mercadoPago: {
    habilitado: false,
    moneda: 'UYU',
    publicKey: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || '',
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
    cuotasSinInteres: true,
  },
}

// Cache local en memoria para evitar consultas redundantes continuas
let cachedConfig: SiteConfig | null = null
let cacheExpiry = 0
const CACHE_TTL_MS = 60 * 1000 // 1 minuto

/**
 * Obtiene la configuración de la tienda.
 * Prioridad 1: Lee desde la base de datos Supabase (tabla `site_config`).
 * Prioridad 2 (Respaldo Seguro): Si Supabase falla o no está configurada la tabla,
 * retorna inmediatamente la configuración por defecto sin romper la página.
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  const now = Date.now()
  if (cachedConfig && now < cacheExpiry) {
    return cachedConfig
  }

  if (!isSupabaseConfigured()) {
    return DEFAULT_SITE_CONFIG
  }

  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('clave, valor')

    if (error || !data || data.length === 0) {
      return DEFAULT_SITE_CONFIG
    }

    // Convertir filas clave-valor a objeto SiteConfig
    const configMap: Record<string, unknown> = {}
    for (const row of data) {
      configMap[row.clave] = row.valor
    }

    const mergedConfig: SiteConfig = {
      ...DEFAULT_SITE_CONFIG,
      ...configMap,
      statsHero: {
        ...DEFAULT_SITE_CONFIG.statsHero,
        ...(typeof configMap.statsHero === 'object' && configMap.statsHero !== null ? configMap.statsHero : {}),
      },
      envios: {
        ...DEFAULT_SITE_CONFIG.envios,
        ...(typeof configMap.envios === 'object' && configMap.envios !== null ? configMap.envios : {}),
      },
      anuncios: {
        ...DEFAULT_SITE_CONFIG.anuncios,
        ...(typeof configMap.anuncios === 'object' && configMap.anuncios !== null ? configMap.anuncios : {}),
      },
      mercadoPago: {
        ...DEFAULT_SITE_CONFIG.mercadoPago,
        ...(typeof configMap.mercadoPago === 'object' && configMap.mercadoPago !== null ? configMap.mercadoPago : {}),
      },
    }

    cachedConfig = mergedConfig
    cacheExpiry = now + CACHE_TTL_MS
    return mergedConfig
  } catch (err) {
    console.warn('⚠️ No se pudo consultar site_config en Supabase, usando respaldo seguro:', err)
    return DEFAULT_SITE_CONFIG
  }
}

/**
 * Invalida el caché local en memoria cuando el dueño guarda cambios.
 */
export function invalidateSiteConfigCache() {
  cachedConfig = null
  cacheExpiry = 0
}
