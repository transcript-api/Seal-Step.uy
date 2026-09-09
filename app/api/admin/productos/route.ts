import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!url || !key) {
    throw new Error(
      `Variables de entorno de Supabase no configuradas en Vercel. ` +
      `URL: ${url ? 'OK' : 'FALTA'}, KEY: ${key ? 'OK' : 'FALTA'}. ` +
      `Ve a Vercel Dashboard > Settings > Environment Variables y asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.`
    )
  }

  return createClient(url, key)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      slug,
      nombre,
      subtitulo,
      categoria,
      marca,
      badge,
      precio, // Puede ser string "$ 2.800" o número 2800 o null
      descripcion,
      talles, // Array de strings ['38', '39', '40']
      colores, // Array de strings ['Blanco', 'Negro']
      imagenes, // Array de { src: string, alt?: string }
      isNew,
    } = body

    if (!nombre) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 })
    }

    // Generar slug si es nuevo y no viene
    const finalSlug = slug || nombre.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')

    // Limpiar precio
    let numericPrice: number | null = null
    if (precio) {
      const clean = String(precio).replace(/[^0-9.]/g, '')
      if (clean && !isNaN(Number(clean))) {
        numericPrice = Number(clean)
      }
    }

    // 1. Guardar en tabla productos (Upsert por slug)
    const supabaseAdmin = getSupabaseAdmin()
    const { data: prodData, error: prodErr } = await supabaseAdmin
      .from('productos')
      .upsert(
        {
          slug: finalSlug,
          nombre,
          subtitulo: subtitulo || null,
          categoria: categoria || 'Importados',
          marca: marca || 'General',
          badge: badge || null,
          precio: numericPrice,
          descripcion: descripcion || `${nombre} importados de primera calidad.`,
          visible: true,
          activo: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' }
      )
      .select()
      .single()

    if (prodErr) {
      console.error('Error guardando producto en Supabase:', prodErr)
      return NextResponse.json({ error: prodErr.message }, { status: 500 })
    }

    const productId = prodData.id

    // 2. Actualizar Imágenes si se enviaron
    if (imagenes && Array.isArray(imagenes) && imagenes.length > 0) {
      // Eliminar imágenes previas y volver a insertar ordenadas
      await supabaseAdmin.from('producto_imagenes').delete().eq('producto_id', productId)

      const imgInserts = imagenes.map((img: { src: string; alt?: string }, idx: number) => ({
        producto_id: productId,
        url: img.src,
        alt: img.alt || nombre,
        orden: idx,
        es_principal: idx === 0,
      }))

      await supabaseAdmin.from('producto_imagenes').insert(imgInserts)
    }

    // 3. Actualizar Variantes (Talles y Colores)
    if (talles && Array.isArray(talles) && talles.length > 0) {
      const activeColors = colores && colores.length > 0 ? colores : [subtitulo || 'Estándar']

      // Borrar variantes anteriores del producto
      await supabaseAdmin.from('producto_variantes').delete().eq('producto_id', productId)

      const varInserts = []
      for (const t of talles) {
        for (const c of activeColors) {
          const sku = `${finalSlug}-${t}-${String(c).toLowerCase().replace(/[^a-z0-9]/g, '-')}`.slice(0, 50)
          varInserts.push({
            producto_id: productId,
            sku,
            talle: String(t),
            color: String(c),
            stock: null,
            activo: true,
          })
        }
      }

      if (varInserts.length > 0) {
        await supabaseAdmin.from('producto_variantes').insert(varInserts)
      }
    }

    // 4. Revalidar rutas para que la tienda pública se actualice al instante
    revalidatePath('/')
    revalidatePath('/catalogo')
    revalidatePath(`/producto/${finalSlug}`)
    revalidatePath('/admin')
    revalidatePath('/admin/productos')
    revalidatePath('/admin/portada')

    return NextResponse.json({
      success: true,
      message: isNew ? 'Producto creado correctamente' : 'Producto actualizado correctamente',
      slug: finalSlug,
    })
  } catch (err: any) {
    console.error('Error en API admin productos:', err)
    return NextResponse.json({ error: err.message || 'Error interno del servidor' }, { status: 500 })
  }
}
