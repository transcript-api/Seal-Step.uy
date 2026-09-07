import { NextResponse } from 'next/server'
import { createAdminToken, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, ADMIN_COOKIE_NAME } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: string; password?: string }
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email y contraseña son requeridos.' },
        { status: 400 }
      )
    }

    // ────────────────────────────────────────────────────────────────
    // 1. Detectar si es el Dueño / Administrador
    // ────────────────────────────────────────────────────────────────
    const isAdminCredentials =
      email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
      password === DEFAULT_ADMIN_PASSWORD

    if (isAdminCredentials) {
      // Crear token de sesión de administrador
      const token = await createAdminToken(email)
      const response = NextResponse.json({
        success: true,
        rol: 'admin',
        redirect: '/admin',
        message: '¡Bienvenido al panel de administración!',
      })

      response.cookies.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      })

      return response
    }

    // ────────────────────────────────────────────────────────────────
    // 2. Autenticar como cliente con Supabase Auth
    // ────────────────────────────────────────────────────────────────
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (authError || !authData?.user) {
      return NextResponse.json(
        { success: false, error: 'Credenciales incorrectas. Verificá tu email y contraseña.' },
        { status: 401 }
      )
    }

    const user = authData.user
    const nombre = user.user_metadata?.nombre || user.email?.split('@')[0] || 'Cliente'

    // Obtener datos del CRM si existen
    const { data: clienteData } = await supabaseAdmin
      .from('clientes')
      .select('nombre, telefono, tags')
      .eq('email', user.email || '')
      .single()

    const response = NextResponse.json({
      success: true,
      rol: 'cliente',
      redirect: '/cuenta',
      user: {
        id: user.id,
        email: user.email,
        nombre: clienteData?.nombre || nombre,
        telefono: clienteData?.telefono || '',
      },
      message: `¡Bienvenido/a de nuevo, ${nombre.split(' ')[0]}!`,
    })

    // Crear una cookie de sesión de cliente (no administrativa, no sensible)
    const sessionData = JSON.stringify({
      id: user.id,
      email: user.email,
      nombre: clienteData?.nombre || nombre,
      accessToken: authData.session?.access_token,
      expiresAt: authData.session?.expires_at,
    })

    response.cookies.set('sealstep_cliente_session', sessionData, {
      httpOnly: false, // el cliente necesita leer esto para mostrar el perfil
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('[Login Unificado] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
