import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, ChevronRight } from 'lucide-react'
import { getProductosPorMarca, getMarcaConfig } from '@/lib/productos'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { Reveal } from '@/components/reveal'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { AshText } from '@/components/ash-text'

export const metadata = {
  title: 'Chanclas Slide Importadas | Seal Step',
  description: 'Colección exclusiva de chanclas slide, slides y calzado de verano importado.',
}

export default function SlidesPage() {
  const config = getMarcaConfig('slides')
  const productos = getProductosPorMarca('slides')

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Navegación migas de pan" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="font-semibold text-foreground">Chanclas Slide</span>
          </nav>

          {/* Header Banner */}
          <Reveal className="rounded-3xl border border-border bg-card p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-neutral-900 border border-neutral-700 px-3 py-1 text-xs font-bold uppercase tracking-widest text-neutral-300">
                    EDICION VERANO
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {productos.length} {productos.length === 1 ? 'modelo' : 'modelos'}
                  </span>
                </div>
                <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-extrabold tracking-tight uppercase">
                  <AshText as="span">Chanclas Slide</AshText>
                </h1>
                <p className="mt-2 text-base text-muted-foreground max-w-xl">
                  {config?.descripcion ?? 'Colección de chanclas slide y calzado cómodo de verano importado.'}
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/#productos"
                  className="px-4 py-2 rounded-full border border-border bg-secondary text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  Ver todos los modelos
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Product Grid or Empty State */}
          <div className="mt-12">
            {productos.length > 0 ? (
              <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                {productos.map((producto, i) => (
                  <Reveal as="li" key={producto.slug} delay={i * 80}>
                    <Link
                      href={`/producto/${producto.slug}`}
                      className="group led-card-hover flex h-full flex-col rounded-2xl sm:rounded-3xl cursor-pointer"
                    >
                      <div className="relative aspect-square sm:aspect-4/3 overflow-hidden bg-neutral-900 rounded-t-[calc(1rem-2px)] sm:rounded-t-[calc(1.5rem-2px)]">
                        <Image
                          src={producto.imagenes[0]?.src ?? '/images/hero-sneaker.png'}
                          alt={producto.imagenes[0]?.alt ?? producto.nombre}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 rounded-full border border-border bg-background/85 px-2.5 py-0.5 sm:px-3 sm:py-1 font-heading text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase backdrop-blur text-neutral-200">
                          {producto.categoria}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-3.5 sm:p-5 justify-between rounded-b-[calc(1rem-2px)] sm:rounded-b-[calc(1.5rem-2px)]">
                        <div>
                          <h3 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-tight leading-snug line-clamp-2">
                            {producto.nombre}
                          </h3>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 pt-2 border-t border-neutral-800/60">
                          <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-white">
                            Consultar precio
                            <ArrowUpRight className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                          <span className="self-start sm:self-auto rounded-full bg-neutral-900 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
                            ✓ ENCARGUE
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            ) : (
              <Reveal className="rounded-3xl border border-dashed border-border bg-card/50 p-10 sm:p-14 text-center max-w-2xl mx-auto my-10">
                <h3 className="mt-6 font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                  Próximamente nuevos ingresos de Chanclas Slide
                </h3>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Estamos renovando el catálogo con modelos slide y calzado importado. Podés enviarnos la foto del modelo que busques por WhatsApp y te lo traemos bajo encargo.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={WA_LINKS.general}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-heading text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
                  >
                    <WhatsAppIcon className="size-4" />
                    Encargar modelos por WhatsApp
                  </a>
                  <Link
                    href="/#productos"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3.5 font-heading text-sm font-bold text-foreground hover:bg-neutral-800 transition-colors"
                  >
                    Ver catálogo general
                  </Link>
                </div>
              </Reveal>
            )}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/#productos"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Volver a todos los productos en la página principal
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
