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

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Productos />
        <Beneficios />
        <ChanclasSlideBanner />
        <Mayorista />
        <Galeria />
        <Testimonials />
        <Faq />
        <Contacto />
      </main>
      <SiteFooter />
    </>
  )
}

