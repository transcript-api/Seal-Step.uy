'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  ArrowUpRight,
  Plus,
  Check,
  Eye,
  ArrowLeft,
  Sparkles,
  Ruler,
  ShoppingBag,
} from 'lucide-react'
import {
  PRODUCTOS,
  MARCAS,
  Producto,
  getMarcaFromProducto,
} from '@/lib/productos'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { AshText } from '@/components/ash-text'
import { useOrder } from '@/lib/order-context'

const SIZES_AVAILABLE = ['38', '39', '40', '41', '42', '43']

export function CatalogoContent({ initialProducts }: { initialProducts?: Producto[] } = {}) {
  const catalogSource = initialProducts && initialProducts.length > 0 ? initialProducts : PRODUCTOS
  const [selectedBrand, setSelectedBrand] = useState<string>('todos')
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [addedItemSlug, setAddedItemSlug] = useState<string | null>(null)

  const { addItem, setQuickViewProduct } = useOrder()

  const handleQuickAdd = (e: React.MouseEvent, producto: Producto) => {
    e.preventDefault()
    e.stopPropagation()
    const talleDefault = producto.talles[0] ?? '40'
    addItem(producto, talleDefault, producto.colores?.[0])
    setAddedItemSlug(producto.slug)
    setTimeout(() => setAddedItemSlug(null), 1800)
  }

  const handleOpenQuickView = (e: React.MouseEvent, producto: Producto) => {
    e.preventDefault()
    e.stopPropagation()
    setQuickViewProduct(producto)
  }

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return catalogSource.filter((p) => {
      const pBrand = getMarcaFromProducto(p)

      // Filtro de marca
      if (selectedBrand !== 'todos' && pBrand !== selectedBrand) {
        return false
      }

      // Filtro de talle
      if (selectedSize && !p.talles.includes(selectedSize)) {
        return false
      }

      // Filtro de búsqueda
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = p.nombre.toLowerCase().includes(q)
        const matchSub = p.subtitulo?.toLowerCase().includes(q)
        const matchCat = p.categoria.toLowerCase().includes(q)
        const matchDesc = p.descripcion.toLowerCase().includes(q)
        const matchBrand = pBrand.toLowerCase().includes(q)
        return matchName || matchSub || matchCat || matchDesc || matchBrand
      }

      return true
    })
  }, [catalogSource, selectedBrand, selectedSize, searchQuery])

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <Link href="/" className="hover:text-white transition flex items-center gap-1">
              <ArrowLeft className="size-3.5" />
              <span>Volver al Inicio</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider">Catálogo</span>
          </div>

          {/* Editorial Header */}
          <div className="mb-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
              <Sparkles className="size-3.5" />
              <span>Colección Oficial Seal Step</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              Catálogo <AshText text="Completo" />
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-neutral-400">
              Explorá todos los modelos disponibles en Uruguay. Podés filtrar por marca, buscar por nombre o filtrar por tu talle exacto.
            </p>
          </div>

          {/* Controls Bar: Search & Filters */}
          <div className="sticky top-20 z-30 mb-8 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar modelo o marca..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-neutral-800 bg-neutral-900/90 pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              {/* Quick Size Filter */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-semibold shrink-0 mr-1">
                  <Ruler className="size-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Talle:</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSize(null)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition shrink-0 ${
                    selectedSize === null
                      ? 'bg-white text-black'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  Todos
                </button>
                {SIZES_AVAILABLE.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition shrink-0 ${
                      selectedSize === size
                        ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter Pills */}
            <div className="mt-4 pt-4 border-t border-neutral-800/80 flex items-center gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSelectedBrand('todos')}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition shrink-0 ${
                  selectedBrand === 'todos'
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'bg-neutral-900/60 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                Todos ({catalogSource.length})
              </button>
              {MARCAS.map((marca) => {
                const count = catalogSource.filter((p) => getMarcaFromProducto(p) === marca.slug).length
                if (count === 0) return null
                return (
                  <button
                    key={marca.slug}
                    type="button"
                    onClick={() => setSelectedBrand(marca.slug)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition shrink-0 ${
                      selectedBrand === marca.slug
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                        : 'bg-neutral-900/60 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {marca.nombre} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex items-center justify-between text-xs text-neutral-400 px-1">
            <span>
              Mostrando <strong className="text-white">{filteredProducts.length}</strong> de {catalogSource.length} modelos
            </span>
            {(selectedBrand !== 'todos' || selectedSize !== null || searchQuery !== '') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('todos')
                  setSelectedSize(null)
                  setSearchQuery('')
                }}
                className="text-emerald-400 hover:underline font-semibold"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-800 bg-neutral-950/50 p-16 text-center">
              <ShoppingBag className="mx-auto size-12 text-neutral-600 mb-3" />
              <h3 className="font-heading text-lg font-bold text-neutral-300 uppercase">
                No encontramos modelos con esos filtros
              </h3>
              <p className="mt-1 text-xs text-neutral-500 max-w-sm mx-auto">
                Probá cambiando el talle seleccionado, limpiando la búsqueda o consultando por WhatsApp por un modelo específico.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('todos')
                  setSelectedSize(null)
                  setSearchQuery('')
                }}
                className="mt-6 rounded-full bg-neutral-900 border border-neutral-700 px-6 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition"
              >
                Ver todos los modelos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((producto) => (
                <CatalogoProductCard
                  key={producto.slug}
                  producto={producto}
                  onQuickAdd={handleQuickAdd}
                  onQuickView={handleOpenQuickView}
                  isJustAdded={addedItemSlug === producto.slug}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

function CatalogoProductCard({
  producto,
  onQuickAdd,
  onQuickView,
  isJustAdded,
}: {
  producto: Producto
  onQuickAdd: (e: React.MouseEvent, producto: Producto) => void
  onQuickView: (e: React.MouseEvent, producto: Producto) => void
  isJustAdded: boolean
}) {
  const image = producto.imagenes[0]?.src || '/images/hero-sneaker.png'

  return (
    <Reveal>
      <div className="group relative flex flex-col h-full rounded-2xl sm:rounded-3xl border border-neutral-800/80 bg-neutral-950 transition-all duration-300 hover:border-neutral-700 hover:shadow-2xl hover:shadow-emerald-500/5">
        {/* Card Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-neutral-900/60 p-4">
          <Link href={`/producto/${producto.slug}`} className="block h-full w-full">
            <Image
              src={image}
              alt={producto.nombre}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {producto.badge && (
              <span className="rounded-full bg-black/80 backdrop-blur border border-white/20 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                {producto.badge}
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-1.5 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
            <button
              type="button"
              onClick={(e) => onQuickView(e, producto)}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-black/80 hover:bg-black border border-white/20 py-2 px-2 text-[11px] font-bold text-white uppercase backdrop-blur shadow-lg transition hover:scale-[1.02]"
              title="Vista rápida"
            >
              <Eye className="size-3.5" />
              <span>Vista rápida</span>
            </button>

            <button
              type="button"
              onClick={(e) => onQuickAdd(e, producto)}
              className={`flex size-8 items-center justify-center rounded-xl backdrop-blur transition-all shadow-lg ${
                isJustAdded
                  ? 'bg-emerald-500 text-black scale-110'
                  : 'bg-white hover:bg-neutral-200 text-black hover:scale-105'
              }`}
              title="Agregar al pedido"
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
}
