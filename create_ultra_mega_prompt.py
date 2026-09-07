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

print("Creando el ULTRA MEGA PROMPT DE CREACIÓN Y TRANSFORMACIÓN WEB DE ÉLITE...")

mega_prompt_content = f"""---
title: "⚡ ULTRA MEGA PROMPT: Motor de Creación & Transformación Web de Élite (Zero-to-Hero)"
type: "master-system-prompt"
version: "4.0.0"
category: "Autonomous Web Creation Swarm"
tags: [master-prompt, ultra-prompt, zero-to-hero, niche-adaptive, 21st-dev, cro, nextjs]
last_updated: "{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
---

# ⚡ ULTRA MEGA PROMPT: Generador de Webs de Élite en 1 Solo Pase

> **Para qué sirve:** Es el prompt definitivo para transformar una web básica/cutre o crear una página desde cero que **asombre al primer segundo**. Adapta automáticamente la estética, el copy, los componentes interactivos y el flujo de WhatsApp según el **nicho exacto** del cliente, sin ignorar ninguna de las herramientas de la base de conocimiento de Obsidian.

---

## 📋 INSTRUCCIONES DE USO PARA SANTI:
1. Copia el bloque de prompt que está abajo.
2. Rellena los datos básicos en la sección `[DATOS DEL CLIENTE]` (nombre, nicho, fotos/servicios, ciudad y WhatsApp).
3. Pégaselo a cualquier agente (Claude Code, OpenAI Codex, Antigravity, Cursor).
4. El agente ejecutará el protocolo completo de 6 fases y entregará una web de nivel mundial.

---

```markdown
# 🚀 ORDEN MAESTRA DE CREACIÓN WEB DE ÉLITE (PROTOCOLO NEURO WEBs)

Actúa como un equipo de desarrollo y diseño web de clase mundial (Estratega de Conversión + Creative Frontend Designer + Auditor de Calidad). Tu misión es construir o transformar esta web para que supere 1000x las expectativas del cliente desde el primer segundo.

---

## 🎯 1. DATOS DEL CLIENTE & PROYECTO:
- **Nombre de la Marca:** [EJ: Nidala Joyas / Clínica Estética Belleza Primordial / Concesionaria San Jorge / Tu Negocio]
- **Nicho del Negocio:** [EJ: Joyería de Lujo / Calzado Urbano / Concesionaria de Autos / Estética / Gastronomía]
- **Catálogo / Servicios Principales:** [EJ: Lista de modelos, servicios, tratamientos o productos con precios aproximados]
- **Ciudad y Cobertura:** [EJ: Rivera, Montevideo, Envíos a todo Uruguay]
- **Número de WhatsApp de Ventas:** [EJ: +598 9X XXX XXX]
- **Material Disponible:** [EJ: Fotos en carpeta public/ o URL de web actual a transformar]

---

## 🧠 2. FASE DE DETECCIÓN Y ADAPTACIÓN POR NICHO (ARQUETIPO VISUAL):
Identifica el nicho y aplica automáticamente su sistema de diseño:

1. 💎 **Joyería & Moda de Alta Gama (Lujo Oscuro):**
   - Paleta: `neutral-950` + acentos dorados `amber-400` / `yellow-200` + bordes ultra sutiles `neutral-800`.
   - Tipografía: Heading Serif elegante display + Sans-serif legible para catálogo.
   - Enfoque: Macro-fotografía, colecciones de autor, showcase de brillo y consulta VIP a WhatsApp.

2. 👟 **Calzado Urbano & Sneakers (Streetwear Premium):**
   - Paleta: `neutral-950` + acentos vibrantes `emerald-400` / `lime-400` / `white`.
   - Estructura: Sección **THE DROP** arriba (3 tarjetas grandes con video autoplay) + Catálogo filtrable por talles (34-43).
   - Enfoque: Autenticidad, videos tomados con el móvil, calculadora de talles y carrito de pedido estructurado.

3. 🚗 **Concesionarias & Vehículos (High-Tech Authority):**
   - Paleta: `slate-950` + `blue-500` / `emerald-400` + tarjetas con efecto [[02_BIBLIOTECA_CODIGO_INTERACTIVO/Spotlight_Card_Hover_Reveal|Spotlight]].
   - Estructura: Ficha técnica completa (año, km, motor, combustible), calculadora interactiva de cuotas y cotizador de permuta.

4. 🌸 **Clínicas Estéticas, Spa & Salud (Clean Luxury):**
   - Paleta: `stone-950` / `zinc-900` + acentos rose-gold `rose-400` / `teal-400`.
   - Estructura: Showcase de tratamientos, comparativas interactivas antes/después, testimonios con estrellas y agenda directa a WhatsApp.

5. 🍔 **Gastronomía & Restaurantes (Visual Appetite):**
   - Paleta: `neutral-950` + acentos cálidos `orange-500` / `amber-500`.
   - Estructura: Menú visual con fotos de alta resolución, selector de variantes/adicionales y pedido a domicilio por WhatsApp.

---

## 🏛️ 3. ARQUITECTURA DE PÁGINA OBLIGATORIA (EDITORIAL → TIENDA):

Construye la página principal con las siguientes secciones ordenadas:

1. **Header Flotante Minimalista:**
   - Logo de la marca, selector de categorías, botón de redes sociales (Instagram/TikTok con SVGs inline) y carrito/drawer reactivo. (NO poner botón gigante de WhatsApp en el header para no saturar).
2. **Hero / Entrada de Impacto Inmediato:**
   - Título tipográfico display gigante con propuesta de valor única.
   - Micro-copy natural (cero textos de marketing barato como "100% Real" o "Garantizado").
   - Botón CTA principal suave con scroll animado.
3. **Sección 'THE DROP' / Colección Destacada:**
   - 3 tarjetas grandes asimétricas (`aspect-[3/4]`) lado a lado con video autoplay en loop sin sonido o fotos de alta definición.
   - En móviles: Carrusel táctil con desplazamiento suave `snap-x mandatory`.
   - Botón interactivo `(+)` circular flotante para agregar directo a la lista de pedido.
4. **Toolbar de Filtros Reactivos en Vivo:**
   - Buscador por texto en tiempo real.
   - Pestañas de categorías/marcas con conteo en vivo `(ej: Anillos (12), Relojes (8))`.
   - Selector interactivo de talles, variantes o rangos de precio.
5. **Catálogo Completo con Páginas Dedicadas:**
   - Grilla limpia de 12 modelos con botón *"Ver todos los modelos (+X más)"*.
   - **MANDATO INQUEBRANTABLE:** Cada tarjeta debe permitir abrir su página dedicada `/producto/[slug]` con galería multi-ángulo (fotos organizadas por carpetas en `public/images/`).
6. **Showcase de Video Reels en Vivo (Instagram Style):**
   - Rejilla de 4 tarjetas verticales `aspect-[9/16]` con videos sin sonido tomados con el móvil para transmitir confianza absoluta.
7. **Testimonios Infinitos en Movimiento ([[02_BIBLIOTECA_CODIGO_INTERACTIVO/Testimonios_Marquee_Infinito|Marquee Continuo]]):**
   - Carrusel continuo sin cortes que se pausa al pasar el cursor (`hover`), con fotos y opiniones reales geolocalizadas.
8. **Motor de WhatsApp Hiper-Personalizado ([[wiki/concepts/Motor_Personalizacion_WhatsApp|WhatsApp Engine]]):**
   - Todo clic de compra/consulta debe generar un mensaje pre-cargado profesional:
     *«Hola [Nombre Marca]! Estoy en la web y quiero consultar por este modelo: [Nombre Producto] (Variante/Talle: [X]). ¿Me confirmas disponibilidad para [Ciudad]?»*
9. **Footer con SEO Local & GEO ([[wiki/concepts/SEO_Tecnico_y_Local|SEO Local]]):**
   - Cobertura de envíos, horarios de atención, Schema `LocalBusiness` y copyright limpio.

---

## 🛠️ 4. BUCLE DE AUTO-SANACIÓN & VERIFICACIÓN TÉCNICA:
Antes de dar la tarea por completada, audita y garantiza:
- [x] Que todas las imágenes con `<Image fill />` tengan un contenedor padre con `position: relative` o `aspect-ratio` definido (cero errores en consola).
- [x] Que los componentes interactivos con estado (`useState`, filtros, drawers) tengan `'use client'` al inicio del archivo.
- [x] Que las animaciones se ejecuten a 60 FPS estables y con soporte táctil suave en móviles.
- [x] Que el servidor compile en limpio con código 200 sin advertencias de hydration mismatch.
```

---

## 🔄 4. Protocolo de Auto-Mejora del Prompt (Evolución Continua)

Este prompt **mejora automáticamente** a medida que creas nuevas webs:
1. **Nuevos componentes aprendidos:** Cada vez que agregues un código nuevo en [[02_BIBLIOTECA_CODIGO_INTERACTIVO/00_GUIA_ADAPTACION_COMPONENTES|Biblioteca de Código]], el prompt lo incorpora a su repertorio.
2. **Nuevos nichos documentados:** Si creas una web para un nicho nuevo (ej. Inmobiliarias o Cursos), añade su arquetipo visual a la Sección 2 de este archivo.
3. **Errores resueltos:** Cualquier nuevo error descubierto en [[Error|Error.md]] se agrega a la lista de auto-sanación para que jamás se vuelva a cometer.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[Prompt|Biblioteca Maestra de Prompts]]
- [[AGENTS|Manual de Agentes (Karpathy Method)]]
- [[00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL|Handover Maestro]]
- [[wiki/skills/webs-diferenciadas|Skill Maestra: Webs Diferenciadas]]
- [[02_BIBLIOTECA_CODIGO_INTERACTIVO/00_GUIA_ADAPTACION_COMPONENTES|Biblioteca de Código Reutilizable]]
- [[wiki/concepts/Estandar_Superar_Expectativas|Estándar de Superar Expectativas 1000x]]
"""

