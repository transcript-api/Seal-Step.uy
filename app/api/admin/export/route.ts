import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format') || 'json' // 'json' | 'csv'
  const tabla = searchParams.get('tabla') || 'all' // 'productos' | 'clientes' | 'pedidos' | 'all'

  try {
    const data: Record<string, unknown[]> = {}

    if (tabla === 'all' || tabla === 'clientes') {
      const { data: clientes } = await supabaseAdmin
        .from('clientes')
        .select('*')
        .order('created_at', { ascending: false })
      data.clientes = clientes || []
    }

    if (tabla === 'all' || tabla === 'pedidos') {
      const { data: pedidos } = await supabaseAdmin
        .from('pedidos')
        .select('*')
        .order('created_at', { ascending: false })
      data.pedidos = pedidos || []
    }

    if (tabla === 'all' || tabla === 'productos') {
      const { data: productos } = await supabaseAdmin
        .from('productos')
        .select('*')
        .order('created_at', { ascending: false })
      data.productos = productos || []
    }

    if (format === 'csv') {
      // Exportar la tabla principal (clientes si es 'all', sino la específica)
      const targetKey = tabla === 'all' ? 'clientes' : tabla
      const rows = data[targetKey] || []

      if (rows.length === 0) {
        return new NextResponse('Sin datos para exportar', { status: 200 })
      }

      const headers = Object.keys(rows[0] as Record<string, unknown>)
      const csvLines = [
        headers.join(','),
        ...rows.map((row) =>
          headers
            .map((h) => {
              const val = (row as Record<string, unknown>)[h]
              if (val === null || val === undefined) return ''
              const str = typeof val === 'object' ? JSON.stringify(val) : String(val)
              // Escapar comillas y envolver en comillas si tiene comas
              if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`
              }
              return str
            })
            .join(',')
        ),
      ]

      const csvContent = csvLines.join('\n')
      const filename = `sealstep-${targetKey}-${new Date().toISOString().slice(0, 10)}.csv`

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    }

    // JSON export
    const filename = `sealstep-backup-${new Date().toISOString().slice(0, 10)}.json`
    const jsonContent = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        version: '1.0',
        data,
      },
      null,
      2
    )

    return new NextResponse(jsonContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('[Export API] Error:', error)
    return NextResponse.json(
      { error: 'Error al exportar datos' },
      { status: 500 }
    )
  }
}
