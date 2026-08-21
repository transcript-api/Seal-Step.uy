'use client'

import { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Eye,
  Plus,
  Sparkles,
  Ruler,
  Check,
} from 'lucide-react'
import { PRODUCTOS, MARCAS, getProductosPreviewHome, type Producto } from '@/lib/productos'
import { Reveal } from '@/components/reveal'
import { useOrder } from '@/lib/order-context'
import { AshText } from '@/components/ash-text'

const ALL_SIZES = ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43']

// Top featured drops for the editorial showcase
const FEATURED_DROPS = [
  {
    slug: 'nike-dunk-low-panda',
    videoSrc: '/Videos%20sin%20sonido/sealstep_DXZf-EiDVE4.mp4',
    customImage: '/videos%20drop/videoframe_6893.png',
  },
  {
    slug: 'new-balance-1000',
    videoSrc: '/videos%20drop/New_Balance_sneaker_commercial_v%E2%80%A6_202608170609%20(4).mp4',
    customImage: '/images/new-balance-1000/01.jpg',
  },
  {
    slug: 'adidas-campus-00s',
  },
  {
    slug: 'vans-knu-skool-clasicas',
  },
]

export function Productos() {
  const [selectedBrand, setSelectedBrand] = useState<string>('todos')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [dropIndex, setDropIndex] = useState(0)
  const dropScrollRef = useRef<HTMLDivElement>(null)

  const {
    setQuickViewProduct,
    addItem,
    setIsSizeGuideOpen,
    setIsQuizOpen,
    selectedFilterSize,
    setSelectedFilterSize,
  } = useOrder()

  const [addedItemSlug, setAddedItemSlug] = useState<string | null>(null)

  const handleQuickAdd = (e: React.MouseEvent, producto: Producto) => {
    e.preventDefault()
    e.stopPropagation()
    const talle = selectedFilterSize || producto.talles[0] || 'A coordinar'
    addItem(producto, talle)
    setAddedItemSlug(producto.slug)
    setTimeout(() => setAddedItemSlug(null), 1500)
  }

  const handleOpenQuickView = (e: React.MouseEvent, producto: Producto) => {
    e.preventDefault()
    e.stopPropagation()
    setQuickViewProduct(producto)
  }

  const sneakerCatalog = useMemo(() => {
    return PRODUCTOS.filter(
      (p) =>
        !p.categoria.toLowerCase().includes('slide') &&
        !p.nombre.toLowerCase().includes('slide') &&
        !p.categoria.toLowerCase().includes('chancla') &&
        !p.nombre.toLowerCase().includes('chancla'),
    )
  }, [])

  const dropProducts = useMemo(() => {
    return FEATURED_DROPS.map((item) => {
      const prod = sneakerCatalog.find((p) => p.slug === item.slug)
      if (!prod) return null
      return {
        ...prod,
        customImage: item.customImage,
        videoSrc: item.videoSrc,
      }
    }).filter(Boolean) as (Producto & { customImage?: string; videoSrc?: string })[]
  }, [sneakerCatalog])

  const filteredProducts = useMemo(() => {
    return sneakerCatalog.filter((producto) => {
      // Brand filter
      let matchesBrand = true
      if (selectedBrand === 'nike') {
        matchesBrand =
          producto.nombre.toLowerCase().startsWith('nike') ||
          producto.nombre.toLowerCase().startsWith('air force')
      } else if (selectedBrand === 'adidas') {
        matchesBrand = producto.nombre.toLowerCase().startsWith('adidas')
      } else if (selectedBrand === 'new-balance') {
        matchesBrand = producto.nombre.toLowerCase().startsWith('new balance')
      } else if (selectedBrand === 'puma') {
        matchesBrand = producto.nombre.toLowerCase().startsWith('puma')
      } else if (selectedBrand === 'vans') {
        matchesBrand = producto.nombre.toLowerCase().startsWith('vans')
      }

      if (!matchesBrand) return false

      // Size filter
      if (selectedFilterSize && !producto.talles.includes(selectedFilterSize)) {
        return false
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim()
        const matchName = producto.nombre.toLowerCase().includes(query)
        const matchSubtitle =
          producto.subtitulo?.toLowerCase().includes(query) || false
        const matchCategory = producto.categoria.toLowerCase().includes(query)
        const matchDescription = producto.descripcion.toLowerCase().includes(query)
        const matchColor =
          producto.colores?.some((c) => c.toLowerCase().includes(query)) || false

        if (
          !matchName &&
          !matchSubtitle &&
          !matchCategory &&
          !matchDescription &&
          !matchColor
        ) {
          return false
        }
      }

      return true
    })
  }, [sneakerCatalog, selectedBrand, selectedFilterSize, searchQuery])

  // Preview balanceado con 2 modelos de cada marca para la página principal
  const visibleProducts = useMemo(() => {
    if (searchQuery.trim() !== '' || selectedBrand !== 'todos' || selectedFilterSize) {
      return filteredProducts
    }
    return getProductosPreviewHome(2)
  }, [filteredProducts, searchQuery, selectedBrand, selectedFilterSize])

  const scrollDrop = (direction: 'left' | 'right') => {
    if (dropScrollRef.current) {
      const scrollAmount = dropScrollRef.current.clientWidth * 0.75
      dropScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
    if (direction === 'left') {
      setDropIndex((prev) => Math.max(0, prev - 1))
    } else {
      setDropIndex((prev) => Math.min(dropProducts.length - 1, prev + 1))
    }
  }

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo-completo')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="productos"
      className="border-b border-border py-16 lg:py-24 overflow-hidden"
      aria-labelledby="productos-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. SECCIÓN EDITORIAL: "THE DROP" (3 FOTOS GRANDES LADO A LADO) */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Columna Izquierda: Título y Controles */}
            <Reveal className="lg:col-span-4 flex flex-col justify-between h-full">
              <div>
                <span className="font-heading text-xs font-bold tracking-[0.25em] text-emerald-400 uppercase">
                  NUEVOS INGRESOS
                </span>
                <h2
                  className="mt-3 font-heading text-5xl sm:text-6xl font-black tracking-tight text-white uppercase"
                >
                  THE DROP
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-400 max-w-sm">
                  Los modelos más recientes, los colores más buscados, en el momento justo.
                </p>

                <div className="mt-8">
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/90 px-6 py-3.5 font-heading text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:scale-[1.03]"
                  >
                    <span>VER CATÁLOGO COMPLETO</span>
                    <ChevronRight className="size-4" />
                  </Link>
                </div>
              </div>

              {/* Controles de Navegación del Drop (Flechas & Dots) */}
              <div className="mt-8 lg:mt-12 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollDrop('left')}
                    aria-label="Anterior drop"
                    className="flex size-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-600 transition"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollDrop('right')}
                    aria-label="Siguiente drop"
                    className="flex size-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-600 transition"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>

                {/* Dots indicadores */}
                <div className="flex items-center gap-1.5">
                  {dropProducts.map((_, idx) => (
                    <span
                      key={idx}
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        idx === dropIndex ? 'w-5 bg-emerald-400' : 'w-1.5 bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Columna Derecha: 3 Cards Grandes Lado a Lado (Scrollable horizontal en mobile y desktop) */}
            <div className="lg:col-span-8">
              <div
                ref={dropScrollRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 scrollbar-none"
              >
                {dropProducts.map((drop, idx) => {
                  const isJustAdded = addedItemSlug === drop.slug
                  return (
                    <div
                      key={drop.slug}
                      className="min-w-[280px] sm:min-w-[320px] lg:min-w-[300px] flex-1 snap-start group relative flex flex-col rounded-3xl border border-neutral-800/90 bg-[#0c0c0c] overflow-hidden transition-all duration-500 hover:border-neutral-600 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black"
                    >
                      {/* Imagen o Video Grande */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                        <Link href={`/producto/${drop.slug}`} className="block w-full h-full">
                          {drop.videoSrc ? (
                            <video
                              src={drop.videoSrc}
                              poster={drop.customImage ?? drop.imagenes[0]?.src}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                            />
                          ) : (
                            <Image
                              src={drop.customImage ?? drop.imagenes[0]?.src ?? '/images/hero-sneaker.png'}
                              alt={drop.imagenes[0]?.alt ?? drop.nombre}
                              fill
                              priority={idx < 2}
                              sizes="(max-width: 640px) 80vw, 350px"
                              className="object-cover transition-transform duration-700 group-hover:scale-108"
                            />
                          )}
                        </Link>

                        {/* Top Badge: NEW DROP */}
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none z-10">
                          <span className="rounded-full border border-white/20 bg-black/70 px-3 py-1 font-heading text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                            NEW DROP
                          </span>
                        </div>

                        {/* Gradient Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                        {/* Bottom Overlay Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex items-end justify-between gap-3">
                          <div>
                            <Link href={`/producto/${drop.slug}`}>
                              <h3 className="font-heading text-lg font-black uppercase tracking-tight text-white hover:text-neutral-300 transition leading-snug">
                                {drop.nombre}
                              </h3>
                            </Link>
                            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mt-0.5">
                              {drop.subtitulo ?? drop.colores?.[0] ?? 'Edición Exclusiva'}
                            </p>
                            <p className="mt-2 text-xs font-bold text-emerald-400">
                              ✓ Por encargue (24 a 72 hs)
                            </p>
                          </div>

                          {/* Quick Add (+) Button */}
                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(e, drop)}
                            className={`flex size-11 shrink-0 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 shadow-xl ${
                              isJustAdded
                                ? 'bg-emerald-500 text-black scale-110'
                                : 'bg-white/15 hover:bg-white text-white hover:text-black border border-white/30 hover:scale-105'
                            }`}
                            title="Agregar a mi lista de consulta"
                          >
                            {isJustAdded ? (
                              <Check className="size-5" />
                            ) : (
                              <Plus className="size-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECCIÓN CATÁLOGO COMPLETO: "TODOS LOS MODELOS" */}
        {/* ========================================================================= */}
        <div id="catalogo-completo" className="pt-8 border-t border-neutral-800/80">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-heading text-xs font-bold tracking-[0.22em] text-muted-foreground uppercase">
                Colección Completa
              </p>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-balance text-white">
                <AshText as="span">Todos los Modelos</AshText>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-xl">
                Explorá por marca o talle. Fotos 100% reales sin ediciones engañosas.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsQuizOpen(true)}
                className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition shadow-sm"
              >
                <Sparkles className="size-4" />
                <span>Test: Tu par ideal</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-xs font-bold text-neutral-300 hover:border-neutral-700 hover:text-white transition shadow-sm"
              >
                <Ruler className="size-4" />
                <span>Calculadora Talles</span>
              </button>
            </div>
          </Reveal>

          {/* Filter Toolbar Panel */}
          <div className="mt-8 rounded-3xl border border-neutral-800 bg-neutral-950/80 p-4 sm:p-6 backdrop-blur-md shadow-xl space-y-5">
            {/* Live Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por modelo, colorway o estilo (ej. Air Force, Dunk, Panda, Campus, 9060, Verde)..."
                className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/90 py-3.5 pl-12 pr-10 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-white/10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Brand Tabs */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold">
                <span>Filtrar por Marca:</span>
                <div className="flex items-center gap-3">
                  <Link href="/marca/nike" className="hover:text-white transition">Nike →</Link>
                  <Link href="/marca/adidas" className="hover:text-white transition">Adidas →</Link>
                  <Link href="/marca/new-balance" className="hover:text-white transition">New Balance →</Link>
                  <Link href="/marca/puma" className="hover:text-white transition">Puma →</Link>
                  <Link href="/marca/vans" className="hover:text-white transition">Vans →</Link>
                  <Link href="/slides" className="hover:text-emerald-400 transition font-bold">Chanclas Slide →</Link>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setSelectedBrand('todos')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedBrand === 'todos'
                      ? 'bg-white text-black shadow-md'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  Todos ({sneakerCatalog.length})
                </button>
                {MARCAS.filter((m) => m.slug !== 'slides').map((marca) => {
                  const count = sneakerCatalog.filter((p) => {
                    if (marca.slug === 'nike') return p.nombre.toLowerCase().startsWith('nike') || p.nombre.toLowerCase().startsWith('air force')
                    if (marca.slug === 'adidas') return p.nombre.toLowerCase().startsWith('adidas')
                    if (marca.slug === 'new-balance') return p.nombre.toLowerCase().startsWith('new balance')
                    if (marca.slug === 'puma') return p.nombre.toLowerCase().startsWith('puma')
                    if (marca.slug === 'vans') return p.nombre.toLowerCase().startsWith('vans')
                    return false
                  }).length

                  return (
                    <button
                      key={marca.slug}
                      type="button"
                      onClick={() => setSelectedBrand(marca.slug)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        selectedBrand === marca.slug
                          ? 'bg-white text-black shadow-md'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      {marca.nombre} {count > 0 ? `(${count})` : ''}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Interactive Size Filter Pills */}
            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-semibold">Filtrar por tu Talle (URUY / EUR):</span>
                {selectedFilterSize && (
                  <button
                    type="button"
                    onClick={() => setSelectedFilterSize(null)}
                    className="text-emerald-400 hover:underline text-[11px] font-bold"
                  >
                    Limpiar talle
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setSelectedFilterSize(null)}
                  className={`size-9 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedFilterSize === null
                      ? 'bg-white text-black shadow-md'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Todos
                </button>
                {ALL_SIZES.map((size) => {
                  const isSelected = selectedFilterSize === size
                  const availableCount = sneakerCatalog.filter((p) => p.talles.includes(size)).length
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedFilterSize(isSelected ? null : size)}
                      className={`size-9 rounded-xl text-xs font-bold transition-all shrink-0 relative ${
                        isSelected
                          ? 'bg-emerald-500 text-black shadow-md scale-105'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                      }`}
                      title={`${availableCount} modelos disponibles en talle ${size}`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Filters Summary Bar */}
            {(selectedBrand !== 'todos' || selectedFilterSize !== null || searchQuery !== '') && (
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span>Resultados: <strong className="text-white">{filteredProducts.length}</strong> modelos</span>
                  {selectedBrand !== 'todos' && (
                    <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-neutral-200">
                      Marca: {selectedBrand}
                    </span>
                  )}
                  {selectedFilterSize && (
                    <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-neutral-200">
                      Talle: {selectedFilterSize}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedBrand('todos')
                    setSearchQuery('')
                    setSelectedFilterSize(null)
                  }}
                  className="text-xs text-neutral-400 hover:text-white underline transition"
                >
                  Restablecer todos los filtros
                </button>
              </div>
            )}
          </div>

          {/* Interactive Product Grid */}
          <ul className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
            {visibleProducts.map((producto, i) => {
              const isJustAdded = addedItemSlug === producto.slug
              return (
                <Reveal as="li" key={producto.slug} delay={Math.min(i * 40, 300)}>
                  <div className="group led-card-hover relative flex h-full flex-col rounded-3xl cursor-pointer">
                    {/* Card Image Area with Interactive Overlay */}
                    <div className="relative aspect-square overflow-hidden bg-neutral-950 rounded-t-[calc(1.5rem-2px)]">
                      <Link href={`/producto/${producto.slug}`} className="block w-full h-full">
                        <Image
                          src={producto.imagenes[0]?.src ?? '/images/hero-sneaker.png'}
                          alt={producto.imagenes[0]?.alt ?? producto.nombre}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-108"
                        />
                      </Link>

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                        <span className="rounded-full border border-neutral-700/80 bg-black/80 px-2.5 py-0.5 font-heading text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase backdrop-blur text-neutral-200">
                          {producto.categoria}
                        </span>
                        {producto.badge && (
                          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 font-heading text-[9px] font-bold uppercase text-emerald-400 backdrop-blur">
                            {producto.badge}
                          </span>
                        )}
                      </div>

                      {/* Interactive Floating Quick Action Buttons */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-1.5 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
                        <button
                          type="button"
                          onClick={(e) => handleOpenQuickView(e, producto)}
                          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-black/80 hover:bg-black border border-white/20 py-2 px-2 text-[11px] font-bold text-white uppercase backdrop-blur shadow-lg transition hover:scale-[1.02]"
                          title="Ver fotos y talles sin salir"
                        >
                          <Eye className="size-3.5" />
                          <span>Vista rápida</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, producto)}
                          className={`flex size-8 items-center justify-center rounded-xl backdrop-blur transition-all shadow-lg ${
                            isJustAdded
                              ? 'bg-emerald-500 text-black scale-110'
                              : 'bg-white hover:bg-neutral-200 text-black hover:scale-105'
                          }`}
                          title="Agregar a mi lista de consulta"
                        >
                          {isJustAdded ? <Check className="size-4" /> : <Plus className="size-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col p-3.5 sm:p-4 gap-3 rounded-b-[calc(1.5rem-2px)] flex-1 justify-between">
                      <Link href={`/producto/${producto.slug}`}>
                        <h3 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-tight leading-snug hover:text-neutral-300 transition line-clamp-2">
                          {producto.nombre}
                        </h3>
                      </Link>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-neutral-800/70">
                        <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-white">
                          {producto.precio ?? 'Consultar precio'}
                          <ArrowUpRight className="size-3.5 text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                        <span className="self-start sm:self-auto rounded-full bg-neutral-900 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
                          ✓ ENCARGUE
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ul>

          {/* Botón hacia el Catálogo Completo Organizado por Marcas */}
          {searchQuery.trim() === '' && selectedBrand === 'todos' && !selectedFilterSize && (
            <Reveal delay={100} className="mt-12 text-center">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2.5 rounded-full border border-neutral-700 bg-neutral-900 px-8 py-4 font-heading text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:scale-[1.02] shadow-xl"
              >
                <span>VER TODOS LOS MODELOS ({PRODUCTOS.length} DISPONIBLES)</span>
                <ChevronRight className="size-4" />
              </Link>
            </Reveal>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="mt-12 rounded-3xl border border-dashed border-neutral-800 bg-neutral-950/50 p-12 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-500 mb-3">
                <Search className="size-6" />
              </div>
              <h3 className="font-heading text-xl font-bold uppercase text-white">
                No encontramos modelos con esos filtros
              </h3>
              <p className="mt-2 text-sm text-neutral-400 max-w-md mx-auto">
                Probá limpiando la búsqueda o consultanos por WhatsApp para pedir cualquier modelo por encargue.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBrand('todos')
                    setSearchQuery('')
                    setSelectedFilterSize(null)
                  }}
                  className="rounded-full bg-white px-6 py-3 text-xs font-bold text-black uppercase tracking-wider hover:bg-neutral-200 transition"
                >
                  Ver todos los productos
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wholesale Banner */}
        <Reveal
          delay={120}
          className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl border border-neutral-800 bg-gradient-to-r from-[#0c0c0c] to-neutral-900 p-6 sm:p-8"
        >
          <div>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Precios Especiales
            </span>
            <h3 className="mt-3 font-heading text-xl font-bold text-balance text-white">
              ¿Compras en cantidad? Tenemos precios por mayor
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Descuentos por volumen para revendedores y emprendimientos de todo el país.
            </p>
          </div>
          <Link
            href="/mayoristas"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-heading text-sm font-bold text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            Consultar precios mayoristas
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
