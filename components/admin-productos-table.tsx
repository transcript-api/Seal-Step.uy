'use client'

import React, { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  Plus,
  Edit2,
  Check,
  X,
  Eye,
  SlidersHorizontal,
  ArrowLeft,
  Sparkles,
  Save,
  Tag,
  Palette,
  Ruler,
  AlertCircle,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Loader2,
  Trash2,
} from 'lucide-react'
import type { Producto } from '@/lib/productos'

const COMMON_SIZES = ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45']
const POPULAR_COLORS = ['Blanco', 'Negro', 'Azul', 'Gris', 'Off White', 'Verde', 'Cacao', 'Rojo']
const BADGES = ['NUEVO INGRESO', 'POR ENCARGUE', 'EDICIÓN ESPECIAL', 'LIQUIDACIÓN']
const MARCAS = ['Nike', 'Adidas', 'New Balance', 'Vans', 'Puma', 'Slides', 'Otra']

export function AdminProductosTable({ initialProducts }: { initialProducts: Producto[] }) {
  const [products, setProducts] = useState<Producto[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('todos')
  
  // Modal de edición / creación
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null)
  
  // Estado del formulario
  const [formSlug, setFormSlug] = useState('')
  const [formNombre, setFormNombre] = useState('')
  const [formSubtitulo, setFormSubtitulo] = useState('')
  const [formCategoria, setFormCategoria] = useState('Importados')
  const [formMarca, setFormMarca] = useState('Nike')
  const [formBadge, setFormBadge] = useState<string | undefined>(undefined)
  const [formPrecio, setFormPrecio] = useState<string>('')
  const [formDescripcion, setFormDescripcion] = useState('')
  const [formTalles, setFormTalles] = useState<string[]>([])
  const [formColores, setFormColores] = useState<string[]>([])
  const [formColorInput, setFormColorInput] = useState('')
  const [formImagenUrl, setFormImagenUrl] = useState('')
  const [formImagenes, setFormImagenes] = useState<{ src: string; alt: string }[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchBrand = selectedBrand === 'todos' || p.nombre.toLowerCase().includes(selectedBrand.toLowerCase()) || p.categoria.toLowerCase().includes(selectedBrand.toLowerCase())
      const matchQuery = !searchQuery.trim() || p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || p.slug.toLowerCase().includes(searchQuery.toLowerCase()) || p.categoria.toLowerCase().includes(searchQuery.toLowerCase())
      return matchBrand && matchQuery
    })
  }, [products, selectedBrand, searchQuery])

  // Abrir modal para nuevo producto
  const handleNewProduct = () => {
    setEditingProduct(null)
    setFormSlug('')
    setFormNombre('')
    setFormSubtitulo('')
    setFormCategoria('Importados')
    setFormMarca('Nike')
    setFormBadge('NUEVO INGRESO')
    setFormPrecio('')
    setFormDescripcion('')
    setFormTalles(['38', '39', '40', '41', '42'])
    setFormColores(['Blanco', 'Negro'])
    setFormImagenes([{ src: '/images/hero-sneaker.png', alt: 'Nuevo champión' }])
    setIsModalOpen(true)
  }

  // Abrir modal para editar producto existente
  const handleEditProduct = (p: Producto) => {
    setEditingProduct(p)
    setFormSlug(p.slug)
    setFormNombre(p.nombre)
    setFormSubtitulo(p.subtitulo || '')
    setFormCategoria(p.categoria)
    setFormMarca(p.nombre.toLowerCase().includes('adidas') ? 'Adidas' : p.nombre.toLowerCase().includes('new balance') ? 'New Balance' : p.nombre.toLowerCase().includes('vans') ? 'Vans' : p.nombre.toLowerCase().includes('puma') ? 'Puma' : 'Nike')
    setFormBadge(p.badge)
    setFormPrecio(p.precio ? p.precio.replace(/[^0-9]/g, '') : '')
    setFormDescripcion(p.descripcion)
    setFormTalles([...p.talles])
    setFormColores(p.colores ? [...p.colores] : [])
    setFormImagenes([...p.imagenes])
    setIsModalOpen(true)
  }

  // Tildar / destildar un talle con 1 solo clic
  const toggleTalle = (talle: string) => {
    if (formTalles.includes(talle)) {
      setFormTalles(formTalles.filter((t) => t !== talle))
    } else {
      const updated = [...formTalles, talle].sort((a, b) => Number(a) - Number(b))
      setFormTalles(updated)
    }
  }

  // Agregar color
  const addColor = (color: string) => {
    const trimmed = color.trim()
    if (trimmed && !formColores.includes(trimmed)) {
      setFormColores([...formColores, trimmed])
      setFormColorInput('')
    }
  }

  const removeColor = (color: string) => {
    setFormColores(formColores.filter((c) => c !== color))
  }

  // Subir fotos desde el dispositivo
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data.success && data.url) {
          setFormImagenes((prev) => [...prev, { src: data.url, alt: formNombre || 'Foto producto' }])
        }
      } catch (err) {
        console.error('Error al subir imagen:', err)
      }
    }

    setIsUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Agregar imagen por URL
  const addImagenUrl = () => {
    if (formImagenUrl.trim()) {
      setFormImagenes([...formImagenes, { src: formImagenUrl.trim(), alt: formNombre || 'Foto producto' }])
      setFormImagenUrl('')
    }
  }

  const removeImagen = (idx: number) => {
    setFormImagenes(formImagenes.filter((_, i) => i !== idx))
  }

  const makeCoverImage = (idx: number) => {
    if (idx === 0) return
    const item = formImagenes[idx]
    const rest = formImagenes.filter((_, i) => i !== idx)
    setFormImagenes([item, ...rest])
  }

  // Guardar producto en Supabase vía API real
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formNombre.trim()) {
      alert('Por favor introducí un nombre para el champión')
      return
    }

    setIsSaving(true)

    const slugToUse = editingProduct ? editingProduct.slug : formSlug.trim() || formNombre.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    const formattedPrecio = formPrecio.trim() ? `$ ${Number(formPrecio).toLocaleString('es-UY')}` : null

    const payload = {
      slug: slugToUse,
      nombre: formNombre.trim(),
      subtitulo: formSubtitulo.trim() || undefined,
      categoria: formCategoria,
      marca: formMarca,
      badge: formBadge || undefined,
      precio: formPrecio.trim() ? Number(formPrecio) : null,
      descripcion: formDescripcion.trim() || `${formNombre} importados de primera calidad.`,
      talles: formTalles.length > 0 ? formTalles : ['38', '39', '40', '41', '42'],
      colores: formColores.length > 0 ? formColores : undefined,
      imagenes: formImagenes.length > 0 ? formImagenes : [{ src: '/images/hero-sneaker.png', alt: formNombre }],
      isNew: !editingProduct,
    }

    try {
      const response = await fetch('/api/admin/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al guardar en Supabase')
      }

      // Actualizar estado local
      const savedProduct: Producto = {
        ...payload,
        precio: formattedPrecio,
        fotosReales: true,
        stock: 'disponible',
        detalles: ['Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura y garantizada'],
      }

      if (editingProduct) {
        setProducts(products.map((p) => (p.slug === editingProduct.slug ? savedProduct : p)))
      } else {
        setProducts([savedProduct, ...products])
      }

      setIsModalOpen(false)
      setToastMessage(editingProduct ? `¡"${formNombre}" actualizado en Supabase y tienda en vivo!` : `¡"${formNombre}" guardado en Supabase y tienda en vivo!`)
      setTimeout(() => setToastMessage(null), 4500)
    } catch (err: any) {
      alert(`Error al guardar: ${err.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-500 text-black px-5 py-3.5 rounded-2xl font-heading font-black text-xs uppercase tracking-wider shadow-2xl animate-in slide-in-from-bottom-5">
          <Check className="size-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold mb-2">
            <Link href="/admin" className="hover:text-white transition flex items-center gap-1">
              <ArrowLeft className="size-3.5" />
              <span>Panel Principal</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-400 uppercase tracking-wider">Catálogo</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Gestión de Productos & Talles
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Editá en tiempo real: los cambios se guardan directamente en Supabase y se ven al instante en la tienda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNewProduct}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 text-xs font-black uppercase tracking-wider transition shadow-lg shadow-emerald-500/20"
          >
            <Plus className="size-4" />
            <span>Nuevo Champión</span>
          </button>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0d0d0d] p-4 rounded-2xl border border-neutral-800/80">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedBrand('todos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              selectedBrand === 'todos'
                ? 'bg-emerald-500 text-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Todos ({products.length})
          </button>
          {['Nike', 'Adidas', 'New Balance', 'Vans'].map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedBrand === brand
                  ? 'bg-emerald-500 text-black'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de Productos Responsive */}
      <div className="rounded-3xl border border-neutral-800/80 bg-[#0d0d0d] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-800 bg-neutral-950/80 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Modelo</th>
                <th className="py-3.5 px-4">Precio</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Talles Activos</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">Colores</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Etiqueta</th>
                <th className="py-3.5 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {filteredProducts.map((p) => {
                const img = p.imagenes[0]?.src || '/images/hero-sneaker.png'
                return (
                  <tr key={p.slug} className="hover:bg-neutral-900/40 transition">
                    <td className="py-3 px-4 sm:px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="relative size-12 shrink-0 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                          <Image src={img} alt={p.nombre} fill className="object-contain p-1" sizes="48px" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-heading font-bold text-white block uppercase truncate max-w-[180px] sm:max-w-xs">
                            {p.nombre}
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            {p.categoria} {p.subtitulo ? `· ${p.subtitulo}` : ''}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-bold text-emerald-400 text-xs">
                      {p.precio ?? <span className="text-neutral-500 font-normal">Consultar</span>}
                    </td>

                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.talles.slice(0, 5).map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-semibold text-neutral-300">
                            {t}
                          </span>
                        ))}
                        {p.talles.length > 5 && (
                          <span className="text-[10px] text-neutral-500 font-bold self-center">
                            +{p.talles.length - 5}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 hidden lg:table-cell text-neutral-400">
                      {p.colores && p.colores.length > 0 ? (
                        <span className="truncate max-w-[150px] block">{p.colores.join(', ')}</span>
                      ) : (
                        <span className="text-neutral-600">—</span>
                      )}
                    </td>

                    <td className="py-3 px-4 hidden sm:table-cell">
                      {p.badge ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-neutral-600 text-[11px]">—</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/producto/${p.slug}`}
                          target="_blank"
                          className="size-8 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition"
                          title="Ver en la tienda"
                        >
                          <ExternalLink className="size-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleEditProduct(p)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-white hover:text-black border border-neutral-800 text-xs font-bold text-neutral-300 transition"
                        >
                          <Edit2 className="size-3.5" />
                          <span>Editar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Drawer de Edición y Creación de Producto (100% Adaptable a Celular) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-800 bg-[#0d0d0d] text-white shadow-2xl max-h-[94vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  {editingProduct ? <Edit2 className="size-5" /> : <Plus className="size-5" />}
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-black uppercase text-white">
                    {editingProduct ? `Editar ${editingProduct.nombre}` : 'Agregar Nuevo Champión'}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-400">
                    Se guarda directamente en Supabase y se actualiza en vivo.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="size-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSaveProduct} className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* CARGADOR DE FOTOS (Dispositivo o URL) */}
              <div className="rounded-2xl bg-neutral-950 border border-neutral-800/80 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-400">
                    <ImageIcon className="size-4" />
                    <span>Galería de Fotos del Producto</span>
                  </label>
                  <span className="text-[11px] font-bold text-neutral-400">
                    {formImagenes.length} fotos
                  </span>
                </div>

                {/* Zona para subir archivos desde la PC o Celular */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-neutral-700 hover:border-emerald-500 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-300 hover:text-white cursor-pointer transition text-xs font-bold"
                  >
                    {isUploading ? (
                      <Loader2 className="size-4 animate-spin text-emerald-400" />
                    ) : (
                      <Upload className="size-4 text-emerald-400" />
                    )}
                    <span>{isUploading ? 'Subiendo imagen...' : 'Subir fotos desde PC o Celular'}</span>
                  </label>
                </div>

                {/* Alternativa: pegar URL de foto */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="O pegar URL de imagen (/images/..., https://...)"
                    value={formImagenUrl}
                    onChange={(e) => setFormImagenUrl(e.target.value)}
                    className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addImagenUrl}
                    className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs"
                  >
                    + Sumar
                  </button>
                </div>

                {/* Miniaturas de imágenes con badge de Portada */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-2">
                  {formImagenes.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center"
                    >
                      <Image src={img.src} alt={img.alt} fill className="object-contain p-1" sizes="80px" />

                      {idx === 0 && (
                        <span className="absolute top-1 left-1 bg-emerald-500 text-black text-[8px] font-black px-1.5 py-0.2 rounded font-heading uppercase">
                          Portada
                        </span>
                      )}

                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition p-1">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => makeCoverImage(idx)}
                            className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black px-1.5 py-0.5 rounded w-full text-center"
                          >
                            Portada
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImagen(idx)}
                          className="text-[9px] font-bold bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-1.5 py-0.5 rounded w-full text-center"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nombre y Precio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase tracking-wider mb-1.5">
                    Nombre del Modelo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Nike Dunk Low Verde"
                    value={formNombre}
                    onChange={(e) => setFormNombre(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase tracking-wider mb-1.5">
                    Precio en UYU (Dejar vacío para &quot;Consultar&quot;)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-neutral-500">$</span>
                    <input
                      type="number"
                      placeholder="Ej: 2800"
                      value={formPrecio}
                      onChange={(e) => setFormPrecio(e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 pl-8 text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none font-bold text-emerald-400 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Categoría, Marca y Subtítulo */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase tracking-wider mb-1.5">
                    Marca
                  </label>
                  <select
                    value={formMarca}
                    onChange={(e) => setFormMarca(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-white focus:border-emerald-500 focus:outline-none font-semibold"
                  >
                    {MARCAS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase tracking-wider mb-1.5">
                    Categoría
                  </label>
                  <select
                    value={formCategoria}
                    onChange={(e) => setFormCategoria(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-white focus:border-emerald-500 focus:outline-none font-semibold"
                  >
                    <option value="Importados">Importados</option>
                    <option value="Nuevos ingresos">Nuevos ingresos</option>
                    <option value="Chanclas Slide">Chanclas Slide</option>
                    <option value="Urbano">Urbano</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase tracking-wider mb-1.5">
                    Etiqueta Comercial
                  </label>
                  <select
                    value={formBadge || ''}
                    onChange={(e) => setFormBadge(e.target.value || undefined)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-white focus:border-emerald-500 focus:outline-none font-semibold"
                  >
                    <option value="">Sin etiqueta</option>
                    {BADGES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subtítulo / Colores breves */}
              <div>
                <label className="block text-neutral-400 font-bold uppercase tracking-wider mb-1.5">
                  Subtítulo de Edición / Colores
                </label>
                <input
                  type="text"
                  placeholder="Ej: Azul / Blanco / Off White"
                  value={formSubtitulo}
                  onChange={(e) => setFormSubtitulo(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* SELECTOR DE TALLES ULTRA SIMPLE (1 Clic para activar/desactivar) */}
              <div className="rounded-2xl bg-neutral-950 border border-neutral-800/80 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-400">
                    <Ruler className="size-4" />
                    <span>Talles Disponibles (Hacé clic para tildar/destildar)</span>
                  </label>
                  <span className="text-[11px] font-bold text-neutral-400">
                    {formTalles.length} talles activos
                  </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                  {COMMON_SIZES.map((talle) => {
                    const isSelected = formTalles.includes(talle)
                    return (
                      <button
                        key={talle}
                        type="button"
                        onClick={() => toggleTalle(talle)}
                        className={`py-2 text-center rounded-xl font-heading font-black text-xs transition ${
                          isSelected
                            ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20 scale-105'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-white hover:border-neutral-700'
                        }`}
                      >
                        {talle}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* SELECTOR DE COLORES SIMPLE */}
              <div className="rounded-2xl bg-neutral-950 border border-neutral-800/80 p-4 space-y-3">
                <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white">
                  <Palette className="size-4 text-emerald-400" />
                  <span>Colores del Modelo</span>
                </label>

                {/* Colores sugeridos con 1 clic */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold mr-1">Rápidos:</span>
                  {POPULAR_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => addColor(c)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] text-neutral-300 font-semibold transition"
                    >
                      + {c}
                    </button>
                  ))}
                </div>

                {/* Input para color personalizado */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escribí otro color y hacé clic en agregar..."
                    value={formColorInput}
                    onChange={(e) => setFormColorInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addColor(formColorInput)
                      }
                    }}
                    className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => addColor(formColorInput)}
                    className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs"
                  >
                    + Agregar
                  </button>
                </div>

                {/* Colores seleccionados actualmente */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-900">
                  {formColores.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold"
                    >
                      <span>{c}</span>
                      <button type="button" onClick={() => removeColor(c)} className="hover:text-white">
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                  {formColores.length === 0 && (
                    <span className="text-[11px] text-neutral-500 italic">No hay colores asignados</span>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-neutral-400 font-bold uppercase tracking-wider mb-1.5">
                  Descripción Comercial
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalles sobre materiales, silueta, calce y estilo..."
                  value={formDescripcion}
                  onChange={(e) => setFormDescripcion(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-white placeholder-neutral-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Botón de Guardar en el Modal */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3 sticky bottom-0 bg-[#0d0d0d] py-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-black text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20"
                >
                  {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                  <span>{isSaving ? 'Guardando en Supabase...' : 'Guardar y Actualizar Tienda'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
