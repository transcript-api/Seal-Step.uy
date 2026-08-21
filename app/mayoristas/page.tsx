import type { Metadata } from 'next'
import Image from 'next/image'
import {
  TrendingUp,
  MapPin,
  CheckCircle,
  Truck,
  ShieldCheck,
  Zap,
  PackageCheck,
  Percent,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  Award,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WA_LINKS } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { Reveal } from '@/components/reveal'
import { MayoristaCalculator } from '@/components/sections/mayorista-calculator'
import { MayoristaVideo } from '@/components/sections/mayorista-video'
import { AshText } from '@/components/ash-text'
import { CounterStat } from '@/components/counter-stat'
import { ParallaxLayer } from '@/components/parallax-layer'

export const metadata: Metadata = {
  title: 'Ventas por Mayor y Revendedores de Calzado | Seal Step Uruguay',
  description:
    'Emprendé tu propio negocio de championes en Uruguay. Comprá por mayor directo desde Rivera con márgenes del 80% al 120% por par. Envíos exprés a todo el país.',
}

const PASOS = [
  {
    numero: '01',
    titulo: 'Elegís tu lote surtido',
    descripcion:
      'Combiná modelos, talles (38 al 43) y marcas según lo que más buscan tus clientes en tu ciudad.',
    icono: PackageCheck,
  },
  {
    numero: '02',
    titulo: 'Recibís fotos HD profesionales',
    descripcion:
      'Te enviamos catálogo de fotos y videos reales en alta calidad sin marca de agua para publicar directo en Instagram o TikTok.',
    icono: Zap,
  },
  {
    numero: '03',
    titulo: 'Despachamos en 24hs desde Rivera',
    descripcion:
      'Enviamos tu caja empaquetada y protegida por la agencia de tu preferencia (DAC, Mirtrans, Turil, De Punta).',
    icono: Truck,
  },
  {
    numero: '04',
    titulo: 'Cobrás y ganás más del 100%',
    descripcion:
      'Vendés en tu localidad o por redes con un margen promedio de $1.000 a $1.500 UYU por par.',
    icono: Percent,
  },
]

const VENTAJAS = [
  {
    titulo: 'Precios de Importación Directa',
    descripcion:
      'Al estar ubicados estratégicamente en Rivera, accedés al precio más competitivo sin intermediarios.',
    icono: Award,
  },
  {
    titulo: 'Envíos Blindados a los 19 Departamentos',
    descripcion:
      'Despachos diarios coordinados. Tu mercadería llega rápida, segura y lista para entregar.',
    icono: Truck,
  },
  {
    titulo: 'Mínimo de Compra Bajo (Desde 8 pares)',
    descripcion:
      'No necesitás grandes capitales para empezar. Podés arrancar con una inversión súper accesible.',
    icono: Zap,
  },
  {
    titulo: 'Asesoramiento y Fotos para Redes',
    descripcion:
      'Te brindamos material publicitario en alta definición para que vendas desde el primer día.',
    icono: MessageCircle,
  },
]

const PACKS = [
  {
    nombre: 'Pack Inicio',
    pares: '8 Pares',
    subtitulo: 'Para dar el primer paso',
    precioPar: '$1.250 UYU',
    gananciaEstimada: '+$10.000 UYU',
    caracteristicas: [
      'Modelos a elección (talles 38 al 43)',
      'Fotos HD para tus redes sociales',
      'Despacho rápido desde Rivera',
      'Atención personalizada vía WhatsApp',
    ],
    popular: false,
    ctaText: 'Pedir Pack Inicio',
  },
  {
    nombre: 'Pack Emprendedor',
    pares: '15 Pares',
    subtitulo: 'El más vendido en Uruguay',
    precioPar: '$1.150 UYU',
    gananciaEstimada: '+$20.000 UYU',
    caracteristicas: [
      'Máxima variedad de modelos top',
      'Material de fotos y videos HD exclusivo',
      'Envío bonificado a todo el país',
      'Asesoría de venta para redes sociales',
      'Acceso al grupo VIP de novedades',
    ],
    popular: true,
    ctaText: 'Pedir Pack Emprendedor',
  },
  {
    nombre: 'Pack Mayorista Pro',
    pares: '30+ Pares',
    subtitulo: 'Máximo margen para tiendas',
    precioPar: '$1.050 UYU',
    gananciaEstimada: '+$43.000 UYU',
    caracteristicas: [
      'Precio exclusivo por volumen',
      'Prioridad de stock en nuevos ingresos',
      'Envío 100% GRATIS a todo Uruguay',
      'Atención y despacho prioritario 24h',
      'Condiciones especiales para revender',
    ],
    popular: false,
    ctaText: 'Pedir Pack Mayorista Pro',
  },
]

