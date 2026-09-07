import { NextResponse } from 'next/server'
import { getSiteConfig, invalidateSiteConfigCache, DEFAULT_SITE_CONFIG, type SiteConfig } from '@/lib/site-config'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const config = await getSiteConfig()
    return NextResponse.json({ success: true, config })
  } catch (error) {
    console.error('Error al obtener configuración:', error)
    return NextResponse.json({ success: true, config: DEFAULT_SITE_CONFIG })
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<SiteConfig>
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Cuerpo de solicitud inválido.' },
        { status: 400 }
      )
    }

    // Si Supabase está disponible, intentamos persistir los bloques de configuración
    if (isSupabaseConfigured()) {
      const keysToSave = Object.entries(body)
      for (const [clave, valor] of keysToSave) {
        try {
          await supabase.from('site_config').upsert(
            { clave, valor, updated_at: new Date().toISOString() },
            { onConflict: 'clave' }
          )
        } catch (dbErr) {
          console.warn(`Aviso al guardar clave ${clave} en site_config:`, dbErr)
        }
      }
    }

    invalidateSiteConfigCache()
    const updated = await getSiteConfig()

    return NextResponse.json({
      success: true,
      message: 'Configuración actualizada con éxito.',
      config: updated,
    })
  } catch (error) {
    console.error('Error al actualizar configuración:', error)
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error al guardar los ajustes.' },
      { status: 500 }
    )
  }
}
