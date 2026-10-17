import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth'
import {
  getStoredAdmins,
  saveStoredAdmins,
  hashPassword,
  verifyPassword,
  AdminUser,
} from '@/lib/admins'
import { sendAdminInvitationEmail } from '@/lib/email'
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

/* ─── Helper: verificar sesión de administrador ─── */
async function isAuthorized(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
    return await verifyAdminToken(token)
  } catch {
    return false
  }
}

/* ──────────────── GET: Listar administradores ──────────────── */
export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
  }

  try {
    const admins = await getStoredAdmins()
    // Devolvemos lista segura sin hashes
    const safeAdmins = admins
      .filter((a) => a.rol !== 'master')
      .map(({ id, email, nombre, creado, activo, rol }) => ({
        id,
        email,
        nombre,
        creado,
        activo,
        rol,
      }))

    return NextResponse.json({ success: true, admins: safeAdmins })
  } catch (error) {
    console.error('Error al listar admins:', error)
    return NextResponse.json({ success: false, error: 'Error al obtener administradores' }, { status: 500 })
  }
}

/* ──────────────── POST: Operaciones de Administración ──────────────── */
export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { action } = body

    /* ── ACCIÓN: Cambiar Contraseña Maestra ── */
    if (action === 'change_master_password') {
      const { currentPassword, newPassword } = body

      if (!currentPassword || !newPassword) {
        return NextResponse.json(
          { success: false, error: 'Por favor completá la contraseña actual y la nueva.' },
          { status: 400 }
        )
      }

      if (newPassword.length < 8) {
        return NextResponse.json(
          { success: false, error: 'La nueva contraseña debe tener un mínimo de 8 caracteres.' },
          { status: 400 }
        )
      }

      const defaultMasterPassword = process.env.ADMIN_PASSWORD || 'SealStep2026!'
      const admins = await getStoredAdmins()
      const masterRecord = admins.find((a) => a.rol === 'master')

      let isCurrentValid = false
      if (masterRecord) {
        isCurrentValid = await verifyPassword(currentPassword, masterRecord.passwordHash)
      } else {
        isCurrentValid = currentPassword === defaultMasterPassword
      }

      if (!isCurrentValid) {
        return NextResponse.json(
          { success: false, error: 'La contraseña actual no es correcta.' },
          { status: 401 }
        )
      }

      // Generar nuevo hash y actualizar el registro del master
      const newHash = await hashPassword(newPassword)
      const now = new Date().toISOString()
      const updatedList: AdminUser[] = [
        ...admins.filter((a) => a.rol !== 'master'),
        {
          id: masterRecord?.id || 'master-admin',
          email: process.env.ADMIN_EMAIL || 'admin@sealstep.uy',
          nombre: 'Administrador Maestro',
          passwordHash: newHash,
          creado: masterRecord?.creado || now,
          activo: true,
          rol: 'master',
        },
      ]

      await saveStoredAdmins(updatedList)

      return NextResponse.json({
        success: true,
        message: 'Contraseña maestra actualizada correctamente. Ya podés usar tu nueva clave.',
      })
    }

    /* ── ACCIÓN: Agregar Nuevo Administrador ── */
    if (action === 'add_admin') {
      const { email, nombre, password } = body

      if (!email || !nombre || !password) {
        return NextResponse.json(
          { success: false, error: 'Completá todos los campos: nombre, correo y contraseña.' },
          { status: 400 }
        )
      }

      const cleanEmail = String(email).trim().toLowerCase()
      const cleanNombre = String(nombre).trim()
      const cleanPassword = String(password).trim()

      if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
        return NextResponse.json(
          { success: false, error: 'Ingresá un correo electrónico válido.' },
          { status: 400 }
        )
      }

      if (cleanPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: 'La contraseña debe tener al menos 6 caracteres.' },
          { status: 400 }
        )
      }

      const admins = await getStoredAdmins()
      const existing = admins.find(
        (a) => a.email.toLowerCase() === cleanEmail && a.rol !== 'master'
      )

      if (existing) {
        return NextResponse.json(
          { success: false, error: `Ya existe un administrador registrado con el correo ${cleanEmail}.` },
          { status: 409 }
        )
      }

      const passwordHash = await hashPassword(cleanPassword)
      const newAdmin: AdminUser = {
        id: `admin-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        email: cleanEmail,
        nombre: cleanNombre,
        passwordHash,
        creado: new Date().toISOString(),
        activo: true,
        rol: 'admin',
      }

      const updatedAdmins = [...admins, newAdmin]
      const saved = await saveStoredAdmins(updatedAdmins)

      if (!saved) {
        return NextResponse.json(
          { success: false, error: 'Hubo un error al guardar en la base de datos.' },
          { status: 500 }
        )
      }

      // Opcional: Registrar también en Supabase Auth si está habilitado
      if (isSupabaseConfigured()) {
        try {
          const supabaseAdmin = getSupabaseAdmin()
          await supabaseAdmin.auth.admin.createUser({
            email: cleanEmail,
            password: cleanPassword,
            email_confirm: true,
          })
        } catch {
          // No bloqueante
        }
      }

      // ENVIAR CORREO ELECTRÓNICO CON SUS CREDENCIALES
      let emailSent = false
      try {
        const mailRes = await sendAdminInvitationEmail({
          nombre: cleanNombre,
          email: cleanEmail,
          password: cleanPassword,
        })
        emailSent = mailRes.success
      } catch (err) {
        console.warn('Aviso al enviar correo de invitación a admin:', err)
      }

      return NextResponse.json({
        success: true,
        message: emailSent
          ? `¡Administrador "${cleanNombre}" agregado con éxito! Se envió un correo con sus credenciales de acceso a ${cleanEmail}.`
          : `¡Administrador "${cleanNombre}" agregado y habilitado con éxito para ${cleanEmail}!`,
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          nombre: newAdmin.nombre,
          creado: newAdmin.creado,
          activo: newAdmin.activo,
          rol: newAdmin.rol,
        },
      })
    }

    /* ── ACCIÓN: Revocar o Eliminar Administrador ── */
    if (action === 'revoke_admin' || action === 'delete_admin') {
      const { email, id } = body

      if (!email && !id) {
        return NextResponse.json({ success: false, error: 'Identificador o correo requerido.' }, { status: 400 })
      }

      const admins = await getStoredAdmins()
      const target = admins.find(
        (a) => (id && a.id === id) || (email && a.email.toLowerCase() === String(email).trim().toLowerCase())
      )

      if (!target) {
        return NextResponse.json(
          { success: false, error: 'No se encontró el administrador especificado.' },
          { status: 404 }
        )
      }

      if (target.rol === 'master') {
        return NextResponse.json(
          { success: false, error: 'No es posible revocar al Administrador Maestro principal.' },
          { status: 403 }
        )
      }

      // Eliminar de la lista de administradores activos
      const updatedAdmins = admins.filter((a) => a.id !== target.id)
      await saveStoredAdmins(updatedAdmins)

      // Eliminar de Supabase Auth si existe
      if (isSupabaseConfigured()) {
        try {
          const supabaseAdmin = getSupabaseAdmin()
          const { data: users } = await supabaseAdmin.auth.admin.listUsers()
          const user = users?.users?.find((u) => u.email?.toLowerCase() === target.email.toLowerCase())
          if (user) {
            await supabaseAdmin.auth.admin.deleteUser(user.id)
          }
        } catch {
          // No bloqueante
        }
      }

      return NextResponse.json({
        success: true,
        message: `Acceso revocado exitosamente para ${target.nombre} (${target.email}). Esta cuenta ya no puede acceder al panel.`,
      })
    }

    return NextResponse.json({ success: false, error: 'Acción no reconocida.' }, { status: 400 })
  } catch (error) {
    console.error('Error en /api/admin/admins:', error)
    return NextResponse.json({ success: false, error: 'Error interno del servidor.' }, { status: 500 })
  }
}
