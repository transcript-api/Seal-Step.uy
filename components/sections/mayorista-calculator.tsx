'use client'

import { useState } from 'react'
import { TrendingUp, Sparkles } from 'lucide-react'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { AshText } from '@/components/ash-text'

const LOTES = [
  {
    cantidad: 8,
    nombre: 'Pack Inicio (8 pares)',
    precioMayoristaPar: 1250,
    precioVentaEstimado: 2500,
    popular: false,
    descripcion: 'Ideal para probar el mercado en tu ciudad con baja inversión.',
  },
  {
    cantidad: 15,
    nombre: 'Pack Emprendedor (15 pares)',
    precioMayoristaPar: 1150,
    precioVentaEstimado: 2500,
    popular: true,
    descripcion: 'El más elegido para arrancar con variedad de modelos y excelente margen.',
  },
  {
    cantidad: 30,
    nombre: 'Pack Pro (30 pares)',
    precioMayoristaPar: 1050,
    precioVentaEstimado: 2500,
    popular: false,
    descripcion: 'Para revendedores activos con clientes en redes sociales y tienda física.',
  },
  {
    cantidad: 50,
    nombre: 'Pack Distribuidor (50+ pares)',
    precioMayoristaPar: 950,
    precioVentaEstimado: 2500,
    popular: false,
    descripcion: 'Máxima rentabilidad y precio directo de frontera sin intermediarios.',
  },
]

export function MayoristaCalculator() {
  const [selectedIdx, setSelectedIdx] = useState(1) // Pack Emprendedor (15 pares) por defecto
  const lote = LOTES[selectedIdx]

  const inversionTotal = lote.cantidad * lote.precioMayoristaPar
  const ventaTotal = lote.cantidad * lote.precioVentaEstimado
  const gananciaNeta = ventaTotal - inversionTotal
  const roi = Math.round((gananciaNeta / inversionTotal) * 100)

  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-card/90 p-6 backdrop-blur-md sm:p-8 lg:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <TrendingUp className="size-3.5" />
            Simulador de Rentabilidad
          </span>
          <h3 className="mt-3 font-heading text-2xl font-extrabold sm:text-3xl">
            <AshText as="span">Calculá cuánto podés ganar en tu ciudad</AshText>
          </h3>
        </div>
        <div className="rounded-2xl border border-border bg-background/80 px-4 py-2.5 text-center">
          <p className="text-xs text-muted-foreground">Retorno de inversión</p>
          <p className="font-heading text-xl font-extrabold text-emerald-400">+{roi}% ROI</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Seleccioná la cantidad de pares que querés revender para ver el margen de ganancia limpia estimado:
      </p>

      {/* Botones de selección de lote */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {LOTES.map((item, index) => (
          <button
            key={item.cantidad}
            type="button"
            onClick={() => setSelectedIdx(index)}
            className={`relative flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all duration-300 ${
              selectedIdx === index
                ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                : 'border-border bg-background/50 hover:border-border/80 hover:bg-secondary/40'
            }`}
          >
            {item.popular && (
              <span className="absolute -top-2.5 rounded-full bg-emerald-500 px-2.5 py-0.5 font-heading text-[10px] font-bold text-black uppercase">
                Más popular
              </span>
            )}
            <span className="font-heading text-2xl font-black">{item.cantidad}</span>
            <span className="text-xs font-medium text-muted-foreground">pares</span>
          </button>
        ))}
      </div>

      {/* Resultados de la simulación */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-background/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Inversión estimada
          </p>
          <p className="mt-2 font-heading text-2xl font-extrabold sm:text-3xl">
            ${inversionTotal.toLocaleString('es-UY')}{' '}
            <span className="text-xs font-normal text-muted-foreground">UYU</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            (${lote.precioMayoristaPar.toLocaleString('es-UY')} UYU / par)
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Ingreso por Venta
          </p>
          <p className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            ${ventaTotal.toLocaleString('es-UY')}{' '}
            <span className="text-xs font-normal text-muted-foreground">UYU</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            (Precio público ~$2.500 UYU)
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-5 shadow-inner">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Ganancia Limpia en tu bolsillo
          </p>
          <p className="mt-2 font-heading text-3xl font-black text-emerald-400 sm:text-4xl">
            +${gananciaNeta.toLocaleString('es-UY')}{' '}
            <span className="text-xs font-semibold text-emerald-300">UYU</span>
          </p>
          <p className="mt-1 text-xs font-medium text-emerald-300/80">
            ¡Ganás más del 100% de lo invertido!
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-background/40 p-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <Sparkles className="size-5 shrink-0 text-emerald-400" />
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {lote.descripcion} Podes elegir modelos y talles variados (38 al 43).
          </p>
        </div>
        <a
          href={WA_LINKS.mayorista}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-heading text-sm font-bold text-black transition-transform duration-300 hover:scale-105 shadow-md shadow-emerald-500/20"
        >
          <WhatsAppIcon className="size-4" />
          Consultar por {lote.nombre}
        </a>
      </div>
    </div>
  )
}
