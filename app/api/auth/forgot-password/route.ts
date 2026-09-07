import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendResetPasswordEmail } from '@/lib/email'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(request: Request) {
  try {
    const { email } = await request.json() as { email?: string }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Por favor ingresá un correo electrónico válido.' },
        { status: 400 }
      )
    }

    const cleanEmail = email.trim().toLowerCase()
    const origin = request.headers.get('origin') || 'https://seal-step-uy.vercel.app'
    const redirectUrl = `${origin}/cuenta?tab=reset`

    // Intentar generar link de recuperación mediante Supabase Admin
    try {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'recovery',
        email: cleanEmail,
        options: {
          redirectTo: redirectUrl,
        },
      })

      if (!error && data?.properties?.action_link) {
        const actionLink = data.properties.action_link
        // Consultar nombre del cliente si existe
        const { data: cliente } = await supabaseAdmin
          .from('clientes')
          .select('nombre')
          .eq('email', cleanEmail)
          .maybeSingle()

        await sendResetPasswordEmail(cleanEmail, cliente?.nombre || 'Cliente', actionLink)
      } else {
        // Fallback estándar de Supabase resetPasswordForEmail
        await supabaseAdmin.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: redirectUrl,
        })
      }
    } catch (authErr) {
      console.warn('[Recovery] Auth notice:', authErr)
    }

    // Por seguridad, siempre responder con éxito para no exponer si el email existe
    return NextResponse.json({
      success: true,
      message: 'Si el correo está registrado, te enviamos las instrucciones para restablecer tu contraseña.',
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error al procesar la solicitud. Intentá nuevamente.' },
      { status: 500 }
    )
  }
}
