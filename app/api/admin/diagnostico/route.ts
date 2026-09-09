import { NextResponse } from 'next/server'
import { getSupabaseAdmin, getSupabaseUrl, getSupabaseServiceRoleKey } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = getSupabaseUrl()
  const serviceKey = getSupabaseServiceRoleKey()

  const diagnostico: Record<string, unknown> = {
    env: {
      SUPABASE_URL: url ? `${url.substring(0, 30)}...` : '❌ NO CONFIGURADA',
      SERVICE_ROLE_KEY: serviceKey ? `✅ Activa y Operativa (${serviceKey.length} chars)` : '❌ NO CONFIGURADA',
    },
    ok: false,
    error: null as string | null,
    tablas: null as string[] | null,
  }

  try {
    const supabase = getSupabaseAdmin()

    // Intentar leer la tabla productos
    const { data, error } = await supabase
      .from('productos')
      .select('id, nombre, precio')
      .limit(3)

    if (error) {
      diagnostico.error = `Error de Supabase: ${error.message}`
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
