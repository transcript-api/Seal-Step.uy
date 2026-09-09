import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import { PRODUCTOS, type Producto } from '@/lib/productos'

/**
 * Convierte un precio numérico de la base de datos a formato de moneda uruguaya.
 * Ej: 2500 -> "$ 2.500" o null si es "Consultar precio".
 */
export function formatPrecio(precio: number | null): string | null {
  if (precio === null || precio === undefined) return null
  return `$ ${precio.toLocaleString('es-UY')}`
}

/**
 * Obtiene todos los productos de la tienda.
 * Prioridad 1: Lee en vivo desde Supabase (PostgreSQL).
 * Prioridad 2 (Respaldo de Seguridad): Si Supabase no responde o falla la red,
 * devuelve automáticamente el catálogo local de lib/productos.ts sin romper la web.
 */
export async function getProductos(): Promise<Producto[]> {
  if (!isSupabaseConfigured()) {
    return PRODUCTOS
  }

  try {
    const supabase = getSupabaseAdmin()
    // 1. Obtener productos de la tabla productos
    const { data: prods, error: errProds } = await supabase
      .from('v_catalogo_productos')
      .select('*')
      .order('created_at', { ascending: true })

    if (errProds || !prods || prods.length === 0) {
      console.warn('⚠️ Supabase no devolvió productos, usando respaldo local:', errProds?.message)
      return PRODUCTOS
    }

    // 2. Obtener imágenes ordenadas
    const { data: imgs } = await supabase
      .from('producto_imagenes')
      .select('*')
      .order('orden', { ascending: true })

    // 3. Obtener variantes activas (talles y colores)
    const { data: vars } = await supabase
      .from('v_catalogo_variantes')
      .select('*')

    const safeImgs = imgs || []
    const safeVars = vars || []

    // 4. Mapear al tipo estándar Producto que usan todos los componentes visuales
    const productosDataDriven: Producto[] = prods.map((p) => {
      const fotosProducto = safeImgs
        .filter((img) => img.producto_id === p.id)
        .map((img) => ({
          src: img.url,
          alt: img.alt || p.nombre,
        }))

      // Extraer talles únicos
      const tallesProducto = [
        ...new Set(
          safeVars
            .filter((v) => v.producto_id === p.id && v.disponible)
            .map((v) => v.talle)
        ),
      ]

      // Extraer colores únicos
      const coloresProducto = [
        ...new Set(
          safeVars
            .filter((v) => v.producto_id === p.id && v.color)
            .map((v) => v.color)
        ),
      ]

      return {
        slug: p.slug,
        nombre: p.nombre,
        categoria: p.categoria,
        subtitulo: p.subtitulo || undefined,
        badge: p.badge || undefined,
        colores: coloresProducto.length > 0 ? coloresProducto : undefined,
        precio: formatPrecio(p.precio),
        fotosReales: p.fotos_reales ?? true,
        talles: tallesProducto.length > 0 ? tallesProducto : ['38', '39', '40', '41', '42'],
        stock: (p.estado_stock_general as Producto['stock']) || 'disponible',
        descripcion: p.descripcion,
        detalles: p.detalles && Array.isArray(p.detalles) && p.detalles.length > 0 ? p.detalles : [
          'Envíos a todo el país (24 a 72 hs)',
          'Compra 100% segura y garantizada',
        ],
        imagenes: fotosProducto.length > 0 ? fotosProducto : [
          { src: '/images/hero-sneaker.png', alt: p.nombre },
        ],
      }
    })

    return productosDataDriven
  } catch (error) {
    console.error('❌ Error consultando Supabase, activando respaldo local:', error)
    return PRODUCTOS
  }
}

/**
 * Obtiene un único producto por su slug.
 */
export async function getProductoBySlug(slug: string): Promise<Producto | undefined> {
  const lista = await getProductos()
  return lista.find((p) => p.slug === slug)
}
