import { NextResponse } from 'next/server'
import {
  createAdminToken,
  ADMIN_COOKIE_NAME,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
} from '@/lib/auth'
import { supabase, isSupabaseConfigured, getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// Hashear contraseña (debe coincidir con el método en /api/admin/admins)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + (process.env.ADMIN_SESSION_SECRET || 'seal-step-secret-session-token-key-2026'))
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Verificar contra admins adicionales guardados en Supabase
async function checkExtraAdmins(email: string, password: string): Promise<boolean> {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data } = await supabaseAdmin
      .from('clientes')
      .select('email')
      .eq('origen', 'system_admins')
      .single()
    if (!data?.email) return false
    const admins = JSON.parse(data.email) as Array<{ email: string; nombre: string; hash?: string }>
    const match = admins.find((a) => a.email === email && a.email !== '__master_password_hash__')
    if (!match || !match.hash) return false
    const hash = await hashPassword(password)
    return hash === match.hash
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Por favor ingresá tu correo y contraseña.' },
        { status: 400 }
      )
    }

    const cleanEmail = String(email).trim().toLowerCase()
    const cleanPassword = String(password)

    let isAuthenticated = false

    // 1. Verificación contra credenciales maestras de entorno / configuración
    if (
      cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
      cleanPassword === DEFAULT_ADMIN_PASSWORD
    ) {
      isAuthenticated = true
    }

    // 2. Verificar contra administradores adicionales en base de datos
    if (!isAuthenticated) {
      isAuthenticated = await checkExtraAdmins(cleanEmail, cleanPassword)
    }

    // 3. Si no coincide con ninguno local y Supabase está configurado, intentar Supabase Auth
    if (!isAuthenticated && isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        })
        if (!error && data.user) {
          isAuthenticated = true
        }
      } catch (authErr) {
        console.warn('Aviso en Supabase Auth login:', authErr)
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Credenciales incorrectas. Verificá tu correo y contraseña.' },
        { status: 401 }
      )
    }

    // Generar token seguro
    const token = await createAdminToken(cleanEmail)

    const response = NextResponse.json({
      success: true,
      message: 'Inicio de sesión exitoso.',
      email: cleanEmail,
    })

    // Establecer cookie HTTP-Only segura
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 días
    })

    return response
  } catch (error) {
    console.error('Error en login admin:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno en el servidor.' },
      { status: 500 }
    )
  }
}
