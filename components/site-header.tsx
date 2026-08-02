'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'

const NAV = [
  { label: 'Productos', href: '#productos' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Por mayor', href: '#mayorista' },
  { label: 'Galería', href: '#galeria' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
          ? 'border-b border-border bg-background/85 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-18 lg:px-8">
        <a
          href="#top"
          className="flex items-center"
          aria-label="Seal Step, inicio"
        >
          <Image
            src="/images/seal-step-logo.png"
            alt="Seal Step"
            width={150}
            height={48}
            priority
            className="h-9 w-auto object-contain mix-blend-screen invert lg:h-10"
          />
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WA_LINKS.general}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-heading text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Comprar por WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav
            aria-label="Navegación móvil"
            className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 font-heading text-sm font-semibold tracking-wide uppercase last:border-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href={WA_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-heading text-sm font-bold text-primary-foreground"
            >
              <WhatsAppIcon className="size-4" />
              Comprar por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
