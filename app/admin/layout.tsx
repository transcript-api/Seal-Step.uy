import React from 'react'
import { AdminNav } from '@/components/admin-nav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de Control | Seal Step Admin',
  description: 'Panel de gestión para catálogo, portada, videos, pedidos y CRM de Seal Step.',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 overflow-y-auto min-h-screen bg-[#050505]">
        {children}
      </main>
    </div>
  )
}
