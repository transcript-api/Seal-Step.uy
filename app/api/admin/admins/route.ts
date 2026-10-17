import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// Tabla clave en clientes donde guardamos la lista de admins extra
const ADMINS_ORIGIN = 'system_admins'

/* ─── Helper: verificar sesión ─── */
async function isAuthorized(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
    return await verifyAdminToken(token)
  } catch {
    return false
  }
}

/* ─── Helper: hashear contraseña con Web Crypto ─── */
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + process.env.ADMIN_SESSION_SECRET || 'seal-step-secret-session-token-key-2026')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/* ─── Helper: verificar contraseña ─── */
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const computed = await hashPassword(password)
  return computed === hash
}

/* ─── Leer lista de admins desde Supabase ─── */
async function getAdminsFromDB(): Promise<{ email: string; nombre: string; creado: string }[]> {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data } = await supabaseAdmin
      .from('clientes')
      .select('nombre, email')
      .eq('origen', ADMINS_ORIGIN)
      .single()

    if (data?.email) {
      const parsed = JSON.parse(data.email)
      return Array.isArray(parsed) ? parsed : []
    }
  } catch {}
  return []
}

/* ─── Guardar lista de admins en Supabase ─── */
async function saveAdminsToDB(admins: { email: string; nombre: string; creado: string }[]) {
  const supabaseAdmin = getSupabaseAdmin()
  await supabaseAdmin
    .from('clientes')
    .upsert(
      { origen: ADMINS_ORIGIN, nombre: 'Administradores del sistema', email: JSON.stringify(admins) },
      { onConflict: 'origen' }
    )
}

/* ──────────────── GET: listar todos los admins ──────────────── */
export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
  }

  const admins = await getAdminsFromDB()
  // No devolver los hashes de contraseña
  const safe = admins.map(({ email, nombre, creado }) => ({ email, nombre, creado }))
  return NextResponse.json({ success: true, admins: safe })
}

/* ──────────────── POST: crear admin / cambiar contraseña / eliminar ──────────────── */
export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { action } = body

    /* ── ACCIÓN: cambiar contraseña del admin maestro (env) ── */
    if (action === 'change_master_password') {
      const { currentPassword, newPassword } = body

      if (!currentPassword || !newPassword) {
        return NextResponse.json({ success: false, error: 'Faltan campos requeridos.' }, { status: 400 })
      }

      if (newPassword.length < 8) {
        return NextResponse.json({ success: false, error: 'La contraseña nueva debe tener al menos 8 caracteres.' }, { status: 400 })
      }

      const masterPassword = process.env.ADMIN_PASSWORD || 'SealStep2026!'
      if (currentPassword !== masterPassword) {
        // Verificar también si hay un hash guardado
        const admins = await getAdminsFromDB()
        const masterRecord = admins.find((a) => a.email === '__master_password_hash__')
        if (masterRecord) {
          // masterRecord.nombre tiene el hash
          const valid = await verifyPassword(currentPassword, (masterRecord as any).hash || '')
          if (!valid) {
            return NextResponse.json({ success: false, error: 'La contraseña actual es incorrecta.' }, { status: 401 })
          }
        } else if (currentPassword !== masterPassword) {
          return NextResponse.json({ success: false, error: 'La contraseña actual es incorrecta.' }, { status: 401 })
        }
      }

      // Guardar el hash de la nueva contraseña
      const newHash = await hashPassword(newPassword)
      const admins = await getAdminsFromDB()
      const withoutMaster = admins.filter((a) => a.email !== '__master_password_hash__')
      withoutMaster.push({
        email: '__master_password_hash__',
        nombre: newHash,
        creado: new Date().toISOString(),
      })
      await saveAdminsToDB(withoutMaster)

      // Actualizar también en Supabase Auth si está disponible
      try {
        const supabaseAdmin = getSupabaseAdmin()
        const masterEmail = process.env.ADMIN_EMAIL || 'admin@sealstep.uy'
        const { data: users } = await supabaseAdmin.auth.admin.listUsers()
        const masterUser = users?.users?.find((u) => u.email === masterEmail)
        if (masterUser) {
          await supabaseAdmin.auth.admin.updateUserById(masterUser.id, { password: newPassword })
        }
      } catch {
        // No es crítico si Supabase Auth falla
      }

      return NextResponse.json({ success: true, message: 'Contraseña del administrador maestro actualizada con éxito.' })
    }

    /* ── ACCIÓN: agregar nuevo administrador ── */
    if (action === 'add_admin') {
      const { email, nombre, password } = body

      if (!email || !nombre || !password) {
        return NextResponse.json({ success: false, error: 'Email, nombre y contraseña son requeridos.' }, { status: 400 })
      }

      if (password.length < 8) {
        return NextResponse.json({ success: false, error: 'La contraseña debe tener al menos 8 caracteres.' }, { status: 400 })
      }

      const cleanEmail = String(email).trim().toLowerCase()
      const admins = await getAdminsFromDB()
      const realAdmins = admins.filter((a) => a.email !== '__master_password_hash__')

      // Verificar que no exista
      if (realAdmins.some((a) => a.email === cleanEmail)) {
        return NextResponse.json({ success: false, error: 'Ya existe un administrador con ese email.' }, { status: 409 })
      }

      const passwordHash = await hashPassword(password)
      const masterEntry = admins.find((a) => a.email === '__master_password_hash__')

      const newAdmin = {
        email: cleanEmail,
        nombre: String(nombre).trim(),
        creado: new Date().toISOString(),
        hash: passwordHash,
      } as any

      const newList = [
        ...(masterEntry ? [masterEntry] : []),
        ...realAdmins,
        newAdmin,
      ]
      await saveAdminsToDB(newList)

      // Crear también en Supabase Auth
      try {
        const supabaseAdmin = getSupabaseAdmin()
        await supabaseAdmin.auth.admin.createUser({
          email: cleanEmail,
          password,
          email_confirm: true,
        })
      } catch {
        // No es crítico
      }

      return NextResponse.json({ success: true, message: `Administrador "${nombre}" agregado con éxito.` })
    }

    /* ── ACCIÓN: eliminar administrador ── */
    if (action === 'delete_admin') {
      const { email } = body

      if (!email) {
        return NextResponse.json({ success: false, error: 'Email requerido.' }, { status: 400 })
      }

      const cleanEmail = String(email).trim().toLowerCase()
      const admins = await getAdminsFromDB()
      const newList = admins.filter((a) => a.email !== cleanEmail)
      await saveAdminsToDB(newList)

      // Eliminar de Supabase Auth también
      try {
        const supabaseAdmin = getSupabaseAdmin()
        const { data: users } = await supabaseAdmin.auth.admin.listUsers()
        const user = users?.users?.find((u) => u.email === cleanEmail)
        if (user) {
          await supabaseAdmin.auth.admin.deleteUser(user.id)
        }
      } catch {
        // No es crítico
      }

      return NextResponse.json({ success: true, message: 'Administrador eliminado correctamente.' })
    }

    return NextResponse.json({ success: false, error: 'Acción no reconocida.' }, { status: 400 })
  } catch (error) {
    console.error('Error en /api/admin/admins:', error)
    return NextResponse.json({ success: false, error: 'Error interno del servidor.' }, { status: 500 })
  }
}
