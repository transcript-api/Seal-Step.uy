'use client'

import { useRef, useState } from 'react'
import { Play, Pause, Sparkles } from 'lucide-react'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { InstagramIcon } from '@/components/instagram-icon'
import { Reveal } from '@/components/reveal'
import { AshText } from '@/components/ash-text'

const VIDEOS = [
  {
    id: 'video-1',
    src: '/Videos%20sin%20sonido/sealstep_DG894csS2o2.mp4',
    tag: 'Nike',
    label: 'Revisá la calidad',
  },
  {
    id: 'video-2',
    src: '/Videos%20sin%20sonido/sealstep_DJMpagGxIsh.mp4',
    tag: 'Adidas',
    label: 'Mirá los detalles',
  },
  {
    id: 'video-3',
    src: '/Videos%20sin%20sonido/sealstep_DQFNL6yD_oi.mp4',
    tag: 'New Balance',
    label: 'En nuestras manos',
  },
  {
    id: 'video-4',
    src: '/Videos%20sin%20sonido/sealstep_DXZf-EiDVE4.mp4',
    tag: 'Importados',
    label: 'Nuevos ingresos',
  },
  {
    id: 'video-5',
    src: '/Videos%20sin%20sonido/sealstep_DYz8pL1R5DJ.mp4',
    tag: 'Stock disponible',
    label: 'Modelos actuales',
  },
]

function VideoCard({ video, index }: { video: (typeof VIDEOS)[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <Reveal as="div" delay={index * 90} className="h-full">
      <div
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/80 shadow-2xl transition-all duration-500 hover:border-neutral-600 hover:-translate-y-2 hover:shadow-black"
        onClick={togglePlay}
      >
        {/* Video Container (Vertical 9:16 Reel Aspect Ratio) */}
        <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={video.src}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

          {/* Top Instagram Reel Pill — only account tag, no 'Video Real' badge */}
          <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
            <span className="flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 px-2.5 py-1 text-[10px] font-bold text-white uppercase backdrop-blur-md">
              <InstagramIcon className="size-3 text-pink-400" />
              <span>@sealstep.uy</span>
            </span>
          </div>

          {/* Center Play/Pause Indicator (fades on hover) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`size-12 rounded-full bg-black/50 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-opacity duration-300 ${
                isPlaying ? 'opacity-0 group-hover:opacity-60' : 'opacity-100'
              }`}
            >
              {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 ml-0.5" />}
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              {video.tag}
            </span>
            <h3 className="mt-0.5 font-heading text-sm sm:text-base font-extrabold text-white leading-tight">
              {video.label}
            </h3>

            {/* Quick WhatsApp Inquiry */}
            <a
              href={WA_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex items-center justify-center gap-1.5 w-full rounded-2xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 py-2 px-3 text-xs font-bold transition-all duration-300 backdrop-blur-md"
            >
              <WhatsAppIcon className="size-3.5" />
              <span>Consultar este par</span>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function Galeria() {
  return (
    <section
      id="galeria"
      className="relative border-b border-border py-20 lg:py-28 overflow-hidden"
      aria-labelledby="videos-title"
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with high-end copywriting */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-pink-300">
                <InstagramIcon className="size-3.5" />
                Videos en Vivo · @sealstep.uy
              </span>
              <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h2
              id="videos-title"
              className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"
            >
              <AshText as="span">En primer plano: Mirá cada detalle</AshText>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-xl">
              Grabaciones reales sin filtros ni ediciones engañosas. Mirá la calidad, texturas, costuras y volumen exactamente como te van a llegar a tu casa.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900 px-5 py-3 text-xs font-bold text-white hover:border-neutral-700 transition"
            >
              <InstagramIcon className="size-4 text-pink-400" />
              <span>Ver más en Instagram</span>
            </a>
          </div>
        </Reveal>

        {/* 5-Video Reel Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {VIDEOS.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <Reveal delay={120} className="mt-14 rounded-3xl border border-neutral-800 bg-neutral-950/60 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="size-4" />
                <span>Transparencia y Calidad Asegurada</span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                ¿Querés un video personalizado de tu talle antes de comprar?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
                Escribinos por WhatsApp indicando el modelo y talle que querés, y te enviamos fotos y videos adicionales en el momento.
              </p>
            </div>

            <a
              href={WA_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-heading text-sm font-bold text-black hover:bg-neutral-200 transition-all hover:scale-[1.02] shadow-xl"
            >
              <WhatsAppIcon className="size-4" />
              <span>Pedir video por WhatsApp</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
