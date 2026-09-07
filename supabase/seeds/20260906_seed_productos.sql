-- ==============================================================================
-- SEAL STEP — POBLACIÓN DE DATOS DE PRODUCTOS (SEED IDEMPOTENTE)
-- Total de productos: 33
-- Generado automáticamente desde lib/productos.ts
-- ==============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Iniciando carga de catálogo en Supabase...';
END $$;


-- ----------------------------------------------------------------------------
-- Producto #1: new-balance-1000
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'new-balance-1000',
  'New Balance 1000',
  'Azul / Off White',
  'Importados',
  'New Balance',
  NULL,
  'New Balance 1000 Importados en tonalidad Azul / Off White. Silueta retro-futurista con acabados premium en gamuza y mesh transpirable.',
  ARRAY['Tarjeta de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura y garantizada']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000'),
  '/images/new-balance-1000/01.jpg',
  'New Balance 1000 vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000'),
  '/images/new-balance-1000/02.png',
  'New Balance 1000 vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000'),
  '/images/new-balance-1000/03.png',
  'New Balance 1000 vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000'),
  'new-balance-1000-38-azul---off-white',
  '38',
  'Azul / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000'),
  'new-balance-1000-39-azul---off-white',
  '39',
  'Azul / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000'),
  'new-balance-1000-40-azul---off-white',
  '40',
  'Azul / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000'),
  'new-balance-1000-41-azul---off-white',
  '41',
  'Azul / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000'),
  'new-balance-1000-42-azul---off-white',
  '42',
  'Azul / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000'),
  'new-balance-1000-43-azul---off-white',
  '43',
  'Azul / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #2: new-balance-9060
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'new-balance-9060',
  'New Balance 9060',
  'Blanco / Gris / Off',
  'Nuevos ingresos',
  'New Balance',
  NULL,
  'New Balance 9060 importados en combinación de blanco, gris y off white. Silueta chunky con suela voluminosa, mesh transpirable y detalles de alta calidad.',
  ARRAY['Tarjeta de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura y garantizada']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  '/images/new-balance-9060/01.jpg',
  'New Balance 9060 vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  '/images/new-balance-9060/02.jpg',
  'New Balance 9060 vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  '/images/new-balance-9060/03.jpg',
  'New Balance 9060 vista trasera y suela',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  '/images/new-balance-9060/04.jpg',
  'New Balance 9060 par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  'new-balance-9060-34-blanco---gris---off',
  '34',
  'Blanco / Gris / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  'new-balance-9060-35-blanco---gris---off',
  '35',
  'Blanco / Gris / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  'new-balance-9060-36-blanco---gris---off',
  '36',
  'Blanco / Gris / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  'new-balance-9060-37-blanco---gris---off',
  '37',
  'Blanco / Gris / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  'new-balance-9060-38-blanco---gris---off',
  '38',
  'Blanco / Gris / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  'new-balance-9060-39-blanco---gris---off',
  '39',
  'Blanco / Gris / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  'new-balance-9060-40-blanco---gris---off',
  '40',
  'Blanco / Gris / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  'new-balance-9060-41-blanco---gris---off',
  '41',
  'Blanco / Gris / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-9060'),
  'new-balance-9060-42-blanco---gris---off',
  '42',
  'Blanco / Gris / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #3: nike-dunk-low-azul
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'nike-dunk-low-azul',
  'Nike Dunk Low Azul',
  'Azul / Blanco',
  'Importados',
  'Nike',
  'NUEVO INGRESO',
  'Nike Dunk Low Azul importados. Silueta icónica urbana con acabados de primera calidad, panelado en cuero y suela duradera.',
  ARRAY['Talles disponibles del 34 al 42', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  '/images/nike-dunk-low-azul/01.jpg',
  'Nike Dunk Low Azul vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  '/images/nike-dunk-low-azul/02.jpg',
  'Nike Dunk Low Azul vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  '/images/nike-dunk-low-azul/03.jpg',
  'Nike Dunk Low Azul vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  '/images/nike-dunk-low-azul/04.jpg',
  'Nike Dunk Low Azul vista trasera',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  '/images/nike-dunk-low-azul/05.jpg',
  'Nike Dunk Low Azul vista superior',
  4,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  '/images/nike-dunk-low-azul/06.jpg',
  'Nike Dunk Low Azul par completo',
  5,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  'nike-dunk-low-azul-34-azul---blanco',
  '34',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  'nike-dunk-low-azul-35-azul---blanco',
  '35',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  'nike-dunk-low-azul-36-azul---blanco',
  '36',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  'nike-dunk-low-azul-37-azul---blanco',
  '37',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  'nike-dunk-low-azul-38-azul---blanco',
  '38',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  'nike-dunk-low-azul-39-azul---blanco',
  '39',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  'nike-dunk-low-azul-40-azul---blanco',
  '40',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  'nike-dunk-low-azul-41-azul---blanco',
  '41',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-azul'),
  'nike-dunk-low-azul-42-azul---blanco',
  '42',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #4: nike-dunk-low-storm-off-latex
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'nike-dunk-low-storm-off-latex',
  'Nike Dunk Low Storm Off Latex',
  'Storm / Off White / Latex',
  'Importados',
  'Nike',
  'NUEVO INGRESO',
  'Nike Dunk Low Storm Off Latex importados. Diseño exclusivo con acabados de alta calidad, entresuela combinada y suela tipo latex.',
  ARRAY['Talles disponibles del 39 al 42', 'Edición importada', 'Se acepta tarjeta de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-storm-off-latex'),
  '/images/nike-dunk-low-storm-off-latex/01.jpg',
  'Nike Dunk Low Storm Off Latex vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-storm-off-latex'),
  '/images/nike-dunk-low-storm-off-latex/02.jpg',
  'Nike Dunk Low Storm Off Latex vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-storm-off-latex'),
  '/images/nike-dunk-low-storm-off-latex/03.jpg',
  'Nike Dunk Low Storm Off Latex vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-storm-off-latex'),
  '/images/nike-dunk-low-storm-off-latex/04.jpg',
  'Nike Dunk Low Storm Off Latex par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-storm-off-latex'),
  'nike-dunk-low-storm-off-latex-39-storm---off-white',
  '39',
  'Storm / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-storm-off-latex'),
  'nike-dunk-low-storm-off-latex-40-storm---off-white',
  '40',
  'Storm / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-storm-off-latex'),
  'nike-dunk-low-storm-off-latex-41-storm---off-white',
  '41',
  'Storm / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-storm-off-latex'),
  'nike-dunk-low-storm-off-latex-42-storm---off-white',
  '42',
  'Storm / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #5: nike-dunk-low-blanco
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'nike-dunk-low-blanco',
  'Nike Dunk Low Blanco',
  'Triple White',
  'Importados',
  'Nike',
  NULL,
  'Nike Dunk Low Triple White importados. Diseño completamente blanco, limpio y versátil para cualquier ocasión con panelado en cuero premium.',
  ARRAY['Talles disponibles del 34 al 43 (talle 42 sin stock)', 'Edición importada', 'Se acepta tarjeta de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  '/images/nike-dunk-low-blanco/01.jpg',
  'Nike Dunk Low Blanco vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  '/images/nike-dunk-low-blanco/02.jpg',
  'Nike Dunk Low Blanco vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  '/images/nike-dunk-low-blanco/03.jpg',
  'Nike Dunk Low Blanco vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  '/images/nike-dunk-low-blanco/04.jpg',
  'Nike Dunk Low Blanco par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  'nike-dunk-low-blanco-34-blanco',
  '34',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  'nike-dunk-low-blanco-35-blanco',
  '35',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  'nike-dunk-low-blanco-36-blanco',
  '36',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  'nike-dunk-low-blanco-37-blanco',
  '37',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  'nike-dunk-low-blanco-38-blanco',
  '38',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  'nike-dunk-low-blanco-39-blanco',
  '39',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  'nike-dunk-low-blanco-40-blanco',
  '40',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  'nike-dunk-low-blanco-41-blanco',
  '41',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco'),
  'nike-dunk-low-blanco-43-blanco',
  '43',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #6: nike-dunk-low-cacao
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'nike-dunk-low-cacao',
  'Nike Dunk Low Cacao',
  'Cacao Wow / Sail',
  'Importados',
  'Nike',
  'POR ENCARGUE',
  'Nike Dunk Low Cacao Wow importados. Combinación en tonos marrón chocolate y blanco sail con acabado en cuero suave.',
  ARRAY['Talles disponibles del 34 al 40', 'Modalidad: Por encargue (24 a 72 hs)', 'Se acepta tarjeta de crédito', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  '/images/nike-dunk-low-cacao/01.jpg',
  'Nike Dunk Low Cacao vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  '/images/nike-dunk-low-cacao/02.jpg',
  'Nike Dunk Low Cacao vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  '/images/nike-dunk-low-cacao/03.jpg',
  'Nike Dunk Low Cacao vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  '/images/nike-dunk-low-cacao/04.jpg',
  'Nike Dunk Low Cacao par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  'nike-dunk-low-cacao-34-cacao---sail',
  '34',
  'Cacao / Sail',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  'nike-dunk-low-cacao-35-cacao---sail',
  '35',
  'Cacao / Sail',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  'nike-dunk-low-cacao-36-cacao---sail',
  '36',
  'Cacao / Sail',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  'nike-dunk-low-cacao-37-cacao---sail',
  '37',
  'Cacao / Sail',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  'nike-dunk-low-cacao-38-cacao---sail',
  '38',
  'Cacao / Sail',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  'nike-dunk-low-cacao-39-cacao---sail',
  '39',
  'Cacao / Sail',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-cacao'),
  'nike-dunk-low-cacao-40-cacao---sail',
  '40',
  'Cacao / Sail',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #7: nike-dunk-low-blanco-marino-off
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'nike-dunk-low-blanco-marino-off',
  'Nike Dunk Low Blanco/Marino Off',
  'Blanco / Marino / Off',
  'Importados',
  'Nike',
  NULL,
  'Nike Dunk Low Blanco y Azul Marino Off importados. Combinación clásica con suela y entresuela off-white y detalles marinos en contraste.',
  ARRAY['Talles disponibles del 38 al 42 (Consultar disponibilidad)', 'Edición importada', 'Se acepta tarjeta de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco-marino-off'),
  '/images/nike-dunk-low-blanco-marino-off/01.jpg',
  'Nike Dunk Low Blanco Marino Off vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco-marino-off'),
  '/images/nike-dunk-low-blanco-marino-off/02.jpg',
  'Nike Dunk Low Blanco Marino Off vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco-marino-off'),
  '/images/nike-dunk-low-blanco-marino-off/03.jpg',
  'Nike Dunk Low Blanco Marino Off vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco-marino-off'),
  '/images/nike-dunk-low-blanco-marino-off/04.jpg',
  'Nike Dunk Low Blanco Marino Off vista trasera',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco-marino-off'),
  '/images/nike-dunk-low-blanco-marino-off/05.jpg',
  'Nike Dunk Low Blanco Marino Off par completo',
  4,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco-marino-off'),
  'nike-dunk-low-blanco-marino-off-38-blanco---marino',
  '38',
  'Blanco / Marino / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco-marino-off'),
  'nike-dunk-low-blanco-marino-off-39-blanco---marino',
  '39',
  'Blanco / Marino / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco-marino-off'),
  'nike-dunk-low-blanco-marino-off-40-blanco---marino',
  '40',
  'Blanco / Marino / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco-marino-off'),
  'nike-dunk-low-blanco-marino-off-41-blanco---marino',
  '41',
  'Blanco / Marino / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-blanco-marino-off'),
  'nike-dunk-low-blanco-marino-off-42-blanco---marino',
  '42',
  'Blanco / Marino / Off',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #8: nike-dunk-low-panda
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'nike-dunk-low-panda',
  'Nike Dunk Low Panda',
  'Blanco / Negro',
  'Importados',
  'Nike',
  NULL,
  'Nike Dunk Low Panda importados en la clásica combinación de blanco y negro. Silueta atemporal, versátil y con acabados de primera calidad.',
  ARRAY['Talles disponibles del 39 al 42', 'Edición importada', 'Se acepta tarjeta de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-panda'),
  '/images/nike-dunk-low-panda/01.jpg',
  'Nike Dunk Low Panda vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-panda'),
  '/images/nike-dunk-low-panda/02.jpg',
  'Nike Dunk Low Panda vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-panda'),
  '/images/nike-dunk-low-panda/03.jpg',
  'Nike Dunk Low Panda vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-panda'),
  '/images/nike-dunk-low-panda/04.jpg',
  'Nike Dunk Low Panda par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-panda'),
  'nike-dunk-low-panda-39-blanco---negro',
  '39',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-panda'),
  'nike-dunk-low-panda-40-blanco---negro',
  '40',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-panda'),
  'nike-dunk-low-panda-41-blanco---negro',
  '41',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-dunk-low-panda'),
  'nike-dunk-low-panda-42-blanco---negro',
  '42',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #9: adidas-campus-gris-blanco
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-campus-gris-blanco',
  'Adidas Campus Gris/Blanco',
  'Gris / Blanco',
  'Importados',
  'Adidas',
  'NUEVO INGRESO',
  'Adidas Campus Gris y Blanco importados. Silueta clásica urbana en gamuza de primera calidad con franjas blancas en contraste y cordones anchos.',
  ARRAY['Talles disponibles del 34 al 42', 'Edición importada', 'Se acepta tarjeta de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  '/images/adidas-campus-gris-blanco/01.jpg',
  'Adidas Campus Gris Blanco vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  '/images/adidas-campus-gris-blanco/02.jpg',
  'Adidas Campus Gris Blanco vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  '/images/adidas-campus-gris-blanco/03.jpg',
  'Adidas Campus Gris Blanco vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  '/images/adidas-campus-gris-blanco/04.jpg',
  'Adidas Campus Gris Blanco par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  'adidas-campus-gris-blanco-34-gris---blanco',
  '34',
  'Gris / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  'adidas-campus-gris-blanco-35-gris---blanco',
  '35',
  'Gris / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  'adidas-campus-gris-blanco-36-gris---blanco',
  '36',
  'Gris / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  'adidas-campus-gris-blanco-37-gris---blanco',
  '37',
  'Gris / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  'adidas-campus-gris-blanco-38-gris---blanco',
  '38',
  'Gris / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  'adidas-campus-gris-blanco-39-gris---blanco',
  '39',
  'Gris / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  'adidas-campus-gris-blanco-40-gris---blanco',
  '40',
  'Gris / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  'adidas-campus-gris-blanco-41-gris---blanco',
  '41',
  'Gris / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-gris-blanco'),
  'adidas-campus-gris-blanco-42-gris---blanco',
  '42',
  'Gris / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #10: adidas-bad-bunny-all-black
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-bad-bunny-all-black',
  'Adidas Bad Bunny All Black',
  'All Black',
  'Importados',
  'Adidas',
  'EDICIÓN ESPECIAL',
  'Adidas Forum / Response CL x Bad Bunny All Black importados. Diseño monocromático exclusivo con acabados premium y detalles únicos.',
  ARRAY['Talles disponibles del 38 al 43', 'Edición especial importada', 'Se acepta tarjeta de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  '/images/adidas-bad-bunny-all-black/01.jpg',
  'Adidas Bad Bunny All Black vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  '/images/adidas-bad-bunny-all-black/02.jpg',
  'Adidas Bad Bunny All Black vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  '/images/adidas-bad-bunny-all-black/03.jpg',
  'Adidas Bad Bunny All Black vista talón',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  '/images/adidas-bad-bunny-all-black/04.jpg',
  'Adidas Bad Bunny All Black vista detalle',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  '/images/adidas-bad-bunny-all-black/05.jpg',
  'Adidas Bad Bunny All Black par completo',
  4,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  'adidas-bad-bunny-all-black-38-all-black',
  '38',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  'adidas-bad-bunny-all-black-39-all-black',
  '39',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  'adidas-bad-bunny-all-black-40-all-black',
  '40',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  'adidas-bad-bunny-all-black-41-all-black',
  '41',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  'adidas-bad-bunny-all-black-42-all-black',
  '42',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-bad-bunny-all-black'),
  'adidas-bad-bunny-all-black-43-all-black',
  '43',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #11: adidas-campus-all-black
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-campus-all-black',
  'Adidas Campus All Black',
  'All Black',
  'Importados',
  'Adidas',
  NULL,
  'Adidas Campus All Black importados. Silueta retro completamente negra en gamuza premium con cordones anchos acolchados y suela de goma a tono.',
  ARRAY['Talles disponibles del 38 al 43', 'Edición importada', 'Se acepta tarjeta de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-all-black'),
  '/images/adidas-campus-all-black/01.jpg',
  'Adidas Campus All Black vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-all-black'),
  '/images/adidas-campus-all-black/02.jpg',
  'Adidas Campus All Black vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-all-black'),
  '/images/adidas-campus-all-black/03.jpg',
  'Adidas Campus All Black vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-all-black'),
  '/images/adidas-campus-all-black/04.jpg',
  'Adidas Campus All Black par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-all-black'),
  'adidas-campus-all-black-38-all-black',
  '38',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-all-black'),
  'adidas-campus-all-black-39-all-black',
  '39',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-all-black'),
  'adidas-campus-all-black-40-all-black',
  '40',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-all-black'),
  'adidas-campus-all-black-41-all-black',
  '41',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-all-black'),
  'adidas-campus-all-black-42-all-black',
  '42',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-all-black'),
  'adidas-campus-all-black-43-all-black',
  '43',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #12: adidas-gazelle-verde-gold
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-gazelle-verde-gold',
  'Adidas Gazelle Verde Gold',
  'Verde / Gold',
  'Importados',
  'Adidas',
  'NUEVO INGRESO',
  'Adidas Gazelle Verde Gold importados. Acabados premium en gamuza suave con detalles dorados y suela de goma clásica.',
  ARRAY['Talles disponibles del 34 al 39', 'Modalidad: Por encargue (24 a 72 hs)', 'Se acepta tarjeta de crédito', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-gazelle-verde-gold'),
  '/images/adidas-gazelle-verde-gold/01.jpg',
  'Adidas Gazelle Verde Gold vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-gazelle-verde-gold'),
  '/images/adidas-gazelle-verde-gold/02.jpg',
  'Adidas Gazelle Verde Gold vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-gazelle-verde-gold'),
  '/images/adidas-gazelle-verde-gold/03.jpg',
  'Adidas Gazelle Verde Gold vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-gazelle-verde-gold'),
  '/images/adidas-gazelle-verde-gold/04.jpg',
  'Adidas Gazelle Verde Gold par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-gazelle-verde-gold'),
  'adidas-gazelle-verde-gold-34-verde---gold',
  '34',
  'Verde / Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-gazelle-verde-gold'),
  'adidas-gazelle-verde-gold-35-verde---gold',
  '35',
  'Verde / Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-gazelle-verde-gold'),
  'adidas-gazelle-verde-gold-36-verde---gold',
  '36',
  'Verde / Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-gazelle-verde-gold'),
  'adidas-gazelle-verde-gold-37-verde---gold',
  '37',
  'Verde / Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-gazelle-verde-gold'),
  'adidas-gazelle-verde-gold-38-verde---gold',
  '38',
  'Verde / Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-gazelle-verde-gold'),
  'adidas-gazelle-verde-gold-39-verde---gold',
  '39',
  'Verde / Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #13: adidas-samba-blanco-negro
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-samba-blanco-negro',
  'Adidas Samba Blanco / Negro',
  'Linha Luxo 🇨🇳',
  'Importados',
  'Adidas',
  'LINHA LUXO',
  'Adidas Samba Blanco y Negro Linha Luxo importados. Silueta atemporal con materiales de primera calidad, acabados precisos y comodidad urbana.',
  ARRAY['Talles disponibles del 36 al 42', 'Edición Linha Luxo importada', 'Modalidad: Por encargue (24 a 72 hs)', 'Se acepta tarjeta de crédito', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  '/images/adidas-samba-blanco-negro/01.jpg',
  'Adidas Samba Blanco y Negro vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  '/images/adidas-samba-blanco-negro/02.jpg',
  'Adidas Samba Blanco y Negro vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  '/images/adidas-samba-blanco-negro/03.jpg',
  'Adidas Samba Blanco y Negro vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  '/images/adidas-samba-blanco-negro/04.jpg',
  'Adidas Samba Blanco y Negro par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  'adidas-samba-blanco-negro-36-blanco---negro',
  '36',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  'adidas-samba-blanco-negro-37-blanco---negro',
  '37',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  'adidas-samba-blanco-negro-38-blanco---negro',
  '38',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  'adidas-samba-blanco-negro-39-blanco---negro',
  '39',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  'adidas-samba-blanco-negro-40-blanco---negro',
  '40',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  'adidas-samba-blanco-negro-41-blanco---negro',
  '41',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-negro'),
  'adidas-samba-blanco-negro-42-blanco---negro',
  '42',
  'Blanco / Negro',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #14: nike-air-force-gris-demim
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'nike-air-force-gris-demim',
  'Nike Air Force Gris/Demim',
  'Gris / Denim (Importados)',
  'Importados',
  'Nike',
  'POR ENCARGUE',
  'Nike Air Force Gris/Demim importados. Silueta emblemática con panelado en denim texturizado y tonos grises, detalles de alta calidad y máxima comodidad urbana.',
  ARRAY['Talles disponibles del 38 al 43', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-gris-demim'),
  '/images/NIKE AIR FORCE GRISDEMIM/sealstep_DPrEzOvDeoK_1.jpg',
  'Nike Air Force Gris Denim vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-gris-demim'),
  '/images/NIKE AIR FORCE GRISDEMIM/sealstep_DPrEzOvDeoK_2.jpg',
  'Nike Air Force Gris Denim vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-gris-demim'),
  '/images/NIKE AIR FORCE GRISDEMIM/sealstep_DPrEzOvDeoK_3.jpg',
  'Nike Air Force Gris Denim vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-gris-demim'),
  '/images/NIKE AIR FORCE GRISDEMIM/sealstep_DPrEzOvDeoK_4.jpg',
  'Nike Air Force Gris Denim par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-gris-demim'),
  'nike-air-force-gris-demim-38-gris---denim',
  '38',
  'Gris / Denim',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-gris-demim'),
  'nike-air-force-gris-demim-39-gris---denim',
  '39',
  'Gris / Denim',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-gris-demim'),
  'nike-air-force-gris-demim-40-gris---denim',
  '40',
  'Gris / Denim',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-gris-demim'),
  'nike-air-force-gris-demim-41-gris---denim',
  '41',
  'Gris / Denim',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-gris-demim'),
  'nike-air-force-gris-demim-42-gris---denim',
  '42',
  'Gris / Denim',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-gris-demim'),
  'nike-air-force-gris-demim-43-gris---denim',
  '43',
  'Gris / Denim',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #15: nike-air-force-blanco-negro-verniz-gold
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'nike-air-force-blanco-negro-verniz-gold',
  'Air Force Blanco/Negro Verniz Gold',
  'Blanco / Negro / Verniz Gold',
  'Importados',
  'General',
  'POR ENCARGUE',
  'Air Force Blanco/Negro Verniz Gold importados. Acabado brillante tipo charol/verniz con acentos dorados y contraste blanco/negro premium.',
  ARRAY['Talles disponibles del 34 al 38', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-blanco-negro-verniz-gold'),
  '/images/-AIR FORCE BLANCONEGRO VERNIZ GOLD/sealstep_DPrEpaAjeTu_1.jpg',
  'Air Force Blanco Negro Verniz Gold vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-blanco-negro-verniz-gold'),
  '/images/-AIR FORCE BLANCONEGRO VERNIZ GOLD/sealstep_DPrEpaAjeTu_2.jpg',
  'Air Force Blanco Negro Verniz Gold vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-blanco-negro-verniz-gold'),
  '/images/-AIR FORCE BLANCONEGRO VERNIZ GOLD/sealstep_DPrEpaAjeTu_3.jpg',
  'Air Force Blanco Negro Verniz Gold vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-blanco-negro-verniz-gold'),
  '/images/-AIR FORCE BLANCONEGRO VERNIZ GOLD/sealstep_DPrEpaAjeTu_4.jpg',
  'Air Force Blanco Negro Verniz Gold par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-blanco-negro-verniz-gold'),
  'nike-air-force-blanco-negro-verniz-gold-34-blanco-',
  '34',
  'Blanco / Negro / Verniz Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-blanco-negro-verniz-gold'),
  'nike-air-force-blanco-negro-verniz-gold-35-blanco-',
  '35',
  'Blanco / Negro / Verniz Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-blanco-negro-verniz-gold'),
  'nike-air-force-blanco-negro-verniz-gold-36-blanco-',
  '36',
  'Blanco / Negro / Verniz Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-blanco-negro-verniz-gold'),
  'nike-air-force-blanco-negro-verniz-gold-37-blanco-',
  '37',
  'Blanco / Negro / Verniz Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-blanco-negro-verniz-gold'),
  'nike-air-force-blanco-negro-verniz-gold-38-blanco-',
  '38',
  'Blanco / Negro / Verniz Gold',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #16: nike-air-force-bell-off-azul
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'nike-air-force-bell-off-azul',
  'Nike Air Force Bell/Off/Azul',
  'Bell / Off / Azul (Importados)',
  'Importados',
  'Nike',
  'POR ENCARGUE',
  'Nike Air Force Bell/Off/Azul importados. Combinación armónica en tonos beige bell, off white y toques azules con suela cosida y amortiguación Air.',
  ARRAY['Talles disponibles del 38 al 43', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-bell-off-azul'),
  '/images/-NIKE AIR FORCE BELLOFFAZUL/sealstep_DPrEieKDZKb_1.jpg',
  'Nike Air Force Bell Off Azul vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-bell-off-azul'),
  '/images/-NIKE AIR FORCE BELLOFFAZUL/sealstep_DPrEieKDZKb_2.jpg',
  'Nike Air Force Bell Off Azul vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-bell-off-azul'),
  '/images/-NIKE AIR FORCE BELLOFFAZUL/sealstep_DPrEieKDZKb_3.jpg',
  'Nike Air Force Bell Off Azul vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-bell-off-azul'),
  '/images/-NIKE AIR FORCE BELLOFFAZUL/sealstep_DPrEieKDZKb_4.jpg',
  'Nike Air Force Bell Off Azul par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-bell-off-azul'),
  'nike-air-force-bell-off-azul-38-bell---off---azul',
  '38',
  'Bell / Off / Azul',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-bell-off-azul'),
  'nike-air-force-bell-off-azul-39-bell---off---azul',
  '39',
  'Bell / Off / Azul',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-bell-off-azul'),
  'nike-air-force-bell-off-azul-40-bell---off---azul',
  '40',
  'Bell / Off / Azul',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-bell-off-azul'),
  'nike-air-force-bell-off-azul-41-bell---off---azul',
  '41',
  'Bell / Off / Azul',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-bell-off-azul'),
  'nike-air-force-bell-off-azul-42-bell---off---azul',
  '42',
  'Bell / Off / Azul',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-bell-off-azul'),
  'nike-air-force-bell-off-azul-43-bell---off---azul',
  '43',
  'Bell / Off / Azul',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #17: nike-air-force-1-blanco
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'nike-air-force-1-blanco',
  'Nike Air Force Blanco',
  'Triple White (Importados)',
  'Importados',
  'Nike',
  'POR ENCARGUE',
  'Nike Air Force 1 Blanco importados. El clásico más vendido a nivel mundial en cuero blanco impecable, suela gruesa con cápsula de aire y pasacordones metálico.',
  ARRAY['Talles disponibles del 34 al 42', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  '/images/-NIKE AIR FORCE BLANCO/sealstep_DPrEZpfjRVi_1.jpg',
  'Nike Air Force Blanco vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  '/images/-NIKE AIR FORCE BLANCO/sealstep_DPrEZpfjRVi_2.jpg',
  'Nike Air Force Blanco vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  '/images/-NIKE AIR FORCE BLANCO/sealstep_DPrEZpfjRVi_3.jpg',
  'Nike Air Force Blanco vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  '/images/-NIKE AIR FORCE BLANCO/sealstep_DPrEZpfjRVi_4.jpg',
  'Nike Air Force Blanco par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  'nike-air-force-1-blanco-34-blanco',
  '34',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  'nike-air-force-1-blanco-35-blanco',
  '35',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  'nike-air-force-1-blanco-36-blanco',
  '36',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  'nike-air-force-1-blanco-37-blanco',
  '37',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  'nike-air-force-1-blanco-38-blanco',
  '38',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  'nike-air-force-1-blanco-39-blanco',
  '39',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  'nike-air-force-1-blanco-40-blanco',
  '40',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  'nike-air-force-1-blanco-41-blanco',
  '41',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'nike-air-force-1-blanco'),
  'nike-air-force-1-blanco-42-blanco',
  '42',
  'Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #18: chanclas-slide-nike-beige
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'chanclas-slide-nike-beige',
  'Chanclas SLIDE Nike Beige',
  'Lanzamiento · Reposición disponible',
  'Chanclas Slide',
  'Nike',
  'LANZAMIENTO',
  'Chanclas SLIDE Nike Beige importadas. Espuma de máxima suavidad con soporte ergonómico, suela antideslizante y diseño minimalista de última tendencia.',
  ARRAY['Lanzamiento exclusivo', 'Talles disponibles del 37 al 44', 'Reposición disponible inmediata', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_1.jpg',
  'Chanclas SLIDE Nike Beige vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_2.jpg',
  'Chanclas SLIDE Nike Beige vista superior',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_3.jpg',
  'Chanclas SLIDE Nike Beige vista lateral',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_4.jpg',
  'Chanclas SLIDE Nike Beige vista suela',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  '/images/Chanclas SLIDE Nike beige/sealstep_DU8BouokaAT_5.jpg',
  'Chanclas SLIDE Nike Beige par completo',
  4,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  'chanclas-slide-nike-beige-37-beige',
  '37',
  'Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  'chanclas-slide-nike-beige-38-beige',
  '38',
  'Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  'chanclas-slide-nike-beige-39-beige',
  '39',
  'Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  'chanclas-slide-nike-beige-40-beige',
  '40',
  'Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  'chanclas-slide-nike-beige-41-beige',
  '41',
  'Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  'chanclas-slide-nike-beige-42-beige',
  '42',
  'Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  'chanclas-slide-nike-beige-43-beige',
  '43',
  'Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-beige'),
  'chanclas-slide-nike-beige-44-beige',
  '44',
  'Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #19: chanclas-slide-nike-gris
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'chanclas-slide-nike-gris',
  'Chanclas SLIDE Nike Gris',
  'Lanzamiento · Reposición disponible',
  'Chanclas Slide',
  'Nike',
  'LANZAMIENTO',
  'Chanclas SLIDE Nike Gris importadas. Silueta ergonómica de espuma densa y ultra liviana con acabado mate, ideal para descanso, playa o uso urbano.',
  ARRAY['Lanzamiento exclusivo', 'Talles disponibles del 37 al 44', 'Reposición disponible inmediata', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_1.jpg',
  'Chanclas SLIDE Nike Gris vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_2.jpg',
  'Chanclas SLIDE Nike Gris vista superior',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_3.jpg',
  'Chanclas SLIDE Nike Gris vista lateral',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_4.jpg',
  'Chanclas SLIDE Nike Gris vista suela',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  '/images/Chanclas SLIDE Nike GRIS/sealstep_DU6dngHkWAW_5.jpg',
  'Chanclas SLIDE Nike Gris par completo',
  4,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  'chanclas-slide-nike-gris-37-gris',
  '37',
  'Gris',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  'chanclas-slide-nike-gris-38-gris',
  '38',
  'Gris',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  'chanclas-slide-nike-gris-39-gris',
  '39',
  'Gris',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  'chanclas-slide-nike-gris-40-gris',
  '40',
  'Gris',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  'chanclas-slide-nike-gris-41-gris',
  '41',
  'Gris',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  'chanclas-slide-nike-gris-42-gris',
  '42',
  'Gris',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  'chanclas-slide-nike-gris-43-gris',
  '43',
  'Gris',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'chanclas-slide-nike-gris'),
  'chanclas-slide-nike-gris-44-gris',
  '44',
  'Gris',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #20: new-balance-1000-all-black
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'new-balance-1000-all-black',
  'New Balance 1000 All Black',
  'All Black (Importados)',
  'Importados',
  'New Balance',
  'NUEVO INGRESO',
  'New Balance 1000 All Black importados. Estética triple black agresiva y futurista, con combinación de texturas en cuero y mesh, amortiguación ABZORB y máxima durabilidad.',
  ARRAY['Talles disponibles del 38 al 43', 'Edición importada', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_1.jpg',
  'New Balance 1000 All Black vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_2.jpg',
  'New Balance 1000 All Black vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_3.jpg',
  'New Balance 1000 All Black vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_4.jpg',
  'New Balance 1000 All Black par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_5.jpg',
  'New Balance 1000 All Black vista talón',
  4,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  '/images/-NEW BALANCE 1000 ALL BLACK/sealstep_DYp25Q5j_Cl_6.jpg',
  'New Balance 1000 All Black vista frontal',
  5,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  'new-balance-1000-all-black-38-all-black',
  '38',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  'new-balance-1000-all-black-39-all-black',
  '39',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  'new-balance-1000-all-black-40-all-black',
  '40',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  'new-balance-1000-all-black-41-all-black',
  '41',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  'new-balance-1000-all-black-42-all-black',
  '42',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'new-balance-1000-all-black'),
  'new-balance-1000-all-black-43-all-black',
  '43',
  'All Black',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #21: adidas-campus-00s
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-campus-00s',
  'Adidas Campus 00s',
  'Core Black / White',
  'Importados',
  'Adidas',
  'NUEVO INGRESO',
  'Adidas Campus 00s importados. Silueta skate inspirada en la década del 2000 con lengüeta acolchada, franjas gruesas y gamuza de primera calidad.',
  ARRAY['Talles disponibles del 38 al 43', 'Edición importada', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  '/images/ADIDAS CAMPUS 00s/sealstep_DOeN7BWj9fI_1.jpg',
  'Adidas Campus 00s vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  '/images/ADIDAS CAMPUS 00s/sealstep_DOeN7BWj9fI_2.jpg',
  'Adidas Campus 00s vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  '/images/ADIDAS CAMPUS 00s/sealstep_DOeN7BWj9fI_3.jpg',
  'Adidas Campus 00s vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  '/images/ADIDAS CAMPUS 00s/sealstep_DOeN7BWj9fI_4.jpg',
  'Adidas Campus 00s vista detalle',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  '/images/ADIDAS CAMPUS 00s/sealstep_DOeN7BWj9fI_5.jpg',
  'Adidas Campus 00s par completo',
  4,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  'adidas-campus-00s-38-negro---blanco',
  '38',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  'adidas-campus-00s-39-negro---blanco',
  '39',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  'adidas-campus-00s-40-negro---blanco',
  '40',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  'adidas-campus-00s-41-negro---blanco',
  '41',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  'adidas-campus-00s-42-negro---blanco',
  '42',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-00s'),
  'adidas-campus-00s-43-negro---blanco',
  '43',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #22: puma-suede-xl
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'puma-suede-xl',
  'Puma Suede XL',
  'Black / White XL',
  'Importados',
  'Puma',
  'NUEVO INGRESO',
  'Puma Suede XL importados. La clásica silueta Suede reinterpretada con proporciones exageradas, acolchado extra y cordones anchos estilo skater.',
  ARRAY['Talles disponibles del 38 al 43', 'Edición importada', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'puma-suede-xl'),
  '/images/PUMA SUEDE XL/sealstep_DGBsWFHyxiH_1.jpg',
  'Puma Suede XL vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'puma-suede-xl'),
  '/images/PUMA SUEDE XL/sealstep_DGBsWFHyxiH_2.jpg',
  'Puma Suede XL vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'puma-suede-xl'),
  '/images/PUMA SUEDE XL/sealstep_DGBsWFHyxiH_3.jpg',
  'Puma Suede XL vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'puma-suede-xl'),
  'puma-suede-xl-38-negro---blanco',
  '38',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'puma-suede-xl'),
  'puma-suede-xl-39-negro---blanco',
  '39',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'puma-suede-xl'),
  'puma-suede-xl-40-negro---blanco',
  '40',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'puma-suede-xl'),
  'puma-suede-xl-41-negro---blanco',
  '41',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'puma-suede-xl'),
  'puma-suede-xl-42-negro---blanco',
  '42',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'puma-suede-xl'),
  'puma-suede-xl-43-negro---blanco',
  '43',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #23: adidas-campus-azul-bb-off
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-campus-azul-bb-off',
  'Adidas Campus Azul BB/Off',
  'Azul Bebé / Off White (Importados)',
  'Importados',
  'Adidas',
  'POR ENCARGUE',
  'Adidas Campus Azul Bebé y Off White importados. Gamuza suave en tono azul pastel combinado con franjas off-white y suela de goma retro.',
  ARRAY['Talles disponibles del 34 al 38', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-azul-bb-off'),
  '/images/-ADIDAS CAMPUS AZUL BB.OFF/sealstep_DPrBA1xDfFV_1.jpg',
  'Adidas Campus Azul BB Off vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-azul-bb-off'),
  '/images/-ADIDAS CAMPUS AZUL BB.OFF/sealstep_DPrBA1xDfFV_2.jpg',
  'Adidas Campus Azul BB Off vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-azul-bb-off'),
  '/images/-ADIDAS CAMPUS AZUL BB.OFF/sealstep_DPrBA1xDfFV_3.jpg',
  'Adidas Campus Azul BB Off vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-azul-bb-off'),
  '/images/-ADIDAS CAMPUS AZUL BB.OFF/sealstep_DPrBA1xDfFV_4.jpg',
  'Adidas Campus Azul BB Off par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-azul-bb-off'),
  'adidas-campus-azul-bb-off-34-azul-beb----off-white',
  '34',
  'Azul Bebé / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-azul-bb-off'),
  'adidas-campus-azul-bb-off-35-azul-beb----off-white',
  '35',
  'Azul Bebé / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-azul-bb-off'),
  'adidas-campus-azul-bb-off-36-azul-beb----off-white',
  '36',
  'Azul Bebé / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-azul-bb-off'),
  'adidas-campus-azul-bb-off-37-azul-beb----off-white',
  '37',
  'Azul Bebé / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-azul-bb-off'),
  'adidas-campus-azul-bb-off-38-azul-beb----off-white',
  '38',
  'Azul Bebé / Off White',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #24: adidas-campus-verde
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-campus-verde',
  'Adidas Campus Verde',
  'Verde / Blanco (Importados)',
  'Importados',
  'Adidas',
  'POR ENCARGUE',
  'Adidas Campus Verde importados. Silueta clásica en gamuza verde bosque con franjas blancas en contraste y cordones anchos característicos.',
  ARRAY['Talles disponibles del 34 al 38', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-verde'),
  '/images/-ADIDAS CAMPUS VERDE/sealstep_DPeHwjDjQDs_1.jpg',
  'Adidas Campus Verde vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-verde'),
  '/images/-ADIDAS CAMPUS VERDE/sealstep_DPeHwjDjQDs_2.jpg',
  'Adidas Campus Verde vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-verde'),
  '/images/-ADIDAS CAMPUS VERDE/sealstep_DPeHwjDjQDs_3.jpg',
  'Adidas Campus Verde vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-verde'),
  '/images/-ADIDAS CAMPUS VERDE/sealstep_DPeHwjDjQDs_4.jpg',
  'Adidas Campus Verde par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-verde'),
  'adidas-campus-verde-34-verde---blanco',
  '34',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-verde'),
  'adidas-campus-verde-35-verde---blanco',
  '35',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-verde'),
  'adidas-campus-verde-36-verde---blanco',
  '36',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-verde'),
  'adidas-campus-verde-37-verde---blanco',
  '37',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-verde'),
  'adidas-campus-verde-38-verde---blanco',
  '38',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #25: adidas-campus-off-beige
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-campus-off-beige',
  'Adidas Campus Off/Beige',
  'Off White / Beige (Importados)',
  'Importados',
  'Adidas',
  'POR ENCARGUE',
  'Adidas Campus Off/Beige importados. Gamuza premium en tonos neutros beige y off-white, silueta retro de gran versatilidad con máxima comodidad.',
  ARRAY['Talles disponibles del 34 al 42', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  '/images/-ADIDAS CAMPUS OFF.BEGE/sealstep_DPrCN2ujfqc_1.jpg',
  'Adidas Campus Off Beige vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  '/images/-ADIDAS CAMPUS OFF.BEGE/sealstep_DPrCN2ujfqc_2.jpg',
  'Adidas Campus Off Beige vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  '/images/-ADIDAS CAMPUS OFF.BEGE/sealstep_DPrCN2ujfqc_3.jpg',
  'Adidas Campus Off Beige vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  '/images/-ADIDAS CAMPUS OFF.BEGE/sealstep_DPrCN2ujfqc_4.jpg',
  'Adidas Campus Off Beige par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  'adidas-campus-off-beige-34-off-white---beige',
  '34',
  'Off White / Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  'adidas-campus-off-beige-35-off-white---beige',
  '35',
  'Off White / Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  'adidas-campus-off-beige-36-off-white---beige',
  '36',
  'Off White / Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  'adidas-campus-off-beige-37-off-white---beige',
  '37',
  'Off White / Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  'adidas-campus-off-beige-38-off-white---beige',
  '38',
  'Off White / Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  'adidas-campus-off-beige-39-off-white---beige',
  '39',
  'Off White / Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  'adidas-campus-off-beige-40-off-white---beige',
  '40',
  'Off White / Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  'adidas-campus-off-beige-41-off-white---beige',
  '41',
  'Off White / Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-campus-off-beige'),
  'adidas-campus-off-beige-42-off-white---beige',
  '42',
  'Off White / Beige',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #26: adidas-samba-verde
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-samba-verde',
  'Adidas Samba Verde',
  'Verde / Blanco (Importados)',
  'Importados',
  'Adidas',
  'POR ENCARGUE',
  'Adidas Samba Verde importados. Silueta clásica con puntera en T de gamuza, panelado en verde y franjas blancas sobre suela de goma caramelo.',
  ARRAY['Talles disponibles del 36 al 42', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-verde'),
  '/images/-ADIDAS SAMBA VERDE/sealstep_DPeH_D-jUfB_1.jpg',
  'Adidas Samba Verde vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-verde'),
  '/images/-ADIDAS SAMBA VERDE/sealstep_DPeH_D-jUfB_2.jpg',
  'Adidas Samba Verde vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-verde'),
  '/images/-ADIDAS SAMBA VERDE/sealstep_DPeH_D-jUfB_3.jpg',
  'Adidas Samba Verde par completo',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-verde'),
  'adidas-samba-verde-36-verde---blanco',
  '36',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-verde'),
  'adidas-samba-verde-37-verde---blanco',
  '37',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-verde'),
  'adidas-samba-verde-38-verde---blanco',
  '38',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-verde'),
  'adidas-samba-verde-39-verde---blanco',
  '39',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-verde'),
  'adidas-samba-verde-40-verde---blanco',
  '40',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-verde'),
  'adidas-samba-verde-41-verde---blanco',
  '41',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-verde'),
  'adidas-samba-verde-42-verde---blanco',
  '42',
  'Verde / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #27: adidas-samba-negra-blanca
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-samba-negra-blanca',
  'Adidas Samba Negra/Blanca',
  'Negro / Blanco (Importados)',
  'Importados',
  'Adidas',
  'POR ENCARGUE',
  'Adidas Samba Negra/Blanca importados. El clásico imprescindible en cuero negro de primera calidad, franjas blancas en contraste y suela de goma retro.',
  ARRAY['Talles disponibles del 36 al 43', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  '/images/-ADIDAS SAMBA Negra blanca/sealstep_DPjiNgsDTt5_1.jpg',
  'Adidas Samba Negra Blanca vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  '/images/-ADIDAS SAMBA Negra blanca/sealstep_DPjiNgsDTt5_2.jpg',
  'Adidas Samba Negra Blanca vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  '/images/-ADIDAS SAMBA Negra blanca/sealstep_DPjiNgsDTt5_3.jpg',
  'Adidas Samba Negra Blanca vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  '/images/-ADIDAS SAMBA Negra blanca/sealstep_DPjiNgsDTt5_4.jpg',
  'Adidas Samba Negra Blanca par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  'adidas-samba-negra-blanca-36-negro---blanco',
  '36',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  'adidas-samba-negra-blanca-37-negro---blanco',
  '37',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  'adidas-samba-negra-blanca-38-negro---blanco',
  '38',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  'adidas-samba-negra-blanca-39-negro---blanco',
  '39',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  'adidas-samba-negra-blanca-40-negro---blanco',
  '40',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  'adidas-samba-negra-blanca-41-negro---blanco',
  '41',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  'adidas-samba-negra-blanca-42-negro---blanco',
  '42',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-negra-blanca'),
  'adidas-samba-negra-blanca-43-negro---blanco',
  '43',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #28: adidas-samba-marron
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-samba-marron',
  'Adidas Samba Marrón',
  'Marrón / Suela Caramelo (Importados)',
  'Importados',
  'Adidas',
  'POR ENCARGUE',
  'Adidas Samba Marrón importados. Exclusiva tonalidad café con detalles en contraste y suela de goma clásica para un look urbano refinado.',
  ARRAY['Talles disponibles del 34 al 39', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-marron'),
  '/images/-ADIDAS SAMBA MARRÓN/sealstep_DPrCzi9jVQM_1.jpg',
  'Adidas Samba Marrón vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-marron'),
  '/images/-ADIDAS SAMBA MARRÓN/sealstep_DPrCzi9jVQM_2.jpg',
  'Adidas Samba Marrón vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-marron'),
  '/images/-ADIDAS SAMBA MARRÓN/sealstep_DPrCzi9jVQM_3.jpg',
  'Adidas Samba Marrón vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-marron'),
  '/images/-ADIDAS SAMBA MARRÓN/sealstep_DPrCzi9jVQM_4.jpg',
  'Adidas Samba Marrón par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-marron'),
  'adidas-samba-marron-34-marr-n---caramelo',
  '34',
  'Marrón / Caramelo',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-marron'),
  'adidas-samba-marron-35-marr-n---caramelo',
  '35',
  'Marrón / Caramelo',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-marron'),
  'adidas-samba-marron-36-marr-n---caramelo',
  '36',
  'Marrón / Caramelo',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-marron'),
  'adidas-samba-marron-37-marr-n---caramelo',
  '37',
  'Marrón / Caramelo',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-marron'),
  'adidas-samba-marron-38-marr-n---caramelo',
  '38',
  'Marrón / Caramelo',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-marron'),
  'adidas-samba-marron-39-marr-n---caramelo',
  '39',
  'Marrón / Caramelo',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #29: adidas-samba-blanco-latex
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-samba-blanco-latex',
  'Adidas Samba Blanco/Latex',
  'Blanco / Latex (Importados)',
  'Importados',
  'Adidas',
  'POR ENCARGUE',
  'Adidas Samba Blanco/Latex importados. Cuero suave color blanco tiza con suela de goma translúcida tipo latex y acabados de alta definición.',
  ARRAY['Talles disponibles del 34 al 39', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-latex'),
  '/images/-ADIDAS SAMBA BLANCO-LATEX/sealstep_DPrDcrRDdXO_1.jpg',
  'Adidas Samba Blanco Latex vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-latex'),
  '/images/-ADIDAS SAMBA BLANCO-LATEX/sealstep_DPrDcrRDdXO_2.jpg',
  'Adidas Samba Blanco Latex vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-latex'),
  '/images/-ADIDAS SAMBA BLANCO-LATEX/sealstep_DPrDcrRDdXO_3.jpg',
  'Adidas Samba Blanco Latex vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-latex'),
  '/images/-ADIDAS SAMBA BLANCO-LATEX/sealstep_DPrDcrRDdXO_4.jpg',
  'Adidas Samba Blanco Latex par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-latex'),
  'adidas-samba-blanco-latex-34-blanco---latex',
  '34',
  'Blanco / Latex',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-latex'),
  'adidas-samba-blanco-latex-35-blanco---latex',
  '35',
  'Blanco / Latex',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-latex'),
  'adidas-samba-blanco-latex-36-blanco---latex',
  '36',
  'Blanco / Latex',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-latex'),
  'adidas-samba-blanco-latex-37-blanco---latex',
  '37',
  'Blanco / Latex',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-latex'),
  'adidas-samba-blanco-latex-38-blanco---latex',
  '38',
  'Blanco / Latex',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-latex'),
  'adidas-samba-blanco-latex-39-blanco---latex',
  '39',
  'Blanco / Latex',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #30: adidas-samba-blanco-verde
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'adidas-samba-blanco-verde',
  'Adidas Samba Blanco/Verde',
  'Blanco / Verde (Importados)',
  'Importados',
  'Adidas',
  'POR ENCARGUE',
  'Adidas Samba Blanco y Verde importados. Base de cuero blanco con franjas verdes, puntera de gamuza grisácea y suela de goma.',
  ARRAY['Talles disponibles del 34 al 39', 'Modalidad: Por encargue (24 a 72 hs)', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-verde'),
  '/images/-ADIDAS SAMBA BLANCO-VERDE/sealstep_DPrD1P1Dfb0_1.jpg',
  'Adidas Samba Blanco Verde vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-verde'),
  '/images/-ADIDAS SAMBA BLANCO-VERDE/sealstep_DPrD1P1Dfb0_2.jpg',
  'Adidas Samba Blanco Verde vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-verde'),
  '/images/-ADIDAS SAMBA BLANCO-VERDE/sealstep_DPrD1P1Dfb0_3.jpg',
  'Adidas Samba Blanco Verde vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-verde'),
  '/images/-ADIDAS SAMBA BLANCO-VERDE/sealstep_DPrD1P1Dfb0_4.jpg',
  'Adidas Samba Blanco Verde par completo',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-verde'),
  'adidas-samba-blanco-verde-34-blanco---verde',
  '34',
  'Blanco / Verde',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-verde'),
  'adidas-samba-blanco-verde-35-blanco---verde',
  '35',
  'Blanco / Verde',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-verde'),
  'adidas-samba-blanco-verde-36-blanco---verde',
  '36',
  'Blanco / Verde',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-verde'),
  'adidas-samba-blanco-verde-37-blanco---verde',
  '37',
  'Blanco / Verde',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-verde'),
  'adidas-samba-blanco-verde-38-blanco---verde',
  '38',
  'Blanco / Verde',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'adidas-samba-blanco-verde'),
  'adidas-samba-blanco-verde-39-blanco---verde',
  '39',
  'Blanco / Verde',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #31: vans-hylane-knit
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'vans-hylane-knit',
  'Vans Hylane Knit',
  'Knit / Black White (Importados)',
  'Importados',
  'Vans',
  'NUEVO INGRESO',
  'Vans Hylane Knit importados. Silueta skate Y2K con tejido knit respirable, Sidestripe 3D acolchada, cordones extra gruesos y suela cupsole.',
  ARRAY['Talles disponibles del 34 al 39', 'Edición importada', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_1.jpg',
  'Vans Hylane Knit vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_2.jpg',
  'Vans Hylane Knit vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_3.jpg',
  'Vans Hylane Knit vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_4.jpg',
  'Vans Hylane Knit vista detalle',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_5.jpg',
  'Vans Hylane Knit vista suela',
  4,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  '/images/VANS HYLANE KNIT/sealstep_DYaztAfjcZj_6.jpg',
  'Vans Hylane Knit par completo',
  5,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  'vans-hylane-knit-34-negro---blanco',
  '34',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  'vans-hylane-knit-35-negro---blanco',
  '35',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  'vans-hylane-knit-36-negro---blanco',
  '36',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  'vans-hylane-knit-37-negro---blanco',
  '37',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  'vans-hylane-knit-38-negro---blanco',
  '38',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-hylane-knit'),
  'vans-hylane-knit-39-negro---blanco',
  '39',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #32: vans-knu-skool-azul-blanco
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'vans-knu-skool-azul-blanco',
  'Vans Knu Skool Azul/Blanco',
  'Azul / Blanco (Importados)',
  'Importados',
  'Vans',
  'NUEVO INGRESO',
  'Vans Knu Skool Azul y Blanco importados. Modelo chunky puffy de los 90s con lengüeta y cuello acolchados, Sidestripe moldeada en 3D y suela waffle de goma.',
  ARRAY['Talles disponibles del 34 al 39', 'Edición importada', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  '/images/-VANS KNU Azul Blanco/sealstep_DPeFlU1DeUT_1.jpg',
  'Vans Knu Skool Azul Blanco vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  '/images/-VANS KNU Azul Blanco/sealstep_DPeFlU1DeUT_2.jpg',
  'Vans Knu Skool Azul Blanco vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  '/images/-VANS KNU Azul Blanco/sealstep_DPeFlU1DeUT_3.jpg',
  'Vans Knu Skool Azul Blanco vista detalle',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  '/images/-VANS KNU Azul Blanco/sealstep_DPeFlU1DeUT_4.jpg',
  'Vans Knu Skool Azul Blanco vista suela',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  '/images/-VANS KNU Azul Blanco/sealstep_DPeFlU1DeUT_5.jpg',
  'Vans Knu Skool Azul Blanco par completo',
  4,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  'vans-knu-skool-azul-blanco-34-azul---blanco',
  '34',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  'vans-knu-skool-azul-blanco-35-azul---blanco',
  '35',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  'vans-knu-skool-azul-blanco-36-azul---blanco',
  '36',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  'vans-knu-skool-azul-blanco-37-azul---blanco',
  '37',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  'vans-knu-skool-azul-blanco-38-azul---blanco',
  '38',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-azul-blanco'),
  'vans-knu-skool-azul-blanco-39-azul---blanco',
  '39',
  'Azul / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Producto #33: vans-knu-skool-clasicas
-- ----------------------------------------------------------------------------
INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  'vans-knu-skool-clasicas',
  'Vans Knu Skool Clásicas',
  'Black / White Clásicas',
  'Importados',
  'Vans',
  'NUEVO INGRESO',
  'Vans Knu Skool Clásicas Black & White importadas. La icónica silueta de caña baja reinterpretada con acolchado voluptuoso de los 90, Sidestripe 3D y suela waffle.',
  ARRAY['Talles disponibles del 38 al 43', 'Edición importada', 'Se aceptan tarjetas de crédito', 'Envíos a todo el país (24 a 72 hs)', 'Compra 100% segura']::TEXT[],
  true,
  NULL,
  'disponible',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();

INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  '/images/VANS KNU SKOOL Clasicas/sealstep_DU1bWXBDysA_1.jpg',
  'Vans Knu Skool Clásicas vista principal',
  0,
  true
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  '/images/VANS KNU SKOOL Clasicas/sealstep_DU1bWXBDysA_2.jpg',
  'Vans Knu Skool Clásicas vista lateral',
  1,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  '/images/VANS KNU SKOOL Clasicas/sealstep_DU1bWXBDysA_3.jpg',
  'Vans Knu Skool Clásicas vista trasera',
  2,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  '/images/VANS KNU SKOOL Clasicas/sealstep_DU1bWXBDysA_4.jpg',
  'Vans Knu Skool Clásicas vista detalle',
  3,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  '/images/VANS KNU SKOOL Clasicas/sealstep_DU1bWXBDysA_5.jpg',
  'Vans Knu Skool Clásicas par completo',
  4,
  false
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  'vans-knu-skool-clasicas-38-negro---blanco',
  '38',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  'vans-knu-skool-clasicas-39-negro---blanco',
  '39',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  'vans-knu-skool-clasicas-40-negro---blanco',
  '40',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  'vans-knu-skool-clasicas-41-negro---blanco',
  '41',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  'vans-knu-skool-clasicas-42-negro---blanco',
  '42',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;
INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = 'vans-knu-skool-clasicas'),
  'vans-knu-skool-clasicas-43-negro---blanco',
  '43',
  'Negro / Blanco',
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;

-- Resumen final
DO $$
DECLARE
  prod_count INT;
  img_count INT;
  var_count INT;
BEGIN
  SELECT COUNT(*) INTO prod_count FROM public.productos;
  SELECT COUNT(*) INTO img_count FROM public.producto_imagenes;
  SELECT COUNT(*) INTO var_count FROM public.producto_variantes;
  RAISE NOTICE '✅ Migración completada exitosamente.';
  RAISE NOTICE 'Total productos en base: %', prod_count;
  RAISE NOTICE 'Total imágenes registradas: %', img_count;
  RAISE NOTICE 'Total variantes registradas: %', var_count;
END $$;