const TESTIMONIOS_MAYORISTAS = [
  {
    nombre: 'Santiago M.',
    ciudad: 'Montevideo',
    negocio: 'Emprendedor de Calzado',
    texto:
      'Arranqué comprando el lote de 8 pares para probar en Instagram. En menos de 4 días vendí todo a $2.600 cada par. Con lo que gané compré el de 15 pares. Hoy en día es mi principal ingreso.',
  },
  {
    nombre: 'Valeria G.',
    ciudad: 'Maldonado',
    negocio: 'Showroom en Maldonado',
    texto:
      'La calidad de los championes y la rapidez del envío desde Rivera son excelentes. Mis clientas quedan fascinadas y las fotos que nos mandan listas para subir nos ahorran muchísimo tiempo.',
  },
  {
    nombre: 'Joaquín R.',
    ciudad: 'Salto',
    negocio: 'Vendedor por Redes',
    texto:
      'Impresionante el margen. Le gano más de $1.200 limpios por par. Seal Step cumple siempre con los envíos en DAC en tiempo récord.',
  },
]

const FAQS_MAYORISTAS = [
  {
    q: '¿Cuál es el mínimo para acceder a precio mayorista?',
    a: 'El pedido mínimo inicial es de tan solo 8 pares. Podés surtir modelos, marcas y talles como vos prefieras para armar tu lote ideal.',
  },
  {
    q: '¿Cómo son los envíos a los departamentos?',
    a: 'Despachamos desde Rivera a través de las principales agencias de encomienda del país (DAC, Mirtrans, Turil, De Punta, Nuñez). El flete se abona al recibir la mercadería o según tu preferencia.',
  },
  {
    q: '¿Puedo elegir los talles y modelos que yo quiera?',
    a: 'Totalmente. No estás obligado a llevar curvas cerradas de un solo modelo. Podés combinar los championes y numeraciones que más salida tengan en tu zona.',
  },
  {
    q: '¿Cuáles son las formas de pago?',
    a: 'Aceptamos transferencias bancarias (BROU, Itaú, Prex), depósitos en Abitab o Redpagos y giros. Una vez confirmado el pago, procesamos tu despacho de inmediato.',
  },
  {
    q: '¿Me entregan fotos para publicar en mis redes?',
    a: 'Sí, a todos nuestros revendedores les enviamos un paquete con fotos y videos profesionales en HD sin marcas de agua para que empieces a vender desde el primer día.',
  },
]

