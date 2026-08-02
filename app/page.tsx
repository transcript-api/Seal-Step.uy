import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { Hero } from '@/components/sections/hero'
import { Marquee } from '@/components/sections/marquee'
import { Productos } from '@/components/sections/productos'
import { Beneficios } from '@/components/sections/beneficios'
import { Nosotros } from '@/components/sections/nosotros'
import { Mayorista } from '@/components/sections/mayorista'
import { Galeria } from '@/components/sections/galeria'
import { Faq } from '@/components/sections/faq'
import { Contacto } from '@/components/sections/contacto'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Productos />
        <Beneficios />
        <Nosotros />
        <Mayorista />
        <Galeria />
        <Faq />
        <Contacto />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  )
}
