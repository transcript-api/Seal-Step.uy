-- ==============================================================================
-- SEAL STEP — Migración 3: Reglas de descuento mayoristas predeterminadas
-- Sistema de precios escalonados por cantidad de pares
-- ==============================================================================

-- Insertar reglas de descuento mayoristas por defecto
-- 1-7 pares → precio normal
-- 8-14 pares → 25% de descuento
-- 15+ pares → 30% de descuento

INSERT INTO public.reglas_descuento (nombre, tipo, cantidad_minima, cantidad_maxima, valor_descuento, aplica_a, activo)
VALUES
  (
    'Precio Normal (1-7 pares)',
    'porcentaje',
    1,
    7,
    0,
    'general',
    true
  ),
  (
    'Descuento Mayorista (8-14 pares)',
    'porcentaje',
    8,
    14,
    25,
    'general',
    true
  ),
  (
    'Descuento Mayorista Grande (15+ pares)',
    'porcentaje',
    15,
    NULL,
    30,
    'general',
    true
  )
ON CONFLICT DO NOTHING;

-- Políticas RLS para lectura pública de reglas de descuento
-- (solo lectura del nombre, descripción y porcentaje - sin datos sensibles)
DROP POLICY IF EXISTS "Lectura pública de reglas activas" ON public.reglas_descuento;
CREATE POLICY "Lectura pública de reglas activas" ON public.reglas_descuento
  FOR SELECT USING (activo = true);

GRANT SELECT ON public.reglas_descuento TO anon, authenticated;
