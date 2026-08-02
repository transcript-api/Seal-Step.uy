import Image from 'next/image'
import { Quote } from 'lucide-react'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { Reveal } from '@/components/reveal'

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
      className="border-b border-border py-20 lg:py-28"
      aria-labelledby="nosotros-title"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <Image
              src="/images/gallery-1.png"
              alt="Persona usando championes blancos Seal Step en la calle"
              width={900}
              height={1100}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
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
              Más que una tienda de championes
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

          <ul className="mt-8 grid gap-4">
            {TESTIMONIOS.map((t, i) => (
              <Reveal
                as="li"
                key={t.autor}
                delay={i * 100}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <Quote
                  className="size-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <blockquote className="mt-3 leading-relaxed text-pretty">
                  &ldquo;{t.texto}&rdquo;
                </blockquote>
                <p className="mt-3 font-heading text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
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
