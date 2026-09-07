import { getProductos } from '@/lib/productos-db'
import { CatalogoContent } from '@/components/catalogo-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catálogo Completo | Seal Step Uruguay',
  description: 'Explorá nuestro catálogo completo de championes importados y calzado urbano en Uruguay.',
}

export default async function CatalogoPage() {
  const productos = await getProductos()

  return <CatalogoContent initialProducts={productos} />
}
