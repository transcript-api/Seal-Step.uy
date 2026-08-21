'use client'

import { useState, useMemo, Suspense } from 'react'
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
  getProductosOrganizadosPorMarca,
} from '@/lib/productos'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { AshText } from '@/components/ash-text'
import { useOrder } from '@/lib/order-context'

const SIZES_AVAILABLE = ['38', '39', '40', '41', '42', '43']

export default function CatalogoPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>('todos')
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [addedItemSlug, setAddedItemSlug] = useState<string | null>(null)

  const { addItem, openQuickView } = useOrder()

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
    openQuickView(producto)
  }

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return PRODUCTOS.filter((p) => {
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
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim()
        const matchName = p.nombre.toLowerCase().includes(query)
        const matchSub = p.subtitulo?.toLowerCase().includes(query)
        const matchDesc = p.descripcion.toLowerCase().includes(query)
        const matchColor = p.colores?.some((c) => c.toLowerCase().includes(query))
        if (!matchName && !matchSub && !matchDesc && !matchColor) {
          return false
        }
      }

      return true
    })
  }, [selectedBrand, selectedSize, searchQuery])

  // Agrupado por marca si no hay búsqueda activa y la marca es 'todos'
  const isGroupedView = selectedBrand === 'todos' && searchQuery.trim() === '' && !selectedSize

  const organizedGroups = useMemo(() => {
    return getProductosOrganizadosPorMarca()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Navegación migas de pan" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="font-semibold text-foreground">Catálogo Completo</span>
          </nav>

          {/* Banner de Cabecera */}
          <Reveal className="rounded-3xl border border-border bg-card p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 size-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <span className="rounded-full bg-neutral-900 border border-neutral-700 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Stock Real &amp; Organizado
                </span>
                <h1 className="mt-3 font-heading text-3xl sm:text-5xl font-black tracking-tight uppercase">
                  <AshText as="span">Todos los Modelos</AshText>
                </h1>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                  Explorá todos los championes disponibles organizados por marca. Modelos 100% reales con fotos auténticas y envíos a todo Uruguay.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/#contacto"
                  className="px-5 py-3 rounded-full border border-border bg-secondary text-xs font-bold hover:bg-neutral-800 transition-colors uppercase tracking-wider"
                >
                  Consultar por WhatsApp
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Barra de Filtros & Búsqueda */}
          <div className="mt-8 space-y-4">
            {/* Input de búsqueda */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar por modelo, color (ej: Dunk, Campus, 1000)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-border bg-neutral-900/90 pl-11 pr-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-white"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Pestañas de Marcas */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedBrand('todos')}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                  selectedBrand === 'todos'
                    ? 'bg-white text-black shadow-md'
                    : 'border border-border bg-neutral-900 text-neutral-300 hover:border-neutral-700 hover:text-white'
                }`}
              >
                Todos ({PRODUCTOS.length})
              </button>

              {MARCAS.map((marca) => {
                const count = PRODUCTOS.filter((p) => getMarcaFromProducto(p) === marca.slug).length
                if (count === 0) return null
                return (
                  <button
                    key={marca.slug}
                    type="button"
                    onClick={() => setSelectedBrand(marca.slug)}
                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                      selectedBrand === marca.slug
                        ? 'bg-white text-black shadow-md'
                        : 'border border-border bg-neutral-900 text-neutral-300 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    {marca.nombre} ({count})
                  </button>
                )
              })}
            </div>

            {/* Selector de Talle */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800/80">
              <span className="text-xs font-semibold text-neutral-400 mr-1">Filtrar por talle:</span>
              <button
                type="button"
                onClick={() => setSelectedSize(null)}
                className={`size-8 rounded-full text-xs font-bold transition flex items-center justify-center ${
                  selectedSize === null
                    ? 'bg-emerald-500 text-black font-black'
                    : 'border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              {SIZES_AVAILABLE.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`size-8 rounded-full text-xs font-bold transition flex items-center justify-center ${
                    selectedSize === size
                      ? 'bg-white text-black font-black'
                      : 'border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido del Catálogo */}
          <div className="mt-12">
            {/* 1. Vista Agrupada por Marca (Todos juntos organizados) */}
            {isGroupedView ? (
              <div className="space-y-16">
                {organizedGroups.map((group) => (
                  <section key={group.marca.slug} id={`marca-${group.marca.slug}`} className="pt-2">
                    {/* Encabezado de la Marca */}
                    <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                      <div className="flex items-center gap-3">
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                          {group.marca.nombre}
                        </h2>
                        <span className="rounded-full bg-neutral-900 border border-neutral-800 px-2.5 py-0.5 text-xs font-bold text-neutral-400">
                          {group.productos.length} {group.productos.length === 1 ? 'modelo' : 'modelos'}
                        </span>
                      </div>
                      <Link
                        href={`/marca/${group.marca.slug}`}
                        className="text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-wider transition flex items-center gap-1"
                      >
                        <span>Ver solo {group.marca.nombre}</span>
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </div>

                    {/* Grilla de Productos de la Marca */}
                    <ul className="mt-6 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
                      {group.productos.map((producto, i) => (
                        <ProductCard
                          key={producto.slug}
                          producto={producto}
                          index={i}
                          isJustAdded={addedItemSlug === producto.slug}
                          onQuickAdd={handleQuickAdd}
                          onQuickView={handleOpenQuickView}
                        />
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : (
              /* 2. Vista Filtrada por Búsqueda, Marca o Talle */
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-xs text-neutral-400">
                    Mostrando <strong className="text-white">{filteredProducts.length}</strong> modelos encontrados
                  </p>
                  {(selectedBrand !== 'todos' || selectedSize || searchQuery) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBrand('todos')
                        setSelectedSize(null)
                        setSearchQuery('')
                      }}
                      className="text-xs font-bold text-emerald-400 hover:underline"
                    >
                      Restablecer filtros
                    </button>
                  )}
                </div>

                {filteredProducts.length > 0 ? (
                  <ul className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
                    {filteredProducts.map((producto, i) => (
                      <ProductCard
                        key={producto.slug}
                        producto={producto}
                        index={i}
                        isJustAdded={addedItemSlug === producto.slug}
                        onQuickAdd={handleQuickAdd}
                        onQuickView={handleOpenQuickView}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-3xl border border-dashed border-neutral-800 bg-neutral-950/50 p-12 text-center my-10">
                    <h3 className="font-heading text-xl font-bold uppercase text-white">
                      No encontramos modelos con esos filtros
                    </h3>
                    <p className="mt-2 text-sm text-neutral-400 max-w-md mx-auto">
                      Probá seleccionando otra marca, talle o limpiando la búsqueda.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBrand('todos')
                        setSelectedSize(null)
                        setSearchQuery('')
                      }}
                      className="mt-6 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-black uppercase tracking-wider hover:bg-neutral-200 transition"
                    >
                      Ver todos los productos
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Volver a la página principal
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function ProductCard({
  producto,
  index,
  isJustAdded,
  onQuickAdd,
  onQuickView,
}: {
  producto: Producto
  index: number
  isJustAdded: boolean
  onQuickAdd: (e: React.MouseEvent, p: Producto) => void
  onQuickView: (e: React.MouseEvent, p: Producto) => void
}) {
  return (
    <Reveal as="li" delay={Math.min(index * 30, 240)}>
      <div className="group led-card-hover relative flex h-full flex-col rounded-3xl cursor-pointer">
        {/* Card Image */}
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
