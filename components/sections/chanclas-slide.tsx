import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'

const SLIDES = [
  {
    nombre: 'SLIDE Nike Beige',
    badge: 'LANZAMIENTO',
    talles: 'Del 37 al 44',
    color: 'Beige',
    href: '/producto/chanclas-slide-nike-beige',
    images: [
      '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_1.jpg',
      '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_2.jpg',
    ],
  },
  {
    nombre: 'SLIDE Nike Gris',
    badge: 'LANZAMIENTO',
    talles: 'Del 37 al 44',
    color: 'Gris',
    href: '/producto/chanclas-slide-nike-gris',
    images: [
      '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_1.jpg',
      '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_2.jpg',
    ],
  },
]

export function ChanclasSlideBanner() {
  return (
    <section
      id="chanclas-slide"
      className="relative border-b border-border overflow-hidden py-20 lg:py-28"
      aria-labelledby="slides-title"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[700px] rounded-full bg-white/[0.035] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-white" />
            </span>
            Nueva Colección · Reposición Disponible
          </span>

          <h2
            id="slides-title"
            className="mt-5 font-heading text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            Chanclas{' '}
            <span className="relative inline-block">
              <span className="relative z-10">SLIDE Nike</span>
              <span
                aria-hidden="true"
                className="absolute -inset-1 -skew-x-3 bg-white/10 blur-sm rounded-lg"
              />
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-400 sm:text-lg max-w-lg mx-auto">
            Espuma ultra suave, suela ergonómica y diseño minimalista de
            temporada. Disponibles en dos colorways — Beige y Gris.
          </p>
        </Reveal>

        {/* Product Cards */}
        <div className="mt-14 grid grid-cols-2 gap-2 sm:gap-5 lg:gap-8 max-w-3xl mx-auto">
          {SLIDES.map((slide, i) => (
            <Reveal key={slide.nombre} delay={i * 120}>
              <Link href={slide.href} className="group block min-w-0">
                <div className="led-card-hover relative rounded-3xl cursor-pointer overflow-visible min-w-0">
                  {/* Main image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-[calc(1.5rem-2px)] bg-neutral-900">
                    <Image
                      src={slide.images[0]}
                      alt={slide.nombre}
                      fill
                      sizes="(max-width: 640px) 50vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badge overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-0.5 font-heading text-[9px] font-black uppercase tracking-[0.2em] text-black shadow">
                        {slide.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="rounded-b-[calc(1.5rem-2px)] bg-neutral-950 px-2.5 py-3 sm:px-5 sm:py-4">
                    <h3 className="font-heading text-[11px] sm:text-base font-extrabold uppercase tracking-tight text-white group-hover:text-neutral-300 transition leading-tight">
                      {slide.nombre}
                    </h3>
                    <div className="mt-2 flex items-center justify-between gap-2 text-[10px] sm:text-xs text-neutral-400">
                      <span className="min-w-0 truncate">Talles: <strong className="text-white">{slide.talles}</strong></span>
                      <span className="shrink-0 rounded-full bg-neutral-800 border border-neutral-700 px-1.5 py-0.5 text-[9px] sm:px-2.5 sm:text-[10px] text-emerald-400 font-bold">
                        Reposición
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* CTA strip */}
        <Reveal delay={250} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/slides"
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 font-heading text-sm font-bold text-black transition-transform duration-300 hover:scale-[1.03] shadow-xl shadow-black/60"
          >
            Ver toda la colección Slide
          </Link>
          <a
            href={WA_LINKS.general}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-8 py-3.5 font-heading text-sm font-bold transition-colors duration-300 hover:bg-secondary"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            Consultar por WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
