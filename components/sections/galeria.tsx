import Image from 'next/image'
import { WA_LINKS } from '@/lib/site'
import { Reveal } from '@/components/reveal'

const ITEMS = [
  {
    titulo: 'Nike',
    subtitulo: 'Modelos deportivos',
    imagen: '/images/product-deportivos.png',
    alt: 'Champión deportivo blanco disponible en Seal Step',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    titulo: 'Adidas',
    subtitulo: 'Clásicos urbanos',
    imagen: '/images/product-urbanos.png',
    alt: 'Champión urbano negro disponible en Seal Step',
    span: '',
  },
  {
    titulo: 'Puma',
    subtitulo: 'Estilo streetwear',
    imagen: '/images/product-nuevos.png',
    alt: 'Championes botita blanco y negro disponibles en Seal Step',
    span: '',
  },
  {
    titulo: 'Modelos urbanos',
    subtitulo: 'Para el día a día',
    imagen: '/images/gallery-2.png',
    alt: 'Tres championes ordenados sobre superficie de hormigón oscuro',
    span: '',
  },
  {
    titulo: 'Modelos casuales',
    subtitulo: 'Versátiles y cómodos',
    imagen: '/images/product-casual.png',
    alt: 'Champión casual gris y blanco de lona',
    span: '',
  },
  {
    titulo: 'Nuevos ingresos',
    subtitulo: 'Stock recién llegado',
    imagen: '/images/gallery-3.png',
    alt: 'Cajas de championes apiladas en depósito de Seal Step',
    span: 'sm:col-span-2',
  },
]

export function Galeria() {
  return (
    <section
      id="galeria"
      className="border-b border-border py-20 lg:py-28"
      aria-labelledby="galeria-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-heading text-xs font-bold tracking-[0.22em] text-muted-foreground uppercase">
            Galería
          </p>
          <h2
            id="galeria-title"
            className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"
          >
            Modelos disponibles
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Explorá algunos de nuestros modelos más vendidos.
          </p>
        </Reveal>

        <ul className="mt-12 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[200px]">
          {ITEMS.map((item, i) => (
            <Reveal
              as="li"
              key={item.titulo}
              delay={i * 70}
              className={item.span}
            >
              <a
                href={WA_LINKS.modelo(item.titulo)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-foreground/30"
              >
                <Image
                  src={item.imagen}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent"
                />
                <div className="relative mt-auto p-5">
                  <h3 className="font-heading text-lg font-bold">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.subtitulo}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={100} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            También manejamos ventas por mayor con descuentos por cantidad.{' '}
            <a
              href={WA_LINKS.mayorista}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Consultar precios mayoristas
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
