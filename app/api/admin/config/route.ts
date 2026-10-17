import { NextResponse } from 'next/server'
import { getSiteConfig, invalidateSiteConfigCache, DEFAULT_SITE_CONFIG, type SiteConfig } from '@/lib/site-config'
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

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

    // 1. Guardar siempre en archivo local data/site-config.json
    try {
      const fs = await import('fs')
      const path = await import('path')
      const filePath = path.join(process.cwd(), 'data', 'site-config.json')
      let current: Record<string, unknown> = {}
      if (fs.existsSync(filePath)) {
        current = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      }
      const updatedLocal = { ...current, ...body }
      fs.writeFileSync(filePath, JSON.stringify(updatedLocal, null, 2), 'utf-8')
    } catch (fsErr) {
      console.warn('Aviso al escribir en data/site-config.json:', fsErr)
    }

    // 2. Si Supabase está disponible, persistir permanentemente en Supabase
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin()
        await supabase.from('clientes').upsert(
          {
            id: '00000000-0000-0000-0000-000000000001',
            telefono: '000000000',
            email: 'system_config@sealstep.internal',
            nombre: 'Configuración General Tienda',
            origen: 'system_config',
            notas: JSON.stringify(updatedLocal),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )
      } catch (dbErr) {
        console.warn('Aviso al guardar en Supabase:', dbErr)
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
