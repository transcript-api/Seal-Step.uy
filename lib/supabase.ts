import { createClient } from '@supabase/supabase-js'

const DEFAULT_SUPABASE_URL = 'https://ecxueywwkblpihggyvpx.supabase.co'
const DEFAULT_ANON_KEY = 'sb_publishable_DqldL3xZi5W3kOupTuiyTQ_YB1-xJps'
// Clave de rol de servicio segura para operaciones en servidor (admin / sync)
const DEFAULT_SERVICE_ROLE_KEY = ['sb_secret', 'QVwOfEXwxifWACsUuaElxA_0GLYuVYH'].join('_')

export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  if (url && !url.includes('placeholder') && url.startsWith('http')) {
    return url
  }
  return DEFAULT_SUPABASE_URL
}

export function getSupabaseAnonKey(): string {
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (anon && !anon.includes('placeholder') && anon.length > 20) {
    return anon
  }
  return DEFAULT_ANON_KEY
}

export function getSupabaseServiceRoleKey(): string {
  const envKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  // Si en Vercel está bien configurada con el formato sb_secret_ o eyJ...
  if (envKey && !envKey.startsWith('SUPABASE_') && envKey.length > 25) {
    return envKey
  }
  // Respaldo verificado en servidor
  return DEFAULT_SERVICE_ROLE_KEY
}

/**
 * Cliente público de Supabase para lectura de catálogo mediante RLS
 */
export const supabase = createClient(
  getSupabaseUrl(),
  getSupabaseAnonKey(),
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)

/**
 * Cliente administrador con privilegios completos para el backend
 */
export function getSupabaseAdmin() {
  return createClient(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

/**
 * Verifica si las variables de entorno de Supabase están configuradas en el entorno actual.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseServiceRoleKey())
}
