/**
 * Plantilla de correo de bienvenida de Seal Step
 * Diseño premium dark con cupón de descuento para nuevos clientes
 */

interface WelcomeEmailData {
  nombre: string
  email: string
  cupon: string
  descuentoPorcentaje: number
}

export function generateWelcomeEmailHtml(data: WelcomeEmailData): string {
  const { nombre, cupon, descuentoPorcentaje } = data
  const firstName = nombre.split(' ')[0]

  return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <title>Bienvenido/a a Seal Step 🎉</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    .container { max-width: 580px; margin: 0 auto; }
    a { text-decoration: none; }
    @media (prefers-color-scheme: dark) { body { background-color: #0a0a0a; } }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a; padding: 32px 16px;">
    <tr>
      <td>
        <table class="container" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px; margin: 0 auto;">

          <!-- Header con logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #111 0%, #161616 100%); border-radius: 20px 20px 0 0; border: 1px solid #222; border-bottom: none; padding: 36px 40px 28px; text-align: center;">
              <div style="display:inline-block; padding: 6px 14px; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); border-radius: 100px; margin-bottom: 20px;">
                <span style="color: #10b981; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;">🎉 Bienvenido a Seal Step</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: -0.5px; line-height: 1.2;">
                Hola, <span style="color: #10b981;">${firstName}</span> 👟
              </h1>
              <p style="margin: 12px 0 0; color: #888; font-size: 15px; line-height: 1.6;">
                Tu cuenta en <strong style="color: #fff;">Seal Step Uruguay</strong> está activa.<br/>
                Te damos la bienvenida con un regalo exclusivo.
              </p>
            </td>
          </tr>

          <!-- Cupón destacado -->
          <tr>
            <td style="background: #111; border-left: 1px solid #222; border-right: 1px solid #222; padding: 0 40px 28px;">
              <div style="background: linear-gradient(135deg, #052e16 0%, #064e3b 100%); border: 1px solid rgba(16,185,129,0.4); border-radius: 16px; padding: 28px; text-align: center; margin-top: -8px;">
                <p style="margin: 0 0 8px; color: #6ee7b7; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Tu cupón de bienvenida</p>
                <div style="display: inline-block; background: #0a0a0a; border: 2px dashed rgba(16,185,129,0.5); border-radius: 12px; padding: 14px 28px; margin: 8px 0;">
                  <span style="color: #10b981; font-size: 28px; font-weight: 900; letter-spacing: 0.1em; font-family: monospace;">${cupon}</span>
                </div>
                <p style="margin: 10px 0 0; color: #a7f3d0; font-size: 15px; font-weight: 700;">
                  ${descuentoPorcentaje}% de descuento en tu primera compra
                </p>
                <p style="margin: 6px 0 0; color: #6ee7b7; font-size: 12px;">
                  Aplicable en cualquier producto del catálogo · Sin mínimo de compra
                </p>
              </div>
            </td>
          </tr>

          <!-- Cómo usar el cupón -->
          <tr>
            <td style="background: #111; border-left: 1px solid #222; border-right: 1px solid #222; padding: 0 40px 28px;">
              <p style="margin: 0 0 16px; color: #9ca3af; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">¿Cómo usar tu cupón?</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  { num: '1', title: 'Elegí tus championes', desc: 'Navegá el catálogo y sumá los que te gusten.' },
                  { num: '2', title: 'Ingresá tu código', desc: 'En el carrito, escribí <strong style="color:#fff">' + cupon + '</strong> en el campo de cupón.' },
                  { num: '3', title: 'Disfrutá el descuento', desc: 'El ' + descuentoPorcentaje + '% se aplica automáticamente al total.' },
                ].map(step => `
                <tr>
                  <td style="padding: 8px 0;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="40" valign="top" style="padding-top: 2px;">
                          <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); display: flex; align-items: center; justify-content: center; text-align: center; line-height: 28px;">
                            <span style="color: #10b981; font-size: 12px; font-weight: 900;">${step.num}</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="margin: 0; color: #fff; font-size: 14px; font-weight: 700;">${step.title}</p>
                          <p style="margin: 2px 0 0; color: #6b7280; font-size: 13px;">${step.desc}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>

          <!-- CTA button -->
          <tr>
            <td style="background: #111; border-left: 1px solid #222; border-right: 1px solid #222; padding: 0 40px 36px; text-align: center;">
              <a
                href="https://sealstep.uy"
                style="display: inline-block; background: #10b981; color: #000; font-size: 15px; font-weight: 900; padding: 16px 40px; border-radius: 100px; text-decoration: none; letter-spacing: 0.05em; text-transform: uppercase;"
              >
                Ver catálogo →
              </a>
              <p style="margin: 16px 0 0; color: #6b7280; font-size: 12px;">
                ¿Dudas? Escribinos por <a href="https://wa.me/59899321703" style="color: #10b981;">WhatsApp</a> y te ayudamos.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #0d0d0d; border: 1px solid #222; border-top: 1px solid #1a1a1a; border-radius: 0 0 20px 20px; padding: 24px 40px; text-align: center;">
              <p style="margin: 0; color: #4b5563; font-size: 12px;">
                Recibiste este correo porque te registraste en <strong style="color: #6b7280;">Seal Step Uruguay</strong>.<br/>
                Championes y calzado urbano · Rivera, Uruguay · <a href="https://sealstep.uy" style="color: #6b7280;">sealstep.uy</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

/**
 * Envía un correo usando Resend (si la API key está configurada)
 * o simula el envío de forma segura sin errores (modo demo).
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string; simulated?: boolean }> {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey || resendApiKey === 'demo') {
    // Modo demo: simular envío sin errores
    console.log(`[Email Simulado] Para: ${options.to} | Asunto: ${options.subject}`)
    return { success: true, simulated: true }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Seal Step Uruguay <bienvenida@sealstep.uy>',
        to: [options.to],
        subject: options.subject,
        html: options.html,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[Email] Error al enviar con Resend:', error)
      return { success: false }
    }

    const data = await response.json() as { id?: string }
    return { success: true, id: data.id }
  } catch (error) {
    console.error('[Email] Error de red:', error)
    return { success: false }
  }
}

/**
 * Envía el correo de bienvenida con cupón de descuento a un nuevo cliente.
 */
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<{ success: boolean; simulated?: boolean }> {
  const html = generateWelcomeEmailHtml(data)
  return sendEmail({
    to: data.email,
    subject: `🎉 Bienvenido/a a Seal Step, ${data.nombre.split(' ')[0]}! Tu cupón ${data.cupon} espera por vos`,
    html,
  })
}
