import Image from 'next/image'
import { ArrowRight, Check, MapPin } from 'lucide-react'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { Reveal } from '@/components/reveal'

const INDICADORES = [
  'Envíos a todo Uruguay',
  'Atención personalizada',
  'Compra segura',
  'Ventas por mayor disponibles',
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div>
          <Reveal className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <MapPin className="size-3.5" />
            Rivera, Uruguay — Envíos a todo el país
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-heading text-5xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              SEAL STEP
            </h1>
            <p className="mt-5 max-w-xl font-heading text-xl leading-snug font-semibold text-pretty sm:text-2xl">
              Los championes que buscás, al mejor precio y con envío a todo
              Uruguay.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              Modelos modernos, atención personalizada y entregas rápidas.
              Comprá desde cualquier parte del país o consultá por precios
              especiales para revendedores.
            </p>
          </Reveal>

          <Reveal
            delay={240}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={WA_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-4 font-heading text-base font-bold text-primary-foreground shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-[1.03]"
            >
              <WhatsAppIcon className="size-5" />
              Comprar por WhatsApp
            </a>
            <a
              href={WA_LINKS.catalogo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-4 font-heading text-base font-bold transition-colors duration-300 hover:bg-secondary"
            >
              Consultar catálogo
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-10 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {INDICADORES.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Check className="size-3 text-foreground" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
            <Image
              src="/images/hero-sneaker.png"
              alt="Champión urbano blanco y negro de Seal Step sobre fondo oscuro"
              width={1200}
              height={1200}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
            />
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background/80 px-4 py-3 backdrop-blur-md">
              <div>
                <p className="font-heading text-sm font-bold tracking-wide uppercase">
                  Nuevos ingresos
                </p>
                <p className="text-xs text-muted-foreground">
                  Urbanos · Deportivos · Casual
                </p>
              </div>
              <a
                href={WA_LINKS.mayorista}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-4 py-2 font-heading text-xs font-bold text-primary-foreground"
              >
                Precios por mayor
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
