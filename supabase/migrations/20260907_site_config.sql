-- ==============================================================================
-- 11. TABLA: site_config (Configuración dinámica de la tienda modificable desde el panel)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.site_config (
  clave TEXT PRIMARY KEY,
  valor JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
DROP POLICY IF EXISTS "Lectura pública de site_config" ON public.site_config;
CREATE POLICY "Lectura pública de site_config"
ON public.site_config FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Escritura total de site_config para service_role" ON public.site_config;
CREATE POLICY "Escritura total de site_config para service_role"
ON public.site_config FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
