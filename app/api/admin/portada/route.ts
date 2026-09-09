import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data: prods, error } = await supabase
      .from('productos')
      .select('slug, destacado, etiquetas')
      .eq('destacado', true)

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // Ordenar por el tag orden_X
    const sorted = (prods || []).sort((a, b) => {
      const getNum = (tags: string[]) => {
        if (!Array.isArray(tags)) return 999
        const t = tags.find((tag) => typeof tag === 'string' && tag.startsWith('orden_'))
        return t ? parseInt(t.replace('orden_', ''), 10) : 999
      }
      return getNum(a.etiquetas) - getNum(b.etiquetas)
    })

    return NextResponse.json({
      success: true,
      featuredSlugs: sorted.map((p) => p.slug),
    })
  } catch (err: unknown) {
    const error = err as Error
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { featuredSlugs } = body as { featuredSlugs?: string[] }

    if (!featuredSlugs || !Array.isArray(featuredSlugs)) {
      return NextResponse.json({ success: false, error: 'Lista de slugs inválida' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // 1. Obtener todos los productos para identificar los que no están en portada
    const { data: allProds, error: allErr } = await supabase
      .from('productos')
      .select('slug, etiquetas')

    if (allErr) {
      return NextResponse.json({ success: false, error: allErr.message }, { status: 500 })
    }

    const featuredSet = new Set(featuredSlugs)

    // 2. Actualizar cada producto en portada con su orden exacto (orden_0, orden_1, ...)
    for (let i = 0; i < featuredSlugs.length; i++) {
      const slug = featuredSlugs[i]
      const prod = allProds?.find((p) => p.slug === slug)
      // Mantener otras etiquetas si las hubiera, reemplazando las de orden
      const otherTags = Array.isArray(prod?.etiquetas)
        ? prod.etiquetas.filter((t: string) => typeof t === 'string' && !t.startsWith('orden_'))
        : []
      otherTags.push(`orden_${i}`)

      await supabase
        .from('productos')
        .update({
          destacado: true,
          etiquetas: otherTags,
          updated_at: new Date().toISOString(),
        })
        .eq('slug', slug)
    }

    // 3. Quitar de portada (destacado: false) a los productos que no están en la lista
    const nonFeaturedSlugs = (allProds || [])
      .filter((p) => !featuredSet.has(p.slug))
      .map((p) => p.slug)

    if (nonFeaturedSlugs.length > 0) {
      for (const slug of nonFeaturedSlugs) {
        const prod = allProds?.find((p) => p.slug === slug)
        const cleanTags = Array.isArray(prod?.etiquetas)
          ? prod.etiquetas.filter((t: string) => typeof t === 'string' && !t.startsWith('orden_'))
          : []

        await supabase
          .from('productos')
          .update({
            destacado: false,
            etiquetas: cleanTags,
            updated_at: new Date().toISOString(),
          })
          .eq('slug', slug)
      }
    }

    // 4. Revalidar rutas para refrescar inmediatamente la tienda pública y el admin
    revalidatePath('/')
    revalidatePath('/catalogo')
    revalidatePath('/admin/portada')

    return NextResponse.json({
      success: true,
      message: 'Portada y orden de calzados guardados correctamente',
      count: featuredSlugs.length,
    })
  } catch (err: unknown) {
    const error = err as Error
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
