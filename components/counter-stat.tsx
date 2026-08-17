'use client'

import { useEffect, useRef, useState } from 'react'

interface CounterStatProps {
  /** Número objetivo al que debe llegar */
  value: number
  /** Prefijo opcional (ej: "+", "$", "Hasta ") */
  prefix?: string
  /** Sufijo opcional (ej: "%", " Pares", " Deptos") */
  suffix?: string
  /** Duración personalizada en ms (opcional, se calcula automáticamente según la magnitud) */
  duration?: number
  /** Clases CSS adicionales */
  className?: string
  /** Formatear con separador de miles (ej: 5.000) */
  formatThousands?: boolean
}

export function CounterStat({
  value,
  prefix = '',
  suffix = '',
  duration,
  className = '',
  formatThousands = true,
}: CounterStatProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)
  const animatedRef = useRef(false)

  // Duración óptima según la escala del número
  const animDuration =
    duration ??
    (value <= 20
      ? 1200
      : value <= 150
      ? 1400
      : 1800)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true
          observer.disconnect()

          let startTime: number | null = null

          const step = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / animDuration, 1)

            // Curva suave easeOutCubic: arranca con ritmo constante y desacelera naturalmente
            const easeOutCubic = 1 - Math.pow(1 - progress, 3)

            const current = Math.round(value * easeOutCubic)
            setDisplayValue(current)

            if (progress < 1) {
              requestAnimationFrame(step)
            } else {
              setDisplayValue(value)
            }
          }

          // Breve delay de 60ms para sincronizar con la entrada visual
          setTimeout(() => {
            requestAnimationFrame(step)
          }, 60)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [value, animDuration])

  const formattedNumber = formatThousands
    ? displayValue.toLocaleString('es-UY')
    : displayValue.toString()

  return (
    <span ref={elementRef} className={`tabular-nums font-bold ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  )
}
