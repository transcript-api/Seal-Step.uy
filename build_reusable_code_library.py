import os
from pathlib import Path
from datetime import datetime

VAULT_DIR = Path(r'C:\Users\USUARIO\Documents\Obsidian Vault\NEURO WEBs')
DESKTOP_DIR = Path(r'C:\Users\USUARIO\Desktop\Skill webs diferenciadas')

def sync_write(rel_path, content):
    for base in [VAULT_DIR, DESKTOP_DIR]:
        target = base / rel_path
        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            with open(target, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            print(f"Error escribiendo {target}: {e}")

print("Creando la Biblioteca Central de Componentes y Código Reutilizable...")

# =========================================================================
# 1. GUÍA MAESTRA DE ADAPTACIÓN (21st.dev / Magic UI / Código Listo)
# =========================================================================
guia_adaptacion = f"""---
title: "Guía: Cómo Adaptar y Agregar Códigos Reutilizables (21st.dev & Custom UI)"
type: "code-library-guide"
category: "Component Architecture"
tags: [components, 21st-dev, code-library, reusable-ui, tailwind, react]
last_updated: "{datetime.now().strftime('%Y-%m-%d')}"
---

# 📦 Biblioteca de Código Interactivo Reutilizable (UI Lab)

> **Propósito:** Esta carpeta contiene componentes listos para copiar, pegar y adaptar a cualquier proyecto web nuevo (calzado, joyería Nidala, concesionarias, estética, gastronomía) sin tener que reescribirlos desde cero.

---

## ⚡ Cómo adaptar cualquier componente a un nuevo nicho en 3 pasos:

1. **Copiar el archivo de código:** Elige el componente de esta carpeta (ej. `Testimonios_Marquee_Infinito`).
2. **Cambiar el Array de Datos:** Modifica únicamente el array de datos (`TESTIMONIOS`, `PRODUCTOS`, `ITEMS`) con las fotos, textos o precios del nuevo cliente.
3. **Ajustar la Paleta de Acento:** Reemplaza el color de acento de Tailwind (ej. de `emerald-500` para calzado a `amber-400` para joyería dorada o `blue-600` para autos).

---

## 📚 Componentes Listos en esta Biblioteca:
1. [[02_BIBLIOTECA_CODIGO_INTERACTIVO/Testimonios_Marquee_Infinito|1. Testimonios Infinitos en Movimiento (Marquee)]]
2. [[02_BIBLIOTECA_CODIGO_INTERACTIVO/The_Drop_Carousel_Snap|2. Showcase 'THE DROP' + Video Autoplay + Touch Snap]]
3. [[02_BIBLIOTECA_CODIGO_INTERACTIVO/Spotlight_Card_Hover_Reveal|3. Tarjetas Interactivas Spotlight (Efecto 21st.dev)]]
4. [[02_BIBLIOTECA_CODIGO_INTERACTIVO/WhatsApp_Dynamic_Checkout_Drawer|4. Drawer de Pedidos Reactivo & Checkout WhatsApp]]
5. [[02_BIBLIOTECA_CODIGO_INTERACTIVO/Video_Reel_Showcase_Grid|5. Galería de Reels de Video Verticales (Instagram Style)]]
6. [[02_BIBLIOTECA_CODIGO_INTERACTIVO/Calculadora_Interactiva_Nicho|6. Calculadora Interactiva Multipropósito (Talles, Cuotas, Cotización)]]

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[wiki/skills/webs-diferenciadas|Skill Maestra: Webs Diferenciadas]]
- [[00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL|Handover Maestro]]
"""
sync_write('02_BIBLIOTECA_CODIGO_INTERACTIVO/00_GUIA_ADAPTACION_COMPONENTES.md', guia_adaptacion)

# =========================================================================
# 2. TESTIMONIOS INFINITOS (MARQUEE)
# =========================================================================
marquee_code = """---
title: "Componente: Testimonios Infinitos en Movimiento (Marquee Continuo)"
type: "reusable-component"
stack: "Next.js / React + Tailwind CSS"
adaptation: "Cambiar array TESTIMONIOS por los del nuevo negocio"
---

# 🌟 Testimonios Infinitos en Movimiento (Marquee Continuo)

> **Qué hace:** Carrusel infinito de tarjetas con avatares, estrellas y opiniones reales que se desliza de forma automática y suave sin saltos ni cortes. Al pasar el mouse (`hover`), la animación se pausa suavemente para permitir la lectura.

---

## 💻 Código TSX Listo para Usar (`components/testimonials-marquee.tsx`)

```tsx
'use client'

import React from 'react'
import { Star } from 'lucide-react'

interface Testimonio {
  nombre: string
  rol: string
  texto: string
  avatar: string
  rating?: number
}

// 🎯 DATOS ADAPTABLES AL CLIENTE
const TESTIMONIOS: Testimonio[] = [
  {
    nombre: 'Valeria R.',
    rol: 'Cliente Verificada (Montevideo)',
    texto: 'La calidad es impresionante, tal cual se ve en los videos reales. Llegó en 24hs.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5
  },
  {
    nombre: 'Agustín M.',
    rol: 'Comprador Frecuente (Rivera)',
    texto: 'Excelente atención por WhatsApp, me asesoraron con el talle exacto en cm.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5
  },
  {
    nombre: 'Camila S.',
    rol: 'Cliente (Maldonado)',
    texto: 'Hermosa presentación y terminaciones. Muy recomendable.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5
  }
]

export function TestimonialsMarquee({ items = TESTIMONIOS }: { items?: Testimonio[] }) {
  // Duplicamos el array para lograr el loop infinito sin cortes
  const doubleItems = [...items, ...items]

  return (
    <section className="py-20 bg-neutral-950 overflow-hidden relative">
      {/* Gradientes laterales para difuminado suave */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

      <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
        {doubleItems.map((item, idx) => (
          <div
            key={idx}
            className="w-[340px] p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900"
          >
            <div>
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                "{item.texto}"
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.nombre}
                className="w-10 h-10 rounded-full object-cover border border-neutral-700"
              />
              <div>
                <h4 className="text-white text-sm font-semibold">{item.nombre}</h4>
                <p className="text-neutral-500 text-xs">{item.rol}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

## 🎨 Keyframes CSS para Tailwind (`tailwind.config.js` o `globals.css`)

```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 35s linear infinite;
}
```
"""
sync_write('02_BIBLIOTECA_CODIGO_INTERACTIVO/Testimonios_Marquee_Infinito.md', marquee_code)

# =========================================================================
# 3. SHOWCASE THE DROP + VIDEO AUTOPLAY + TOUCH SNAP
# =========================================================================
the_drop_code = """---
title: "Componente: Showcase Editorial 'THE DROP' con Video Autoplay & Touch Snap"
type: "reusable-component"
stack: "Next.js / React + Tailwind CSS"
adaptation: "Para calzado, joyas de lujo, autos nuevos o colecciones destacadas"
---

# 👟 Showcase 'THE DROP' + Video Frame + Touch Snap

> **Qué hace:** Estructura asimétrica estilo revista de 3 tarjetas grandes con video autoplay en bucle silencioso, carrusel táctil `snap-x` en celulares y botón interactivo `(+)` para agregar directo al pedido.

---

## 💻 Código TSX (`components/the-drop-showcase.tsx`)

```tsx
'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, ChevronLeft, ChevronRight, Check } from 'lucide-react'

export interface DropItem {
  id: string
  slug: string
  titulo: string
  subtitulo: string
  tag: string
  tipo: 'imagen' | 'video'
  mediaSrc: string
  precio?: string
}

export function TheDropShowcase({ drops }: { drops: DropItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 360
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className="py-16 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Cabecera Editorial */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Nuevos Ingresos</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">THE DROP</h2>
          </div>

          {/* Controles de navegación */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grilla / Carrusel Snap en Móviles */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
        >
          {drops.map((item) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[85vw] sm:w-[calc(33.333%-16px)] group relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 flex flex-col aspect-[3/4] transition-all duration-500 hover:border-neutral-700"
            >
              {/* Media: Video o Imagen */}
              <div className="relative w-full h-full">
                {item.tipo === 'video' ? (
                  <video
                    src={item.mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.mediaSrc}
                    alt={item.titulo}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 85vw, 33vw"
                  />
                )}
                
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              </div>

              {/* Tag y Contenido */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-950/80 text-neutral-200 border border-neutral-800 backdrop-blur-md">
                  {item.tag}
                </span>
              </div>

              {/* Información y Acción */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight mb-1">{item.titulo}</h3>
                  <p className="text-neutral-400 text-xs font-mono">{item.subtitulo}</p>
                </div>

                <Link
                  href={`/producto/${item.slug}`}
                  className="p-3 rounded-full bg-white text-neutral-950 hover:bg-emerald-400 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```
"""
sync_write('02_BIBLIOTECA_CODIGO_INTERACTIVO/The_Drop_Carousel_Snap.md', the_drop_code)

# =========================================================================
# 4. TARJETAS SPOTLIGHT 21ST.DEV (MOUSE GLOW EFFECT)
# =========================================================================
spotlight_code = """---
title: "Componente: Spotlight Card Hover Reveal (Efecto 21st.dev / Aceternity)"
type: "reusable-component"
stack: "Next.js / React + Tailwind CSS"
adaptation: "Para tarjetas de características, servicios de estética, fichas de autos"
---

# 🔦 Spotlight Card Hover Reveal (Efecto 21st.dev)

> **Qué hace:** Crea un resplandor radial dinámico que sigue el cursor del ratón sobre los bordes y el fondo de las tarjetas, dando una sensación hiper-premium.

---

## 💻 Código TSX (`components/spotlight-card.tsx`)

```tsx
'use client'

import React, { useRef, useState } from 'react'

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.08)'
}: {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 overflow-hidden transition-all duration-300 hover:border-neutral-700 ${className}`}
    >
      {/* Capa de Resplandor Radial */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
```
"""
sync_write('02_BIBLIOTECA_CODIGO_INTERACTIVO/Spotlight_Card_Hover_Reveal.md', spotlight_code)

# =========================================================================
# 5. DRAWER DE WHATSAPP DINÁMICO & CHECKOUT MULTI-PRODUCTO
# =========================================================================
whatsapp_drawer_code = """---
title: "Componente: Drawer Reactivo de Pedidos con Checkout Directo a WhatsApp"
type: "reusable-component"
stack: "Next.js / React + Context API"
adaptation: "Para cualquier tienda o catálogo con cierre en WhatsApp"
---

# 🛒 Drawer de Pedidos & Checkout Dinámico a WhatsApp

> **Qué hace:** Carrito lateral tipo *slide-over* que acumula los productos seleccionados con talle/variante y genera un único mensaje codificado para WhatsApp listo para enviar.

---

## 💻 Código TSX (`components/order-drawer.tsx`)

```tsx
'use client'

import React from 'react'
import { X, Trash2, Send } from 'lucide-react'

export interface OrderItem {
  id: string
  nombre: string
  talle: string
  precio?: string
  imagen: string
}

export function OrderDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  whatsappPhone = '59891234567'
}: {
  isOpen: boolean
  onClose: () => void
  items: OrderItem[]
  onRemove: (id: string) => void
  whatsappPhone?: string
}) {
  if (!isOpen) return null

  const generateWhatsAppLink = () => {
    if (items.length === 0) return '#'

    let text = `Hola! Quiero coordinar el pedido de estos modelos:\\n\\n`
    items.forEach((it, i) => {
      text += `${i + 1}. *${it.nombre}* (Talle/Variante: ${it.talle})\\n`
    })
    text += `\\n📦 *Total de artículos:* ${items.length}`
    text += `\\n📍 *Ciudad de envío:* `
    text += `\\n\\n¿Me confirmas disponibilidad y formas de pago?`

    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-neutral-950/80 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 p-6 flex flex-col justify-between h-full shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <h3 className="text-lg font-bold text-white">Tu Lista de Consulta ({items.length})</h3>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 text-neutral-500 text-sm">
              No tienes modelos agregados a tu lista.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div className="flex items-center gap-3">
                  <img src={item.imagen} alt={item.nombre} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h4 className="text-white text-sm font-semibold">{item.nombre}</h4>
                    <span className="text-xs text-neutral-400 font-mono">Talle: {item.talle}</span>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-neutral-500 hover:text-red-400 p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & CTA */}
        <div className="pt-4 border-t border-neutral-800">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${
              items.length > 0
                ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-lg shadow-emerald-500/20'
                : 'bg-neutral-800 text-neutral-500 pointer-events-none'
            }`}
          >
            <Send className="w-4 h-4" />
            Enviar Lista a WhatsApp
          </a>
        </div>

      </div>
    </div>
  )
}
```
"""
sync_write('02_BIBLIOTECA_CODIGO_INTERACTIVO/WhatsApp_Dynamic_Checkout_Drawer.md', whatsapp_drawer_code)

# =========================================================================
# 6. ACTUALIZAR index.md Y log.md
# =========================================================================
index_path = VAULT_DIR / 'index.md'
if index_path.exists():
    with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
        idx_text = f.read()
    
    if '02_BIBLIOTECA_CODIGO_INTERACTIVO' not in idx_text:
        idx_text = idx_text.replace(
            '## 🛠️ 5. Entidades y Tecnologías',
            '## 📦 5. BIBLIOTECA DE CÓDIGO INTERACTIVO REUTILIZABLE (UI Lab)\n'
            '- [[02_BIBLIOTECA_CODIGO_INTERACTIVO/00_GUIA_ADAPTACION_COMPONENTES|Guía: Cómo Adaptar y Agregar Códigos de 21st.dev]]\n'
            '- [[02_BIBLIOTECA_CODIGO_INTERACTIVO/Testimonios_Marquee_Infinito|Testimonios Infinitos en Movimiento (Marquee Continuo)]]\n'
            '- [[02_BIBLIOTECA_CODIGO_INTERACTIVO/The_Drop_Carousel_Snap|Showcase THE DROP + Video Autoplay + Touch Snap]]\n'
            '- [[02_BIBLIOTECA_CODIGO_INTERACTIVO/Spotlight_Card_Hover_Reveal|Tarjetas Spotlight con Resplandor (Efecto 21st.dev)]]\n'
            '- [[02_BIBLIOTECA_CODIGO_INTERACTIVO/WhatsApp_Dynamic_Checkout_Drawer|Drawer de Pedidos & Checkout a WhatsApp]]\n\n'
            '## 🛠️ 5. Entidades y Tecnologías'
        )
        sync_write('index.md', idx_text)

print("¡Biblioteca Central de Código Reutilizable creada y conectada con éxito!")
