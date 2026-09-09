import React from 'react'
import { AdminNav } from '@/components/admin-nav'
import type { Metadata } from 'next'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Panel de Control | Seal Step Admin',
  description: 'Panel de gestión para catálogo, portada, videos, pedidos y CRM de Seal Step.',
}

function SupabaseBanner() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  const keyOk = key && !key.startsWith('SUPABASE_') && key.length > 20

  if (!url || !keyOk) {
    return (
      <div className="bg-red-950/80 border-b border-red-700/60 px-4 py-2.5 flex items-center gap-3 text-xs text-red-200">
        <AlertTriangle className="size-4 text-red-400 shrink-0" />
        <span>
          <strong>⚠️ Error de conexión con Supabase:</strong>{' '}
          {!url ? 'Falta NEXT_PUBLIC_SUPABASE_URL.' : ''}{' '}
          {!keyOk
            ? key?.startsWith('SUPABASE_')
              ? 'SUPABASE_SERVICE_ROLE_KEY tiene el nombre de la variable como valor (debe ser "sb_secret_...").'
              : 'Falta SUPABASE_SERVICE_ROLE_KEY.'
            : ''}
          {' '}Corrígelo en Vercel Dashboard → Settings → Environment Variables y luego hacé Redeploy.
        </span>
      </div>
    )
  }

  return null
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 overflow-y-auto min-h-screen bg-[#050505]">
        <SupabaseBanner />
        {children}
      </main>
    </div>
  )
}
