'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Sparkles, ArrowRight, RotateCcw, Check } from 'lucide-react'
import { PRODUCTOS, type Producto } from '@/lib/productos'
import { useOrder } from '@/lib/order-context'

export function SneakerQuizModal() {
  const { isQuizOpen, setIsQuizOpen, setQuickViewProduct } = useOrder()

  const [step, setStep] = useState(1)
  const [occasion, setOccasion] = useState<string>('')
  const [colorVibe, setColorVibe] = useState<string>('')
  const [silhouette, setSilhouette] = useState<string>('')

  if (!isQuizOpen) return null

  const handleReset = () => {
    setStep(1)
    setOccasion('')
    setColorVibe('')
    setSilhouette('')
  }

  // Calculate recommended products
  const getRecommendations = (): Producto[] => {
    let list = [...PRODUCTOS]

    if (colorVibe === 'black') {
      const blackMatches = list.filter(
        (p) =>
          p.nombre.toLowerCase().includes('black') ||
          p.subtitulo?.toLowerCase().includes('black') ||
          p.subtitulo?.toLowerCase().includes('negro'),
      )
      if (blackMatches.length > 0) list = blackMatches
    } else if (colorVibe === 'white') {
      const whiteMatches = list.filter(
        (p) =>
          p.nombre.toLowerCase().includes('blanco') ||
          p.subtitulo?.toLowerCase().includes('blanco') ||
          p.subtitulo?.toLowerCase().includes('off'),
      )
      if (whiteMatches.length > 0) list = whiteMatches
    } else if (colorVibe === 'color') {
      const colorMatches = list.filter(
        (p) =>
          p.nombre.toLowerCase().includes('azul') ||
          p.nombre.toLowerCase().includes('verde') ||
          p.nombre.toLowerCase().includes('cacao') ||
          p.subtitulo?.toLowerCase().includes('azul') ||
          p.subtitulo?.toLowerCase().includes('verde'),
      )
      if (colorMatches.length > 0) list = colorMatches
    }

    if (silhouette === 'chunky') {
      const chunkyMatches = list.filter((p) => p.slug.includes('9060') || p.slug.includes('1000'))
      if (chunkyMatches.length > 0) list = chunkyMatches
    } else if (silhouette === 'low') {
      const lowMatches = list.filter(
        (p) => p.slug.includes('dunk') || p.slug.includes('samba') || p.slug.includes('campus'),
      )
      if (lowMatches.length > 0) list = lowMatches
    }

    return list.slice(0, 3)
  }

  const recommendations = getRecommendations()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/80 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => setIsQuizOpen(false)}
        aria-label="Cerrar test de estilo"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-neutral-800 bg-[#0c0c0c] p-6 sm:p-8 text-white shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsQuizOpen(false)}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
        >
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 text-emerald-400">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight">
              Recomendador de Estilo Inteligente
            </h2>
            <p className="text-xs text-neutral-400">
              Respondé 3 preguntas rápidas para encontrar tu modelo ideal.
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        {step <= 3 && (
          <div className="mt-6 flex items-center gap-2">
            <div
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step >= 1 ? 'bg-emerald-400' : 'bg-neutral-800'
              }`}
            />
            <div
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step >= 2 ? 'bg-emerald-400' : 'bg-neutral-800'
              }`}
            />
            <div
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step >= 3 ? 'bg-emerald-400' : 'bg-neutral-800'
              }`}
            />
          </div>
        )}

        {/* Step 1: Occasion */}
        {step === 1 && (
          <div className="mt-8 space-y-4 animate-in fade-in duration-200">
            <h3 className="font-heading text-base font-bold uppercase tracking-wider text-neutral-200">
              1. ¿Para qué ocasión principal los vas a usar?
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { id: 'streetwear', title: 'Streetwear & Salidas', desc: 'Para combinar con tus mejores outfits' },
                { id: 'casual', title: 'Uso Diario & Facultad/Trabajo', desc: 'Cómodos y versátiles para todo el día' },
                { id: 'deportivo', title: 'Confort Total & Estilo', desc: 'Amortiguación suave y suela alta' },
                { id: 'verano', title: 'Verano & Relax / Chanclas', desc: 'Calzado fresco y descansado' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setOccasion(opt.id)
                    setStep(2)
                  }}
                  className="flex flex-col text-left p-4 rounded-2xl border border-neutral-800 bg-neutral-950 hover:border-emerald-500/50 hover:bg-neutral-900 transition-all group"
                >
                  <span className="font-heading text-sm font-bold text-white group-hover:text-emerald-400 transition">
                    {opt.title}
                  </span>
                  <span className="text-xs text-neutral-400 mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Color Vibe */}
        {step === 2 && (
          <div className="mt-8 space-y-4 animate-in fade-in duration-200">
            <h3 className="font-heading text-base font-bold uppercase tracking-wider text-neutral-200">
              2. ¿Qué paleta de colores preferís?
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { id: 'black', title: 'All Black / Oscuros', desc: 'Elegantes, limpios y no se ensucian fácil' },
                { id: 'white', title: 'Blancos & Off-White', desc: 'El clásico atemporal que combina con todo' },
                { id: 'color', title: 'Con Color / Toque Especial', desc: 'Azul, Verde Gold, Cacao Wow, etc.' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setColorVibe(opt.id)
                    setStep(3)
                  }}
                  className="flex flex-col text-left p-4 rounded-2xl border border-neutral-800 bg-neutral-950 hover:border-emerald-500/50 hover:bg-neutral-900 transition-all group"
                >
                  <span className="font-heading text-sm font-bold text-white group-hover:text-emerald-400 transition">
                    {opt.title}
                  </span>
                  <span className="text-xs text-neutral-400 mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-neutral-500 hover:text-white pt-2"
            >
              ← Volver al paso anterior
            </button>
          </div>
        )}

        {/* Step 3: Silhouette */}
        {step === 3 && (
          <div className="mt-8 space-y-4 animate-in fade-in duration-200">
            <h3 className="font-heading text-base font-bold uppercase tracking-wider text-neutral-200">
              3. ¿Qué tipo de silueta te gusta más?
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { id: 'low', title: 'Silueta Low Profile', desc: 'Estilo Dunk Low, Samba, Campus' },
                { id: 'chunky', title: 'Silueta Chunky / Retro', desc: 'Estilo New Balance 9060 / 1000' },
                { id: 'any', title: '¡Sorprendeme con lo mejor!', desc: 'Los modelos más pedidos del momento' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSilhouette(opt.id)
                    setStep(4)
                  }}
                  className="flex flex-col text-left p-4 rounded-2xl border border-neutral-800 bg-neutral-950 hover:border-emerald-500/50 hover:bg-neutral-900 transition-all group"
                >
                  <span className="font-heading text-sm font-bold text-white group-hover:text-emerald-400 transition">
                    {opt.title}
                  </span>
                  <span className="text-xs text-neutral-400 mt-1">{opt.desc}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-neutral-500 hover:text-white pt-2"
            >
              ← Volver al paso anterior
            </button>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="mt-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Sparkles className="size-3.5" />
                Tus modelos recomendados
              </span>
              <h3 className="mt-3 font-heading text-xl sm:text-2xl font-extrabold uppercase">
                ¡Encontramos tus matches perfectos!
              </h3>
              <p className="mt-1 text-xs text-neutral-400">
                Basado en tu estilo y preferencias, estos son los mejores modelos para vos:
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid gap-3 sm:grid-cols-3">
              {recommendations.map((prod) => (
                <div
                  key={prod.slug}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-950 p-3.5 text-left transition hover:border-neutral-700"
                >
                  <div>
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900 mb-3">
                      <Image
                        src={prod.imagenes[0]?.src || '/images/hero-sneaker.png'}
                        alt={prod.nombre}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-heading text-xs font-bold uppercase tracking-tight text-white line-clamp-2">
                      {prod.nombre}
                    </h4>
                    {prod.subtitulo && (
                      <p className="text-[10px] text-neutral-400 mt-0.5 truncate">{prod.subtitulo}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsQuizOpen(false)
                      setQuickViewProduct(prod)
                    }}
                    className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-white py-2 px-3 text-[11px] font-bold text-black uppercase tracking-wider hover:bg-neutral-200 transition"
                  >
                    Ver detalles <ArrowRight className="size-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition"
              >
                <RotateCcw className="size-3.5" />
                Hacer el test de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
