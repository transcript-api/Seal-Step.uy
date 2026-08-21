import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductoDetalle } from '@/components/producto-detalle'
import { PRODUCTOS, getProducto, getMarcaFromProducto } from '@/lib/productos'

export function generateStaticParams() {
  return PRODUCTOS.map((producto) => ({
    slug: producto.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const producto = getProducto(slug)

  if (!producto) {
    return { title: 'Producto no encontrado | Seal Step' }
  }

  const primeraImagen = producto.imagenes[0]?.src ?? '/images/seal-step-logo.png'
  const title = `${producto.nombre} | Seal Step Uruguay`
  const description = `${producto.nombre}${producto.subtitulo ? ` (${producto.subtitulo})` : ''}. ${producto.descripcion} Envíos a todo Uruguay.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: 'es_UY',
      type: 'website',
      images: [
        {
          url: primeraImagen,
          alt: producto.nombre,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [primeraImagen],
    },
  }
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const producto = getProducto(slug)

  if (!producto) {
    notFound()
  }

  const marcaNombre = getMarcaFromProducto(producto).toUpperCase()
  const primeraImagen = producto.imagenes[0]?.src ?? '/images/seal-step-logo.png'

  // Schema.org JSON-LD para Google y motores de Inteligencia Artificial
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: producto.nombre,
    description: producto.descripcion,
    image: producto.imagenes.map((img) => `https://sealstep.uy${img.src}`),
    brand: {
      '@type': 'Brand',
      name: marcaNombre,
    },
    category: producto.categoria,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'UYU',
      price: producto.precio ? producto.precio.replace(/[^0-9]/g, '') : undefined,
      availability:
        producto.stock === 'agotado'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      url: `https://sealstep.uy/producto/${producto.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'Seal Step Uruguay',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-black">
        <ProductoDetalle producto={producto} />
      </main>
    </>
  )
}
