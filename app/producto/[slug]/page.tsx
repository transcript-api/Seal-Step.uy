import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductoDetalle } from '@/components/producto-detalle'
import { PRODUCTOS, getProducto } from '@/lib/productos'

export function generateStaticParams() {
  return PRODUCTOS.map((producto) => ({
    slug: producto.slug,
  }))
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

  return (
    <main className="min-h-screen bg-black">
      <ProductoDetalle producto={producto} />
    </main>
  )
}
