'use client'

import { useRef, MouseEvent, useEffect, useState } from 'react'
import { MessageCircle, ShieldCheck, Tag, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AshText } from '@/components/ash-text'
import { Reveal } from '@/components/reveal'

const BENEFICIOS = [
  {
    icon: Truck,
    titulo: 'Envios a todo el pais',
    texto: 'Recibi tu pedido estes donde estes.',
  },
  {
    icon: MessageCircle,
    titulo: 'Atencion personalizada',
    texto: 'Te ayudamos a elegir el modelo ideal.',
  },
  {
    icon: Tag,
    titulo: 'Excelente relacion calidad-precio',
    texto: 'Productos seleccionados para ofrecer el mejor valor.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Compra segura',
    texto: 'Proceso simple y transparente.',
  },
]

function SpotlightCard({
  icon: Icon,
  titulo,
  texto,
  delay = 0,
}: {
  icon: React.ElementType
  titulo: string
  texto: string
  delay?: number
}) {
  const cardRef = useRef<HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = cardRef.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  function handleMouseMove(e: MouseEvent<HTMLLIElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--sx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--sy', `${e.clientY - rect.top}px`)
    card.style.setProperty('--so', '1')
  }

  function handleMouseLeave() {
    cardRef.current?.style.setProperty('--so', '0')
  }

  return (
    <li
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          '--sx': '-999px',
          '--sy': '-999px',
          '--so': '0',
          transitionDelay: delay ? `${delay}ms` : undefined,
        } as React.CSSProperties
      }
      className={cn(
        'group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/30 overflow-hidden',
        'reveal',
        visible && 'reveal-in',
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: 'var(--so)',
          background:
            'radial-gradient(280px circle at var(--sx) var(--sy), rgba(255,255,255,0.065) 0%, transparent 65%)',
        }}
      />
      <div className="relative z-10">
        <span className="inline-flex size-9 sm:size-12 items-center justify-center rounded-xl bg-secondary transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
          <Icon className="size-4.5 sm:size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-3.5 sm:mt-5 font-heading text-xs sm:text-lg leading-snug font-bold text-balance text-white">
          {titulo}
        </h3>
        <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm leading-relaxed text-muted-foreground">
          {texto}
        </p>
      </div>
    </li>
  )
}

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
            className="mt-4 font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance"
          >
            <AshText as="span">¿Por qué elegir Seal Step?</AshText>
          </h2>
        </Reveal>

        <ul className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {BENEFICIOS.map((b, i) => (
            <SpotlightCard
              key={b.titulo}
              delay={i * 90}
              icon={b.icon}
              titulo={b.titulo}
              texto={b.texto}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}