export type Producto = {
  slug: string
  nombre: string
  categoria: string
  /** Precio a mostrar. Usar null para "Consultar precio". */
  precio: string | null
  /** true = fotos reales del proveedor. false = imagen de referencia. */
  fotosReales: boolean
  talles: string[]
  stock: 'disponible' | 'ultimas' | 'agotado'
  descripcion: string
  detalles: string[]
  /** Ruta relativa a /public. La primera imagen es la portada del catálogo. */
  imagenes: { src: string; alt: string }[]
}

export const PRODUCTOS: Producto[] = [
  {
    slug: 'new-balance-1000',
    nombre: 'New Balance 1000',
    categoria: 'Deportivos',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42', '43'],
    stock: 'disponible',
    descripcion:
      'Modelo importado en colorway gris, blanco y azul marino con detalles en plata. Silueta chunky Y2K, gran comodidad y amortiguación para uso diario.',
    detalles: [
      'Producto importado de alta calidad',
      'Talles disponibles del 38 al 43',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      {
        src: '/images/nb1000-1.png',
        alt: 'New Balance 1000 gris y azul marino de perfil sobre su caja',
      },
      {
        src: '/images/nb1000-2.png',
        alt: 'Par de New Balance 1000 gris y azul marino sobre vegetación',
      },
      {
        src: '/images/nb1000-3.png',
        alt: 'New Balance 1000 gris y azul marino de perfil al aire libre',
      },
    ],
  },
  {
    slug: 'adidas-urbanos',
    nombre: 'Adidas Urbanos',
    categoria: 'Urbanos',
    precio: null,
    fotosReales: false,
    talles: ['39', '40', '41', '42', '43', '44'],
    stock: 'disponible',
    descripcion:
      'Clásicos urbanos en gris con franjas blancas y suela gum. Versátiles para usar todos los días.',
    detalles: [
      'Talles disponibles del 39 al 44',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      {
        src: '/images/product-urbanos.png',
        alt: 'Champión urbano gris con franjas blancas y suela gum',
      },
    ],
  },
  {
    slug: 'nike-dunk-low-grey',
    nombre: 'Nike Dunk Low Grey',
    categoria: 'Casual',
    precio: null,
    fotosReales: false,
    talles: ['38', '39', '40', '41', '42', '43'],
    stock: 'ultimas',
    descripcion:
      'Nike Dunk Low en gris y blanco con cordones tipo soga y suela gum. Un básico que combina con todo.',
    detalles: [
      'Talles disponibles del 38 al 43',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      {
        src: '/images/product-casual.png',
        alt: 'Nike Dunk Low gris y blanco con cordones tipo soga',
      },
    ],
  },
  {
    slug: 'nike-dunk-low-panda',
    nombre: 'Nike Dunk Low Panda',
    categoria: 'Nuevos ingresos',
    precio: null,
    fotosReales: false,
    talles: ['38', '39', '40', '41', '42', '43', '44'],
    stock: 'disponible',
    descripcion:
      'El clásico Dunk Low en blanco y negro (panda). Nuevo ingreso en cantidades limitadas.',
    detalles: [
      'Talles disponibles del 38 al 44',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      {
        src: '/images/product-nuevos.png',
        alt: 'Nike Dunk Low blanco y negro estilo panda',
      },
    ],
  },
]

export function getProducto(slug: string) {
  return PRODUCTOS.find((p) => p.slug === slug)
}

export const STOCK_LABEL: Record<Producto['stock'], string> = {
  disponible: 'Stock disponible',
  ultimas: 'Últimas unidades',
  agotado: 'Sin stock',
}
