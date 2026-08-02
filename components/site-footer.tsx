import { WA_LINKS, WHATSAPP_DISPLAY } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'

const LINKS = [
  { label: 'Productos', href: '#productos' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Sobre nosotros', href: '#nosotros' },
  { label: 'Ventas por mayor', href: '#mayorista' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Preguntas frecuentes', href: '#faq' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-foreground font-heading text-sm font-extrabold text-background">
              SS
            </span>
            <span className="font-heading text-base font-extrabold tracking-[0.18em] uppercase">
              Seal Step
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Championes y calzado urbano para hombre y mujer. Envíos a todo
            Uruguay y ventas por mayor para revendedores. Rivera, Uruguay.
          </p>
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 pt-6 pb-24 text-xs text-muted-foreground sm:flex-row sm:px-6 sm:pb-6 lg:px-8">
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
