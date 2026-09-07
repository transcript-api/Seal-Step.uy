import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendWelcomeEmail } from '@/lib/email'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

function generateCouponCode(nombre: string): string {
  const base = nombre.toUpperCase().replace(/\s+/g, '').slice(0, 4) || 'SEAL'
  const suffix = Math.floor(1000 + Math.random() * 9000)
  return `BIENVENIDA${suffix}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      nombre?: string
      email?: string
      telefono?: string
      password?: string
    }
    const { nombre, email, telefono, password } = body

    if (!nombre || !email || !telefono || !password) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son obligatorios: nombre, email, teléfono y contraseña.' },
        { status: 400 }
      )
    }

    // Validación básica de email uruguayo
    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'El email no tiene un formato válido.' },
        { status: 400 }
      )
    }

    // 1. Registrar en Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // confirmar automáticamente sin necesidad de email de confirmación
      user_metadata: {
        nombre,
        telefono,
        rol: 'cliente',
      },
    })

    if (authError) {
      // Manejar errores comunes
      if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
        return NextResponse.json(
          { success: false, error: 'Ya existe una cuenta con ese email. ¿Querés iniciar sesión?' },
          { status: 409 }
        )
      }
      console.error('[Register] Auth error:', authError)
      return NextResponse.json(
        { success: false, error: 'No se pudo crear la cuenta. Intentá de nuevo.' },
        { status: 500 }
      )
    }

    const userId = authData.user?.id

    // 2. Guardar en tabla clientes (CRM)
    const cupon = generateCouponCode(nombre)
    const { error: crmError } = await supabaseAdmin
      .from('clientes')
      .upsert({
        id: userId, // usar el mismo UUID de Auth para consistencia
        nombre,
        email,
        telefono,
        origen: 'registro_web',
        tags: ['nuevo_registro'],
        notas: `Registrado el ${new Date().toLocaleDateString('es-UY')}. Cupón: ${cupon}`,
      })
      .select()
      .single()

    if (crmError) {
      // No bloqueamos el registro, solo logueamos
      console.warn('[Register] Error al guardar en CRM:', crmError)
    }

    // 3. Guardar cupón de bienvenida en site_config o tabla de cupones
    await supabaseAdmin.from('cupones').upsert({
      codigo: cupon,
      tipo: 'porcentaje',
      valor: 10,
      cliente_email: email,
      usos_maximos: 1,
      usos_actuales: 0,
      activo: true,
      descripcion: `Cupón de bienvenida para ${nombre}`,
    })
    .select()
    .single()
    // Ignoramos el error si la tabla no existe todavía

    // 4. Enviar correo de bienvenida
    const emailResult = await sendWelcomeEmail({
      nombre,
      email,
      cupon,
      descuentoPorcentaje: 10,
    })

    return NextResponse.json({
      success: true,
      message: '¡Cuenta creada con éxito!',
      cupon,
      emailEnviado: emailResult.success,
      emailSimulado: emailResult.simulated || false,
    })
  } catch (error) {
    console.error('[Register] Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
