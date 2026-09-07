-- ==============================================================================
-- SEAL STEP — Migración 2: Tabla de Cupones de Descuento
-- Para el sistema de cupones de bienvenida y descuentos
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.cupones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT UNIQUE NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'porcentaje', -- 'porcentaje' | 'monto_fijo'
  valor NUMERIC(10,2) NOT NULL, -- Porcentaje (10 = 10%) o monto fijo en UYU
  cliente_email TEXT, -- NULL = cupón global, EMAIL = cupón personalizado
  descripcion TEXT,
  usos_maximos INT DEFAULT 1, -- NULL = ilimitado
  usos_actuales INT DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  fecha_inicio TIMESTAMPTZ DEFAULT now(),
  fecha_fin TIMESTAMPTZ, -- NULL = sin vencimiento
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER set_cupones_updated_at
BEFORE UPDATE ON public.cupones
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Índices
CREATE INDEX IF NOT EXISTS idx_cupones_codigo ON public.cupones(codigo);
CREATE INDEX IF NOT EXISTS idx_cupones_email ON public.cupones(cliente_email);
CREATE INDEX IF NOT EXISTS idx_cupones_activo ON public.cupones(activo);

-- RLS: Los cupones son privados (solo backend via service_role puede crear/actualizar)
ALTER TABLE public.cupones ENABLE ROW LEVEL SECURITY;

-- Los clientes autenticados pueden ver sus propios cupones (por email)
DROP POLICY IF EXISTS "Cliente puede ver su cupón" ON public.cupones;
CREATE POLICY "Cliente puede ver su cupón" ON public.cupones
  FOR SELECT USING (
    activo = true AND
    (cliente_email IS NULL OR cliente_email = auth.jwt() ->> 'email')
  );

-- Permisos de lectura para autenticados
GRANT SELECT ON public.cupones TO authenticated;

-- Insertar cupones globales de prueba
INSERT INTO public.cupones (codigo, tipo, valor, descripcion, usos_maximos, cliente_email)
VALUES
  ('BIENVENIDA10', 'porcentaje', 10, 'Cupón de bienvenida global 10% OFF', NULL, NULL),
  ('SEALSTEP10', 'porcentaje', 10, 'Cupón de temporada 10% OFF', NULL, NULL),
  ('DESCUENTO15', 'porcentaje', 15, 'Cupón VIP 15% OFF', NULL, NULL)
ON CONFLICT (codigo) DO NOTHING;
