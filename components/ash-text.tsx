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

  // Agrupamos por palabras para que NUNCA se parta una palabra al final de la línea en pantallas chicas
  const words = useMemo(() => {
    let globalCharIndex = 0
    return children.split(' ').map((word) => {
      const chars = word.split('').map((char) => {
        const index = globalCharIndex++
        const angle = (index * 47) % 360
        const distance = 35 + ((index * 17) % 45)
        const rad = (angle * Math.PI) / 180
        const dx = Math.cos(rad) * distance
        const dy = Math.sin(rad) * distance - 15

        const blur = 6 + ((index * 7) % 8)
        const scale = 0.2 + ((index * 3) % 4) * 0.1
        const rotate = ((index * 33) % 90) - 45

        return {
          char,
          dx,
          dy,
          blur,
          scale,
          rotate,
          index,
        }
      })
      return chars
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
    <Tag ref={ref} className={`inline ${className}`} aria-label={children}>
      {words.map((wordChars, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {wordChars.map(({ char, dx, dy, blur, scale, rotate, index }) => {
            const charDelay = delay + index * stagger

            return (
              <span
                key={index}
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
                }}
              >
                {char}
              </span>
            )
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
