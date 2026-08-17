import Image from 'next/image'
import { WA_LINKS, WHATSAPP_DISPLAY } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'

const LINKS = [
  { label: 'Productos', href: '/#productos' },
  { label: 'Beneficios', href: '/#beneficios' },
  { label: 'Ventas por mayor', href: '/mayoristas' },
  { label: 'Galería', href: '/#galeria' },
  { label: 'Preguntas frecuentes', href: '/#faq' },
]

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sealstep?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
    hoverColor: 'hover:text-pink-400 hover:border-pink-400/50',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@santiago204__?is_from_webapp=1&sender_device=pc',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.2 8.2 0 0 0 4.79 1.52V7.02a4.85 4.85 0 0 1-1.02-.33z" />
      </svg>
    ),
    hoverColor: 'hover:text-sky-400 hover:border-sky-400/50',
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Image
            src="/images/seal-step-logo.png"
            alt="Seal Step"
            width={458}
            height={97}
            className="h-10 w-auto object-contain sm:h-12"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Championes y calzado urbano para hombre y mujer. Envíos a todo
            Uruguay y ventas por mayor para revendedores. Rivera, Uruguay.
          </p>

          {/* Social Icons under logo */}
          <div className="mt-5 flex items-center gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`flex size-9 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 text-neutral-400 transition-all duration-300 ${s.hoverColor} hover:bg-neutral-800`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Secciones del sitio">
          <h2 className="font-heading text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Secciones
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Contacto
          </h2>
          <p className="mt-4 font-heading text-lg font-bold">
            {WHATSAPP_DISPLAY}
          </p>
          <a
            href={WA_LINKS.general}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-heading text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            <WhatsAppIcon className="size-4" />
            Escribinos ahora
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 pt-5 pb-24 text-xs text-muted-foreground sm:flex-row sm:px-6 sm:pb-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Seal Step. Todos los derechos
            reservados.
          </p>
          <p>Rivera, Uruguay &middot; Envíos a todo el país</p>
        </div>
      </div>
    </footer>
  )
}
