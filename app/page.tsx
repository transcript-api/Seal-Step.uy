import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { Marquee } from '@/components/sections/marquee'
import { Productos } from '@/components/sections/productos'
import { Beneficios } from '@/components/sections/beneficios'
import { ChanclasSlideBanner } from '@/components/sections/chanclas-slide'
import { Mayorista } from '@/components/sections/mayorista'
import { Galeria } from '@/components/sections/galeria'
import { Faq } from '@/components/sections/faq'
import { Contacto } from '@/components/sections/contacto'
import Testimonials from '@/components/sections/testimonials'
import { getProductos } from '@/lib/productos-db'
import { getSiteVideos } from '@/lib/videos'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const productos = await getProductos()
  const siteVideos = getSiteVideos()

  return (
    <>
      <SiteHeader />
      <main>
        <Hero carouselSlides={siteVideos.heroCarousel} />
        <Marquee />
        <Productos initialProducts={productos} dropVideos={siteVideos.dropVideos} />
        <Beneficios />
        <ChanclasSlideBanner />
        <Mayorista />
        <Galeria initialVideos={siteVideos.galeriaReels} />
        <Testimonials />
        <Faq />
        <Contacto />
      </main>
      <SiteFooter />
    </>
  )
}

