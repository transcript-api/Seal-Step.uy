import { NextResponse } from 'next/server'
import { getSiteVideosAsync, saveSiteVideosAsync, type SiteVideosConfig } from '@/lib/videos'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const videos = await getSiteVideosAsync()
    return NextResponse.json({ success: true, videos })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SiteVideosConfig
    if (!body || !body.dropVideos || !body.galeriaReels) {
      return NextResponse.json({ error: 'Formato inválido de configuración de videos' }, { status: 400 })
    }

    const saved = await saveSiteVideosAsync(body)
    if (!saved) {
      return NextResponse.json({ error: 'No se pudo guardar la configuración de videos' }, { status: 500 })
    }

    // Revalidar las páginas públicas para que se vean inmediatamente
    revalidatePath('/')
    revalidatePath('/catalogo')
    revalidatePath('/mayoristas')
    revalidatePath('/admin/videos')

    const updated = await getSiteVideosAsync()

    return NextResponse.json({
      success: true,
      message: '¡Videos actualizados correctamente en toda la tienda!',
      videos: updated,
    })
  } catch (err: any) {
    console.error('Error saving videos API:', err)
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 })
  }
}