sync_write('04_PROMPTS_MAESTROS/ULTRA_MEGA_PROMPT_CREACION_ELITE.md', mega_prompt_content)

# Update Prompt.md and index.md
prompt_md_path = VAULT_DIR / 'Prompt.md'
if prompt_md_path.exists():
    with open(prompt_md_path, 'r', encoding='utf-8', errors='ignore') as f:
        p_text = f.read()
    if 'ULTRA_MEGA_PROMPT_CREACION_ELITE' not in p_text:
        p_text = p_text.replace(
            '# 🎯 Prompt: Biblioteca Maestra de Prompts para Agentes de IA',
            '# 🎯 Prompt: Biblioteca Maestra de Prompts para Agentes de IA\n\n> ⚡ **ACCESO DIRECTO:** [[04_PROMPTS_MAESTROS/ULTRA_MEGA_PROMPT_CREACION_ELITE|🚀 ABRIR ULTRA MEGA PROMPT DE CREACIÓN WEB (Protocolo 1 Solo Pase)]]\n'
        )
        sync_write('Prompt.md', p_text)

# Update index.md
index_path = VAULT_DIR / 'index.md'
if index_path.exists():
    with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
        idx_text = f.read()
    if '04_PROMPTS_MAESTROS/ULTRA_MEGA_PROMPT_CREACION_ELITE' not in idx_text:
        idx_text = idx_text.replace(
            '## 🏛️ 1. Manuales y Núcleo Operativo',
            '## 🚀 MOTOR DE CREACIÓN RÁPIDA (ULTRA PROMPT)\n- [[04_PROMPTS_MAESTROS/ULTRA_MEGA_PROMPT_CREACION_ELITE|⚡ ULTRA MEGA PROMPT: Creación & Transformación Web de Élite (Zero-to-Hero)]]\n\n## 🏛️ 1. Manuales y Núcleo Operativo'
        )
        sync_write('index.md', idx_text)

print("¡ULTRA MEGA PROMPT creado, estructurado y conectado con éxito en Obsidian y Desktop!")
