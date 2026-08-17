'use client'

import { useEffect, useRef, useState, useMemo } from 'react'

interface AshTextProps {
  children: string
  className?: string
  /** Delay inicial antes de que arranque la animación (ms) */
  delay?: number
  /** Separación de tiempo entre cada letra (ms) */
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

/**
 * Efecto inverso al chasquido de Thanos (Reverse Thanos Snap / Cenizas que se unen):
 * Cada letra empieza dispersa como una partícula de ceniza flotando (desplazada en x/y, rotada, escalada y con blur/humo)
 * y cuando entra en pantalla se condensa y converge suavemente en su posición final nítida.
 */
export function AshText({
  children,
  className = '',
  delay = 0,
  stagger = 22,
  as: Tag = 'span',
}: AshTextProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(false)

  // Generamos partículas de ceniza estables para cada caracter
  const particles = useMemo(() => {
    return children.split('').map((char, index) => {
      // Ángulo y distancia aleatoria de donde viene la ceniza
      const angle = (index * 47) % 360
      const distance = 35 + ((index * 17) % 45) // entre 35px y 80px
      const rad = (angle * Math.PI) / 180
      const dx = Math.cos(rad) * distance
      const dy = Math.sin(rad) * distance - 15 // ligera tendencia a caer desde arriba/lados

      const blur = 6 + ((index * 7) % 8) // blur entre 6px y 14px (humo)
      const scale = 0.2 + ((index * 3) % 4) * 0.1 // escala minúscula
      const rotate = ((index * 33) % 90) - 45 // rotación aleatoria

      return {
        char,
        dx,
        dy,
        blur,
        scale,
        rotate,
      }
    })
  }, [children])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setActive(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    // @ts-expect-error tag polimórfico
    <Tag ref={ref} className={`inline-block ${className}`} aria-label={children}>
      {particles.map(({ char, dx, dy, blur, scale, rotate }, i) => {
        const charDelay = delay + i * stagger

        return (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block transition-all duration-700 ease-out"
            style={{
              opacity: active ? 1 : 0,
              transform: active
                ? 'translate3d(0, 0, 0) scale(1) rotate(0deg)'
                : `translate3d(${dx}px, ${dy}px, 0) scale(${scale}) rotate(${rotate}deg)`,
              filter: active ? 'blur(0px)' : `blur(${blur}px)`,
              transitionDuration: '750ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${charDelay}ms`,
              willChange: 'transform, opacity, filter',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      })}
    </Tag>
  )
}
