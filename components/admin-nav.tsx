'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingBag,
  Star,
  Video,
  Users,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Sliders,
  LogOut,
} from 'lucide-react'

export function AdminNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  if (pathname === '/admin/login') {
    return null
  }

  const navItems = [
    { href: '/admin', label: 'Resumen General', icon: LayoutDashboard, exact: true },
    { href: '/admin/portada', label: 'Portada & Orden', icon: Star, badge: 'Arrastrar' },
    { href: '/admin/productos', label: 'Catálogo de Productos', icon: ShoppingBag },
    { href: '/admin/videos', label: 'Videos & Banners', icon: Video },
    { href: '/admin/crm', label: 'CRM & Clientes', icon: Users, badge: 'WhatsApp' },
    { href: '/admin/configuracion', label: 'Ajustes de Tienda', icon: Sliders },
  ]

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      window.location.href = '/admin/login'
    } catch {
      window.location.href = '/admin/login'
    }
  }

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3.5 bg-[#0d0d0d] border-b border-neutral-800 sticky top-0 z-40">
        <Link href="/admin" prefetch={false} className="flex items-center gap-3">
          <div className="relative h-10 w-36">
            <Image
              src="/images/seal-step-logo.png"
              alt="Seal Step"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            Admin
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú"
          className="size-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white transition"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Sidebar Desktop y Drawer Móvil */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#0c0c0c] border-r border-neutral-800/90 flex flex-col justify-between shrink-0 transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="overflow-y-auto">
          {/* Header del Panel (Desktop) */}
          <div className="p-6 border-b border-neutral-800/80 hidden md:flex items-center justify-between">
            <Link href="/admin" prefetch={false} className="flex flex-col gap-2 group">
              <div className="relative h-12 w-44">
                <Image
                  src="/images/seal-step-logo.png"
                  alt="Seal Step Logo"
                  fill
                  className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Panel Maestro
              </span>
            </Link>
          </div>

          {/* Menú de Navegación Principal */}
          <nav className="p-4 space-y-2">
            {/* SECCIÓN 1: TIENDA Y CATÁLOGO */}
            <div className="px-3 pb-1 pt-1 text-[10px] font-black uppercase tracking-widest text-neutral-500 flex items-center justify-between">
              <span>Gestión Comercial</span>
              <span className="text-[9px] text-neutral-600 font-mono">TIENDA</span>
            </div>

            {navItems.slice(0, 4).map((item) => {
              const active = isActive(item)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    active
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <Icon className={`size-4 transition ${active ? 'text-black' : 'text-neutral-400 group-hover:text-emerald-400'}`} />
                  <div className="flex items-center justify-between flex-1">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          active
                            ? 'bg-black text-emerald-400'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}

            {/* ========================================================================= */}
            {/* LÍNEA BIEN MARCANTE QUE SEPARA LO DEL CRM */}
            {/* ========================================================================= */}
            <div className="pt-4 pb-2">
              <div className="relative flex items-center">
                <div className="flex-grow border-t-2 border-neutral-700/80" />
                <span className="shrink-0 px-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/90 bg-[#141414] py-1 rounded-md border border-emerald-500/30">
                  CRM & CLIENTES
                </span>
                <div className="flex-grow border-t-2 border-neutral-700/80" />
              </div>
            </div>

            {/* SECCIÓN 2: CRM & AUTOMATIZACIÓN */}
            {navItems.slice(4).map((item) => {
              const active = isActive(item)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all group border ${
                    active
                      ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/20'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-emerald-500/40 hover:bg-neutral-800/80'
                  }`}
                >
                  <Icon className={`size-4 transition ${active ? 'text-black' : 'text-emerald-400 group-hover:scale-110'}`} />
                  <div className="flex items-center justify-between flex-1">
                    <div className="flex flex-col text-left">
                      <span>{item.label}</span>
                      <span className={`text-[10px] font-normal ${active ? 'text-neutral-900 font-medium' : 'text-neutral-400'}`}>
                        Leads & WhatsApp Bot
                      </span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          active
                            ? 'bg-black text-emerald-400'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-neutral-800/80 space-y-3 shrink-0">
          <Link
            href="/"
            target="_blank"
            prefetch={false}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white transition shadow-sm"
          >
            <span>Ver Tienda Pública</span>
            <ExternalLink className="size-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-bold text-red-400 hover:text-red-300 transition"
          >
            <LogOut className="size-3.5" />
            <span>Cerrar Sesión</span>
          </button>

          <div className="flex items-center justify-between px-2 text-[11px] text-neutral-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>Base Activa</span>
            </span>
            <span className="text-[9px] font-mono text-neutral-400">v2.0</span>
          </div>
        </div>
      </aside>

      {/* Backdrop en móvil al abrir menú */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>
  )
}
