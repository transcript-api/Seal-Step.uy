import { Plus } from 'lucide-react'
import { WA_LINKS } from '@/lib/site'
import { Reveal } from '@/components/reveal'

const FAQS = [
  {
    q: '¿Hacen envíos a todo Uruguay?',
    a: 'Sí, realizamos envíos a cualquier departamento del país.',
  },
  {
    q: '¿Cuánto demora la entrega?',
    a: 'Dependiendo de la ubicación, normalmente entre 24 y 72 horas.',
  },
  {
    q: '¿Cómo puedo pagar?',
    a: 'Transferencia bancaria, Mercado Pago y otros métodos disponibles.',
  },
  {
    q: '¿Tienen ventas por mayor?',
    a: 'Sí. Ofrecemos precios especiales para revendedores y compras por volumen.',
  },
  {
    q: '¿Cómo hago mi pedido?',
    a: 'Simplemente escribinos por WhatsApp y te ayudaremos con todo el proceso.',
  },
]

export function Faq() {
  return (
    <section
      id="faq"
      className="border-b border-border py-20 lg:py-28"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="font-heading text-xs font-bold tracking-[0.22em] text-muted-foreground uppercase">
            Preguntas frecuentes
          </p>
          <h2
            id="faq-title"
            className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"
          >
            Todo lo que necesitás saber
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Si te queda alguna duda,{' '}
            <a
              href={WA_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              escribinos por WhatsApp
            </a>{' '}
            y te respondemos al instante.
          </p>
        </Reveal>

        <div className="grid gap-3">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 70}>
              <details className="group rounded-2xl border border-border bg-card px-5 transition-colors duration-300 open:border-foreground/25 hover:border-foreground/25">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-base font-bold text-pretty [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
