import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { ReglasDescuento, REGLAS_DEFAULT } from '@/lib/descuentos'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('reglas_descuento')
      .select('*')
      .eq('activo', true)
      .order('cantidad_minima', { ascending: true })

    if (error || !data || data.length === 0) {
      return NextResponse.json({ reglas: REGLAS_DEFAULT })
    }

    return NextResponse.json({ reglas: data as ReglasDescuento[] })
  } catch {
    return NextResponse.json({ reglas: REGLAS_DEFAULT })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { reglas } = body as { reglas: ReglasDescuento[] }

    if (!Array.isArray(reglas)) {
      return NextResponse.json({ success: false, error: 'Lista de reglas inválida' }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    // Desactivar o eliminar reglas previas
    await supabaseAdmin.from('reglas_descuento').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    const rowsToInsert = reglas.map(r => ({
      nombre: r.nombre || `Descuento ${r.valor_descuento}%`,
      tipo: 'porcentaje',
      cantidad_minima: Number(r.cantidad_minima) || 1,
      cantidad_maxima: r.cantidad_maxima ? Number(r.cantidad_maxima) : null,
      valor_descuento: Number(r.valor_descuento) || 0,
      aplica_a: 'general',
      activo: true,
    }))

    const { data, error } = await supabaseAdmin.from('reglas_descuento').insert(rowsToInsert).select()

    if (error) {
      console.error('[Descuentos API] Error al guardar reglas en Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, reglas: data })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error al guardar'
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}
