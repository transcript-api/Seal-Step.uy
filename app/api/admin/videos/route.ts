import { NextResponse } from 'next/server'
import { getSiteVideos, saveSiteVideos, type SiteVideosConfig } from '@/lib/videos'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const videos = getSiteVideos()
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

    const saved = saveSiteVideos(body)
    if (!saved) {
      return NextResponse.json({ error: 'No se pudo escribir el archivo de configuración' }, { status: 500 })
    }

    // Revalidar las páginas públicas para que se vean inmediatamente
    revalidatePath('/')
    revalidatePath('/catalogo')
    revalidatePath('/mayoristas')
    revalidatePath('/admin/videos')

    return NextResponse.json({
      success: true,
      message: '¡Videos actualizados correctamente en toda la tienda!',
      videos: getSiteVideos(),
    })
  } catch (err: any) {
    console.error('Error saving videos API:', err)
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 })
  }
}
