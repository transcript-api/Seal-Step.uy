import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBag,
  Star,
  Users,
  Video,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Layers,
} from 'lucide-react'
import { getProductos } from '@/lib/productos-db'

export default async function AdminDashboardPage() {
  const productos = await getProductos()

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-10">
      {/* Header de Bienvenida */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            <Sparkles className="size-3.5" />
            <span>Panel de Administración</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Control Comercial Seal Step
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Gestioná tus championes, ordená la portada con arrastrar y soltar, y administrá tu negocio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/portada"
            className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 text-xs font-black uppercase tracking-wider transition shadow-lg shadow-emerald-500/20"
          >
            <Star className="size-4" />
            <span>Ordenar Portada</span>
          </Link>
        </div>
      </div>

      {/* Tarjetas de Métricas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Modelos */}
        <div className="rounded-2xl border border-neutral-800/80 bg-[#0d0d0d] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Total Catálogo
            </span>
            <div className="size-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400">
              <ShoppingBag className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-white">
            {productos.length}
          </div>
          <p className="text-[11px] font-semibold text-neutral-500">
            Modelos registrados en Supabase
          </p>
        </div>

        {/* Portada & Destacados */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              En Portada (Home)
            </span>
            <div className="size-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Star className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-emerald-400">
            {Math.min(productos.length, 12)}
          </div>
          <p className="text-[11px] font-semibold text-emerald-500/80">
            Visibles en la primera página
          </p>
        </div>

        {/* Videos y Multimedia */}
        <div className="rounded-2xl border border-neutral-800/80 bg-[#0d0d0d] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Videos & Banners
            </span>
            <div className="size-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
              <Video className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-white">
            3
          </div>
          <p className="text-[11px] font-semibold text-neutral-500">
            Secciones multimedia editables
          </p>
        </div>

        {/* CRM Clientes */}
        <div className="rounded-2xl border border-neutral-800/80 bg-[#0d0d0d] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Clientes & CRM
            </span>
            <div className="size-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
              <Users className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-heading font-black text-white">
            0
          </div>
          <p className="text-[11px] font-semibold text-neutral-500">
            Conexión con WhatsApp lista
          </p>
        </div>
      </div>

      {/* Accesos Rápidos Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Acceso 1: Ordenar Portada con Drag & Drop */}
        <Link
          href="/admin/portada"
          className="group rounded-3xl border border-neutral-800 bg-[#0d0d0d] p-6 hover:border-emerald-500/50 transition duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
              <Layers className="size-6" />
            </div>
            <h3 className="font-heading text-lg font-black uppercase text-white tracking-tight">
              Organizador de Portada
            </h3>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Arrastrá y soltá los championes para decidir el orden exacto en el que aparecen en la primera página de la tienda.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mt-6 pt-4 border-t border-neutral-800/80 group-hover:translate-x-1 transition">
            <span>Abrir organizador</span>
            <ArrowRight className="size-4" />
          </div>
        </Link>

        {/* Acceso 2: Catálogo Completo */}
        <Link
          href="/admin/productos"
          className="group rounded-3xl border border-neutral-800 bg-[#0d0d0d] p-6 hover:border-emerald-500/50 transition duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="size-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition">
              <ShoppingBag className="size-6" />
            </div>
            <h3 className="font-heading text-lg font-black uppercase text-white tracking-tight">
              Gestionar Catálogo
            </h3>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Editá precios, descripciones, talles y fotos de los 33 productos. Agregá nuevos modelos con un clic.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mt-6 pt-4 border-t border-neutral-800/80 group-hover:translate-x-1 transition">
            <span>Ver todos los modelos</span>
            <ArrowRight className="size-4" />
          </div>
        </Link>

        {/* Acceso 3: Videos & Banners */}
        <Link
          href="/admin/videos"
          className="group rounded-3xl border border-neutral-800 bg-[#0d0d0d] p-6 hover:border-emerald-500/50 transition duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="size-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition">
              <Video className="size-6" />
            </div>
            <h3 className="font-heading text-lg font-black uppercase text-white tracking-tight">
              Videos & Promociones
            </h3>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Cambiá el video de la sección Drop, los videos de venta mayorista y los textos publicitarios de la web.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mt-6 pt-4 border-t border-neutral-800/80 group-hover:translate-x-1 transition">
            <span>Configurar multimedia</span>
            <ArrowRight className="size-4" />
          </div>
        </Link>
      </div>

      {/* Lista Rápida de Últimos Modelos */}
      <div className="rounded-3xl border border-neutral-800/80 bg-[#0d0d0d] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
          <div>
            <h2 className="font-heading text-base font-bold uppercase text-white tracking-wide">
              Modelos en Tienda
            </h2>
            <p className="text-xs text-neutral-400">
              Últimos productos sincronizados con Supabase
            </p>
          </div>
          <Link
            href="/admin/productos"
            className="text-xs font-bold text-emerald-400 hover:underline"
          >
            Ver todos ({productos.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {productos.slice(0, 6).map((p) => {
            const img = p.imagenes[0]?.src || '/images/hero-sneaker.png'
            return (
              <div
                key={p.slug}
                className="flex items-center gap-3.5 p-3 rounded-2xl border border-neutral-800/60 bg-neutral-950/60 hover:border-neutral-700 transition"
              >
                <div className="relative size-14 shrink-0 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <Image src={img} alt={p.nombre} fill className="object-contain p-1" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-xs font-bold uppercase truncate text-white">
                    {p.nombre}
                  </h4>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {p.categoria} · {p.talles.length} talles
                  </p>
                  <span className="text-xs font-bold text-emerald-400">
                    {p.precio ?? 'Consultar'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
