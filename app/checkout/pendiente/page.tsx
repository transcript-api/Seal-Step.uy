'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Clock, ShoppingBag, ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { whatsappLink } from '@/lib/site'

function PendienteContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id') || 'SS-PENDIENTE'
  const isSimulated = searchParams.get('simulated') === 'true'

  const waMsg = `¡Hola Seal Step! Hice el pedido #${orderId} y tengo pendiente el comprobante de pago. ¿Me confirman los datos para coordinar el envío?`

  return (
    <div className="max-w-xl mx-auto text-center space-y-6 py-16 px-4">
      <div className="size-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 animate-in zoom-in-75 duration-300">
        <Clock className="size-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Pago Pendiente o En Proceso
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white tracking-tight">
          {isSimulated ? 'Modo de Prueba Preparado' : 'Tu pedido está en espera'}
        </h1>
        <p className="text-sm text-neutral-400">
          {isSimulated
            ? 'La integración con Mercado Pago Uruguay está lista en la arquitectura del sistema. Al ingresar las credenciales oficiales se activará el cobro automático.'
            : 'Si elegiste pagar en efectivo por Abitab o RedPagos, recordá abonar con tu código de trámite. En cuanto se acredite, despachamos tu pedido.'}
        </p>
      </div>

      <div className="p-4 rounded-2xl border border-neutral-800 bg-[#0d0d0d] text-left space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>Código de Pedido:</span>
          <span className="font-mono font-bold text-white">{orderId}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href={whatsappLink(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2.5 rounded-full bg-[#00e676] py-3.5 px-6 font-heading text-sm font-bold text-black uppercase tracking-wider hover:bg-[#00c853] transition shadow-lg shadow-emerald-500/20"
        >
          <WhatsAppIcon className="size-4 fill-black" />
          <span>Consultar por WhatsApp</span>
        </a>
        <Link
          href="/#productos"
          className="flex items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 py-3.5 px-6 font-heading text-sm font-bold text-white hover:bg-neutral-800 transition"
        >
          <ShoppingBag className="size-4" />
          <span>Volver al Catálogo</span>
        </Link>
      </div>
    </div>
  )
}

export default function CheckoutPendientePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[75vh] pt-32 pb-20 flex items-center justify-center">
        <Suspense fallback={<div className="text-white text-sm">Cargando estado...</div>}>
          <PendienteContent />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
