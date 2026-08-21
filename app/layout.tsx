import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sealstep.uy'),
  title: 'Seal Step | Championes y calzado urbano con envíos a todo Uruguay',
  description:
    'Tienda online de championes y calzado urbano para hombre y mujer en Uruguay. Modelos modernos, envíos a todo el país, atención por WhatsApp y ventas por mayor para revendedores.',
  keywords: [
    'championes Uruguay',
    'calzado urbano',
    'zapatillas',
    'championes por mayor',
    'Rivera Uruguay',
    'Seal Step',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'Seal Step | Championes y calzado urbano en Uruguay',
    description:
      'Modelos modernos, excelente relación calidad-precio y envíos a todo Uruguay. Consultá por WhatsApp. Ventas por mayor disponibles.',
    locale: 'es_UY',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0A0A0A',
}

import { ClientProviders } from '@/components/client-providers'

const storeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ShoeStore',
  name: 'Seal Step Uruguay',
  description:
    'Tienda online de championes y calzado urbano en Uruguay. Envíos a todo el país y ventas por mayor.',
  url: 'https://sealstep.uy',
  telephone: '+59899321703',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rivera',
    addressCountry: 'UY',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Uruguay',
  },
  currenciesAccepted: 'UYU',
  paymentAccepted: 'Transferencia bancaria, Mercado Pago, Efectivo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`bg-background ${montserrat.variable} ${poppins.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
