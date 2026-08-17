'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Send, ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { whatsappLink } from '@/lib/site'
import { useOrder } from '@/lib/order-context'

export function OrderDrawer() {
  const { items, isDrawerOpen, setIsDrawerOpen, removeItem, updateQuantity, clearOrder, totalCount } =
    useOrder()

  const whatsappHref = useMemo(() => {
    if (items.length === 0) return ''

    let text = `👋 ¡Hola Seal Step! Quisiera consultar disponibilidad y precio para el siguiente pedido:\n\n`
    items.forEach((item, index) => {
      text += `👟 ${index + 1}. *${item.producto.nombre}*\n`
      text += `   • Talle: ${item.talle}\n`
      if (item.color) text += `   • Color: ${item.color}\n`
      text += `   • Cantidad: ${item.cantidad} par(es)\n\n`
    })

    if (totalCount >= 6) {
      text += `🔥 *(Interesado en precio mayorista por ${totalCount} pares)*\n`
    }

    text += `¿Tienen stock y cuánto demora el envío? ¡Muchas gracias!`
    return whatsappLink(text)
  }, [items, totalCount])

  if (!isDrawerOpen) {
    // Floating Pill Trigger when bag has items
    return totalCount > 0 ? (
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2.5 sm:gap-3 rounded-full border border-white/20 bg-black/95 px-3.5 py-2.5 sm:px-5 sm:py-3.5 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/40 ring-2 ring-emerald-500/40"
      >
        <div className="relative">
          <ShoppingBag className="size-4.5 sm:size-5 text-emerald-400" />
          <span className="absolute -top-1.5 -right-1.5 flex size-4 sm:size-4.5 items-center justify-center rounded-full bg-emerald-500 font-heading text-[9px] sm:text-[10px] font-black text-black">
            {totalCount}
          </span>
        </div>
        <div className="text-left leading-tight hidden xs:block">
          <p className="font-heading text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
            Mi Pedido
          </p>
          <p className="text-[9px] sm:text-[10px] font-semibold text-emerald-400">
            {totalCount} {totalCount === 1 ? 'par' : 'pares'}
          </p>
        </div>
      </button>
    ) : null
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => setIsDrawerOpen(false)}
        aria-label="Cerrar bolsa"
      />

      {/* Drawer Panel */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-neutral-800 bg-[#0c0c0c] text-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 p-5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-emerald-400">
              <ShoppingBag className="size-5" />
            </div>
            <div>
              <h2 className="font-heading text-base font-bold uppercase tracking-wide">
                Lista de Consulta
              </h2>
              <p className="text-xs text-neutral-400">
                {totalCount} {totalCount === 1 ? 'par agregado' : 'pares agregados'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="flex size-8 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Perks / Dynamic Promo Banner */}
        <div className="border-b border-neutral-800/80 bg-neutral-950/60 p-4 text-xs">
          {totalCount >= 6 ? (
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Sparkles className="size-4 shrink-0" />
              <span>🔥 ¡Nivel Mayorista Activo! (+6 pares con precios por lote)</span>
            </div>
          ) : totalCount >= 2 ? (
            <div className="flex items-center gap-2 text-emerald-300 font-semibold">
              <Sparkles className="size-4 shrink-0 text-emerald-400" />
              <span>¡Genial! Si agregás {6 - totalCount} más accedés a precios mayoristas.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-neutral-400">
              <span>Agregá más modelos para consultar todo tu pedido en un solo mensaje.</span>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 sm:px-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="flex size-16 items-center justify-center rounded-3xl bg-neutral-900 border border-neutral-800 text-neutral-500 mb-4">
                <ShoppingBag className="size-8" />
              </div>
              <h3 className="font-heading text-base font-bold uppercase text-neutral-300">
                Tu lista está vacía
              </h3>
              <p className="mt-1 max-w-xs text-xs text-neutral-500">
                Elegí tus championes favoritos y agregalos para consultar disponibilidad y precios juntos por WhatsApp.
              </p>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="mt-6 rounded-full bg-neutral-900 border border-neutral-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            items.map((item) => {
              const image = item.producto.imagenes[0]?.src || '/images/hero-sneaker.png'
              return (
                <div
                  key={item.id}
                  className="flex gap-3.5 rounded-2xl border border-neutral-800 bg-neutral-950 p-3.5 transition-all hover:border-neutral-700"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
                    <Image
                      src={image}
                      alt={item.producto.nombre}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading text-xs sm:text-sm font-bold uppercase tracking-tight truncate text-white">
                          {item.producto.nombre}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition"
                          title="Eliminar de la lista"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-semibold text-neutral-400 mt-0.5">
                        Talle: <span className="text-white">{item.talle}</span>
                        {item.color ? ` · ${item.color}` : ''}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-neutral-400 hover:text-white transition"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="font-heading text-xs font-bold w-4 text-center">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-neutral-400 hover:text-white transition"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      <span className="text-[11px] font-bold text-emerald-400">
                        {item.producto.precio ?? 'Consultar'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="border-t border-neutral-800 bg-neutral-950 p-5 sm:px-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Total de pares a cotizar:</span>
              <span className="font-heading text-sm font-extrabold text-white">
                {totalCount} {totalCount === 1 ? 'par' : 'pares'}
              </span>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#00e676] py-4 px-6 font-heading text-sm font-bold text-black uppercase tracking-wider transition-all duration-300 hover:bg-[#00c853] hover:scale-[1.02] shadow-lg shadow-emerald-500/20"
            >
              <WhatsAppIcon className="size-5 fill-black" />
              <span>Enviar Pedido a WhatsApp</span>
              <ArrowRight className="size-4" />
            </a>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={clearOrder}
                className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-300 transition"
              >
                Vaciar lista
              </button>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="text-[11px] font-bold text-neutral-400 hover:text-white transition"
              >
                Seguir agregando modelos →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
