import { getProductos } from '@/lib/productos-db'
import { AdminProductosTable } from '@/components/admin-productos-table'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catálogo de Productos | Seal Step Admin',
  description: 'Gestión y edición rápida de modelos, talles y precios.',
}

export default async function AdminProductosPage() {
  const productos = await getProductos()

  return <AdminProductosTable initialProducts={productos} />
}
