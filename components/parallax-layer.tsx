'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ParallaxLayerProps {
  children?: React.ReactNode
  /**
   * Velocidad de desplazamiento diferencial.
   * Valores positivos (ej: 0.2, 0.35) mueven el elemento más rápido o en dirección contraria.
   * Valores negativos (ej: -0.2, -0.35) lo hacen flotar sutilmente en sentido inverso.
   */
  speed?: number
  className?: string
  style?: React.CSSProperties
}

export function ParallaxLayer({
  children,
  speed = -0.25,
  className = '',
  style = {},
}: ParallaxLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let rafId: number | null = null

    const updateParallax = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Cuando está en el rango visible
      if (rect.bottom >= -100 && rect.top <= viewportHeight + 100) {
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = viewportHeight / 2
        const distanceFromCenter = elementCenter - viewportCenter

        const calculatedOffset = Math.round(distanceFromCenter * speed)
        setOffsetY(calculatedOffset)
      }
    }

    const onScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateParallax)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateParallax()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [speed])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        transform: `translate3d(0, ${offsetY}px, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
