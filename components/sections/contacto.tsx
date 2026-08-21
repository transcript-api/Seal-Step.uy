import { Clock, MapPin, Phone } from 'lucide-react'
import { WA_LINKS, WHATSAPP_DISPLAY } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { Reveal } from '@/components/reveal'
import { AshText } from '@/components/ash-text'

const DATOS = [
  { icon: Phone, label: 'WhatsApp', value: WHATSAPP_DISPLAY },
  { icon: MapPin, label: 'Ubicación', value: 'Rivera, Uruguay' },
  { icon: Clock, label: 'Entregas', value: 'Entre 24 y 72 horas' },
]

export function Contacto() {
  return (
    <section
      id="contacto"
      className="py-20 lg:py-28"
      aria-labelledby="contacto-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2
              id="contacto-title"
              className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance"
            >
              <AshText as="span">Hacé tu pedido ahora</AshText>
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Consultá disponibilidad, talles y precios directamente por
              WhatsApp.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={WA_LINKS.general}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 font-heading text-base font-bold text-primary-foreground shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-[1.03] sm:w-auto"
              >
                <WhatsAppIcon className="size-5" />
                Hablar por WhatsApp
              </a>
              <a
                href={WA_LINKS.mayorista}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-8 py-4 font-heading text-base font-bold transition-colors duration-300 hover:bg-secondary sm:w-auto"
              >
                Quiero comprar por mayor
              </a>
            </div>

            <p className="mt-6 font-heading text-lg font-bold tracking-wide">
              {WHATSAPP_DISPLAY}
            </p>

            <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-border pt-8 text-center">
              {DATOS.map((d, i) => (
                <li key={d.label} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 sm:border-neutral-800/60 sm:bg-neutral-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                  <d.icon
                    className="size-4.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="font-heading text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                    {d.label}
                  </span>
                  <span className="text-xs sm:text-sm font-medium">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
