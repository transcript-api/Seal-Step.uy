import { NextResponse } from 'next/server'
import {
  createAdminToken,
  ADMIN_COOKIE_NAME,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
} from '@/lib/auth'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

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

    // 2. Si no coincide con las maestras y Supabase está configurado, intentar Supabase Auth
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
