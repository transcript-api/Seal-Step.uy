import Image from 'next/image'
import { ArrowRight, Check, MapPin, ShieldCheck, Sparkles, TrendingUp, Truck } from 'lucide-react'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { Reveal } from '@/components/reveal'
import { CarouselStacked } from '@/components/ui/carousel-07'
import { AshText } from '@/components/ash-text'
import { CounterStat } from '@/components/counter-stat'
import { ParallaxLayer } from '@/components/parallax-layer'

const STATS_HERO = [
  { value: 5000, prefix: '+', suffix: '', label: 'Pares enviados', icon: Truck },
  { value: 19, prefix: '', suffix: '', label: 'Departamentos', icon: MapPin },
  { value: 100, prefix: '', suffix: '%', label: 'Compra segura', icon: ShieldCheck },
  { value: 50, prefix: '+', suffix: '', label: 'Revendedores', icon: TrendingUp },
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      {/* Capa de luz ambiental 3D con desplazamiento diferencial */}
      <ParallaxLayer
        speed={0.4}
        className="pointer-events-none absolute -right-32 top-20 h-[500px] w-[500px] rounded-full bg-white/5 blur-[120px]"
        aria-hidden="true"
      />

      <ParallaxLayer
        speed={-0.2}
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
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
            <AshText as="span">Rivera, Uruguay — Envíos a todo el país</AshText>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative mt-6 inline-block">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-full bg-white/10 opacity-60 blur-3xl transition-opacity duration-1000 hover:opacity-90"
              />
              <Image
                src="/images/seal-step-logo.png"
                alt="Seal Step"
                width={458}
                height={97}
                priority
                className="animate-float-logo relative h-16 w-auto object-contain transition-transform duration-500 hover:scale-105 sm:h-24 lg:h-28"
              />
            </div>
            <p className="mt-5 max-w-xl font-heading text-xl leading-snug font-semibold text-pretty sm:text-2xl">
              <AshText as="span">Los championes que buscás, al mejor precio y con envío a todo Uruguay.</AshText>
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              <AshText as="span">
                Modelos modernos, atención personalizada y entregas rápidas. Comprá desde cualquier parte del país o consultá por precios especiales para revendedores.
              </AshText>
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
              <AshText as="span">Comprar por WhatsApp</AshText>
            </a>
            <a
              href={WA_LINKS.catalogo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-4 font-heading text-base font-bold transition-colors duration-300 hover:bg-secondary"
            >
              <AshText as="span">Consultar catálogo</AshText>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>

          {/* Estadísticas animadas con CounterStat */}
          <Reveal delay={300}>
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 rounded-2xl border border-border/80 bg-card/40 p-3 sm:p-4 backdrop-blur-sm">
              {STATS_HERO.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-muted-foreground">
                    <s.icon className="size-3 text-emerald-400" />
                    <span className="text-[11px] uppercase tracking-wider">{s.label}</span>
                  </div>
                  <p className="mt-1 font-heading text-lg sm:text-xl font-extrabold text-foreground">
                    <CounterStat
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      duration={1600}
                    />
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Carrusel 1 - Modelos destacados en abanico 3D con Parallax Layer */}
        <Reveal delay={200} className="relative w-full flex items-center justify-center">
          <ParallaxLayer speed={-0.12} className="w-full">
            <CarouselStacked />
          </ParallaxLayer>
        </Reveal>
      </div>
    </section>
  )
}
