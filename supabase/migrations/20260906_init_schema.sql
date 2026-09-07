-- ==============================================================================
-- SEAL STEP — MIGRACIÓN INICIAL DE BASE DE DATOS (SUPABASE / POSTGRESQL)
-- Versión: 1.0.0
-- ==============================================================================

-- 1. Habilitar extensión para generación de UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Función para actualización automática de 'updated_at'
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 2. TABLA: productos (Ficha técnica y comercial)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  subtitulo TEXT,
  categoria TEXT NOT NULL,
  marca TEXT DEFAULT 'General',
  badge TEXT,
  descripcion TEXT NOT NULL,
  descripcion_corta TEXT,
  detalles TEXT[] DEFAULT '{}',
  fotos_reales BOOLEAN DEFAULT true,
  precio NUMERIC(10,2), -- NULL si es "Consultar precio"
  precio_anterior NUMERIC(10,2),
  costo NUMERIC(10,2),
  destacado BOOLEAN DEFAULT false,
  visible BOOLEAN DEFAULT true,
  activo BOOLEAN DEFAULT true,
  estado_stock_general TEXT DEFAULT 'disponible', -- 'disponible' | 'ultimas' | 'agotado'
  etiquetas TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER set_productos_updated_at
BEFORE UPDATE ON public.productos
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 3. TABLA: producto_imagenes (Galería de imágenes por producto)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.producto_imagenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producto_id UUID NOT NULL REFERENCES public.productos(id) ON DELETE CASCADE,
  url TEXT NOT NULL, -- Ruta relativa o URL pública de Storage
  alt TEXT,
  orden INT DEFAULT 0, -- 0 = foto de portada
  es_principal BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(producto_id, url)
);

-- ------------------------------------------------------------------------------
-- 4. TABLA: producto_variantes (Control de inventario por talle y color)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.producto_variantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producto_id UUID NOT NULL REFERENCES public.productos(id) ON DELETE CASCADE,
  sku TEXT UNIQUE,
  talle TEXT NOT NULL,
  color TEXT,
  stock INT, -- NULL inicial: no se inventa stock hasta conteo real
  precio_diferencial NUMERIC(10,2),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(producto_id, talle, color)
);

