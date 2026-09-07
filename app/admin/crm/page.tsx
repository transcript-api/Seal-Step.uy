'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  Users,
  ArrowLeft,
  MessageSquare,
  Plus,
  Search,
  ShieldCheck,
  Phone,
  TrendingUp,
  ShoppingBag,
  Star,
  Clock,
  CheckCircle2,
  ChevronDown,
  MoreVertical,
  Zap,
  Bot,
  AtSign,
  Filter,
  Download,
  Sparkles,
  Eye,
} from 'lucide-react'

type Estado = 'activo' | 'novo' | 'inactivo' | 'vip'
interface Cliente {
  id: number
  nombre: string
  telefono: string
  ciudad: string
  compras: number
  totalGastado: number
  ultimaCompra: string
  estado: Estado
  modelo: string
  canal: 'WhatsApp' | 'Instagram' | 'Web'
  avatar: string
}

const DEMO_CLIENTES: Cliente[] = [
  { id: 1, nombre: 'Valentina Rodriguez', telefono: '+598 91 234 567', ciudad: 'Montevideo', compras: 4, totalGastado: 12800, ultimaCompra: 'Hace 2 dias', estado: 'vip', modelo: 'Nike Air Force 1', canal: 'WhatsApp', avatar: 'VR' },
  { id: 2, nombre: 'Lucas Fernandez', telefono: '+598 98 765 432', ciudad: 'Canelones', compras: 2, totalGastado: 5600, ultimaCompra: 'Hace 1 semana', estado: 'activo', modelo: 'New Balance 550', canal: 'Instagram', avatar: 'LF' },
  { id: 3, nombre: 'Martina Garcia', telefono: '+598 93 456 789', ciudad: 'Maldonado', compras: 1, totalGastado: 3200, ultimaCompra: 'Hace 3 dias', estado: 'novo', modelo: 'Adidas Campus 00s', canal: 'WhatsApp', avatar: 'MG' },
  { id: 4, nombre: 'Santiago Lopez', telefono: '+598 94 321 654', ciudad: 'Montevideo', compras: 3, totalGastado: 8900, ultimaCompra: 'Hace 5 dias', estado: 'activo', modelo: 'Jordan 1 Retro', canal: 'Web', avatar: 'SL' },
  { id: 5, nombre: 'Camila Perez', telefono: '+598 95 789 012', ciudad: 'Rivera', compras: 1, totalGastado: 2900, ultimaCompra: 'Hace 2 semanas', estado: 'inactivo', modelo: 'Vans Knu Skool', canal: 'WhatsApp', avatar: 'CP' },
  { id: 6, nombre: 'Facundo Mendez', telefono: '+598 96 543 210', ciudad: 'Salto', compras: 5, totalGastado: 16500, ultimaCompra: 'Ayer', estado: 'vip', modelo: 'Nike Dunk Low', canal: 'Instagram', avatar: 'FM' },
  { id: 7, nombre: 'Luciana Torres', telefono: '+598 92 876 543', ciudad: 'Montevideo', compras: 2, totalGastado: 6100, ultimaCompra: 'Hace 4 dias', estado: 'activo', modelo: 'New Balance 9060', canal: 'WhatsApp', avatar: 'LT' },
  { id: 8, nombre: 'Tomas Suarez', telefono: '+598 99 012 345', ciudad: 'Colonia', compras: 1, totalGastado: 3500, ultimaCompra: 'Hace 1 mes', estado: 'inactivo', modelo: 'Converse Chuck 70', canal: 'Web', avatar: 'TS' },
]

