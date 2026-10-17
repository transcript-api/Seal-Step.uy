import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

export interface AdminUser {
  id: string
  email: string
  nombre: string
  passwordHash: string
  creado: string
  activo: boolean
  rol: 'master' | 'admin'
}

export const ADMINS_ROW_ID = '00000000-0000-0000-0000-000000000003'
const ADMINS_PHONE = '+598000000003'
const ADMINS_EMAIL = 'system_admins@sealstep.internal'
const ADMINS_ORIGIN = 'system_admins'

const DEFAULT_SECRET = process.env.ADMIN_SESSION_SECRET || 'seal-step-secret-session-token-key-2026'

/* ─── Hashear contraseña con Web Crypto SHA-256 ─── */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + DEFAULT_SECRET)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/* ─── Verificar contraseña contra hash ─── */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const computed = await hashPassword(password)
  return computed === hash
}

/* ─── Ruta del archivo local de respaldo ─── */
function getLocalFilePath(): string {
  return path.join(process.cwd(), 'data', 'admins.json')
}

/* ─── Leer desde archivo local ─── */
function readLocalAdmins(): AdminUser[] {
  try {
    const filePath = getLocalFilePath()
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (err) {
    console.warn('Aviso al leer admins local:', err)
  }
  return []
}

/* ─── Guardar en archivo local ─── */
function writeLocalAdmins(admins: AdminUser[]): void {
  try {
    const filePath = getLocalFilePath()
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify(admins, null, 2), 'utf-8')
  } catch (err) {
    console.warn('Aviso al escribir admins local:', err)
  }
}

/* ─── Obtener todos los administradores guardados (Supabase + Local) ─── */
export async function getStoredAdmins(): Promise<AdminUser[]> {
  // 1. Intentar desde Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('clientes')
        .select('notas')
        .eq('id', ADMINS_ROW_ID)
        .single()

      if (!error && data?.notas) {
        try {
          const parsed = JSON.parse(data.notas)
          if (Array.isArray(parsed)) {
            // Sincronizar copia local
            writeLocalAdmins(parsed)
            return parsed
          }
        } catch (parseErr) {
          console.warn('Error al parsear notas de admins en Supabase:', parseErr)
        }
      }
    } catch (dbErr) {
      console.warn('Aviso al consultar admins en Supabase:', dbErr)
    }
  }

  // 2. Respaldo local
  return readLocalAdmins()
}

/* ─── Guardar todos los administradores (Supabase + Local) ─── */
export async function saveStoredAdmins(admins: AdminUser[]): Promise<boolean> {
  // 1. Guardar en local primero para disponibilidad inmediata
  writeLocalAdmins(admins)

  // 2. Guardar en Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { error } = await supabaseAdmin
        .from('clientes')
        .upsert(
          {
            id: ADMINS_ROW_ID,
            nombre: 'Administradores del Sistema',
            email: ADMINS_EMAIL,
            telefono: ADMINS_PHONE,
            origen: ADMINS_ORIGIN,
            notas: JSON.stringify(admins),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )

      if (error) {
        console.error('Error al guardar admins en Supabase:', error)
        return false
      }
      return true
    } catch (err) {
      console.error('Excepción al guardar admins en Supabase:', err)
      return false
    }
  }

  return true
}

/* ─── Verificar credenciales en login ─── */
export async function verifyAdminCredentials(
  emailInput: string,
  passwordInput: string
): Promise<{ valid: boolean; email?: string; rol?: 'master' | 'admin'; nombre?: string }> {
  const cleanEmail = String(emailInput).trim().toLowerCase()
  const cleanPassword = String(passwordInput)

  const defaultMasterEmail = (process.env.ADMIN_EMAIL || 'admin@sealstep.uy').toLowerCase()
  const defaultMasterPassword = process.env.ADMIN_PASSWORD || 'SealStep2026!'

  const admins = await getStoredAdmins()

  // 1. Buscar si hay una clave maestra modificada en el registro
  const masterRecord = admins.find((a) => a.rol === 'master' && a.activo)
  if (masterRecord) {
    if (cleanEmail === masterRecord.email.toLowerCase()) {
      const match = await verifyPassword(cleanPassword, masterRecord.passwordHash)
      if (match) {
        return { valid: true, email: masterRecord.email, rol: 'master', nombre: masterRecord.nombre }
      }
    }
  } else {
    // Si no se ha modificado la contraseña maestra, usar la de entorno
    if (cleanEmail === defaultMasterEmail && cleanPassword === defaultMasterPassword) {
      return { valid: true, email: cleanEmail, rol: 'master', nombre: 'Administrador Maestro' }
    }
  }

  // 2. Verificar contra administradores adicionales creados
  const matchUser = admins.find(
    (a) => a.email.toLowerCase() === cleanEmail && a.activo && a.rol !== 'master'
  )

  if (matchUser) {
    const match = await verifyPassword(cleanPassword, matchUser.passwordHash)
    if (match) {
      return { valid: true, email: matchUser.email, rol: 'admin', nombre: matchUser.nombre }
    }
  }

  return { valid: false }
}
