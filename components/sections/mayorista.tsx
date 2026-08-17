import Image from 'next/image'
import { Check, TrendingUp } from 'lucide-react'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { Reveal } from '@/components/reveal'
import { AshText } from '@/components/ash-text'

import { ParallaxLayer } from '@/components/parallax-layer'

const BENEFICIOS = [
  'Descuentos por cantidad',
  'Stock actualizado',
  'Atención personalizada',
  'Ideal para revendedores',
  'Oportunidad de generar ingresos',
]

export function Mayorista() {
  return (
    <section
      id="mayorista"
      className="relative overflow-hidden border-b border-border py-20 lg:py-28"
      aria-labelledby="mayorista-title"
    >
      <ParallaxLayer speed={-0.35} className="absolute -inset-16 pointer-events-none" aria-hidden="true">
        <Image
          src="/images/gallery-3.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35 scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      </ParallaxLayer>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8">
        <div>
          <Reveal className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <TrendingUp className="size-3.5" />
            Programa mayorista Seal Step
          </Reveal>

          <Reveal delay={80}>
            <h2
              id="mayorista-title"
              className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"
            >
              <AshText as="span">¿Querés revender championes?</AshText>
            </h2>
            <p className="mt-4 font-heading text-xl font-semibold text-pretty">
              Comprá por mayor y empezá tu negocio.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              Si tenés una tienda, emprendimiento o querés comenzar a vender
              calzado, Seal Step también ofrece ventas por mayor con condiciones
              especiales.
            </p>
          </Reveal>

          <Reveal delay={160} className="mt-8 flex flex-wrap gap-4">
            <a
              href="/mayoristas"
              className="inline-flex items-center gap-2.5 rounded-full bg-emerald-500 px-7 py-4 font-heading text-base font-bold text-black shadow-lg shadow-emerald-500/20 transition-transform duration-300 hover:scale-[1.03]"
            >
              Ver Propuesta Mayorista
            </a>
            <a
              href={WA_LINKS.mayorista}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-7 py-4 font-heading text-base font-bold transition-colors hover:bg-secondary"
            >
              <WhatsAppIcon className="size-5" />
              Solicitar precios mayoristas
            </a>
          </Reveal>
        </div>

        <Reveal
          delay={140}
          className="rounded-3xl border border-border bg-card/90 p-6 backdrop-blur-sm sm:p-8"
        >
          <h3 className="font-heading text-sm font-bold tracking-[0.18em] text-muted-foreground uppercase">
            Lo que incluye
          </h3>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            {BENEFICIOS.map((b, idx) => (
              <li
                key={b}
                className={`flex items-start gap-2 sm:gap-3 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 sm:bg-transparent sm:border-none sm:p-0 ${
                  idx === BENEFICIOS.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <span className="mt-0.5 flex size-5 sm:size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="size-3 sm:size-3.5" />
                </span>
                <span className="font-heading text-xs sm:text-base font-semibold text-pretty">
                  {b}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
            Escribinos y armamos un presupuesto según la cantidad de pares que
            necesités.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
