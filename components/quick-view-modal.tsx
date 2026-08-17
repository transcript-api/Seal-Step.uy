'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Check, ArrowRight, Sparkles, ShieldCheck, Truck, Plus, Eye } from 'lucide-react'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { whatsappLink } from '@/lib/site'
import { useOrder } from '@/lib/order-context'

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addItem, setIsSizeGuideOpen } = useOrder()
  const [selectedTalle, setSelectedTalle] = useState<string>('')
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedTalle(quickViewProduct.talles[0] || '')
      setSelectedImageIdx(0)
      setJustAdded(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [quickViewProduct])

  if (!quickViewProduct) return null

  const currentImage =
    quickViewProduct.imagenes[selectedImageIdx] || quickViewProduct.imagenes[0]

  const whatsappHref = whatsappLink(
    `Hola Seal Step! Estuve viendo en la web el modelo ${quickViewProduct.nombre}${
      selectedTalle ? ` en talle ${selectedTalle}` : ''
    }. ¿Tienen disponibilidad para envío?`,
  )

  const handleAdd = () => {
    addItem(quickViewProduct, selectedTalle || quickViewProduct.talles[0] || 'A coordinar')
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/80 animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div
        className="absolute inset-0"
        onClick={() => setQuickViewProduct(null)}
        aria-label="Cerrar modal"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-neutral-800 bg-[#0c0c0c] p-5 sm:p-8 text-white shadow-2xl shadow-black/80 scrollbar-thin">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Left: Interactive Image Preview & Thumbnails */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
              {currentImage && (
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt || quickViewProduct.nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-all duration-300"
                  priority
                />
              )}
              <span className="absolute top-3 left-3 rounded-full bg-black/80 border border-neutral-700 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-neutral-200 backdrop-blur">
                {quickViewProduct.categoria}
              </span>
              {quickViewProduct.badge && (
                <span className="absolute top-3 right-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur">
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {quickViewProduct.imagenes.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {quickViewProduct.imagenes.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative size-16 shrink-0 overflow-hidden rounded-xl border transition-all ${
                      selectedImageIdx === idx
                        ? 'border-white ring-2 ring-white/30 scale-105 opacity-100'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info, Size Selector, Action Buttons */}
          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Vista Rápida Interactiva
              </p>
              <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                {quickViewProduct.nombre}
              </h2>
              {quickViewProduct.subtitulo && (
                <p className="mt-1 text-sm font-semibold text-neutral-400">
                  {quickViewProduct.subtitulo}
                </p>
              )}
            </div>

            {/* Stock / Availability Status */}
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="size-3.5" /> Disponible por encargue (24 a 72 hs)
              </span>
            </div>

            {/* Size Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Seleccioná tu talle (URU / EUR):
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setQuickViewProduct(null)
                    setIsSizeGuideOpen(true)
                  }}
                  className="text-xs font-semibold text-neutral-400 hover:text-white underline underline-offset-2 transition"
                >
                  ¿Dudas con tu talle?
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickViewProduct.talles.map((talle) => {
                  const isSelected = selectedTalle === talle
                  return (
                    <button
                      key={talle}
                      type="button"
                      onClick={() => setSelectedTalle(talle)}
                      className={`h-10 min-w-10 px-2 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-white text-black shadow-lg ring-2 ring-white/40 scale-105'
                          : 'bg-neutral-900 text-white border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800'
                      }`}
                    >
                      {talle}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Brief description */}
            <p className="text-xs leading-relaxed text-neutral-400 line-clamp-3">
              {quickViewProduct.descripcion}
            </p>

            {/* Value badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800 text-[11px] text-neutral-300">
              <div className="flex items-center gap-2">
                <Truck className="size-3.5 text-neutral-400" />
                <span>Envíos a todo Uruguay</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-neutral-400" />
                <span>Fotos 100% reales</span>
              </div>
            </div>

            {/* Actions: Add to Order Bag & Direct WhatsApp */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 px-6 font-heading text-sm font-bold text-black uppercase tracking-wider transition-all hover:bg-neutral-200 active:scale-[0.99] shadow-lg shadow-white/10"
              >
                {justAdded ? (
                  <>
                    <Check className="size-4 text-emerald-600" />
                    ¡Agregado a tu lista de consulta!
                  </>
                ) : (
                  <>
                    <Plus className="size-4" />
                    Agregar a mi lista de consulta (Talle {selectedTalle || quickViewProduct.talles[0]})
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-900 py-3 px-4 font-heading text-xs font-bold text-white uppercase tracking-wider transition hover:bg-neutral-800 hover:border-neutral-500"
                >
                  <WhatsAppIcon className="size-4" />
                  Consultar directo
                </a>

                <Link
                  href={`/producto/${quickViewProduct.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="flex items-center justify-center gap-1.5 rounded-2xl border border-neutral-800 bg-neutral-950 py-3 px-4 text-xs font-bold text-neutral-400 hover:text-white hover:border-neutral-700 transition"
                >
                  Página completa <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
