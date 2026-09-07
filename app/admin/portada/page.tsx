import { getProductos } from '@/lib/productos-db'
import { AdminPortadaReorder } from '@/components/admin-portada-reorder'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Organizador de Portada | Seal Step Admin',
  description: 'Reordenar modelos destacados en la primera página mediante arrastrar y soltar.',
}

export default async function AdminPortadaPage() {
  const productos = await getProductos()

  return <AdminPortadaReorder initialProducts={productos} />
}
