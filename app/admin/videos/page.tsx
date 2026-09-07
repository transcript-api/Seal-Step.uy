import { AdminVideosEditor } from '@/components/admin-videos-editor'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos y Banners | Seal Step Admin',
  description: 'Gestor multimedia para subir y cambiar videos de la tienda.',
}

export default function AdminVideosPage() {
  return <AdminVideosEditor />
}
