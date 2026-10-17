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

export const REGLAS_DEFAULT: ReglasDescuento[] = [
  { id: '1', nombre: 'Precio Normal (1-7 pares)', tipo: 'porcentaje', cantidad_minima: 1, cantidad_maxima: 7, valor_descuento: 0, aplica_a: 'general', activo: true },
  { id: '2', nombre: 'Descuento Mayorista (8-14 pares)', tipo: 'porcentaje', cantidad_minima: 8, cantidad_maxima: 14, valor_descuento: 25, aplica_a: 'general', activo: true },
  { id: '3', nombre: 'Descuento Mayorista Grande (15+ pares)', tipo: 'porcentaje', cantidad_minima: 15, cantidad_maxima: null, valor_descuento: 30, aplica_a: 'general', activo: true },
]

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
