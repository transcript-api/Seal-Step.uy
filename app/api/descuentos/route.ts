import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export interface ReglasDescuento {
  id: string
  nombre: string
  tipo: 'porcentaje' | 'monto_fijo'
  cantidad_minima: number
  cantidad_maxima: number | null
  valor_descuento: number
  aplica_a: string
  activo: boolean
}

// Reglas por defecto hardcodeadas como fallback si Supabase falla
const REGLAS_DEFAULT: ReglasDescuento[] = [
  { id: '1', nombre: 'Precio Normal (1-7 pares)', tipo: 'porcentaje', cantidad_minima: 1, cantidad_maxima: 7, valor_descuento: 0, aplica_a: 'general', activo: true },
  { id: '2', nombre: 'Descuento Mayorista (8-14 pares)', tipo: 'porcentaje', cantidad_minima: 8, cantidad_maxima: 14, valor_descuento: 25, aplica_a: 'general', activo: true },
  { id: '3', nombre: 'Descuento Mayorista Grande (15+ pares)', tipo: 'porcentaje', cantidad_minima: 15, cantidad_maxima: null, valor_descuento: 30, aplica_a: 'general', activo: true },
]

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ reglas: REGLAS_DEFAULT })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
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

// Función utilitaria: calcular descuento según cantidad total de pares
export function calcularDescuentoMayorista(
  cantidadTotal: number,
  reglas: ReglasDescuento[]
): { porcentaje: number; reglaAplicada: ReglasDescuento | null } {
  const reglasOrdenadas = [...reglas].sort((a, b) => b.cantidad_minima - a.cantidad_minima)

  for (const regla of reglasOrdenadas) {
    if (
      cantidadTotal >= regla.cantidad_minima &&
      (regla.cantidad_maxima === null || cantidadTotal <= regla.cantidad_maxima)
    ) {
      return { porcentaje: regla.valor_descuento, reglaAplicada: regla }
    }
  }

  return { porcentaje: 0, reglaAplicada: null }
}
