'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronDown, ShoppingBag, Sparkles, Ruler } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { useOrder } from '@/lib/order-context'

const BRANDS_NAV = [
  { label: 'Nike', href: '/marca/nike', desc: 'Dunk Low e importados' },
  { label: 'Adidas', href: '/marca/adidas', desc: 'Campus, Samba, Gazelle' },
  { label: 'New Balance', href: '/marca/new-balance', desc: 'Siluetas 1000 y 9060' },
  { label: 'Slides', href: '/slides', desc: 'Coleccion de verano' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [brandsDropdown, setBrandsDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { totalCount, setIsDrawerOpen, setIsQuizOpen, setIsSizeGuideOpen } = useOrder()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBrandsDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-border bg-background/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-background/40 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-18 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Seal Step, inicio">
          <Image
            src="/images/seal-step-logo.png"
            alt="Seal Step"
            width={458}
            height={97}
            priority
            className="h-8 w-auto object-contain sm:h-9 lg:h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
          <Link
            href="/#productos"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Catálogo
          </Link>

          {/* Marcas Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setBrandsDropdown((v) => !v)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Marcas
              <ChevronDown className={cn('size-4 transition-transform duration-200', brandsDropdown && 'rotate-180')} />
            </button>

            {brandsDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl border border-border bg-card/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in-50 zoom-in-95">
                <div className="px-3 py-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  Filtrar por marca
                </div>
                {BRANDS_NAV.map((brand) => (
                  <Link
                    key={brand.href}
                    href={brand.href}
                    onClick={() => setBrandsDropdown(false)}
                    className="flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-neutral-800/80 group"
                  >
                    <span className="text-sm font-bold text-foreground group-hover:text-white flex items-center justify-between">
                      {brand.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{brand.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/slides"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Chanclas Slide
          </Link>

          <Link
            href="/mayoristas"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Por mayor
          </Link>

          {/* Interactive Tool Triggers */}
          <button
            type="button"
            onClick={() => setIsQuizOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition ml-2"
          >
            <Sparkles className="size-3.5" />
            Test de Estilo
          </button>
        </nav>

        {/* Right side: Bag → Social → Menu */}
        <div className="flex items-center gap-2">
          {/* Shopping Bag — between nav and social icons */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Abrir lista de pedido"
            className="relative flex size-9 items-center justify-center rounded-xl border border-neutral-800 bg-card text-foreground transition-all hover:bg-neutral-800 hover:border-neutral-600"
          >
            <ShoppingBag className="size-4.5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-emerald-500 font-heading text-[10px] font-black text-black">
                {totalCount}
              </span>
            )}
          </button>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/sealstep?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Seal Step"
            className="hidden sm:flex size-9 items-center justify-center rounded-xl border border-neutral-800 bg-card text-neutral-400 transition-all hover:text-pink-400 hover:border-pink-400/50 hover:bg-neutral-800"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4.5">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@santiago204__?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok de Seal Step"
            className="hidden sm:flex size-9 items-center justify-center rounded-xl border border-neutral-800 bg-card text-neutral-400 transition-all hover:text-sky-400 hover:border-sky-400/50 hover:bg-neutral-800"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4.5">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.2 8.2 0 0 0 4.79 1.52V7.02a4.85 4.85 0 0 1-1.02-.33z" />
            </svg>
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav aria-label="Navegación móvil" className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            <Link
              href="/#productos"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3.5 font-heading text-sm font-semibold tracking-wide uppercase"
            >
              Todos los productos
            </Link>

            <div className="border-b border-border/60 py-3">
              <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Marcas disponibles
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BRANDS_NAV.map((brand) => (
                  <Link
                    key={brand.href}
                    href={brand.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-border bg-card p-3 font-heading text-xs font-bold uppercase text-foreground hover:bg-neutral-800"
                  >
                    {brand.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/slides"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3.5 font-heading text-sm font-semibold tracking-wide uppercase"
            >
              Chanclas Slide
            </Link>

            <Link
              href="/mayoristas"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3.5 font-heading text-sm font-semibold tracking-wide uppercase"
            >
              Por mayor
            </Link>

            {/* Mobile interactive triggers */}
            <div className="grid grid-cols-2 gap-2 py-4 border-b border-border/60">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setIsQuizOpen(true)
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs font-bold text-emerald-400"
              >
                <Sparkles className="size-3.5" />
                Test de Estilo
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setIsSizeGuideOpen(true)
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card p-3 text-xs font-bold text-white"
              >
                <Ruler className="size-3.5" />
                Calculadora Talles
              </button>
            </div>

            {/* Social links in mobile menu */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/sealstep?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-card px-5 py-3 text-sm font-bold text-neutral-300 hover:text-pink-400 hover:border-pink-400/40 transition"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@santiago204__?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-card px-5 py-3 text-sm font-bold text-neutral-300 hover:text-sky-400 hover:border-sky-400/40 transition"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.2 8.2 0 0 0 4.79 1.52V7.02a4.85 4.85 0 0 1-1.02-.33z" />
                </svg>
                TikTok
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
