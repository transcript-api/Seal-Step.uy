'use client'

import { useMemo, useState, TouchEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CreditCard, Truck, ShieldCheck } from 'lucide-react'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { whatsappLink, WA_LINKS } from '@/lib/site'
import type { Producto } from '@/lib/productos'
import { useOrder } from '@/lib/order-context'

type ProductoDetalleProps = {
  producto: Producto
}

export function ProductoDetalle({ producto }: ProductoDetalleProps) {
  const { addItem, setIsSizeGuideOpen } = useOrder()
  const [addedBag, setAddedBag] = useState(false)
  const [selectedTalle, setSelectedTalle] = useState(producto.talles[0] ?? '')
  const [selectedColor, setSelectedColor] = useState(
    producto.colores?.[0] ?? producto.subtitulo ?? '',
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentImage = producto.imagenes[currentIndex] ?? producto.imagenes[0]

  const whatsappHref = useMemo(() => {
    const colorPart = selectedColor ? ` en color ${selectedColor}` : ''
    const tallePart = selectedTalle ? ` y talle ${selectedTalle}` : ''
    return whatsappLink(
      `Hola Seal Step! Me interesa el modelo ${producto.nombre}${colorPart}${tallePart}. ¿Está disponible?`,
    )
  }, [producto.nombre, selectedColor, selectedTalle])

  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX)
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return
    const touchEndX = event.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    if (diff > 40) {
      setCurrentIndex((current) =>
        current === producto.imagenes.length - 1 ? 0 : current + 1,
      )
    } else if (diff < -40) {
      setCurrentIndex((current) =>
        current === 0 ? producto.imagenes.length - 1 : current - 1,
      )
    }
    setTouchStartX(null)
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-white bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:36px_36px] pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6">
        {/* Header Superior: SEAL STEP y VOLVER AL CATÁLOGO */}
        <header className="flex items-center justify-between py-6 mb-4">
          <Link
            href="/"
            className="font-black text-xl sm:text-2xl tracking-[0.25em] text-white hover:opacity-90 uppercase"
          >
            SEAL STEP
          </Link>
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400 transition hover:text-white"
          >
            ← VOLVER AL CATÁLOGO
          </Link>
        </header>

        {/* Layout Principal de 2 Columnas */}
        <div className="grid gap-10 lg:grid-cols-2 items-start mt-2">
          {/* Columna Izquierda: Galería Principal y Miniaturas Reales */}
          <div className="space-y-4">
            {/* Foto Principal Full Size */}
            <div
              className="relative aspect-square w-full overflow-hidden rounded-3xl sm:rounded-[2rem] border border-neutral-800/90 bg-neutral-950 group shadow-2xl"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {currentImage ? (
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              ) : null}

              {/* Top Status Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
                <span className="rounded-full bg-black/80 border border-neutral-700/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-200 backdrop-blur">
                  {producto.categoria}
                </span>
                {producto.badge && (
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-[10px] font-bold uppercase text-emerald-400 backdrop-blur">
                    {producto.badge}
                  </span>
                )}
              </div>

              {/* Controles si hay más de 1 imagen */}
              {producto.imagenes.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((current) =>
                        current === 0 ? producto.imagenes.length - 1 : current - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 border border-white/20 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-black hover:scale-110 z-10"
                    aria-label="Imagen anterior"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((current) =>
                        current === producto.imagenes.length - 1 ? 0 : current + 1,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 border border-white/20 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-black hover:scale-110 z-10"
                    aria-label="Siguiente imagen"
                  >
                    ›
                  </button>

                  {/* Indicador de Puntos (Dots) */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur px-3 py-1.5 z-10">
                    {producto.imagenes.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`block h-1.5 rounded-full transition-all ${
                          idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                        }`}
                        aria-label={`Ver foto ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Fila de Miniaturas adaptativa (Sólo muestra fotos reales disponibles) */}
            {producto.imagenes.length > 1 && (
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(producto.imagenes.length, 6)}, minmax(0, 1fr))`,
                }}
              >
                {producto.imagenes.map((img, idx) => {
                  const isActive = idx === currentIndex
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative aspect-square overflow-hidden rounded-2xl border transition-all duration-200 ${
                        isActive
                          ? 'border-2 border-white ring-2 ring-white/30 scale-105 opacity-100'
                          : 'border-neutral-800/80 opacity-50 hover:opacity-100 hover:border-neutral-600'
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Columna Derecha: Información del Producto */}
          <div className="space-y-5 lg:pl-6">
            {/* Título Principal */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                {producto.nombre}
              </h1>
              {selectedColor || producto.subtitulo ? (
                <p className="text-sm sm:text-base font-semibold text-neutral-400 uppercase tracking-wide mt-1">
                  {selectedColor || producto.subtitulo}
                </p>
              ) : null}
            </div>

            {/* Precio y Estado de Stock */}
            <div className="space-y-1">
              <p className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                {producto.precio ?? 'Consultar precio'}
              </p>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                ✓ POR ENCARGUE (24 A 72 HS)
              </p>
            </div>

            {/* Selector de Talle ("Tamano") */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm font-semibold text-neutral-300">Tamano (URU / EUR)</p>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-semibold text-neutral-400 hover:text-white underline underline-offset-2 transition"
                >
                  ¿Dudas con tu talle? Calculalo
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {producto.talles.map((talle) => {
                  const isSelected = selectedTalle === talle
                  return (
                    <button
                      key={talle}
                      type="button"
                      onClick={() => setSelectedTalle(talle)}
                      className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition duration-200 ${
                        isSelected
                          ? 'bg-white text-black shadow-md ring-2 ring-white/40 scale-105'
                          : 'bg-neutral-900/90 text-white border border-neutral-800 hover:border-neutral-500'
                      }`}
                    >
                      {talle}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Selector de Color ("Color") */}
            {producto.colores && producto.colores.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-neutral-300">Color</p>
                <div className="flex flex-wrap gap-2">
                  {producto.colores.map((color) => {
                    const isSelected = selectedColor === color
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition duration-200 ${
                          isSelected
                            ? 'bg-white text-black shadow-md ring-2 ring-white/40 scale-105'
                            : 'bg-neutral-900/90 text-white border border-neutral-800 hover:border-neutral-500'
                        }`}
                      >
                        {color}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Descripción */}
            <p className="text-sm leading-relaxed text-neutral-400 pt-1">
              {producto.descripcion}
            </p>

            {/* Lista de Ventajas / Iconos */}
            <div className="space-y-3 pt-1 text-sm font-medium text-neutral-200">
              <div className="flex items-center gap-3">
                <CreditCard className="size-4 text-neutral-400 shrink-0" />
                <span>Tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="size-4 text-neutral-400 shrink-0" />
                <span>Envíos a todo el país (24 a 72 hs)</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-4 text-neutral-400 shrink-0" />
                <span>Compra 100% segura</span>
              </div>
            </div>

            {/* Botones Interactivos de Acción */}
            <div className="pt-4 space-y-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full bg-white px-8 py-4 text-center font-bold text-black uppercase tracking-wider text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-200 hover:bg-neutral-200 shadow-xl group"
              >
                <span>CONSULTAR POR WHATSAPP</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white group-hover:scale-105 transition-transform">
                  <WhatsAppIcon className="size-4 fill-white" />
                </span>
              </a>

              <button
                type="button"
                onClick={() => {
                  addItem(producto, selectedTalle || producto.talles[0] || '', selectedColor)
                  setAddedBag(true)
                  setTimeout(() => setAddedBag(false), 2000)
                }}
                className="w-full rounded-full border border-neutral-700 bg-neutral-900/90 px-8 py-3.5 text-center font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-neutral-800 hover:border-neutral-500"
              >
                {addedBag ? '✓ ¡AGREGADO A TU LISTA DE CONSULTA!' : '+ AGREGAR A MI LISTA DE PEDIDO'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Widget flotante inferior derecho: Escribinos */}
      <a
        href={WA_LINKS.general}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp a Seal Step"
        className="fixed right-6 bottom-6 z-50 flex items-center gap-2.5 rounded-full border border-neutral-800 bg-neutral-950/90 px-4 py-2.5 text-white shadow-2xl backdrop-blur transition-transform duration-300 hover:scale-105"
      >
        <span className="font-heading text-xs font-bold tracking-wide text-white">
          Escribinos
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00e676] text-black">
          <WhatsAppIcon className="size-4 fill-black" />
        </span>
      </a>
    </div>
  )
}
