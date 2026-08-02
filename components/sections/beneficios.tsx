import { MessageCircle, ShieldCheck, Tag, Truck } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const BENEFICIOS = [
  {
    icon: Truck,
    titulo: 'Envíos a todo el país',
    texto: 'Recibí tu pedido estés donde estés.',
  },
  {
    icon: MessageCircle,
    titulo: 'Atención personalizada',
    texto: 'Te ayudamos a elegir el modelo ideal.',
  },
  {
    icon: Tag,
    titulo: 'Excelente relación calidad-precio',
    texto: 'Productos seleccionados para ofrecer el mejor valor.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Compra segura',
    texto: 'Proceso simple y transparente.',
  },
]

export function Beneficios() {
  return (
    <section
      id="beneficios"
      className="border-b border-border py-20 lg:py-28"
      aria-labelledby="beneficios-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-heading text-xs font-bold tracking-[0.22em] text-muted-foreground uppercase">
            Beneficios
          </p>
          <h2
            id="beneficios-title"
            className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"
          >
            ¿Por qué elegir Seal Step?
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFICIOS.map((b, i) => (
            <Reveal
              as="li"
              key={b.titulo}
              delay={i * 90}
              className="group h-full rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/30"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-secondary transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                <b.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-lg leading-snug font-bold text-balance">
                {b.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b.texto}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
