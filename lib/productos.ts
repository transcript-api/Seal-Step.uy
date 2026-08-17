/**
 * 📦 Catálogo de productos - Directrices de gestión
 *
 * 1️⃣ REGLAS IMPORTANTES
 * - Nunca inventar datos de producto. Si falta información, usar `null` (para precio) o
 *   valores como "Consultar" y preguntar al usuario antes de guardar.
 * - Cada producto debe tener su propia carpeta en `public/images/<slug>/`.
 * - Las imágenes deben guardarse como `01.jpg`, `02.jpg`, … y la primera siempre será la
 *   portada del catálogo.
 * - No reutilizar imágenes de otros productos.
 *
 * 2️⃣ HELPERS
 * - `addProduct` permite registrar un nuevo producto y generar la carpeta de imágenes.
 * - Sólo debe usarse en scripts de administración, no en la UI de producción.
 */
export type Producto = {
  slug: string
  nombre: string
  categoria: string
  badge?: string
  subtitulo?: string
  /** Lista de colores/variantes reales disponibles para este modelo */
  colores?: string[]
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
    subtitulo: 'Azul / Off White',
    categoria: 'Importados',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42', '43'],
    colores: ['Azul / Off White'],
    stock: 'disponible',
    descripcion:
      'New Balance 1000 Importados en tonalidad Azul / Off White. Silueta retro-futurista con acabados premium en gamuza y mesh transpirable.',
    detalles: [
      'Tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura y garantizada',
    ],
    imagenes: [
      {
        src: '/images/new-balance-1000/01.jpg',
        alt: 'New Balance 1000 vista principal',
      },
      {
        src: '/images/new-balance-1000/02.png',
        alt: 'New Balance 1000 vista lateral',
      },
      {
        src: '/images/new-balance-1000/03.png',
        alt: 'New Balance 1000 vista detalle',
      },
    ],
  },
  {
    slug: 'new-balance-9060',
    nombre: 'New Balance 9060',
    subtitulo: 'Blanco / Gris / Off',
    categoria: 'Nuevos ingresos',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39', '40', '41', '42'],
    colores: ['Blanco / Gris / Off'],
    stock: 'disponible',
    descripcion:
      'New Balance 9060 importados en combinación de blanco, gris y off white. Silueta chunky con suela voluminosa, mesh transpirable y detalles de alta calidad.',
    detalles: [
      'Tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura y garantizada',
    ],
    imagenes: [
      {
        src: '/images/new-balance-9060/01.jpg',
        alt: 'New Balance 9060 vista principal',
      },
      {
        src: '/images/new-balance-9060/02.jpg',
        alt: 'New Balance 9060 vista lateral',
      },
      {
        src: '/images/new-balance-9060/03.jpg',
        alt: 'New Balance 9060 vista trasera y suela',
      },
      {
        src: '/images/new-balance-9060/04.jpg',
        alt: 'New Balance 9060 par completo',
      },
    ],
  },
  {
    slug: 'nike-dunk-low-azul',
    nombre: 'Nike Dunk Low Azul',
    badge: 'NUEVO INGRESO',
    categoria: 'Importados',
    subtitulo: 'Azul / Blanco',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39', '40', '41', '42'],
    colores: ['Azul / Blanco'],
    stock: 'disponible',
    descripcion:
      'Nike Dunk Low Azul importados. Silueta icónica urbana con acabados de primera calidad, panelado en cuero y suela duradera.',
    detalles: [
      'Talles disponibles del 34 al 42',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/nike-dunk-low-azul/01.jpg', alt: 'Nike Dunk Low Azul vista principal' },
      { src: '/images/nike-dunk-low-azul/02.jpg', alt: 'Nike Dunk Low Azul vista lateral' },
      { src: '/images/nike-dunk-low-azul/03.jpg', alt: 'Nike Dunk Low Azul vista detalle' },
      { src: '/images/nike-dunk-low-azul/04.jpg', alt: 'Nike Dunk Low Azul vista trasera' },
      { src: '/images/nike-dunk-low-azul/05.jpg', alt: 'Nike Dunk Low Azul vista superior' },
      { src: '/images/nike-dunk-low-azul/06.jpg', alt: 'Nike Dunk Low Azul par completo' },
    ],
  },
  {
    slug: 'nike-dunk-low-storm-off-latex',
    nombre: 'Nike Dunk Low Storm Off Latex',
    badge: 'NUEVO INGRESO',
    categoria: 'Importados',
    subtitulo: 'Storm / Off White / Latex',
    precio: null,
    fotosReales: true,
    talles: ['39', '40', '41', '42'],
    colores: ['Storm / Off White'],
    stock: 'disponible',
    descripcion:
      'Nike Dunk Low Storm Off Latex importados. Diseño exclusivo con acabados de alta calidad, entresuela combinada y suela tipo latex.',
    detalles: [
      'Talles disponibles del 39 al 42',
      'Edición importada',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/nike-dunk-low-storm-off-latex/01.jpg', alt: 'Nike Dunk Low Storm Off Latex vista principal' },
      { src: '/images/nike-dunk-low-storm-off-latex/02.jpg', alt: 'Nike Dunk Low Storm Off Latex vista lateral' },
      { src: '/images/nike-dunk-low-storm-off-latex/03.jpg', alt: 'Nike Dunk Low Storm Off Latex vista trasera' },
      { src: '/images/nike-dunk-low-storm-off-latex/04.jpg', alt: 'Nike Dunk Low Storm Off Latex par completo' },
    ],
  },
  {
    slug: 'nike-dunk-low-blanco',
    nombre: 'Nike Dunk Low Blanco',
    categoria: 'Importados',
    subtitulo: 'Triple White',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39', '40', '41', '43'],
    colores: ['Blanco'],
    stock: 'disponible',
    descripcion:
      'Nike Dunk Low Triple White importados. Diseño completamente blanco, limpio y versátil para cualquier ocasión con panelado en cuero premium.',
    detalles: [
      'Talles disponibles del 34 al 43 (talle 42 sin stock)',
      'Edición importada',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/nike-dunk-low-blanco/01.jpg', alt: 'Nike Dunk Low Blanco vista principal' },
      { src: '/images/nike-dunk-low-blanco/02.jpg', alt: 'Nike Dunk Low Blanco vista lateral' },
      { src: '/images/nike-dunk-low-blanco/03.jpg', alt: 'Nike Dunk Low Blanco vista trasera' },
      { src: '/images/nike-dunk-low-blanco/04.jpg', alt: 'Nike Dunk Low Blanco par completo' },
    ],
  },
  {
    slug: 'nike-dunk-low-cacao',
    nombre: 'Nike Dunk Low Cacao',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Cacao Wow / Sail',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39', '40'],
    colores: ['Cacao / Sail'],
    stock: 'disponible',
    descripcion:
      'Nike Dunk Low Cacao Wow importados. Combinación en tonos marrón chocolate y blanco sail con acabado en cuero suave.',
    detalles: [
      'Talles disponibles del 34 al 40',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se acepta tarjeta de crédito',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/nike-dunk-low-cacao/01.jpg', alt: 'Nike Dunk Low Cacao vista principal' },
      { src: '/images/nike-dunk-low-cacao/02.jpg', alt: 'Nike Dunk Low Cacao vista lateral' },
      { src: '/images/nike-dunk-low-cacao/03.jpg', alt: 'Nike Dunk Low Cacao vista trasera' },
      { src: '/images/nike-dunk-low-cacao/04.jpg', alt: 'Nike Dunk Low Cacao par completo' },
    ],
  },
  {
    slug: 'nike-dunk-low-blanco-marino-off',
    nombre: 'Nike Dunk Low Blanco/Marino Off',
    categoria: 'Importados',
    subtitulo: 'Blanco / Marino / Off',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42'],
    colores: ['Blanco / Marino / Off'],
    stock: 'disponible',
    descripcion:
      'Nike Dunk Low Blanco y Azul Marino Off importados. Combinación clásica con suela y entresuela off-white y detalles marinos en contraste.',
    detalles: [
      'Talles disponibles del 38 al 42 (Consultar disponibilidad)',
      'Edición importada',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/nike-dunk-low-blanco-marino-off/01.jpg', alt: 'Nike Dunk Low Blanco Marino Off vista principal' },
      { src: '/images/nike-dunk-low-blanco-marino-off/02.jpg', alt: 'Nike Dunk Low Blanco Marino Off vista lateral' },
      { src: '/images/nike-dunk-low-blanco-marino-off/03.jpg', alt: 'Nike Dunk Low Blanco Marino Off vista detalle' },
      { src: '/images/nike-dunk-low-blanco-marino-off/04.jpg', alt: 'Nike Dunk Low Blanco Marino Off vista trasera' },
      { src: '/images/nike-dunk-low-blanco-marino-off/05.jpg', alt: 'Nike Dunk Low Blanco Marino Off par completo' },
    ],
  },
  {
    slug: 'nike-dunk-low-panda',
    nombre: 'Nike Dunk Low Panda',
    categoria: 'Importados',
    subtitulo: 'Blanco / Negro',
    precio: null,
    fotosReales: true,
    talles: ['39', '40', '41', '42'],
    colores: ['Blanco / Negro'],
    stock: 'disponible',
    descripcion:
      'Nike Dunk Low Panda importados en la clásica combinación de blanco y negro. Silueta atemporal, versátil y con acabados de primera calidad.',
    detalles: [
      'Talles disponibles del 39 al 42',
      'Edición importada',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/nike-dunk-low-panda/01.jpg', alt: 'Nike Dunk Low Panda vista principal' },
      { src: '/images/nike-dunk-low-panda/02.jpg', alt: 'Nike Dunk Low Panda vista lateral' },
      { src: '/images/nike-dunk-low-panda/03.jpg', alt: 'Nike Dunk Low Panda vista trasera' },
      { src: '/images/nike-dunk-low-panda/04.jpg', alt: 'Nike Dunk Low Panda par completo' },
    ],
  },
  {
    slug: 'adidas-campus-gris-blanco',
    nombre: 'Adidas Campus Gris/Blanco',
    badge: 'NUEVO INGRESO',
    categoria: 'Importados',
    subtitulo: 'Gris / Blanco',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39', '40', '41', '42'],
    colores: ['Gris / Blanco'],
    stock: 'disponible',
    descripcion:
      'Adidas Campus Gris y Blanco importados. Silueta clásica urbana en gamuza de primera calidad con franjas blancas en contraste y cordones anchos.',
    detalles: [
      'Talles disponibles del 34 al 42',
      'Edición importada',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/adidas-campus-gris-blanco/01.jpg', alt: 'Adidas Campus Gris Blanco vista principal' },
      { src: '/images/adidas-campus-gris-blanco/02.jpg', alt: 'Adidas Campus Gris Blanco vista lateral' },
      { src: '/images/adidas-campus-gris-blanco/03.jpg', alt: 'Adidas Campus Gris Blanco vista trasera' },
      { src: '/images/adidas-campus-gris-blanco/04.jpg', alt: 'Adidas Campus Gris Blanco par completo' },
    ],
  },
  {
    slug: 'adidas-bad-bunny-all-black',
    nombre: 'Adidas Bad Bunny All Black',
    badge: 'EDICIÓN ESPECIAL',
    categoria: 'Importados',
    subtitulo: 'All Black',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42', '43'],
    colores: ['All Black'],
    stock: 'disponible',
    descripcion:
      'Adidas Forum / Response CL x Bad Bunny All Black importados. Diseño monocromático exclusivo con acabados premium y detalles únicos.',
    detalles: [
      'Talles disponibles del 38 al 43',
      'Edición especial importada',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/adidas-bad-bunny-all-black/01.jpg', alt: 'Adidas Bad Bunny All Black vista principal' },
      { src: '/images/adidas-bad-bunny-all-black/02.jpg', alt: 'Adidas Bad Bunny All Black vista lateral' },
      { src: '/images/adidas-bad-bunny-all-black/03.jpg', alt: 'Adidas Bad Bunny All Black vista talón' },
      { src: '/images/adidas-bad-bunny-all-black/04.jpg', alt: 'Adidas Bad Bunny All Black vista detalle' },
      { src: '/images/adidas-bad-bunny-all-black/05.jpg', alt: 'Adidas Bad Bunny All Black par completo' },
    ],
  },
  {
    slug: 'adidas-campus-all-black',
    nombre: 'Adidas Campus All Black',
    categoria: 'Importados',
    subtitulo: 'All Black',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42', '43'],
    colores: ['All Black'],
    stock: 'disponible',
    descripcion:
      'Adidas Campus All Black importados. Silueta retro completamente negra en gamuza premium con cordones anchos acolchados y suela de goma a tono.',
    detalles: [
      'Talles disponibles del 38 al 43',
      'Edición importada',
      'Se acepta tarjeta de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/adidas-campus-all-black/01.jpg', alt: 'Adidas Campus All Black vista principal' },
      { src: '/images/adidas-campus-all-black/02.jpg', alt: 'Adidas Campus All Black vista lateral' },
      { src: '/images/adidas-campus-all-black/03.jpg', alt: 'Adidas Campus All Black vista trasera' },
      { src: '/images/adidas-campus-all-black/04.jpg', alt: 'Adidas Campus All Black par completo' },
    ],
  },
  {
    slug: 'adidas-gazelle-verde-gold',
    nombre: 'Adidas Gazelle Verde Gold',
    badge: 'NUEVO INGRESO',
    subtitulo: 'Verde / Gold',
    categoria: 'Importados',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39'],
    colores: ['Verde / Gold'],
    stock: 'disponible',
    descripcion:
      'Adidas Gazelle Verde Gold importados. Acabados premium en gamuza suave con detalles dorados y suela de goma clásica.',
    detalles: [
      'Talles disponibles del 34 al 39',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se acepta tarjeta de crédito',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/adidas-gazelle-verde-gold/01.jpg', alt: 'Adidas Gazelle Verde Gold vista principal' },
      { src: '/images/adidas-gazelle-verde-gold/02.jpg', alt: 'Adidas Gazelle Verde Gold vista lateral' },
      { src: '/images/adidas-gazelle-verde-gold/03.jpg', alt: 'Adidas Gazelle Verde Gold vista trasera' },
      { src: '/images/adidas-gazelle-verde-gold/04.jpg', alt: 'Adidas Gazelle Verde Gold par completo' },
    ],
  },
  {
    slug: 'adidas-samba-blanco-negro',
    nombre: 'Adidas Samba Blanco / Negro',
    badge: 'LINHA LUXO',
    subtitulo: 'Linha Luxo 🇨🇳',
    categoria: 'Importados',
    precio: null,
    fotosReales: true,
    talles: ['36', '37', '38', '39', '40', '41', '42'],
    colores: ['Blanco / Negro'],
    stock: 'disponible',
    descripcion:
      'Adidas Samba Blanco y Negro Linha Luxo importados. Silueta atemporal con materiales de primera calidad, acabados precisos y comodidad urbana.',
    detalles: [
      'Talles disponibles del 36 al 42',
      'Edición Linha Luxo importada',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se acepta tarjeta de crédito',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/adidas-samba-blanco-negro/01.jpg', alt: 'Adidas Samba Blanco y Negro vista principal' },
      { src: '/images/adidas-samba-blanco-negro/02.jpg', alt: 'Adidas Samba Blanco y Negro vista lateral' },
      { src: '/images/adidas-samba-blanco-negro/03.jpg', alt: 'Adidas Samba Blanco y Negro vista trasera' },
      { src: '/images/adidas-samba-blanco-negro/04.jpg', alt: 'Adidas Samba Blanco y Negro par completo' },
    ],
  },
  {
    slug: 'nike-air-force-gris-demim',
    nombre: 'Nike Air Force Gris/Demim',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Gris / Denim (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42', '43'],
    colores: ['Gris / Denim'],
    stock: 'disponible',
    descripcion:
      'Nike Air Force Gris/Demim importados. Silueta emblemática con panelado en denim texturizado y tonos grises, detalles de alta calidad y máxima comodidad urbana.',
    detalles: [
      'Talles disponibles del 38 al 43',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/NIKE AIR FORCE GRISDEMIM/sealstep_DPrEzOvDeoK_1.jpg', alt: 'Nike Air Force Gris Denim vista principal' },
      { src: '/images/NIKE AIR FORCE GRISDEMIM/sealstep_DPrEzOvDeoK_2.jpg', alt: 'Nike Air Force Gris Denim vista lateral' },
      { src: '/images/NIKE AIR FORCE GRISDEMIM/sealstep_DPrEzOvDeoK_3.jpg', alt: 'Nike Air Force Gris Denim vista detalle' },
      { src: '/images/NIKE AIR FORCE GRISDEMIM/sealstep_DPrEzOvDeoK_4.jpg', alt: 'Nike Air Force Gris Denim par completo' },
    ],
  },
  {
    slug: 'nike-air-force-blanco-negro-verniz-gold',
    nombre: 'Air Force Blanco/Negro Verniz Gold',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Blanco / Negro / Verniz Gold',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38'],
    colores: ['Blanco / Negro / Verniz Gold'],
    stock: 'disponible',
    descripcion:
      'Air Force Blanco/Negro Verniz Gold importados. Acabado brillante tipo charol/verniz con acentos dorados y contraste blanco/negro premium.',
    detalles: [
      'Talles disponibles del 34 al 38',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-AIR FORCE BLANCONEGRO VERNIZ GOLD/sealstep_DPrEpaAjeTu_1.jpg', alt: 'Air Force Blanco Negro Verniz Gold vista principal' },
      { src: '/images/-AIR FORCE BLANCONEGRO VERNIZ GOLD/sealstep_DPrEpaAjeTu_2.jpg', alt: 'Air Force Blanco Negro Verniz Gold vista lateral' },
      { src: '/images/-AIR FORCE BLANCONEGRO VERNIZ GOLD/sealstep_DPrEpaAjeTu_3.jpg', alt: 'Air Force Blanco Negro Verniz Gold vista detalle' },
      { src: '/images/-AIR FORCE BLANCONEGRO VERNIZ GOLD/sealstep_DPrEpaAjeTu_4.jpg', alt: 'Air Force Blanco Negro Verniz Gold par completo' },
    ],
  },
  {
    slug: 'nike-air-force-bell-off-azul',
    nombre: 'Nike Air Force Bell/Off/Azul',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Bell / Off / Azul (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42', '43'],
    colores: ['Bell / Off / Azul'],
    stock: 'disponible',
    descripcion:
      'Nike Air Force Bell/Off/Azul importados. Combinación armónica en tonos beige bell, off white y toques azules con suela cosida y amortiguación Air.',
    detalles: [
      'Talles disponibles del 38 al 43',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-NIKE AIR FORCE BELLOFFAZUL/sealstep_DPrEieKDZKb_1.jpg', alt: 'Nike Air Force Bell Off Azul vista principal' },
      { src: '/images/-NIKE AIR FORCE BELLOFFAZUL/sealstep_DPrEieKDZKb_2.jpg', alt: 'Nike Air Force Bell Off Azul vista lateral' },
      { src: '/images/-NIKE AIR FORCE BELLOFFAZUL/sealstep_DPrEieKDZKb_3.jpg', alt: 'Nike Air Force Bell Off Azul vista detalle' },
      { src: '/images/-NIKE AIR FORCE BELLOFFAZUL/sealstep_DPrEieKDZKb_4.jpg', alt: 'Nike Air Force Bell Off Azul par completo' },
    ],
  },
  {
    slug: 'nike-air-force-1-blanco',
    nombre: 'Nike Air Force Blanco',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Triple White (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39', '40', '41', '42'],
    colores: ['Blanco'],
    stock: 'disponible',
    descripcion:
      'Nike Air Force 1 Blanco importados. El clásico más vendido a nivel mundial en cuero blanco impecable, suela gruesa con cápsula de aire y pasacordones metálico.',
    detalles: [
      'Talles disponibles del 34 al 42',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-NIKE AIR FORCE BLANCO/sealstep_DPrEZpfjRVi_1.jpg', alt: 'Nike Air Force Blanco vista principal' },
      { src: '/images/-NIKE AIR FORCE BLANCO/sealstep_DPrEZpfjRVi_2.jpg', alt: 'Nike Air Force Blanco vista lateral' },
      { src: '/images/-NIKE AIR FORCE BLANCO/sealstep_DPrEZpfjRVi_3.jpg', alt: 'Nike Air Force Blanco vista detalle' },
      { src: '/images/-NIKE AIR FORCE BLANCO/sealstep_DPrEZpfjRVi_4.jpg', alt: 'Nike Air Force Blanco par completo' },
    ],
  },
  {
    slug: 'chanclas-slide-nike-beige',
    nombre: 'Chanclas SLIDE Nike Beige',
    badge: 'LANZAMIENTO',
    categoria: 'Chanclas Slide',
    subtitulo: 'Lanzamiento · Reposición disponible',
    precio: null,
    fotosReales: true,
    talles: ['37', '38', '39', '40', '41', '42', '43', '44'],
    colores: ['Beige'],
    stock: 'disponible',
    descripcion:
      'Chanclas SLIDE Nike Beige importadas. Espuma de máxima suavidad con soporte ergonómico, suela antideslizante y diseño minimalista de última tendencia.',
    detalles: [
      'Lanzamiento exclusivo',
      'Talles disponibles del 37 al 44',
      'Reposición disponible inmediata',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_1.jpg', alt: 'Chanclas SLIDE Nike Beige vista principal' },
      { src: '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_2.jpg', alt: 'Chanclas SLIDE Nike Beige vista superior' },
      { src: '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_3.jpg', alt: 'Chanclas SLIDE Nike Beige vista lateral' },
      { src: '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_4.jpg', alt: 'Chanclas SLIDE Nike Beige vista suela' },
      { src: '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_5.jpg', alt: 'Chanclas SLIDE Nike Beige par completo' },
    ],
  },
  {
    slug: 'chanclas-slide-nike-gris',
    nombre: 'Chanclas SLIDE Nike Gris',
    badge: 'LANZAMIENTO',
    categoria: 'Chanclas Slide',
    subtitulo: 'Lanzamiento · Reposición disponible',
    precio: null,
    fotosReales: true,
    talles: ['37', '38', '39', '40', '41', '42', '43', '44'],
    colores: ['Gris'],
    stock: 'disponible',
    descripcion:
      'Chanclas SLIDE Nike Gris importadas. Silueta ergonómica de espuma densa y ultra liviana con acabado mate, ideal para descanso, playa o uso urbano.',
    detalles: [
      'Lanzamiento exclusivo',
      'Talles disponibles del 37 al 44',
      'Reposición disponible inmediata',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_1.jpg', alt: 'Chanclas SLIDE Nike Gris vista principal' },
      { src: '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_2.jpg', alt: 'Chanclas SLIDE Nike Gris vista superior' },
      { src: '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_3.jpg', alt: 'Chanclas SLIDE Nike Gris vista lateral' },
      { src: '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_4.jpg', alt: 'Chanclas SLIDE Nike Gris vista suela' },
      { src: '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_5.jpg', alt: 'Chanclas SLIDE Nike Gris par completo' },
    ],
  },
  {
    slug: 'new-balance-1000-all-black',
    nombre: 'New Balance 1000 All Black',
    badge: 'NUEVO INGRESO',
    categoria: 'Importados',
    subtitulo: 'All Black (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42', '43'],
    colores: ['All Black'],
    stock: 'disponible',
    descripcion:
      'New Balance 1000 All Black importados. Estética triple black agresiva y futurista, con combinación de texturas en cuero y mesh, amortiguación ABZORB y máxima durabilidad.',
    detalles: [
      'Talles disponibles del 38 al 43',
      'Edición importada',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_1.jpg', alt: 'New Balance 1000 All Black vista principal' },
      { src: '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_2.jpg', alt: 'New Balance 1000 All Black vista lateral' },
      { src: '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_3.jpg', alt: 'New Balance 1000 All Black vista detalle' },
      { src: '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_4.jpg', alt: 'New Balance 1000 All Black par completo' },
      { src: '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_5.jpg', alt: 'New Balance 1000 All Black vista talón' },
      { src: '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_6.jpg', alt: 'New Balance 1000 All Black vista frontal' },
    ],
  },
  {
    slug: 'adidas-campus-00s',
    nombre: 'Adidas Campus 00s',
    badge: 'NUEVO INGRESO',
    categoria: 'Importados',
    subtitulo: 'Core Black / White',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42', '43'],
    colores: ['Negro / Blanco'],
    stock: 'disponible',
    descripcion:
      'Adidas Campus 00s importados. Silueta skate inspirada en la década del 2000 con lengüeta acolchada, franjas gruesas y gamuza de primera calidad.',
    detalles: [
      'Talles disponibles del 38 al 43',
      'Edición importada',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/ADIDAS CAMPUS 00s/sealstep_DOeN7BWj9fI_1.jpg', alt: 'Adidas Campus 00s vista principal' },
      { src: '/images/ADIDAS CAMPUS 00s/sealstep_DOeN7BWj9fI_2.jpg', alt: 'Adidas Campus 00s vista lateral' },
      { src: '/images/ADIDAS CAMPUS 00s/sealstep_DOeN7BWj9fI_3.jpg', alt: 'Adidas Campus 00s vista trasera' },
      { src: '/images/ADIDAS CAMPUS 00s/sealstep_DOeN7BWj9fI_4.jpg', alt: 'Adidas Campus 00s vista detalle' },
      { src: '/images/ADIDAS CAMPUS 00s/sealstep_DOeN7BWj9fI_5.jpg', alt: 'Adidas Campus 00s par completo' },
    ],
  },
  {
    slug: 'puma-suede-xl',
    nombre: 'Puma Suede XL',
    badge: 'NUEVO INGRESO',
    categoria: 'Importados',
    subtitulo: 'Black / White XL',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42', '43'],
    colores: ['Negro / Blanco'],
    stock: 'disponible',
    descripcion:
      'Puma Suede XL importados. La clásica silueta Suede reinterpretada con proporciones exageradas, acolchado extra y cordones anchos estilo skater.',
    detalles: [
      'Talles disponibles del 38 al 43',
      'Edición importada',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/PUMA SUEDE XL/sealstep_DGBsWFHyxiH_1.jpg', alt: 'Puma Suede XL vista principal' },
      { src: '/images/PUMA SUEDE XL/sealstep_DGBsWFHyxiH_2.jpg', alt: 'Puma Suede XL vista lateral' },
      { src: '/images/PUMA SUEDE XL/sealstep_DGBsWFHyxiH_3.jpg', alt: 'Puma Suede XL vista trasera' },
    ],
  },
  {
    slug: 'adidas-campus-azul-bb-off',
    nombre: 'Adidas Campus Azul BB/Off',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Azul Bebé / Off White (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38'],
    colores: ['Azul Bebé / Off White'],
    stock: 'disponible',
    descripcion:
      'Adidas Campus Azul Bebé y Off White importados. Gamuza suave en tono azul pastel combinado con franjas off-white y suela de goma retro.',
    detalles: [
      'Talles disponibles del 34 al 38',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-ADIDAS CAMPUS AZUL BB.OFF/sealstep_DPrBA1xDfFV_1.jpg', alt: 'Adidas Campus Azul BB Off vista principal' },
      { src: '/images/-ADIDAS CAMPUS AZUL BB.OFF/sealstep_DPrBA1xDfFV_2.jpg', alt: 'Adidas Campus Azul BB Off vista lateral' },
      { src: '/images/-ADIDAS CAMPUS AZUL BB.OFF/sealstep_DPrBA1xDfFV_3.jpg', alt: 'Adidas Campus Azul BB Off vista detalle' },
      { src: '/images/-ADIDAS CAMPUS AZUL BB.OFF/sealstep_DPrBA1xDfFV_4.jpg', alt: 'Adidas Campus Azul BB Off par completo' },
    ],
  },
  {
    slug: 'adidas-campus-verde',
    nombre: 'Adidas Campus Verde',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Verde / Blanco (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38'],
    colores: ['Verde / Blanco'],
    stock: 'disponible',
    descripcion:
      'Adidas Campus Verde importados. Silueta clásica en gamuza verde bosque con franjas blancas en contraste y cordones anchos característicos.',
    detalles: [
      'Talles disponibles del 34 al 38',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-ADIDAS CAMPUS VERDE/sealstep_DPeHwjDjQDs_1.jpg', alt: 'Adidas Campus Verde vista principal' },
      { src: '/images/-ADIDAS CAMPUS VERDE/sealstep_DPeHwjDjQDs_2.jpg', alt: 'Adidas Campus Verde vista lateral' },
      { src: '/images/-ADIDAS CAMPUS VERDE/sealstep_DPeHwjDjQDs_3.jpg', alt: 'Adidas Campus Verde vista detalle' },
      { src: '/images/-ADIDAS CAMPUS VERDE/sealstep_DPeHwjDjQDs_4.jpg', alt: 'Adidas Campus Verde par completo' },
    ],
  },
  {
    slug: 'adidas-campus-off-beige',
    nombre: 'Adidas Campus Off/Beige',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Off White / Beige (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39', '40', '41', '42'],
    colores: ['Off White / Beige'],
    stock: 'disponible',
    descripcion:
      'Adidas Campus Off/Beige importados. Gamuza premium en tonos neutros beige y off-white, silueta retro de gran versatilidad con máxima comodidad.',
    detalles: [
      'Talles disponibles del 34 al 42',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-ADIDAS CAMPUS OFF.BEGE/sealstep_DPrCN2ujfqc_1.jpg', alt: 'Adidas Campus Off Beige vista principal' },
      { src: '/images/-ADIDAS CAMPUS OFF.BEGE/sealstep_DPrCN2ujfqc_2.jpg', alt: 'Adidas Campus Off Beige vista lateral' },
      { src: '/images/-ADIDAS CAMPUS OFF.BEGE/sealstep_DPrCN2ujfqc_3.jpg', alt: 'Adidas Campus Off Beige vista detalle' },
      { src: '/images/-ADIDAS CAMPUS OFF.BEGE/sealstep_DPrCN2ujfqc_4.jpg', alt: 'Adidas Campus Off Beige par completo' },
    ],
  },
  {
    slug: 'adidas-samba-verde',
    nombre: 'Adidas Samba Verde',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Verde / Blanco (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['36', '37', '38', '39', '40', '41', '42'],
    colores: ['Verde / Blanco'],
    stock: 'disponible',
    descripcion:
      'Adidas Samba Verde importados. Silueta clásica con puntera en T de gamuza, panelado en verde y franjas blancas sobre suela de goma caramelo.',
    detalles: [
      'Talles disponibles del 36 al 42',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-ADIDAS SAMBA VERDE/sealstep_DPeH_D-jUfB_1.jpg', alt: 'Adidas Samba Verde vista principal' },
      { src: '/images/-ADIDAS SAMBA VERDE/sealstep_DPeH_D-jUfB_2.jpg', alt: 'Adidas Samba Verde vista lateral' },
      { src: '/images/-ADIDAS SAMBA VERDE/sealstep_DPeH_D-jUfB_3.jpg', alt: 'Adidas Samba Verde par completo' },
    ],
  },
  {
    slug: 'adidas-samba-negra-blanca',
    nombre: 'Adidas Samba Negra/Blanca',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Negro / Blanco (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['36', '37', '38', '39', '40', '41', '42', '43'],
    colores: ['Negro / Blanco'],
    stock: 'disponible',
    descripcion:
      'Adidas Samba Negra/Blanca importados. El clásico imprescindible en cuero negro de primera calidad, franjas blancas en contraste y suela de goma retro.',
    detalles: [
      'Talles disponibles del 36 al 43',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-ADIDAS SAMBA Negra blanca/sealstep_DPjiNgsDTt5_1.jpg', alt: 'Adidas Samba Negra Blanca vista principal' },
      { src: '/images/-ADIDAS SAMBA Negra blanca/sealstep_DPjiNgsDTt5_2.jpg', alt: 'Adidas Samba Negra Blanca vista lateral' },
      { src: '/images/-ADIDAS SAMBA Negra blanca/sealstep_DPjiNgsDTt5_3.jpg', alt: 'Adidas Samba Negra Blanca vista detalle' },
      { src: '/images/-ADIDAS SAMBA Negra blanca/sealstep_DPjiNgsDTt5_4.jpg', alt: 'Adidas Samba Negra Blanca par completo' },
    ],
  },
  {
    slug: 'adidas-samba-marron',
    nombre: 'Adidas Samba Marrón',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Marrón / Suela Caramelo (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39'],
    colores: ['Marrón / Caramelo'],
    stock: 'disponible',
    descripcion:
      'Adidas Samba Marrón importados. Exclusiva tonalidad café con detalles en contraste y suela de goma clásica para un look urbano refinado.',
    detalles: [
      'Talles disponibles del 34 al 39',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-ADIDAS SAMBA MARRÓN/sealstep_DPrCzi9jVQM_1.jpg', alt: 'Adidas Samba Marrón vista principal' },
      { src: '/images/-ADIDAS SAMBA MARRÓN/sealstep_DPrCzi9jVQM_2.jpg', alt: 'Adidas Samba Marrón vista lateral' },
      { src: '/images/-ADIDAS SAMBA MARRÓN/sealstep_DPrCzi9jVQM_3.jpg', alt: 'Adidas Samba Marrón vista detalle' },
      { src: '/images/-ADIDAS SAMBA MARRÓN/sealstep_DPrCzi9jVQM_4.jpg', alt: 'Adidas Samba Marrón par completo' },
    ],
  },
  {
    slug: 'adidas-samba-blanco-latex',
    nombre: 'Adidas Samba Blanco/Latex',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Blanco / Latex (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39'],
    colores: ['Blanco / Latex'],
    stock: 'disponible',
    descripcion:
      'Adidas Samba Blanco/Latex importados. Cuero suave color blanco tiza con suela de goma translúcida tipo latex y acabados de alta definición.',
    detalles: [
      'Talles disponibles del 34 al 39',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-ADIDAS SAMBA BLANCO-LATEX/sealstep_DPrDcrRDdXO_1.jpg', alt: 'Adidas Samba Blanco Latex vista principal' },
      { src: '/images/-ADIDAS SAMBA BLANCO-LATEX/sealstep_DPrDcrRDdXO_2.jpg', alt: 'Adidas Samba Blanco Latex vista lateral' },
      { src: '/images/-ADIDAS SAMBA BLANCO-LATEX/sealstep_DPrDcrRDdXO_3.jpg', alt: 'Adidas Samba Blanco Latex vista detalle' },
      { src: '/images/-ADIDAS SAMBA BLANCO-LATEX/sealstep_DPrDcrRDdXO_4.jpg', alt: 'Adidas Samba Blanco Latex par completo' },
    ],
  },
  {
    slug: 'adidas-samba-blanco-verde',
    nombre: 'Adidas Samba Blanco/Verde',
    badge: 'POR ENCARGUE',
    categoria: 'Importados',
    subtitulo: 'Blanco / Verde (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39'],
    colores: ['Blanco / Verde'],
    stock: 'disponible',
    descripcion:
      'Adidas Samba Blanco y Verde importados. Base de cuero blanco con franjas verdes, puntera de gamuza grisácea y suela de goma.',
    detalles: [
      'Talles disponibles del 34 al 39',
      'Modalidad: Por encargue (24 a 72 hs)',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-ADIDAS SAMBA BLANCO-VERDE/sealstep_DPrD1P1Dfb0_1.jpg', alt: 'Adidas Samba Blanco Verde vista principal' },
      { src: '/images/-ADIDAS SAMBA BLANCO-VERDE/sealstep_DPrD1P1Dfb0_2.jpg', alt: 'Adidas Samba Blanco Verde vista lateral' },
      { src: '/images/-ADIDAS SAMBA BLANCO-VERDE/sealstep_DPrD1P1Dfb0_3.jpg', alt: 'Adidas Samba Blanco Verde vista detalle' },
      { src: '/images/-ADIDAS SAMBA BLANCO-VERDE/sealstep_DPrD1P1Dfb0_4.jpg', alt: 'Adidas Samba Blanco Verde par completo' },
    ],
  },
  {
    slug: 'vans-hylane-knit',
    nombre: 'Vans Hylane Knit',
    badge: 'NUEVO INGRESO',
    categoria: 'Importados',
    subtitulo: 'Knit / Black White (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39'],
    colores: ['Negro / Blanco'],
    stock: 'disponible',
    descripcion:
      'Vans Hylane Knit importados. Silueta skate Y2K con tejido knit respirable, Sidestripe 3D acolchada, cordones extra gruesos y suela cupsole.',
    detalles: [
      'Talles disponibles del 34 al 39',
      'Edición importada',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_1.jpg', alt: 'Vans Hylane Knit vista principal' },
      { src: '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_2.jpg', alt: 'Vans Hylane Knit vista lateral' },
      { src: '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_3.jpg', alt: 'Vans Hylane Knit vista trasera' },
      { src: '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_4.jpg', alt: 'Vans Hylane Knit vista detalle' },
      { src: '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_5.jpg', alt: 'Vans Hylane Knit vista suela' },
      { src: '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_6.jpg', alt: 'Vans Hylane Knit par completo' },
    ],
  },
  {
    slug: 'vans-knu-skool-azul-blanco',
    nombre: 'Vans Knu Skool Azul/Blanco',
    badge: 'NUEVO INGRESO',
    categoria: 'Importados',
    subtitulo: 'Azul / Blanco (Importados)',
    precio: null,
    fotosReales: true,
    talles: ['34', '35', '36', '37', '38', '39'],
    colores: ['Azul / Blanco'],
    stock: 'disponible',
    descripcion:
      'Vans Knu Skool Azul y Blanco importados. Modelo chunky puffy de los 90s con lengüeta y cuello acolchados, Sidestripe moldeada en 3D y suela waffle de goma.',
    detalles: [
      'Talles disponibles del 34 al 39',
      'Edición importada',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/-VANS KNU Azul Blanco/sealstep_DPeFlU1DeUT_1.jpg', alt: 'Vans Knu Skool Azul Blanco vista principal' },
      { src: '/images/-VANS KNU Azul Blanco/sealstep_DPeFlU1DeUT_2.jpg', alt: 'Vans Knu Skool Azul Blanco vista lateral' },
      { src: '/images/-VANS KNU Azul Blanco/sealstep_DPeFlU1DeUT_3.jpg', alt: 'Vans Knu Skool Azul Blanco vista detalle' },
      { src: '/images/-VANS KNU Azul Blanco/sealstep_DPeFlU1DeUT_4.jpg', alt: 'Vans Knu Skool Azul Blanco vista suela' },
      { src: '/images/-VANS KNU Azul Blanco/sealstep_DPeFlU1DeUT_5.jpg', alt: 'Vans Knu Skool Azul Blanco par completo' },
    ],
  },
  {
    slug: 'vans-knu-skool-clasicas',
    nombre: 'Vans Knu Skool Clásicas',
    badge: 'NUEVO INGRESO',
    categoria: 'Importados',
    subtitulo: 'Black / White Clásicas',
    precio: null,
    fotosReales: true,
    talles: ['38', '39', '40', '41', '42', '43'],
    colores: ['Negro / Blanco'],
    stock: 'disponible',
    descripcion:
      'Vans Knu Skool Clásicas Black & White importadas. La icónica silueta de caña baja reinterpretada con acolchado voluptuoso de los 90, Sidestripe 3D y suela waffle.',
    detalles: [
      'Talles disponibles del 38 al 43',
      'Edición importada',
      'Se aceptan tarjetas de crédito',
      'Envíos a todo el país (24 a 72 hs)',
      'Compra 100% segura',
    ],
    imagenes: [
      { src: '/images/VANS KNU SKOOL Clasicas/sealstep_DU1bWXBDysA_1.jpg', alt: 'Vans Knu Skool Clásicas vista principal' },
      { src: '/images/VANS KNU SKOOL Clasicas/sealstep_DU1bWXBDysA_2.jpg', alt: 'Vans Knu Skool Clásicas vista lateral' },
      { src: '/images/VANS KNU SKOOL Clasicas/sealstep_DU1bWXBDysA_3.jpg', alt: 'Vans Knu Skool Clásicas vista trasera' },
      { src: '/images/VANS KNU SKOOL Clasicas/sealstep_DU1bWXBDysA_4.jpg', alt: 'Vans Knu Skool Clásicas vista detalle' },
      { src: '/images/VANS KNU SKOOL Clasicas/sealstep_DU1bWXBDysA_5.jpg', alt: 'Vans Knu Skool Clásicas par completo' },
    ],
  },
]

export type MarcaConfig = {
  slug: string
  nombre: string
  descripcion: string
  badge?: string
}

export const MARCAS: MarcaConfig[] = [
  {
    slug: 'nike',
    nombre: 'Nike',
    descripcion: 'Ediciones exclusivas, modelos Air Force 1, Dunk Low e importaciones directas.',
  },
  {
    slug: 'adidas',
    nombre: 'Adidas',
    descripcion: 'Modelos Campus 00s, Samba, Gazelle, Bad Bunny y colaboraciones especiales.',
  },
  {
    slug: 'new-balance',
    nombre: 'New Balance',
    descripcion: 'Modelos retro-futuristas 1000 y 9060 con máximo confort.',
  },
  {
    slug: 'puma',
    nombre: 'Puma',
    descripcion: 'Modelos Suede XL y siluetas icónicas urbanas.',
  },
  {
    slug: 'vans',
    nombre: 'Vans',
    descripcion: 'Modelos Knu Skool y Hylane Knit de estética skate y urbana.',
  },
  {
    slug: 'slides',
    nombre: 'Chanclas Slide',
    descripcion: 'Colección de chanclas slide y calzado de verano importado.',
    badge: 'EDICION VERANO',
  },
]

export function getProductosPorMarca(marcaSlug: string): Producto[] {
  const slugLower = marcaSlug.toLowerCase()
  if (slugLower === 'nike') {
    return PRODUCTOS.filter((p) => p.nombre.toLowerCase().startsWith('nike') || p.nombre.toLowerCase().startsWith('air force'))
  }
  if (slugLower === 'adidas') {
    return PRODUCTOS.filter((p) => p.nombre.toLowerCase().startsWith('adidas'))
  }
  if (slugLower === 'new-balance') {
    return PRODUCTOS.filter((p) => p.nombre.toLowerCase().startsWith('new balance'))
  }
  if (slugLower === 'puma') {
    return PRODUCTOS.filter((p) => p.nombre.toLowerCase().startsWith('puma'))
  }
  if (slugLower === 'vans') {
    return PRODUCTOS.filter((p) => p.nombre.toLowerCase().startsWith('vans'))
  }
  if (slugLower === 'slides') {
    return PRODUCTOS.filter(
      (p) =>
        p.categoria.toLowerCase().includes('slide') ||
        p.nombre.toLowerCase().includes('slide') ||
        p.categoria.toLowerCase().includes('chancla') ||
        p.nombre.toLowerCase().includes('chancla'),
    )
  }
  return []
}

export function getMarcaConfig(marcaSlug: string): MarcaConfig | undefined {
  return MARCAS.find((m) => m.slug.toLowerCase() === marcaSlug.toLowerCase())
}

export function addProduct(newProduct: Omit<Producto, 'imagenes'> & { imagenesCount: number }) {
  const basePath = `/images/${newProduct.slug}`;
  const images = Array.from({ length: newProduct.imagenesCount }, (_, i) => {
    const idx = String(i + 1).padStart(2, '0');
    return { src: `${basePath}/${idx}.jpg`, alt: `${newProduct.nombre} foto ${i + 1}` };
  });
  return { ...newProduct, imagenes: images } as Producto;
}

export function getProducto(slug: string) {
  return PRODUCTOS.find((p) => p.slug === slug);
}

export const STOCK_LABEL: Record<Producto['stock'], string> = {
  disponible: 'Stock disponible',
  ultimas: 'Últimas unidades',
  agotado: 'Sin stock',
};

export function validateProductData(product: Partial<Omit<Producto, 'imagenes'>> & { imagenesCount?: number }) {
  const required: (keyof Omit<Producto, 'imagenes'>)[] = ['slug', 'nombre', 'categoria', 'precio', 'fotosReales', 'talles', 'stock', 'descripcion', 'detalles'];
  const missing = required.filter((key) => (product as any)[key] === undefined || (product as any)[key] === null);
  if (missing.length) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
}
