'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CheckCircle2, Play, Pause, Volume2, VolumeX, Sparkles, ShieldCheck, Truck } from 'lucide-react'
import { AshText } from '@/components/ash-text'

interface VideoStage {
  progressStart: number
  progressEnd: number
  tag: string
  title: string
  desc: string
  icon: typeof Sparkles
}

const STAGES: VideoStage[] = [
  {
    progressStart: 0,
    progressEnd: 0.35,
    tag: 'Fase 01 • Selección',
    title: 'Calidad Premium Verificada',
    desc: 'Seleccionamos los modelos más buscados y testeamos cada terminación para garantizar la máxima durabilidad.',
    icon: Sparkles,
  },
  {
    progressStart: 0.35,
    progressEnd: 0.7,
    tag: 'Fase 02 • Almacén en Rivera',
    title: 'Preparación y Control Directo',
    desc: 'Empacamos cada pedido en nuestro centro logístico en Rivera asegurando que llegue en óptimas condiciones.',
    icon: ShieldCheck,
  },
  {
    progressStart: 0.7,
    progressEnd: 1.0,
    tag: 'Fase 03 • Despacho Nacional',
    title: 'Envíos Rápidos a todo Uruguay',
    desc: 'Coordinamos con las principales agencias para que recibas tus championes en 24 a 72 horas estés donde estés.',
    icon: Truck,
  },
]

interface ScrollVideoShowcaseProps {
  videoSrc?: string
  posterSrc?: string
}

export function ScrollVideoShowcase({
  videoSrc = '/Videos/fundador-mayorista.mp4',
  posterSrc = '/images/hero-sneaker.png',
}: ScrollVideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlayingManual, setIsPlayingManual] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Detect touch device / reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(max-width: 1024px)').matches
      setIsTouchDevice(touch)
    }
  }, [])

  // Desktop scroll-driven playback
  useEffect(() => {
    if (isTouchDevice || !videoLoaded) return

    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    video.pause()

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!container || !video || !video.duration) {
            ticking = false
            return
          }

          const rect = container.getBoundingClientRect()
          const totalScrollable = container.offsetHeight - window.innerHeight

          if (totalScrollable <= 0) {
            ticking = false
            return
          }

          const scrolled = -rect.top
          const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollable))
          setProgress(currentProgress)

          // Sync video currentTime smoothly
          if (!isPlayingManual) {
            const targetTime = currentProgress * video.duration
            if (Math.abs(video.currentTime - targetTime) > 0.05) {
              video.currentTime = targetTime
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTouchDevice, videoLoaded, isPlayingManual])

  const activeStage = STAGES.find(
    (s) => progress >= s.progressStart && progress <= s.progressEnd
  ) || STAGES[0]

  return (
    <div
      ref={containerRef}
      className={`relative ${
        isTouchDevice ? 'py-12' : 'h-[250vh]'
      }`}
    >
      <div
        className={`${
          isTouchDevice
            ? 'relative'
            : 'sticky top-20 flex min-h-[85vh] items-center justify-center'
        } mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}
      >
        <div className="grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Columna Video */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="group relative aspect-video w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-black/80 shadow-2xl shadow-black">
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                playsInline
                muted={isMuted}
                autoPlay={isTouchDevice}
                loop={isTouchDevice}
                onLoadedMetadata={() => setVideoLoaded(true)}
                className="h-full w-full object-cover"
              />

              {/* Overlay gradiente cinematográfico */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Barra de progreso de scroll (Desktop) */}
              {!isTouchDevice && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/15">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-75"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
              )}

              {/* Controles de audio y pausa */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted
                      setIsMuted(!isMuted)
                    }
                  }}
                  className="flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-transform hover:scale-110"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? (
                    <VolumeX className="size-4 text-white/80" />
                  ) : (
                    <Volume2 className="size-4 text-emerald-400" />
                  )}
                </button>
              </div>

              {/* Indicador interactivo */}
              {!isTouchDevice && (
                <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md border border-white/10">
                  <span>Scroll interactivo ({Math.round(progress * 100)}%)</span>
                </div>
              )}
            </div>
          </div>

          {/* Columna Información contextual que cambia con el scroll */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <activeStage.icon className="size-3.5" />
              <span>{activeStage.tag}</span>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl transition-all duration-300">
                <AshText as="span">{activeStage.title}</AshText>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base transition-all duration-300">
                {activeStage.desc}
              </p>
            </div>

            {/* Pasos visuales */}
            <div className="space-y-3 pt-2">
              {STAGES.map((s, idx) => {
                const isActive = activeStage.tag === s.tag
                return (
                  <div
                    key={s.tag}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 transition-all duration-300 ${
                      isActive
                        ? 'border-emerald-500/50 bg-card/80 shadow-md shadow-emerald-500/10 -translate-y-0.5'
                        : 'border-border/60 bg-card/30 opacity-60'
                    }`}
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-xl font-heading text-xs font-bold ${
                        isActive
                          ? 'bg-emerald-500 text-black'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <p className="font-heading text-xs sm:text-sm font-bold text-white">
                        {s.title}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
