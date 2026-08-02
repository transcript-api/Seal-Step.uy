import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { Reveal } from '@/components/reveal'

const CATEGORIAS = [
  {
    nombre: 'Urbanos',
    descripcion: 'Clásicos con suela gum y diseño gris para el día a día.',
    imagen: '/images/product-urbanos.png',
    alt: 'Champión urbano gris con franjas blancas y suela gum de Seal Step',
  },
  {
    nombre: 'Deportivos',
    descripcion: 'Amortiguación chunky en plateado y azul para entrenar o caminar.',
    imagen: '/images/product-deportivos.png',
    alt: 'Champión deportivo plateado y azul marino con logo lateral',
  },
  {
    nombre: 'Casual',
    descripcion: 'Modelos versátiles en gris y blanco que combinan con todo.',
    imagen: '/images/product-casual.png',
    alt: 'Champión casual gris y blanco con cordones tipo soga y suela gum',
  },
  {
    nombre: 'Nuevos ingresos',
    descripcion: 'Lo último que entró al stock, en cantidades limitadas.',
    imagen: '/images/product-nuevos.png',
    alt: 'Champión blanco y negro estilo panda, nuevo ingreso',
  },
]

export function Productos() {
  return (
    <section
      id="productos"
      className="border-b border-border py-20 lg:py-28"
      aria-labelledby="productos-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-heading text-xs font-bold tracking-[0.22em] text-muted-foreground uppercase">
            Productos destacados
          </p>
          <h2
            id="productos-title"
            className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"
          >
            Encontrá tu próximo par
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Trabajamos con una selección de modelos urbanos, deportivos y
            casuales para quienes buscan estilo, comodidad y buen precio.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIAS.map((cat, i) => (
            <Reveal as="li" key={cat.nombre} delay={i * 90}>
              <a
                href={WA_LINKS.modelo(cat.nombre)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/30"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-secondary">
                  <Image
                    src={cat.imagen}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full border border-border bg-background/80 px-3 py-1 font-heading text-[10px] font-bold tracking-[0.16em] uppercase backdrop-blur">
                    {cat.nombre}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-bold">
                    {cat.nombre}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {cat.descripcion}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-bold">
                    Consultar precio
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal
          delay={120}
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:p-8"
        >
          <div>
            <h3 className="font-heading text-xl font-bold text-balance">
              ¿Compras en cantidad? Tenemos precios por mayor
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Descuentos por volumen para revendedores y emprendimientos de todo
              el país.
            </p>
          </div>
          <a
            href={WA_LINKS.mayorista}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 font-heading text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            <WhatsAppIcon className="size-4" />
            Solicitar precios mayoristas
          </a>
        </Reveal>
      </div>
    </section>
  )
}