export default function MayoristasPage() {
  return (
    <>
      <SiteHeader />

      <main className="overflow-hidden">
        {/* HERO MAYORISTA */}
        <section className="relative overflow-hidden border-b border-border pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
          <ParallaxLayer
            speed={-0.16}
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage:
                'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <TrendingUp className="size-3.5" />
                Programa Mayorista &amp; Revendedores Uruguay
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-6 font-heading text-4xl font-black tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  <AshText as="span">Emprendé tu propio negocio de calzado con alta rentabilidad</AshText>
                </h1>
                <p className="mt-6 font-heading text-lg font-semibold text-pretty text-muted-foreground sm:text-xl">
                  Comprá championes por mayor directo desde Rivera. Ganá del{' '}
                  <strong className="text-foreground">80% al 120%</strong> por cada par revendido en tu ciudad o redes sociales.
                </p>
              </Reveal>

              <Reveal
                delay={160}
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <a
                  href={WA_LINKS.mayorista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-8 py-4 font-heading text-base font-bold text-black shadow-xl shadow-emerald-500/20 transition-transform duration-300 hover:scale-105 sm:w-auto"
                >
                  <WhatsAppIcon className="size-5" />
                  Quiero información por WhatsApp
                </a>
                <a
                  href="#simulador"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 font-heading text-base font-bold transition-colors hover:bg-secondary sm:w-auto"
                >
                  Calcular mis Ganancias
                  <ArrowRight className="size-4" />
                </a>
              </Reveal>
            </div>

            {/* Tarjetas de Estadísticas Destacadas */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
              <Reveal delay={200} className="rounded-2xl border border-border bg-card/80 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40">
                <p className="font-heading text-3xl font-black text-emerald-400 sm:text-4xl">
                  <CounterStat value={80} suffix="%" /> - <CounterStat value={120} suffix="%" />
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Margen de Ganancia</p>
              </Reveal>
              <Reveal delay={240} className="rounded-2xl border border-border bg-card/80 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <p className="font-heading text-3xl font-black text-foreground sm:text-4xl">
                  <CounterStat value={8} prefix="Desde " suffix=" Pares" />
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Mínimo de Compra</p>
              </Reveal>
              <Reveal delay={280} className="rounded-2xl border border-border bg-card/80 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <p className="font-heading text-3xl font-black text-foreground sm:text-4xl">
                  <CounterStat value={19} suffix=" Deptos" />
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Envíos a todo el país</p>
              </Reveal>
              <Reveal delay={320} className="rounded-2xl border border-border bg-card/80 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40">
                <p className="font-heading text-3xl font-black text-emerald-400 sm:text-4xl">
                  24 / 48 hs
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Despacho Exprés</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* VIDEO DE PRESENTACIÓN DEL FUNDADOR */}
        <MayoristaVideo videoSrc="/Videos/fundador-mayorista.mp4" />

        {/* SIMULADOR DE RENTABILIDAD */}
        <section id="simulador" className="relative border-b border-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MayoristaCalculator />
          </div>
        </section>

        {/* EL PASO A PASO PARA EMPEZAR */}
        <section className="relative border-b border-border py-16 lg:py-24 bg-card/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                <Zap className="size-3.5 text-emerald-400" />
                Mecanismo de Venta
              </span>
              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                <AshText as="span">¿Cómo funciona el negocio de revendedor?</AshText>
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                En solo 4 pasos tenés tus championes en tus manos listos para generar ganancias en tu localidad.
              </p>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {PASOS.map((paso, idx) => {
                const Icono = paso.icono
                return (
                  <Reveal
                    key={paso.numero}
                    delay={idx * 100}
                    className="relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-md transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 font-heading text-lg font-black border border-emerald-500/20">
                          {paso.numero}
                        </span>
                        <Icono className="size-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-6 font-heading text-xl font-bold">
                        {paso.titulo}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {paso.descripcion}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* VENTAJAS COMPETITIVAS */}
        <section className="relative border-b border-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                  <MapPin className="size-3.5 text-emerald-400" />
                  Ventaja Rivera, Uruguay
                </span>
                <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                  <AshText as="span">¿Por qué comprarle a Seal Step en lugar de otros proveedores?</AshText>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Estamos ubicados estratégicamente en la frontera de Rivera, lo que nos permite ofrecer los championes con mejor terminación y demanda del mercado uruguayo a precios imbatibles.
                </p>

                <div className="mt-8 space-y-6">
                  {VENTAJAS.map((v) => (
                    <div key={v.titulo} className="flex gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-emerald-400 border border-border">
                        <v.icono className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-bold text-foreground">
                          {v.titulo}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {v.descripcion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarjeta de Garantía y Confianza */}
              <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 via-card to-card p-8 lg:p-10 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <ShieldCheck className="size-48 text-emerald-400" />
                </div>
                <span className="inline-block rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  Garantía de Confianza
                </span>
                <h3 className="mt-4 font-heading text-2xl font-black text-foreground sm:text-3xl">
                  Envíos 100% seguros y respaldados en todo Uruguay
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Sabemos que la confianza es lo primero al invertir en mercadería. En Seal Step trabajamos con transparencia total: te enviamos fotos reales de tu paquete armado con tu guía de agencia antes del despacho.
                </p>
                <div className="mt-8 border-t border-border pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-emerald-400" />
                    <span className="text-sm font-semibold text-foreground">
                      Más de 500 pedidos mayoristas despachados con éxito
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <CheckCircle className="size-5 text-emerald-400" />
                    <span className="text-sm font-semibold text-foreground">
                      Respuesta inmediata por WhatsApp en horario comercial
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PACKS MAYORISTAS DESTACADOS */}
        <section className="relative border-b border-border py-16 lg:py-24 bg-card/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                <TrendingUp className="size-3.5 text-emerald-400" />
                Lotes de Inicio
              </span>
              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                <AshText as="span">Elegí el pack mayorista ideal para arrancar hoy</AshText>
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Todos los packs incluyen libertad para elegir modelos, talles (38 al 43) y fotos HD para tus redes.
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:items-stretch">
              {PACKS.map((pack) => (
                <div
                  key={pack.nombre}
                  className={`relative flex flex-col justify-between rounded-3xl border p-8 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                    pack.popular
                      ? 'conic-border bg-card/90 shadow-2xl shadow-emerald-500/10 hover:-translate-y-2 hover:shadow-emerald-500/20'
                      : 'border-border bg-card/60 hover:border-white/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50'
                  }`}
                >
                  {pack.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 font-heading text-xs font-bold text-black uppercase tracking-wider">
                      Opción Más Elegida
                    </span>
                  )}
                  <div>
                    <h3 className="font-heading text-2xl font-black">{pack.nombre}</h3>
                    <p className="text-xs text-muted-foreground">{pack.subtitulo}</p>

                    <div className="mt-6 border-y border-border py-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">Cantidad:</span>
                        <span className="font-heading text-lg font-bold text-foreground">{pack.pares}</span>
                      </div>
                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">Costo prom. por par:</span>
                        <span className="font-heading text-lg font-bold text-foreground">{pack.precioPar}</span>
                      </div>
                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-xs text-emerald-400 font-bold">Ganancia estimada:</span>
                        <span className="font-heading text-lg font-black text-emerald-400">{pack.gananciaEstimada}</span>
                      </div>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {pack.caracteristicas.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-xs text-muted-foreground sm:text-sm">
                          <CheckCircle className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <a
                      href={WA_LINKS.mayorista}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-heading text-sm font-bold transition-transform duration-300 hover:scale-[1.02] ${
                        pack.popular
                          ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <WhatsAppIcon className="size-4" />
                      {pack.ctaText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIOS DE REVENDEDORES */}
        <section className="relative border-b border-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                <MessageCircle className="size-3.5 text-emerald-400" />
                Casos de Éxito
              </span>
              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                <AshText as="span">Revendedores que ya están ganando con Seal Step en Uruguay</AshText>
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {TESTIMONIOS_MAYORISTAS.map((t) => (
                <div
                  key={t.nombre}
                  className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-xl hover:shadow-black/40"
                >
                  <p className="text-sm leading-relaxed text-muted-foreground italic">
                    &ldquo;{t.texto}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-heading text-sm font-bold text-foreground">{t.nombre}</p>
                      <p className="text-xs text-muted-foreground">{t.negocio}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      <MapPin className="size-3" />
                      {t.ciudad}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES MAYORISTAS */}
        <section className="relative border-b border-border py-16 lg:py-24 bg-card/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                <HelpCircle className="size-3.5 text-emerald-400" />
                Preguntas Frecuentes
              </span>
              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                <AshText as="span">Resolvemos todas tus dudas antes de comprar</AshText>
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {FAQS_MAYORISTAS.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg hover:shadow-black/40"
                >
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BANNER CTA FINAL MAYORISTA */}
        <section className="relative py-20 bg-gradient-to-b from-background via-emerald-950/20 to-background overflow-hidden">
          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Zap className="size-3.5" />
              Empiezá Hoy Mismo
            </span>
            <h2 className="mt-6 font-heading text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              <AshText as="span">¿Listo para armar tu primer pedido mayorista?</AshText>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg">
              Escribinos por WhatsApp y recibí el catálogo con stock actualizado y precios especiales para revendedores en Uruguay.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={WA_LINKS.mayorista}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-9 py-4 font-heading text-base font-bold text-black shadow-2xl shadow-emerald-500/30 transition-transform duration-300 hover:scale-105"
              >
                <WhatsAppIcon className="size-5" />
                Hablar con Asesor Mayorista
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
