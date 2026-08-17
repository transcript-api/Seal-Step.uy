import Image from 'next/image'
import { Quote } from 'lucide-react'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { Reveal } from '@/components/reveal'
import { AshText } from '@/components/ash-text'

import { ParallaxLayer } from '@/components/parallax-layer'

const TESTIMONIOS = [
  {
    texto:
      'Excelente atención y los championes llegaron antes de lo esperado. Muy recomendables.',
    autor: 'Cliente verificado',
  },
  {
    texto: 'Compré para revender y tuve muy buena ganancia. Volveré a comprar.',
    autor: 'Revendedor mayorista',
  },
]

export function Nosotros() {
  return (
    <section
      id="nosotros"
      className="relative border-b border-border py-20 lg:py-28 overflow-hidden"
      aria-labelledby="nosotros-title"
    >
      {/* Esfera de brillo ambiental 3D con parallax inverso */}
      <ParallaxLayer
        speed={0.35}
        className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl shadow-black/60 aspect-[4/5] sm:aspect-[3/4]">
            <ParallaxLayer speed={-0.18} className="absolute -inset-10">
              <Image
                src="/images/gallery-1.png"
                alt="Persona usando championes blancos Seal Step en la calle"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover scale-110"
              />
            </ParallaxLayer>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="font-heading text-xs font-bold tracking-[0.22em] text-muted-foreground uppercase">
              Sobre nosotros
            </p>
            <h2
              id="nosotros-title"
              className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"
            >
              <AshText as="span">Más que una tienda de championes</AshText>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              En Seal Step creemos que comprar calzado debe ser fácil, rápido y
              confiable. Trabajamos para ofrecer modelos modernos, buena
              atención y entregas seguras a cualquier punto de Uruguay.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Nuestro objetivo es que cada cliente encuentre el modelo que busca
              y tenga una experiencia de compra simple desde el primer mensaje.
            </p>
          </Reveal>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {TESTIMONIOS.map((t, i) => (
              <Reveal
                as="li"
                key={t.autor}
                delay={i * 100}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-3.5 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-lg hover:shadow-black/40"
              >
                <div>
                  <Quote
                    className="size-3.5 sm:size-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <blockquote className="mt-2.5 text-xs sm:text-sm leading-relaxed text-pretty text-neutral-200">
                    &ldquo;{t.texto}&rdquo;
                  </blockquote>
                </div>
                <p className="mt-3 font-heading text-[10px] sm:text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  {t.autor}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200} className="mt-8">
            <a
              href={WA_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-6 py-3.5 font-heading text-sm font-bold transition-colors duration-300 hover:bg-secondary"
            >
              <WhatsAppIcon className="size-4" />
              Hablar con un asesor
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