CREATE TRIGGER set_producto_variantes_updated_at
BEFORE UPDATE ON public.producto_variantes
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 5. TABLA: reglas_descuento (100% PRIVADA: Solo backend)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reglas_descuento (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  tipo TEXT NOT NULL, -- 'porcentaje' | 'monto_fijo' | 'precio_especial'
  cantidad_minima INT NOT NULL DEFAULT 1,
  cantidad_maxima INT,
  valor_descuento NUMERIC(10,2) NOT NULL,
  aplica_a TEXT DEFAULT 'general', -- 'general' | 'categoria' | 'producto'
  categoria_target TEXT,
  producto_id UUID REFERENCES public.productos(id) ON DELETE CASCADE,
  activo BOOLEAN DEFAULT true,
  fecha_inicio TIMESTAMPTZ,
  fecha_fin TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 6. TABLA: clientes (CRM / Historial de compradores)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT,
  telefono TEXT UNIQUE NOT NULL,
  direccion TEXT,
  ciudad TEXT,
  departamento TEXT,
  codigo_postal TEXT,
  notas TEXT,
  tags TEXT[] DEFAULT '{}',
  origen TEXT DEFAULT 'tienda_web',
  total_compras_count INT DEFAULT 0,
  total_gastado NUMERIC(10,2) DEFAULT 0.00,
  ultima_compra_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER set_clientes_updated_at
BEFORE UPDATE ON public.clientes
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 7. TABLA: pedidos (Órdenes de compra)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_pedido TEXT UNIQUE NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  cliente_nombre TEXT NOT NULL,
  cliente_email TEXT,
  cliente_telefono TEXT NOT NULL,
  direccion_envio JSONB NOT NULL,
  metodo_envio TEXT,
  costo_envio NUMERIC(10,2) DEFAULT 0.00,
  subtotal NUMERIC(10,2) NOT NULL,
  monto_descuento NUMERIC(10,2) DEFAULT 0.00,
  total NUMERIC(10,2) NOT NULL,
  moneda TEXT DEFAULT 'UYU',
  metodo_pago TEXT,
  estado_pago TEXT DEFAULT 'pendiente',
  estado_pedido TEXT DEFAULT 'pendiente',
  mercadopago_preference_id TEXT,
  mercadopago_payment_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER set_pedidos_updated_at
BEFORE UPDATE ON public.pedidos
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 8. TABLA: pedido_items (Precios inmutables al momento de compra)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pedido_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES public.pedidos(id) ON DELETE CASCADE,
  producto_id UUID REFERENCES public.productos(id) ON DELETE SET NULL,
  variante_id UUID REFERENCES public.producto_variantes(id) ON DELETE SET NULL,
  producto_nombre TEXT NOT NULL,
  talle TEXT NOT NULL,
  color TEXT,
  precio_unitario NUMERIC(10,2) NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  subtotal NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 9. TABLA: pagos (Transacciones de Mercado Pago)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pagos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES public.pedidos(id) ON DELETE CASCADE,
  proveedor TEXT DEFAULT 'mercado_pago',
  transaccion_externa_id TEXT UNIQUE,
  estado TEXT NOT NULL,
  monto NUMERIC(10,2) NOT NULL,
  moneda TEXT DEFAULT 'UYU',
  metodo_detalle TEXT,
  payload_raw JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 10. TABLA: crm_interacciones (Historial de comunicaciones)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.crm_interacciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  origen TEXT DEFAULT 'admin',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- ÍNDICES PARA BÚSQUEDAS EFICIENTES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_productos_slug ON public.productos(slug);
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON public.productos(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_visible_activo ON public.productos(visible, activo);
CREATE INDEX IF NOT EXISTS idx_variantes_producto ON public.producto_variantes(producto_id);
CREATE INDEX IF NOT EXISTS idx_variantes_talle ON public.producto_variantes(talle);
CREATE INDEX IF NOT EXISTS idx_imagenes_producto ON public.producto_imagenes(producto_id, orden);
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente ON public.pedidos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON public.pedidos(estado_pedido, estado_pago);
CREATE INDEX IF NOT EXISTS idx_clientes_telefono ON public.clientes(telefono);

-- ==============================================================================
-- CONFIGURACIÓN DE ROW LEVEL SECURITY (RLS) Y PRIVACIDAD DE DATOS
-- ==============================================================================
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.producto_imagenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.producto_variantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reglas_descuento ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedido_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_interacciones ENABLE ROW LEVEL SECURITY;

-- 1. Políticas de Lectura Pública (Tienda Online)
DROP POLICY IF EXISTS "Lectura pública de productos activos" ON public.productos;
CREATE POLICY "Lectura pública de productos activos" ON public.productos
  FOR SELECT USING (visible = true AND activo = true);

DROP POLICY IF EXISTS "Lectura pública de imágenes" ON public.producto_imagenes;
CREATE POLICY "Lectura pública de imágenes" ON public.producto_imagenes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de variantes activas" ON public.producto_variantes;
CREATE POLICY "Lectura pública de variantes activas" ON public.producto_variantes
  FOR SELECT USING (activo = true);

-- 2. Políticas Privadas (BLINDADAS):
-- reglas_descuento: CERO políticas públicas (SOLO backend vía service_role)
-- clientes, pedidos, pedido_items, pagos, crm_interacciones: CERO políticas públicas

-- ------------------------------------------------------------------------------
-- 3. BLINDAJE DE COLUMNAS SENSIBLES (COSTO Y STOCK NUMÉRICO EXACTO)
-- ------------------------------------------------------------------------------
-- Vista segura para la tienda pública: excluye el costo interno del producto
CREATE OR REPLACE VIEW public.v_catalogo_productos AS
SELECT 
  id,
  slug,
  nombre,
  subtitulo,
  categoria,
  marca,
  badge,
  descripcion,
  descripcion_corta,
  detalles,
  fotos_reales,
  precio,
  precio_anterior,
  destacado,
  visible,
  activo,
  estado_stock_general,
  etiquetas,
  created_at,
  updated_at
FROM public.productos
WHERE visible = true AND activo = true;

-- Vista segura para variantes: solo informa si está disponible (boolean),
-- sin exponer las cantidades numéricas reales de inventario al cliente ni a competidores.
CREATE OR REPLACE VIEW public.v_catalogo_variantes AS
SELECT 
  id,
  producto_id,
  sku,
  talle,
  color,
  precio_diferencial,
  activo,
  (stock IS NULL OR stock > 0) AS disponible
FROM public.producto_variantes
WHERE activo = true;

-- Otorgar acceso a las vistas públicas seguras
GRANT SELECT ON public.v_catalogo_productos TO anon, authenticated;
GRANT SELECT ON public.v_catalogo_variantes TO anon, authenticated;
