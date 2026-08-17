'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, CheckCircle2, ShieldCheck, Truck, Package, MessageSquare } from 'lucide-react'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { AshText } from '@/components/ash-text'

interface MayoristaVideoProps {
  /**
   * Ruta opcional del archivo de video (ej: "/videos/fundador-mayorista.mp4").
   * Si no se provee, se muestra el estado placeholder de previsualización.
   */
  videoSrc?: string
  posterSrc?: string
}

export function MayoristaVideo({
  videoSrc,
  posterSrc = '/images/hero-sneaker.png',
}: MayoristaVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative overflow-hidden border-b border-border py-16 lg:py-24 bg-card/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Play className="size-3.5 fill-amber-300" />
            Mensaje Exclusivo del Fundador
          </span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <AshText as="span">Descubrí por qué somos los N°1 para revendedores en Uruguay</AshText>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Mirá este video donde explicamos cómo funciona la compra por mayor, la logística desde Rivera y cómo podés generar un negocio rentable en tu ciudad.
          </p>
        </div>

        <div className="mt-12 flex flex-col lg:flex-row gap-10 lg:items-start">
          {/* Contenedor del reproductor de video 9:16 */}
          <div className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/80 group" style={{width: 'min(440px, 100%)', aspectRatio: '9/16'}}>
              {videoSrc && isPlaying ? (
                <div className="w-full h-full">
                  <video
                    src={videoSrc}
                    controls
                    autoPlay
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full overflow-hidden bg-gradient-to-t from-black via-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                  <Image
                    src={posterSrc}
                    alt="Presentación mayorista Seal Step"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover opacity-40 mix-blend-overlay transition-scale duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                  {/* Botón Play animado */}
                  <button
                    type="button"
                    onClick={() => {
                      if (videoSrc) setIsPlaying(true)
                    }}
                    className="relative z-10 flex size-20 items-center justify-center rounded-full bg-emerald-500 text-black shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-110 hover:bg-emerald-400 group-hover:shadow-emerald-500/50"
                    aria-label="Reproducir mensaje del fundador"
                  >
                    <Play className="size-8 fill-black translate-x-0.5" />
                    <span className="absolute -inset-2 rounded-full border border-emerald-400/50 animate-ping opacity-30" />
                  </button>

                  <div className="relative z-10 mt-6 max-w-md">
                    <span className="inline-block rounded-full bg-background/80 px-3.5 py-1 text-xs font-semibold tracking-wide text-amber-300 border border-amber-500/30 backdrop-blur-md">
                      🎥 Espacio reservado para el video del dueño
                    </span>
                    <p className="mt-2 font-heading text-lg font-bold text-foreground">
                      Conocé en persona al equipo de Seal Step Rivera
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Hacé clic para reproducir las claves del negocio mayorista
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Puntos destacados del video */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <h3 className="font-heading text-2xl font-bold tracking-tight">
              Lo que aprenderás en esta presentación:
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3.5">
                <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="size-4" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-semibold text-foreground">
                    Origen y ventaja de Rivera
                  </h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Precios directos de frontera sin intermediarios para que tengas el máximo margen posible.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Package className="size-4" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-semibold text-foreground">
                    Lotes surtidos desde solo 8 pares
                  </h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Armá tu combo mezclando modelos de hombre y mujer, números del 38 al 43 a elección.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Truck className="size-4" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-semibold text-foreground">
                    Envíos blindados en 24 a 48 hs
                  </h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Despachamos directo a tu agencia de confianza en cualquiera de los 19 departamentos.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <MessageSquare className="size-4" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-semibold text-foreground">
                    Material publicitario listo para publicar
                  </h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Te entregamos fotos y videos HD profesionales para que promociones en Instagram, TikTok o Facebook.
                  </p>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={WA_LINKS.mayorista}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 font-heading text-base font-bold text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              >
                <WhatsAppIcon className="size-5" />
                Quiero hablar con un asesor mayorista
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