export default function AdminCrmPage() {
  const [clientesList, setClientesList] = useState<Cliente[]>(DEMO_CLIENTES)
  const [loadingReal, setLoadingReal] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<Estado | 'todos'>('todos')
  const [filtroCanal, setFiltroCanal] = useState<'todos' | 'WhatsApp' | 'Instagram' | 'Web'>('todos')
  const [ordenar, setOrdenar] = useState<'nombre' | 'compras' | 'gasto'>('gasto')

  useEffect(() => {
    async function fetchRealClients() {
      try {
        const res = await fetch('/api/admin/crm')
        const data = await res.json()
        if (data.success && Array.isArray(data.clientes) && data.clientes.length > 0) {
          // Unir clientes reales de Supabase al principio de la lista
          const realIds = new Set(data.clientes.map((c: { email: string }) => c.email.toLowerCase()))
          const demoFiltrados = DEMO_CLIENTES.filter(d => !realIds.has(d.nombre.toLowerCase()))
          setClientesList([...data.clientes, ...demoFiltrados])
        }
      } catch (err) {
        console.error('Error al cargar clientes de Supabase:', err)
      } finally {
        setLoadingReal(false)
      }
    }
    fetchRealClients()
  }, [])

  const totalClientes = clientesList.length
  const totalVentas = clientesList.reduce((a, c) => a + c.totalGastado, 0)
  const totalCompras = clientesList.reduce((a, c) => a + c.compras, 0)
  const clientesVip = clientesList.filter(c => c.estado === 'vip').length

  const estadoCfg: Record<Estado, { label: string; color: string; dot: string }> = {
    vip:      { label: 'VIP',      color: 'text-amber-400 bg-amber-400/10 border-amber-400/30',            dot: 'bg-amber-400'   },
    activo:   { label: 'Activo',   color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',      dot: 'bg-emerald-400' },
    novo:     { label: 'Nuevo',    color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',                  dot: 'bg-sky-400'     },
    inactivo: { label: 'Inactivo', color: 'text-neutral-400 bg-neutral-800/60 border-neutral-700',         dot: 'bg-neutral-500' },
  }

  const filtrados = useMemo(() => {
    return clientesList.filter(c => {
      const txt = busqueda.toLowerCase()
      const mb = !busqueda || c.nombre.toLowerCase().includes(txt) || c.ciudad.toLowerCase().includes(txt) || c.modelo.toLowerCase().includes(txt) || c.telefono.includes(busqueda)
      const me = filtroEstado === 'todos' || c.estado === filtroEstado
      const mc = filtroCanal === 'todos' || c.canal === filtroCanal
      return mb && me && mc
    }).sort((a, b) => {
      if (ordenar === 'compras') return b.compras - a.compras
      if (ordenar === 'gasto') return b.totalGastado - a.totalGastado
      return a.nombre.localeCompare(b.nombre)
    })
  }, [clientesList, busqueda, filtroEstado, filtroCanal, ordenar])

  const fmt = (n: number) => '$' + n.toLocaleString('es-UY')

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold mb-2">
            <Link href="/admin" prefetch={false} className="hover:text-white transition flex items-center gap-1">
              <ArrowLeft className="size-3.5" />
              <span>Panel Principal</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-400 uppercase tracking-wider">CRM &amp; Clientes</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">Directorio de Clientes</h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">Historial de compradores, compras acumuladas y canal de origen.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 font-semibold">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span>Supabase · RLS Activo</span>
          </div>
          <button type="button" className="flex items-center gap-2 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-emerald-500/40 text-neutral-300 hover:text-white px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition">
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
          <button type="button" className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 text-xs font-black uppercase tracking-wider transition shadow-lg shadow-emerald-500/20">
            <Plus className="size-4" />
            <span>Nuevo Contacto</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: Users,      label: 'Total Clientes',    value: totalClientes.toString(), sub: 'registrados',       accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
          { icon: ShoppingBag,label: 'Total Pedidos',     value: totalCompras.toString(),  sub: 'en historial',      accent: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
          { icon: TrendingUp, label: 'Ventas Acumuladas', value: fmt(totalVentas),         sub: 'todos los tiempos', accent: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
          { icon: Star,       label: 'Clientes VIP',      value: clientesVip.toString(),   sub: 'compradores frecuentes', accent: 'text-amber-400 bg-amber-500/10 border-amber-400/20' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-2xl border border-neutral-800/80 bg-[#0d0d0d] p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">{s.label}</span>
                <div className={`size-8 rounded-xl border flex items-center justify-center ${s.accent}`}><Icon className="size-4" /></div>
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">{s.value}</div>
              <div className={`text-[10px] font-semibold uppercase tracking-wider ${s.accent.split(' ')[0]}`}>{s.sub}</div>
            </div>
          )
        })}
      </div>

      {/* Banner Bot WhatsApp */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/60 via-neutral-900 to-neutral-900 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none" />
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
            <Bot className="size-6 text-emerald-400" />
          </div>
          <div>
            <p className="font-heading text-sm font-black uppercase text-white tracking-wide flex items-center gap-2">
              Bot de WhatsApp con N8N
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">Proximo</span>
            </p>
            <p className="text-xs text-neutral-400 mt-0.5 max-w-md">Integra N8N + WhatsApp Business API para responder consultas automaticamente. Los clientes que contacten apareceran aqui de forma automatica.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg shrink-0">
          <Zap className="size-3.5" />
          <span>Configurar integracion</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500 pointer-events-none" />
          <input type="text" placeholder="Buscar por nombre, ciudad, modelo, telefono..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-500 outline-none transition" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500 pointer-events-none" />
          <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value as Estado | 'todos')} className="appearance-none bg-neutral-900 border border-neutral-800 hover:border-neutral-700 focus:border-emerald-500/60 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white outline-none transition cursor-pointer">
            <option value="todos">Todos los estados</option>
            <option value="vip">VIP</option>
            <option value="activo">Activo</option>
            <option value="novo">Nuevo</option>
            <option value="inactivo">Inactivo</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500 pointer-events-none" />
        </div>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500 pointer-events-none" />
          <select value={filtroCanal} onChange={e => setFiltroCanal(e.target.value as typeof filtroCanal)} className="appearance-none bg-neutral-900 border border-neutral-800 hover:border-neutral-700 focus:border-emerald-500/60 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white outline-none transition cursor-pointer">
            <option value="todos">Todos los canales</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Instagram">Instagram</option>
            <option value="Web">Web</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500 pointer-events-none" />
        </div>
        <div className="relative">
          <select value={ordenar} onChange={e => setOrdenar(e.target.value as typeof ordenar)} className="appearance-none bg-neutral-900 border border-neutral-800 hover:border-neutral-700 focus:border-emerald-500/60 rounded-xl pl-3.5 pr-8 py-2.5 text-xs text-white outline-none transition cursor-pointer">
            <option value="gasto">Mayor gasto</option>
            <option value="compras">Mas compras</option>
            <option value="nombre">Nombre A-Z</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500 pointer-events-none" />
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-2xl border border-neutral-800/80 bg-[#0d0d0d] overflow-hidden">
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_48px] gap-4 px-5 py-3 border-b border-neutral-800/80 text-[10px] font-black uppercase tracking-widest text-neutral-500">
          <span>Cliente</span><span>Ciudad</span><span>Canal</span><span>Compras</span><span>Total Gastado</span><span>Estado</span><span />
        </div>
        {filtrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <Search className="size-10 text-neutral-700" />
            <p className="text-sm text-neutral-500 font-semibold">No se encontraron clientes</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/60">
            {filtrados.map(cliente => {
              const ec = estadoCfg[cliente.estado]
              const CanalIcon = cliente.canal === 'WhatsApp' ? Phone : cliente.canal === 'Instagram' ? AtSign : Eye
              const canalColor = cliente.canal === 'WhatsApp' ? 'text-emerald-400' : cliente.canal === 'Instagram' ? 'text-pink-400' : 'text-sky-400'
              return (
                <div key={cliente.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_48px] gap-y-2 md:gap-4 items-center px-5 py-4 hover:bg-neutral-800/20 transition group">
                  <div className="flex items-center gap-3">
                    <div className={`size-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${cliente.estado === 'vip' ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'}`}>{cliente.avatar}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-white truncate">{cliente.nombre}</p>
                        {'esReal' in cliente && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Supabase
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono truncate">{('email' in cliente && cliente.email) ? String(cliente.email) : cliente.telefono}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-1.5 text-xs text-neutral-400"><span className="size-1.5 rounded-full bg-neutral-700 shrink-0" />{cliente.ciudad}</div>
                  <div className="hidden md:flex items-center gap-2 text-xs"><CanalIcon className={`size-3.5 ${canalColor}`} /><span className="text-neutral-400">{cliente.canal}</span></div>
                  <div className="hidden md:flex items-center gap-1.5 text-xs"><ShoppingBag className="size-3.5 text-neutral-600" /><span className="font-bold text-white">{cliente.compras}</span><span className="text-neutral-500">pedidos</span></div>
                  <div className="hidden md:block"><span className="text-sm font-black text-white">{fmt(cliente.totalGastado)}</span><p className="text-[10px] text-neutral-500 mt-0.5">{cliente.ultimaCompra}</p></div>
                  <div className="flex md:justify-start">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${ec.color}`}>
                      <span className={`size-1.5 rounded-full ${ec.dot}`} />{ec.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-end md:justify-center gap-1.5">
                    {cliente.telefono && cliente.telefono.replace(/[^0-9]/g, '').length >= 8 && (
                      <a
                        href={`https://wa.me/${cliente.telefono.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`¡Hola ${cliente.nombre}! Te escribimos desde Seal Step Uruguay.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-black transition"
                        title="Escribir por WhatsApp"
                      >
                        <Phone className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <div className="flex items-center justify-between px-5 py-3 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-semibold">
          <span>Mostrando <span className="text-white">{filtrados.length}</span> clientes registrados y contactos</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Sparkles className="size-3.5" />
            Sincronizado en tiempo real con Supabase (Auth &amp; Pedidos)
          </span>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', title: 'Clientes desde Web',     desc: 'Cuando un usuario inicie sesion y realice un pedido, su perfil se registrara aqui automaticamente.' },
          { icon: Phone,        color: 'text-green-400 bg-green-500/10 border-green-500/20',       title: 'Leads de WhatsApp',     desc: 'Con N8N conectado a WhatsApp Business API, cada conversacion genera un contacto en Supabase.' },
          { icon: Clock,        color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',             title: 'Historial de Compras',  desc: 'Cada pedido completado actualiza el contador y el total gastado del cliente en tiempo real.' },
        ].map(card => {
          const Icon = card.icon
          return (
            <div key={card.title} className="rounded-2xl border border-neutral-800/80 bg-[#0d0d0d] p-5 space-y-3">
              <div className={`size-10 rounded-xl border flex items-center justify-center ${card.color}`}><Icon className="size-5" /></div>
              <p className="text-sm font-black text-white">{card.title}</p>
              <p className="text-xs text-neutral-500 leading-relaxed">{card.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
