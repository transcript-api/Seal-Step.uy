'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { whatsappLink } from '@/lib/site'

function ExitoContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id') || searchParams.get('external_reference') || 'SS-PEDIDO'
  const paymentId = searchParams.get('payment_id') || searchParams.get('collection_id')
  const metodo = searchParams.get('metodo') || 'mercadopago'

  const isTransfer = metodo === 'transferencia'
  const isCash = metodo === 'efectivo'

  let badge = 'Pago Aprobado'
  let title = '¡Gracias por tu compra!'
  let description = 'Tu pago fue procesado con éxito por Mercado Pago. Ya estamos preparando tus championes para el despacho.'
  let waMsg = `¡Hola Seal Step! Acabo de completar el pago de mi pedido #${orderId} a través de Mercado Pago (Pago ID: ${paymentId || 'confirmado'}). ¿Me confirman el despacho de los championes?`

  if (isTransfer) {
    badge = 'Pedido Registrado • Pendiente de Transferencia'
    title = '¡Pedido recibido con éxito!'
    description = 'Por favor realiza la transferencia bancaria y envíanos el comprobante por WhatsApp para despachar tus championes hoy mismo.'
    waMsg = `¡Hola Seal Step! Acabo de registrar el pedido #${orderId} con pago por Transferencia Bancaria. Les paso el comprobante para coordinar el envío.`
  } else if (isCash) {
    badge = 'Pedido Registrado • Pago Contra Entrega'
    title = '¡Pedido confirmado!'
    description = 'Prepararemos tu paquete. Abonarás en efectivo al momento de recibir tus championes en mano.'
    waMsg = `¡Hola Seal Step! Acabo de registrar el pedido #${orderId} para pagar en efectivo al recibir. ¿Me confirman la entrega?`
  }

  return (
    <div className="max-w-xl mx-auto text-center space-y-6 py-16 px-4">
      <div className="size-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 animate-in zoom-in-75 duration-300">
        <CheckCircle2 className="size-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          {badge}
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-neutral-400">
          {description}
        </p>
      </div>

      <div className="p-4 rounded-2xl border border-neutral-800 bg-[#0d0d0d] text-left space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>Código de Pedido:</span>
          <span className="font-mono font-bold text-white">{orderId}</span>
        </div>
        {paymentId && (
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Comprobante Mercado Pago:</span>
            <span className="font-mono font-bold text-emerald-400">#{paymentId}</span>
          </div>
        )}
      </div>

      {isTransfer && (
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-left space-y-2.5 text-xs font-mono">
          <p className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Cuentas para transferir:</p>
          <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1">
            <p className="text-white font-bold">Itaú: 4704307</p>
            <p className="text-neutral-400 text-[11px]">Ignacio Duarte (Caja de Ahorros UYU)</p>
          </div>
          <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1">
            <p className="text-white font-bold">Santander: 00000-1665111</p>
            <p className="text-neutral-400 text-[11px]">Sucursal 26 - Tacuarembó • Moneda: UYU</p>
          </div>
          <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1">
            <p className="text-white font-bold">Prex: 1158143</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href={whatsappLink(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2.5 rounded-full bg-[#00e676] py-3.5 px-6 font-heading text-sm font-bold text-black uppercase tracking-wider hover:bg-[#00c853] transition shadow-lg shadow-emerald-500/20"
        >
          <WhatsAppIcon className="size-4 fill-black" />
          <span>{isTransfer ? 'Enviar comprobante por WhatsApp' : 'Avisar por WhatsApp'}</span>
        </a>
        <Link
          href="/#productos"
          className="flex items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 py-3.5 px-6 font-heading text-sm font-bold text-white hover:bg-neutral-800 transition"
        >
          <ShoppingBag className="size-4" />
          <span>Volver a la Tienda</span>
        </Link>
      </div>
    </div>
  )
}

export default function CheckoutExitoPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[75vh] pt-32 pb-20 flex items-center justify-center">
        <Suspense fallback={<div className="text-white text-sm">Cargando confirmación...</div>}>
          <ExitoContent />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
