'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Video,
  ArrowLeft,
  Upload,
  Check,
  Save,
  Loader2,
  Film,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  Play,
  Layers,
  Store,
  Eye,
} from 'lucide-react'
import type { SiteVideosConfig, DropVideoItem, ReelItem } from '@/lib/videos'
import type { Slide } from '@/components/ui/carousel-07'

export function AdminVideosEditor() {
  const [config, setConfig] = useState<SiteVideosConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Cargar configuración de videos al entrar
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch('/api/admin/videos')
        const data = await res.json()
        if (data.success && data.videos) {
          setConfig(data.videos)
        }
      } catch (err) {
        console.error('Error cargando videos:', err)
      } finally {
        setLoading(false)
      }
    }
    loadVideos()
  }, [])

  // Subir video físico (.mp4, .webm, .mov) desde PC o Celular
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetKey: string,
    callback: (url: string) => void
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingTarget(targetKey)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (data.success && data.url) {
        callback(data.url)
        setToastMessage('¡Video subido correctamente!')
        setTimeout(() => setToastMessage(null), 3500)
      } else {
        alert('Error al subir video: ' + (data.error || 'Archivo no soportado'))
      }
    } catch (err: any) {
      alert('Error al conectar con el servidor: ' + err.message)
    } finally {
      setUploadingTarget(null)
      e.target.value = ''
    }
  }

  // Guardar configuración completa en el servidor y revalidar Next.js
  const handleSaveAll = async () => {
    if (!config) return

    setIsSaving(true)
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      const data = await res.json()

      if (data.success) {
        setToastMessage('¡Todos los videos se guardaron y ya están en vivo en la tienda!')
        setTimeout(() => setToastMessage(null), 4500)
      } else {
        alert('Error al guardar: ' + (data.error || 'Desconocido'))
      }
    } catch (err: any) {
      alert('Error de conexión al guardar: ' + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  // Helpers para modificar partes de la configuración
  const updateDropVideo = (index: number, field: keyof DropVideoItem, value: string) => {
    if (!config) return
    const updated = [...config.dropVideos]
    updated[index] = { ...updated[index], [field]: value }
    setConfig({ ...config, dropVideos: updated })
  }

  const addDropVideo = () => {
    if (!config) return
    const newDrop: DropVideoItem = {
      id: `drop-${Date.now()}`,
      slug: 'nike-dunk-low-azul',
      title: 'Nuevo Par The Drop',
      videoSrc: '',
      poster: '/images/nike-dunk-low-azul/01.jpg',
    }
    setConfig({
      ...config,
      dropVideos: [...config.dropVideos, newDrop],
    })
  }

  const removeDropVideo = (index: number) => {
    if (!config) return
    if (config.dropVideos.length <= 1) {
      alert('Debe quedar al menos 1 par en The Drop')
      return
    }
    const updated = config.dropVideos.filter((_, i) => i !== index)
    setConfig({ ...config, dropVideos: updated })
  }

  const updateHeroSlide = (index: number, field: keyof Slide, value: string) => {
    if (!config) return
    const list = config.heroCarousel ? [...config.heroCarousel] : []
    list[index] = { ...list[index], [field]: value }
    setConfig({ ...config, heroCarousel: list })
  }

  const addHeroSlide = () => {
    if (!config) return
    const list = config.heroCarousel ? [...config.heroCarousel] : []
    const newSlide: Slide = {
      id: `hero-${Date.now()}`,
      image: '/images/adidas-campus-gris-blanco/01.jpg',
      videoSrc: '',
      title: 'Nuevo Modelo',
      description: 'Descripción breve del modelo.',
      badge: 'NUEVO',
      href: '/#productos',
    }
    setConfig({ ...config, heroCarousel: [...list, newSlide] })
  }

  const removeHeroSlide = (index: number) => {
    if (!config) return
    const list = config.heroCarousel ? [...config.heroCarousel] : []
    if (list.length <= 1) {
      alert('Debe quedar al menos 1 modelo en el carrusel')
      return
    }
    const updated = list.filter((_, i) => i !== index)
    setConfig({ ...config, heroCarousel: updated })
  }

  const updateMayoristaVideo = (field: string, value: string) => {
    if (!config) return
    setConfig({
      ...config,
      mayoristaVideo: {
        ...config.mayoristaVideo,
        [field]: value,
      },
    })
  }

  const updateReel = (index: number, field: keyof ReelItem, value: string) => {
    if (!config) return
    const updated = [...config.galeriaReels]
    updated[index] = { ...updated[index], [field]: value }
    setConfig({ ...config, galeriaReels: updated })
  }

  const addReel = () => {
    if (!config) return
    const newReel: ReelItem = {
      id: `reel-${Date.now()}`,
      src: '/Videos%20sin%20sonido/sealstep_DG894csS2o2.mp4',
      tag: 'Nuevo Par',
      label: 'Calidad Premium Importada',
    }
    setConfig({
      ...config,
      galeriaReels: [...config.galeriaReels, newReel],
    })
  }

  const removeReel = (index: number) => {
    if (!config) return
    if (config.galeriaReels.length <= 1) {
      alert('Debe quedar al menos 1 video en la galería')
      return
    }
    const updated = config.galeriaReels.filter((_, i) => i !== index)
    setConfig({ ...config, galeriaReels: updated })
  }

  if (loading || !config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <Loader2 className="size-10 animate-spin text-emerald-400 mb-4" />
        <p className="text-neutral-400 font-bold uppercase tracking-wider text-xs">
          Cargando configuración multimedia...
        </p>
      </div>
    )
  }

  return (
    <div className="p-3 sm:p-8 max-w-6xl mx-auto space-y-8 pb-24">
      {/* Toast Notificación flotante */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-500 text-black px-5 py-3.5 rounded-2xl font-heading font-black text-xs uppercase tracking-wider shadow-2xl animate-in slide-in-from-bottom-5">
          <Check className="size-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold mb-2">
            <Link href="/admin" className="hover:text-white transition flex items-center gap-1">
              <ArrowLeft className="size-3.5" />
              <span>Panel Principal</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-400 uppercase tracking-wider">Multimedia y Videos</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white flex items-center gap-3">
            <Video className="size-7 text-emerald-400" />
            <span>Control Total de Videos</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Cambiá o subí cualquier video de la web (The Drop, Mayoristas y Galería Reels). Subí videos desde tu PC/celular o pegá enlaces directos.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-black text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          <span>{isSaving ? 'Guardando en vivo...' : 'Guardar Todos los Videos'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 1: THE DROP (VIDEOS Y FOTOS DE CHAMPIONES ESTRELLA EN PORTADA) */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-emerald-400" />
              <h2 className="font-heading text-base sm:text-lg font-black uppercase text-white tracking-wide">
                1. Portada — The Drop (Championes Estrella)
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Colección editorial de tarjetas en la cabecera del catálogo. Soporta videos automáticos en loop y fotos en alta definición.
            </p>
          </div>

          <button
            type="button"
            onClick={addDropVideo}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider transition shrink-0"
          >
            <Plus className="size-4" />
            <span>Agregar Par a The Drop</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.dropVideos.map((drop, idx) => (
            <div
              key={drop.id}
              className="rounded-3xl border border-neutral-800 bg-[#0c0c0c] p-5 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Drop {idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/producto/${drop.slug}`}
                      target="_blank"
                      className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Ver par</span>
                      <ExternalLink className="size-3" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeDropVideo(idx)}
                      aria-label="Eliminar par de Drop"
                      className="size-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-rose-400 hover:border-rose-500/40 transition"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Reproductor o Foto de Previsualización */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-neutral-800 flex items-center justify-center">
                  {drop.videoSrc ? (
                    <video
                      src={drop.videoSrc}
                      poster={drop.poster}
                      controls
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : drop.poster ? (
                    <img
                      src={drop.poster}
                      alt={drop.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-neutral-500 text-xs font-bold uppercase">Sin video ni foto</div>
                  )}
                </div>

                {/* Título */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Título Visible
                  </label>
                  <input
                    type="text"
                    value={drop.title}
                    onChange={(e) => updateDropVideo(idx, 'title', e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-bold"
                  />
                </div>

                {/* Slug del Producto */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Slug del Modelo (Vinculado a /producto/...)
                  </label>
                  <input
                    type="text"
                    value={drop.slug}
                    onChange={(e) => updateDropVideo(idx, 'slug', e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-xs font-mono text-emerald-400 focus:border-emerald-500 focus:outline-none"
                    placeholder="nike-dunk-low-panda"
                  />
                </div>

                {/* Subir archivo de video */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Video (Subir MP4)
                  </label>
                  <label className="w-full flex items-center justify-center gap-2 p-2 rounded-xl border border-dashed border-neutral-700 hover:border-emerald-500 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-300 hover:text-white cursor-pointer transition text-xs font-bold">
                    {uploadingTarget === `drop-video-${idx}` ? (
                      <Loader2 className="size-4 animate-spin text-emerald-400" />
                    ) : (
                      <Upload className="size-4 text-emerald-400" />
                    )}
                    <span>
                      {uploadingTarget === `drop-video-${idx}` ? 'Subiendo video...' : 'Subir archivo .mp4'}
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, `drop-video-${idx}`, (url) => updateDropVideo(idx, 'videoSrc', url))
                      }
                    />
                  </label>
                </div>

                {/* Subir archivo de foto/poster */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Foto o Poster (Subir JPG/PNG)
                  </label>
                  <label className="w-full flex items-center justify-center gap-2 p-2 rounded-xl border border-dashed border-neutral-700 hover:border-emerald-500 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-300 hover:text-white cursor-pointer transition text-xs font-bold">
                    {uploadingTarget === `drop-photo-${idx}` ? (
                      <Loader2 className="size-4 animate-spin text-emerald-400" />
                    ) : (
                      <Upload className="size-4 text-emerald-400" />
                    )}
                    <span>
                      {uploadingTarget === `drop-photo-${idx}` ? 'Subiendo foto...' : 'Subir archivo de imagen'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, `drop-photo-${idx}`, (url) => updateDropVideo(idx, 'poster', url))
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 2: CARRUSEL HERO (FOTOS Y VIDEOS EN ABANICO 3D) */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Film className="size-5 text-purple-400" />
              <h2 className="font-heading text-base sm:text-lg font-black uppercase text-white tracking-wide">
                2. Carrusel Principal (Fotos y Videos en Abanico 3D)
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Es el carrusel interactivo que aparece junto al título principal. Ahora podés ponerle videos o fotos a cada tarjeta libremente.
            </p>
          </div>

          <button
            type="button"
            onClick={addHeroSlide}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-black uppercase tracking-wider transition shrink-0"
          >
            <Plus className="size-4" />
            <span>Agregar Modelo al Carrusel</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(config.heroCarousel || []).map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="rounded-3xl border border-neutral-800 bg-[#0c0c0c] p-5 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                    Slide {idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    {slide.href && (
                      <Link
                        href={slide.href}
                        target="_blank"
                        className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
                      >
                        <span>Ver par</span>
                        <ExternalLink className="size-3" />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => removeHeroSlide(idx)}
                      aria-label="Eliminar slide"
                      className="size-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-rose-400 hover:border-rose-500/40 transition"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Previsualización Video o Foto */}
                <div className="relative aspect-[3/4] max-h-56 rounded-2xl overflow-hidden bg-black border border-neutral-800 flex items-center justify-center">
                  {slide.videoSrc ? (
                    <video
                      src={slide.videoSrc}
                      poster={slide.image}
                      controls
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {slide.badge && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/95 text-black font-black text-[9px] uppercase">
                      {slide.badge}
                    </span>
                  )}
                </div>

                {/* Título e Insignia */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => updateHeroSlide(idx, 'title', e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-xs text-white focus:border-purple-500 focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Insignia (Badge)
                    </label>
                    <input
                      type="text"
                      value={slide.badge}
                      onChange={(e) => updateHeroSlide(idx, 'badge', e.target.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-xs text-purple-300 font-bold focus:border-purple-500 focus:outline-none uppercase"
                      placeholder="NUEVO INGRESO"
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Descripción Breve
                  </label>
                  <input
                    type="text"
                    value={slide.description}
                    onChange={(e) => updateHeroSlide(idx, 'description', e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-2 text-xs text-neutral-300 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Enlace Destino */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                    Link de Destino
                  </label>
                  <input
                    type="text"
                    value={slide.href || ''}
                    onChange={(e) => updateHeroSlide(idx, 'href', e.target.value)}
                    className="w-full rounded-xl border border-neutral-800/80 bg-neutral-950 px-2.5 py-1.5 text-[11px] font-mono text-neutral-400 focus:border-purple-500 focus:outline-none"
                    placeholder="/producto/nombre-modelo"
                  />
                </div>

                {/* Subir archivo de video para el carrusel */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Video del Modelo (Subir MP4)
                  </label>
                  <label className="w-full flex items-center justify-center gap-2 p-2 rounded-xl border border-dashed border-neutral-700 hover:border-purple-500 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-300 hover:text-white cursor-pointer transition text-xs font-bold">
                    {uploadingTarget === `hero-video-${idx}` ? (
                      <Loader2 className="size-4 animate-spin text-purple-400" />
                    ) : (
                      <Upload className="size-4 text-purple-400" />
                    )}
                    <span>
                      {uploadingTarget === `hero-video-${idx}` ? 'Subiendo video...' : 'Subir archivo .mp4'}
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, `hero-video-${idx}`, (url) => updateHeroSlide(idx, 'videoSrc', url))
                      }
                    />
                  </label>
                </div>

                {/* Subir foto para el carrusel */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Foto del Modelo (Subir Imagen)
                  </label>
                  <label className="w-full flex items-center justify-center gap-2 p-2 rounded-xl border border-dashed border-neutral-700 hover:border-purple-500 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-300 hover:text-white cursor-pointer transition text-xs font-bold">
                    {uploadingTarget === `hero-photo-${idx}` ? (
                      <Loader2 className="size-4 animate-spin text-purple-400" />
                    ) : (
                      <Upload className="size-4 text-purple-400" />
                    )}
                    <span>
                      {uploadingTarget === `hero-photo-${idx}` ? 'Subiendo imagen...' : 'Subir foto del modelo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, `hero-photo-${idx}`, (url) => updateHeroSlide(idx, 'image', url))
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 3: VIDEO MAYORISTA Y SHOWROOM RIVERA */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
          <Store className="size-5 text-amber-400" />
          <h2 className="font-heading text-base sm:text-lg font-black uppercase text-white tracking-wide">
            3. Video Mayoristas & Showroom Rivera
          </h2>
        </div>
        <p className="text-xs text-neutral-400">
          Video explicativo de ventas por mayor y recorrido de las instalaciones en Rivera para revendedores.
        </p>

        <div className="rounded-3xl border border-neutral-800 bg-[#0c0c0c] p-6 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Preview del video vertical */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative aspect-[9/16] w-full max-w-[240px] rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-2xl">
              {config.mayoristaVideo.videoSrc ? (
                <video
                  src={config.mayoristaVideo.videoSrc}
                  controls
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs p-4 text-center">
                  Sin video mayorista
                </div>
              )}
            </div>
          </div>

          {/* Opciones y Edición */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Título de la Sección Mayorista
              </label>
              <input
                type="text"
                value={config.mayoristaVideo.title}
                onChange={(e) => updateMayoristaVideo('title', e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Subtítulo
              </label>
              <input
                type="text"
                value={config.mayoristaVideo.subtitle || ''}
                onChange={(e) => updateMayoristaVideo('subtitle', e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Subir Video */}
            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Subir Nuevo Video Mayorista (.mp4, .mov, etc.)
              </label>
              <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-neutral-700 hover:border-amber-400 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-300 hover:text-white cursor-pointer transition text-xs font-bold">
                {uploadingTarget === 'mayorista' ? (
                  <Loader2 className="size-4 animate-spin text-amber-400" />
                ) : (
                  <Upload className="size-4 text-amber-400" />
                )}
                <span>
                  {uploadingTarget === 'mayorista' ? 'Subiendo video...' : 'Subir video desde dispositivo'}
                </span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload(e, 'mayorista', (url) => updateMayoristaVideo('videoSrc', url))
                  }
                />
              </label>
            </div>

            {/* URL Directa */}
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                O pegar URL de video:
              </label>
              <input
                type="text"
                value={config.mayoristaVideo.videoSrc}
                onChange={(e) => updateMayoristaVideo('videoSrc', e.target.value)}
                className="w-full rounded-xl border border-neutral-800/80 bg-neutral-950 px-3 py-2 text-[11px] text-neutral-300 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 4: GALERÍA DE REELS VERTICALES (9:16 - INSTAGRAM & TIKTOK) */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="size-5 text-purple-400" />
            <h2 className="font-heading text-base sm:text-lg font-black uppercase text-white tracking-wide">
              4. Galería de Videos / Reels ({config.galeriaReels.length} videos activos)
            </h2>
          </div>

          <button
            type="button"
            onClick={addReel}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500 hover:text-white text-xs font-bold transition"
          >
            <Plus className="size-3.5" />
            <span>+ Agregar Nuevo Reel</span>
          </button>
        </div>
        <p className="text-xs text-neutral-400">
          Aparecen en la portada en formato vertical 9:16 estilo TikTok/Reels con el tag de @sealstep.uy. Podés cambiar el video, la etiqueta y el texto de cada uno.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {config.galeriaReels.map((reel, idx) => (
            <div
              key={reel.id}
              className="rounded-2xl border border-neutral-800 bg-[#0c0c0c] p-3.5 space-y-3 shadow-lg flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                    Reel #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeReel(idx)}
                    className="text-neutral-500 hover:text-red-400 transition p-1"
                    title="Eliminar este reel"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>

                {/* Preview 9:16 */}
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black border border-neutral-800">
                  <video
                    src={reel.src}
                    controls
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Marca / Tag */}
                <div>
                  <label className="block text-[9px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
                    Marca / Tag
                  </label>
                  <input
                    type="text"
                    value={reel.tag}
                    onChange={(e) => updateReel(idx, 'tag', e.target.value)}
                    placeholder="Ej: Nike, Adidas..."
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-1.5 text-xs text-white focus:border-purple-500 focus:outline-none font-bold"
                  />
                </div>

                {/* Texto / Bajada */}
                <div>
                  <label className="block text-[9px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
                    Texto
                  </label>
                  <input
                    type="text"
                    value={reel.label}
                    onChange={(e) => updateReel(idx, 'label', e.target.value)}
                    placeholder="Ej: Mirá los detalles"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-1.5 text-[11px] text-neutral-300 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Subir Video */}
                <div>
                  <label className="flex items-center justify-center gap-1.5 p-2 rounded-lg border border-dashed border-neutral-700 hover:border-purple-500 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-300 hover:text-white cursor-pointer transition text-[10px] font-bold">
                    {uploadingTarget === `reel-${idx}` ? (
                      <Loader2 className="size-3 animate-spin text-purple-400" />
                    ) : (
                      <Upload className="size-3 text-purple-400" />
                    )}
                    <span>{uploadingTarget === `reel-${idx}` ? 'Subiendo...' : 'Subir Reel'}</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, `reel-${idx}`, (url) => updateReel(idx, 'src', url))
                      }
                    />
                  </label>
                </div>

                {/* URL */}
                <div>
                  <input
                    type="text"
                    value={reel.src}
                    onChange={(e) => updateReel(idx, 'src', e.target.value)}
                    placeholder="O URL de video"
                    className="w-full rounded-lg border border-neutral-800/80 bg-neutral-950 px-2 py-1 text-[10px] text-neutral-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-neutral-950/90 border-t border-neutral-800 backdrop-blur-xl p-3 sm:p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="text-xs text-neutral-400 hidden sm:block">
            Modificá cualquiera de los videos y hacé clic en guardar para aplicar los cambios a la web.
          </div>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-black text-xs uppercase tracking-wider transition shadow-xl shadow-emerald-500/20 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            <span>{isSaving ? 'Guardando en toda la tienda...' : 'Guardar y Publicar Todos los Videos'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
