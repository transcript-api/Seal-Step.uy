import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  const diagnostico: Record<string, unknown> = {
    env: {
      NEXT_PUBLIC_SUPABASE_URL: url ? `${url.substring(0, 30)}...` : '❌ NO CONFIGURADA',
      SUPABASE_SERVICE_ROLE_KEY: serviceKey
        ? `✅ Configurada (${serviceKey.length} chars, empieza con "${serviceKey.substring(0, 10)}")`
        : '❌ NO CONFIGURADA',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey
        ? `✅ Configurada (${anonKey.length} chars)`
        : '❌ NO CONFIGURADA',
    },
    ok: false,
    error: null as string | null,
    tablas: null as string[] | null,
  }

  if (!url || !serviceKey) {
    diagnostico.error =
      'Faltan variables de entorno. Ve a Vercel Dashboard > Settings > Environment Variables'
    return NextResponse.json(diagnostico, { status: 400 })
  }

  // Verificar que la service key sea válida (no el nombre de la variable)
  if (serviceKey.startsWith('SUPABASE_')) {
    diagnostico.error =
      '⚠️ El valor de SUPABASE_SERVICE_ROLE_KEY parece ser el nombre de la variable en lugar del valor real. Debe empezar con "sb_secret_..."'
    diagnostico.env.SUPABASE_SERVICE_ROLE_KEY = `❌ VALOR INCORRECTO: "${serviceKey.substring(0, 20)}..."`
    return NextResponse.json(diagnostico, { status: 400 })
  }

  try {
    const supabase = createClient(url, serviceKey)

    // Intentar leer la tabla productos
    const { data, error } = await supabase
      .from('productos')
      .select('id, nombre, precio')
      .limit(3)

    if (error) {
      diagnostico.error = `Error de Supabase: ${error.message} (Code: ${error.code})`
      return NextResponse.json(diagnostico, { status: 500 })
    }

    diagnostico.ok = true
    diagnostico.tablas = data?.map((p) => `${p.nombre} → precio: ${p.precio}`) ?? []

    return NextResponse.json(diagnostico)
  } catch (err: unknown) {
    const error = err as Error
    diagnostico.error = `Excepción: ${error.message}`
    return NextResponse.json(diagnostico, { status: 500 })
  }
}
