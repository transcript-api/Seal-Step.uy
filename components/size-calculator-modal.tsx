'use client'

import { useState } from 'react'
import { X, Ruler, Check, Sparkles, ArrowRight } from 'lucide-react'
import { useOrder } from '@/lib/order-context'

const SIZE_TABLE = [
  { cm: 22.5, uru: '35', usMen: '4', usWomen: '5.5' },
  { cm: 23.0, uru: '36', usMen: '4.5', usWomen: '6' },
  { cm: 23.5, uru: '37', usMen: '5', usWomen: '6.5' },
  { cm: 24.0, uru: '38', usMen: '5.5', usWomen: '7' },
  { cm: 24.5, uru: '39', usMen: '6.5', usWomen: '8' },
  { cm: 25.0, uru: '40', usMen: '7', usWomen: '8.5' },
  { cm: 26.0, uru: '41', usMen: '8', usWomen: '9.5' },
  { cm: 26.5, uru: '42', usMen: '8.5', usWomen: '10' },
  { cm: 27.5, uru: '43', usMen: '9.5', usWomen: '11' },
]

export function SizeCalculatorModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen, setSelectedFilterSize } = useOrder()
  const [selectedCm, setSelectedCm] = useState(25.0)

  if (!isSizeGuideOpen) return null

  // Find closest size
  const closest = SIZE_TABLE.reduce((prev, curr) =>
    Math.abs(curr.cm - selectedCm) < Math.abs(prev.cm - selectedCm) ? curr : prev,
  )

  const handleApplyFilter = () => {
    setSelectedFilterSize(closest.uru)
    setIsSizeGuideOpen(false)
    // Scroll to products
    const el = document.getElementById('productos')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/80 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => setIsSizeGuideOpen(false)}
        aria-label="Cerrar guía de talles"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-neutral-800 bg-[#0c0c0c] p-6 sm:p-8 text-white shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
        >
          <X className="size-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 text-emerald-400">
            <Ruler className="size-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight">
              Calculadora Interactiva de Talles
            </h2>
            <p className="text-xs text-neutral-400">
              Descubrí tu talle exacto en Uruguay / EUR según los centímetros de tu pie.
            </p>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <label htmlFor="cm-slider" className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Largo de tu pie / plantilla:
            </label>
            <span className="font-heading text-2xl font-extrabold text-emerald-400">
              {selectedCm.toFixed(1)} cm
            </span>
          </div>

          <input
            id="cm-slider"
            type="range"
            min="22.5"
            max="27.5"
            step="0.5"
            value={selectedCm}
            onChange={(e) => setSelectedCm(parseFloat(e.target.value))}
            className="mt-4 w-full h-2 rounded-lg bg-neutral-800 accent-emerald-500 cursor-pointer"
          />

          <div className="mt-2 flex justify-between text-[10px] font-semibold text-neutral-500">
            <span>22.5 cm (Talle 35)</span>
            <span>25.0 cm (Talle 40)</span>
            <span>27.5 cm (Talle 43)</span>
          </div>
        </div>

        {/* Dynamic Size Result Box */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Talle URU / EUR sugerido
            </p>
            <p className="mt-1 font-heading text-3xl font-black text-white">{closest.uru}</p>
            <p className="text-[10px] text-emerald-300/80 mt-0.5">Estándar Uruguay</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Equivalencia US Men
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-white">{closest.usMen} US</p>
            <p className="text-[10px] text-neutral-500 mt-0.5">Hombres</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Equivalencia US Women
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-white">{closest.usWomen} US</p>
            <p className="text-[10px] text-neutral-500 mt-0.5">Mujeres</p>
          </div>
        </div>

        {/* Brand Specific Fit Recommendations */}
        <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950 p-5 space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
            <Sparkles className="size-4 text-emerald-400" />
            <span>Guía de Calce por Silueta:</span>
          </div>

          <div className="grid gap-2 text-neutral-300">
            <div className="flex items-start gap-2">
              <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Nike Dunk Low:</strong> Calce exacto (True to Size). Te recomendamos pedir tu talle <strong>{closest.uru}</strong>.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Adidas Campus / Samba:</strong> Horma cómoda y acolchada. Si estás entre dos talles, el talle <strong>{closest.uru}</strong> te irá perfecto.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>New Balance 9060 / 1000:</strong> Máxima amortiguación. El talle <strong>{closest.uru}</strong> brinda soporte ideal con medias deportivas.
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleApplyFilter}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 px-6 font-heading text-sm font-bold text-black uppercase tracking-wider hover:bg-neutral-200 transition"
          >
            <span>Ver todos los modelos en Talle {closest.uru}</span>
            <ArrowRight className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(false)}
            className="w-full sm:w-auto rounded-2xl border border-neutral-800 bg-neutral-900 py-3.5 px-6 text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
