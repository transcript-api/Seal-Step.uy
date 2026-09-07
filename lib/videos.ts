import fs from 'fs'
import path from 'path'
import type { Slide } from '@/components/ui/carousel-07'

export type DropVideoItem = {
  id: string
  slug: string
  title: string
  videoSrc?: string
  poster?: string
  customImage?: string
}

export type MayoristaVideoConfig = {
  title: string
  videoSrc: string
  posterSrc: string
  subtitle?: string
}

export type ReelItem = {
  id: string
  src: string
  tag: string
  label: string
}

export type SiteVideosConfig = {
  dropVideos: DropVideoItem[]
  heroCarousel: Slide[]
  mayoristaVideo: MayoristaVideoConfig
  galeriaReels: ReelItem[]
}

const DEFAULT_VIDEOS: SiteVideosConfig = {
  dropVideos: [
    {
      id: 'drop-1',
      slug: 'nike-dunk-low-panda',
      title: 'Nike Dunk Low Panda (The Drop)',
      videoSrc: '/Videos%20sin%20sonido/sealstep_DXZf-EiDVE4.mp4',
      poster: '/images/nike-dunk-low-panda/01.jpg',
    },
    {
      id: 'drop-2',
      slug: 'new-balance-1000',
      title: 'New Balance 1000 Commercial (The Drop)',
      videoSrc: '/videos%20drop/New_Balance_sneaker_commercial_v…_202608170609 (4).mp4',
      poster: '/images/new-balance-1000/01.jpg',
    },
    {
      id: 'drop-3',
      slug: 'adidas-campus-00s',
      title: 'Adidas Campus 00s Core Black',
      videoSrc: '/Videos%20sin%20sonido/sealstep_DJMpagGxIsh.mp4',
      poster: '/images/ADIDAS CAMPUS 00s/01.jpg',
    },
    {
      id: 'drop-4',
      slug: 'vans-knu-skool-clasicas',
      title: 'Vans Knu Skool Clásicas',
      videoSrc: '/Videos%20sin%20sonido/sealstep_DG894csS2o2.mp4',
      poster: '/images/VANS KNU SKOOL Clasicas/01.jpg',
    },
    {
      id: 'drop-5',
      slug: 'nike-dunk-low-storm-off-latex',
      title: 'Nike Dunk Low Storm Latex',
      videoSrc: '',
      poster: '/images/nike-dunk-low-storm-off-latex/01.jpg',
    },
    {
      id: 'drop-6',
      slug: 'adidas-samba-blanco-negro',
      title: 'Adidas Samba Luxo OG',
      videoSrc: '',
      poster: '/images/adidas-samba-blanco-negro/01.jpg',
    },
  ],
  heroCarousel: [
    {
      id: 'hero-slide-1',
      image: '/images/adidas-campus-gris-blanco/01.jpg',
      videoSrc: '/Videos%20sin%20sonido/sealstep_DJMpagGxIsh.mp4',
      title: 'Adidas Campus',
      description: 'Gris y blanco en gamuza suave con cordones anchos.',
      badge: 'NUEVO INGRESO',
      href: '/producto/adidas-campus-gris-blanco',
    },
    {
      id: 'hero-slide-2',
      image: '/images/nike-dunk-low-azul/01.jpg',
      videoSrc: '/Videos%20sin%20sonido/sealstep_DG894csS2o2.mp4',
      title: 'Nike Dunk Low Azul',
      description: 'Clásico diseño retro urbano en cuero premium.',
      badge: 'DESTACADO',
      href: '/producto/nike-dunk-low-azul',
    },
    {
      id: 'hero-slide-3',
      image: '/images/new-balance-9060/01.jpg',
      videoSrc: '/Videos%20sin%20sonido/sealstep_DQFNL6yD_oi.mp4',
      title: 'New Balance 9060',
      description: 'Silueta chunky en blanco, gris y off white.',
      badge: 'TENDENCIA',
      href: '/producto/new-balance-9060',
    },
    {
      id: 'hero-slide-4',
      image: '/images/nike-dunk-low-storm-off-latex/01.jpg',
      videoSrc: '/Videos%20sin%20sonido/sealstep_DXZf-EiDVE4.mp4',
      title: 'Dunk Storm Latex',
      description: 'Off white con suela de goma latex exclusiva.',
      badge: 'IMPORTADO',
      href: '/producto/nike-dunk-low-storm-off-latex',
    },
    {
      id: 'hero-slide-5',
      image: '/images/adidas-samba-blanco-negro/01.jpg',
      videoSrc: '',
      title: 'Adidas Samba Luxo',
      description: 'Silueta atemporal con acabados de primera calidad.',
      badge: 'LINHA LUXO',
      href: '/producto/adidas-samba-blanco-negro',
    },
    {
      id: 'hero-slide-6',
      image: '/images/new-balance-1000/01.jpg',
      videoSrc: '/videos%20drop/New_Balance_sneaker_commercial_v…_202608170609 (4).mp4',
      title: 'New Balance 1000',
      description: 'Tonalidad Azul / Off White con confort superior.',
      badge: 'RETRO TECH',
      href: '/producto/new-balance-1000',
    },
  ],
  mayoristaVideo: {
    title: 'Presentación Mayoristas & Showroom Rivera',
    videoSrc: '/Videos/fundador-mayorista.mp4',
    posterSrc: '/images/productos/toddler-botitas-plataforma-marron/1.jpg',
    subtitle: 'Conocé en persona cómo funciona la logística y los envíos directos',
  },
  galeriaReels: [
    {
      id: 'reel-1',
      src: '/Videos%20sin%20sonido/sealstep_DG894csS2o2.mp4',
      tag: 'Nike',
      label: 'Revisá la calidad',
    },
    {
      id: 'reel-2',
      src: '/Videos%20sin%20sonido/sealstep_DJMpagGxIsh.mp4',
      tag: 'Adidas',
      label: 'Mirá los detalles',
    },
    {
      id: 'reel-3',
      src: '/Videos%20sin%20sonido/sealstep_DQFNL6yD_oi.mp4',
      tag: 'New Balance',
      label: 'En nuestras manos',
    },
    {
      id: 'reel-4',
      src: '/Videos%20sin%20sonido/sealstep_DXZf-EiDVE4.mp4',
      tag: 'Importados',
      label: 'Nuevos ingresos',
    },
    {
      id: 'reel-5',
      src: '/Videos%20sin%20sonido/sealstep_DYz8pL1R5DJ.mp4',
      tag: 'Stock disponible',
      label: 'Modelos actuales',
    },
  ],
}

const filePath = path.join(process.cwd(), 'data', 'site-videos.json')

export function getSiteVideos(): SiteVideosConfig {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      const parsed = JSON.parse(data)
      return {
        dropVideos: Array.isArray(parsed.dropVideos) && parsed.dropVideos.length > 0 ? parsed.dropVideos : DEFAULT_VIDEOS.dropVideos,
        heroCarousel: Array.isArray(parsed.heroCarousel) && parsed.heroCarousel.length > 0 ? parsed.heroCarousel : DEFAULT_VIDEOS.heroCarousel,
        mayoristaVideo: parsed.mayoristaVideo || DEFAULT_VIDEOS.mayoristaVideo,
        galeriaReels: Array.isArray(parsed.galeriaReels) && parsed.galeriaReels.length > 0 ? parsed.galeriaReels : DEFAULT_VIDEOS.galeriaReels,
      }
    }
  } catch (err) {
    console.error('Error reading site-videos.json:', err)
  }
  return DEFAULT_VIDEOS
}

export function saveSiteVideos(newConfig: SiteVideosConfig): boolean {
  try {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify(newConfig, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error('Error saving site-videos.json:', err)
    return false
  }
}
