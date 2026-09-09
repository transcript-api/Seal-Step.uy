'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  GripVertical,
  Star,
  Plus,
  Trash2,
  Check,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Sparkles,
  Save,
  RotateCcw,
} from 'lucide-react'
import type { Producto } from '@/lib/productos'

export function AdminPortadaReorder({ initialProducts }: { initialProducts: Producto[] }) {
  // Inicialmente, leer los que están marcados como destacados ordenados por su índice
  const defaultFeaturedSlugs = React.useMemo(() => {
    const destacados = initialProducts
      .filter((p) => p.destacado)
      .sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999))
      .map((p) => p.slug)

    // Si aún no se guardó ninguno como destacado, usar los primeros 8 por defecto
    return destacados.length > 0
      ? destacados
      : initialProducts.slice(0, 8).map((p) => p.slug)
  }, [initialProducts])
  
  const [featuredSlugs, setFeaturedSlugs] = useState<string[]>(defaultFeaturedSlugs)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Productos actualmente en la portada (en el orden exacto del array featuredSlugs)
  const homeProducts = featuredSlugs
    .map((slug) => initialProducts.find((p) => p.slug === slug))
    .filter((p): p is Producto => p !== undefined)

  // Productos que quedan en el catálogo general (no en portada)
  const catalogOnlyProducts = initialProducts.filter(
    (p) => !featuredSlugs.includes(p.slug)
  )

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index.toString())
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) return

    const updated = [...featuredSlugs]
    const [movedItem] = updated.splice(draggedIndex, 1)
    updated.splice(dropIndex, 0, movedItem)

    setFeaturedSlugs(updated)
    setDraggedIndex(null)
    setIsSaved(false)
  }

  // Mover con flechas arriba/abajo (accesibilidad y móvil)
  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= featuredSlugs.length) return

    const updated = [...featuredSlugs]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    setFeaturedSlugs(updated)
    setIsSaved(false)
  }

  // Quitar de portada (pasa solo al catálogo)
  const removeFromHome = (slug: string) => {
    setFeaturedSlugs((prev) => prev.filter((s) => s !== slug))
    setIsSaved(false)
  }

  // Agregar a portada
  const addToHome = (slug: string) => {
    if (!featuredSlugs.includes(slug)) {
      setFeaturedSlugs((prev) => [...prev, slug])
      setIsSaved(false)
    }
  }

  // Guardado real en Supabase vía API
  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)

    try {
      const res = await fetch('/api/admin/portada', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featuredSlugs }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error al guardar orden de portada')
      }

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 4000)
    } catch (err: unknown) {
      const error = err as Error
      setSaveError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold mb-2">
            <Link href="/admin" className="hover:text-white transition flex items-center gap-1">
              <ArrowLeft className="size-3.5" />
              <span>Panel Principal</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-400 uppercase tracking-wider">Portada & Orden</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Organizador de la Primera Página
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Pulsá y arrastrá los championes para decidir su posición en la tienda. Lo que saques de acá seguirá visible en el Catálogo completo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-black uppercase tracking-wider transition shadow-xl ${
              isSaved
                ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                : 'bg-white hover:bg-neutral-200 text-black'
            }`}
          >
            {isSaved ? <Check className="size-4" /> : <Save className="size-4" />}
            <span>{isSaving ? 'Guardando en Supabase...' : isSaved ? '¡Orden Guardado!' : 'Guardar en Portada'}</span>
          </button>
        </div>
      </div>

      {saveError && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-semibold">
          ⚠️ Error al guardar: {saveError}
        </div>
      )}

      {/* Grid Principal: Portada vs Catálogo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Columna Izquierda: Modelos en la Primera Página (Arrastrables) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center gap-2.5">
              <Star className="size-4 text-emerald-400 fill-emerald-400" />
              <h2 className="font-heading text-sm font-black uppercase tracking-wide text-white">
                En la Primera Página ({homeProducts.length} modelos)
              </h2>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Arrastrá para reordenar
            </span>
          </div>

          {homeProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-neutral-800 bg-neutral-950/50">
              <p className="text-sm font-bold text-neutral-400">
                No hay ningún modelo seleccionado para la portada.
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Elegí modelos de la columna derecha para agregarlos.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {homeProducts.map((p, index) => {
                const img = p.imagenes[0]?.src || '/images/hero-sneaker.png'
                const isDragging = draggedIndex === index

                return (
                  <div
                    key={p.slug}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all duration-200 cursor-grab active:cursor-grabbing ${
                      isDragging
                        ? 'opacity-40 border-dashed border-emerald-400 bg-emerald-500/5 scale-98'
                        : 'border-neutral-800 bg-[#0d0d0d] hover:border-neutral-700 hover:bg-neutral-900/60'
                    }`}
                  >
                    {/* Handle para arrastrar */}
                    <div className="text-neutral-500 hover:text-white transition cursor-grab">
                      <GripVertical className="size-5" />
                    </div>

                    {/* Número de posición */}
                    <div className="size-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-heading font-black text-xs text-emerald-400">
                      #{index + 1}
                    </div>

                    {/* Miniatura de foto */}
                    <div className="relative size-14 shrink-0 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                      <Image src={img} alt={p.nombre} fill className="object-contain p-1" sizes="56px" />
                    </div>

                    {/* Información */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-xs sm:text-sm font-bold uppercase truncate text-white">
                        {p.nombre}
                      </h4>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {p.categoria} · {p.precio ?? 'Consultar'}
                      </p>
                    </div>

                    {/* Flechas de subir/bajar */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveItem(index, 'up')}
                        disabled={index === 0}
                        className="size-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 flex items-center justify-center text-neutral-300"
                        title="Mover arriba"
                      >
                        <ArrowUp className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItem(index, 'down')}
                        disabled={index === homeProducts.length - 1}
                        className="size-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 flex items-center justify-center text-neutral-300"
                        title="Mover abajo"
                      >
                        <ArrowDown className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromHome(p.slug)}
                        className="size-7 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 flex items-center justify-center transition ml-1"
                        title="Quitar de la portada (pasa solo al catálogo)"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Columna Derecha: Modelos en Catálogo General (Listos para Agregar) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <h2 className="font-heading text-sm font-black uppercase tracking-wide text-neutral-300">
              Otros Modelos Disponibles ({catalogOnlyProducts.length})
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Están activos en el Catálogo. Hacé clic en (+) para sumarlos a la portada.
            </p>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {catalogOnlyProducts.map((p) => {
              const img = p.imagenes[0]?.src || '/images/hero-sneaker.png'

              return (
                <div
                  key={p.slug}
                  className="flex items-center justify-between p-3 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 hover:border-neutral-700 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative size-12 shrink-0 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                      <Image src={img} alt={p.nombre} fill className="object-contain p-1" sizes="48px" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading text-xs font-bold uppercase truncate text-white">
                        {p.nombre}
                      </h4>
                      <p className="text-[10px] text-neutral-400 truncate">
                        {p.categoria}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToHome(p.slug)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/30 text-xs font-bold transition shrink-0 ml-2"
                    title="Agregar a la primera página"
                  >
                    <Plus className="size-3.5" />
                    <span>Agregar</span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
