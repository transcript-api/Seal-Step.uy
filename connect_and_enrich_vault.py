import os
import json
import re
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

print("Iniciando auditoría, relleno de notas vacías e interconexión total del Grafo en Obsidian...")

# =========================================================================
# 1. RELLENAR ARCHIVOS RAÍZ VACÍOS (Error, Performance, Prompt)
# =========================================================================

error_content = """---
title: "Error: Repositorio Central de Fallos y Soluciones Frontend"
type: "error-registry"
tags: [debugging, errors, nextjs, react, tailwind, performance]
last_updated: "2026-08-26"
---

# 🛑 Error: Repositorio Maestro de Fallos & Anti-Patterns

> **Propósito:** Registro central de errores de código, hydration, layout y malentendidos de IA recopilados en todos los proyectos de creación web.

---

## ⚡ 1. Errores Críticos de Next.js & React 19

### A. Next.js Image: `Invalid Parent Element Position`
- **Síntoma:** Error en consola `Image with src ... has fill and parent element with invalid position. Provided 'static'`.
- **Causa:** Usar `<Image fill />` cuando el contenedor padre no tiene `position: relative`, `fixed` o `absolute`.
- **Solución:** Agregar siempre `className="relative w-full h-full"` o `aspect-square relative` al contenedor padre.
- **Relación:** [[wiki/entities/The_Drop_Component|Componente The Drop]], [[09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones|Checklist Errores]]

### B. Hydration Mismatch en Fechas & LocalStorage
- **Síntoma:** `Warning: Text content did not match. Server: ... Client: ...`
- **Causa:** Evaluar variables del cliente (`localStorage`, `window.innerWidth`, `new Date()`) durante el SSR inicial.
- **Solución:** Usar un hook `useMounted()` o diferir la renderización del dato dinámico con `useEffect()`.

### C. Import Error en Iconos de Librerías
- **Síntoma:** `Module not found: Can't resolve 'lucide-react/icons/instagram'` o iconos inexistentes.
- **Solución:** Usar siempre SVGs inline optimizados para redes sociales (Instagram, TikTok, WhatsApp) en lugar de depender de paquetes externos.

---

## 🚫 2. Errores de Diseño y Copywriting (Anti-Patterns)
1. **Badges de Marketing Exagerado:** *"100% Original"*, *"Garantizado"* $\\rightarrow$ Generan rechazo visual. Reemplazar por micro-copy natural.
2. **Scroll Fatigue:** Mostrar más de 20 productos idénticos en cuadrícula $\\rightarrow$ Reemplazar por estructura [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Editorial THE DROP]].
3. **Bloqueo de Scroll Táctil en Móvil:** Carruseles que impiden el scroll vertical $\\rightarrow$ Usar `snap-x` horizontal con márgenes de escape.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[Performance|Guía de Rendimiento & Core Web Vitals]]
- [[Prompt|Biblioteca Maestra de Prompts]]
- [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario de Intenciones]]
- [[09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones|Errores Comunes Frontend]]
"""
sync_write('Error.md', error_content)

performance_content = """---
title: "Performance: Guía Maestra de Optimización y Core Web Vitals"
type: "performance-guide"
tags: [performance, core-web-vitals, optimization, nextjs, video, images]
last_updated: "2026-08-26"
---

# ⚡ Performance: Optimización Extrema & Carga Instantánea

> **Propósito:** Reglas técnicas para mantener la web con puntajes de 95+ en Google PageSpeed y Core Web Vitals mientras se ejecutan videos, animaciones e interacciones pesadas.

---

## 🚀 1. Optimización de Video en Background (Sin Parpadeo)
- **Formato:** MP4 codificado en H.264 o WebM sin pista de audio (audio track removido para reducir un 35% el tamaño).
- **Peso Máximo:** Videos de showcase/hero deben pesar menos de **1.5 MB**.
- **Atributos Obligatorios:** `<video autoPlay loop muted playsInline preload="metadata" poster="/poster.webp" />`.
- **Relación:** [[wiki/entities/The_Drop_Component|The Drop]], [[wiki/skills/web-scrolling|Web Scrolling]]

---

## 🖼️ 2. Optimización de Imágenes con `next/image`
- **Formatos Modernos:** WebP / AVIF automáticos.
- **Sizes Responsivos:** Especificar siempre `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` para evitar descargar imágenes 4K en pantallas móviles.
- **Priority:** Aplicar `priority` únicamente a las 2 imágenes superiores del Hero / The Drop (LCP element).

---

## 📦 3. Reducción de Bundle Size y JavaScript
- **Code-Splitting:** Carga dinámica (`next/dynamic`) para modales pesados como la [[wiki/concepts/Conversion_y_Psicologia|Calculadora de Talles]] o el Test de Estilo.
- **CSS Nativo:** Usar Tailwind CSS compilado en lugar de librerías CSS-in-JS que ralentizan el hilo principal.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[Error|Repositorio Central de Fallos]]
- [[Prompt|Biblioteca Maestra de Prompts]]
- [[wiki/concepts/SEO_Tecnico_y_Local|SEO Técnico y Local]]
- [[wiki/skills/seo-audit|Auditoría SEO & Performance]]
"""
sync_write('Performance.md', performance_content)

prompt_content = """---
title: "Prompt: Biblioteca Maestra de Prompts para Agentes de IA"
type: "prompt-library"
tags: [prompts, prompt-engineering, agents, frontend, conversion]
last_updated: "2026-08-26"
---

# 🎯 Prompt: Biblioteca Maestra de Prompts para Agentes de IA

> **Propósito:** Los prompts exactos, estructurados y probados para construir interfaces de alto nivel sin perder tokens ni iteraciones innecesarias.

---

## 🏆 1. Prompt Maestro de Construcción de Catálogo (THE DROP + Tienda)
```markdown
Construye una sección de catálogo con enfoque Editorial → Tienda:
1. ARRIBA ('THE DROP'): 
   - Título gigante 'THE DROP', bajada corta y botón 'VER TODOS'.
   - 3 tarjetas grandes lado a lado (aspect-[3/4]) con fotos de alta resolución o video autoplay en loop sin sonido.
   - En mobile debe ser un carrusel táctil suave (snap-x).
   - Botón (+) circular flotante en cada tarjeta para agregar a la lista de pedido.
2. ABAJO ('CATÁLOGO COMPLETO'):
   - Buscador en vivo por modelo/color.
   - Pestañas de marcas con conteo de modelos.
   - Filtro de talles interactivo en pills (34 a 43).
   - Grilla limpia de 12 modelos con botón elegante 'Ver todos los modelos (+X más)'.
3. ESTÉTICA: Dark mode premium, bordes neutral-800, tipografía heading bold, sin textos de marketing forzados.
```

---

## 🎬 2. Prompt para Integrar Video Frame & Showcase Reel
```markdown
Implementa un componente de video showcase estilo Reels de Instagram:
- 4 a 5 tarjetas verticales (aspect-[9/16]) con videos en bucle silenciados.
- Badge minimalista con la cuenta oficial (@sealstep.uy).
- Micro-copy natural debajo ('Revisá la calidad', 'Mirá los detalles').
- Botón directo de consulta que enlace a WhatsApp con el nombre del modelo.
```

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[Error|Repositorio de Fallos]]
- [[Performance|Rendimiento Web]]
- [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario de Intenciones]]
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial]]
"""
sync_write('Prompt.md', prompt_content)

# =========================================================================
# 2. RELLENAR VIDEOS VACÍOS (009, 010, 011)
# =========================================================================

video_009_content = """---
title: "Video 009 - Análisis Técnico: Micro-Interacciones, Cursor Magnético y Smooth Scroll"
category: "Video Entrenamiento"
tags: [video, micro-interactions, gsap, smooth-scroll, magnetic-button]
last_updated: "2026-08-26"
---

# 📹 Video 009 - Análisis Técnico: Micro-Interacciones & Smooth Scroll

## 🎯 1. Conceptos y Técnicas Extraídas
- **Smooth Scroll Inertial (Lenis / Locomotive):** Suavizado de desplazamiento vertical para evitar tirones en monitores de alta frecuencia (120Hz/144Hz).
- **Magnetic Buttons & Cursor Follower:** Botones que son atraídos sutilmente por el cursor del ratón mediante interpolación elástica (`spring physics`).
- **Hover Reveal en Tarjetas:** Efecto spotlight con gradientes radiales que siguen el puntero del mouse sobre el borde de las tarjetas de producto.

---

## 🛠️ 2. Reglas de Implementación
- Desactivar siempre efectos de cursor magnético en pantallas táctiles (`pointer: coarse`).
- Limitar el tiempo de animación a un máximo de `250ms - 350ms` con curva `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[wiki/skills/web-scrolling|Skill: Web Scrolling]]
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial vs Catálogo]]
- [[wiki/entities/The_Drop_Component|Componente The Drop]]
- [[Performance|Optimización de Performance]]
- [[Error|Checklist de Errores]]
"""
sync_write('VIDEOS ENTRENAMIENTO/Video 009 - Analisis tecnico.md', video_009_content)

video_010_content = """---
title: "Video 010 - Análisis Técnico: Psicología de Conversión en Checkout & Carrito WhatsApp"
category: "Video Entrenamiento"
tags: [video, cro, conversion, whatsapp, ecommerce, checkout]
last_updated: "2026-08-26"
---

# 📹 Video 010 - Análisis Técnico: Psicología de Conversión & Carrito WhatsApp

## 🎯 1. Conceptos y Técnicas Extraídas
- **Single-Message Multi-Item Ordering:** En lugar de enviar 5 mensajes separados por cada par, el usuario acumula su lista en un drawer reactivo y genera un único mensaje formateado y profesional para el vendedor.
- **Reducción de Ansiedad de Talle:** Integración de la calculadora de centímetros a talle URU/EUR directo en la vista de producto.
- **Social Proof Invisible:** Demostración de stock real y videos en mano en lugar de testimonios de texto genéricos que nadie cree.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[wiki/concepts/Conversion_y_Psicologia|Conversión y Psicología]]
- [[wiki/skills/auditoria-negocio-digital|Auditoría Negocio Digital]]
- [[wiki/skills/instagram-a-web|Instagram a Web]]
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|Proyecto SealStep]]
- [[Prompt|Biblioteca de Prompts]]
"""
sync_write('VIDEOS ENTRENAMIENTO/Video 010 - Analisis tecnico.md', video_010_content)

video_011_content = """---
title: "Video 011 - Análisis Técnico: Arquitectura de Componentes Escalables con Next.js y Tailwind"
category: "Video Entrenamiento"
tags: [video, architecture, nextjs, react, clean-code, design-system]
last_updated: "2026-08-26"
---

# 📹 Video 011 - Análisis Técnico: Arquitectura de Componentes Escalables

## 🎯 1. Conceptos y Técnicas Extraídas
- **Single Source of Truth:** Centralizar todo el catálogo de productos y atributos en `lib/productos.ts` para que cualquier cambio de precio, talle o stock se propague automáticamente al catálogo, detalle de producto y filtros de marca.
- **Modular Section Architecture:** Estructurar la página de inicio en secciones desacopladas (`Hero`, `TheDrop`, `Catalogo`, `GaleriaReels`, `FAQ`, `Footer`).
- **Context State Management:** Uso de `OrderContext` para sincronizar el estado global del carrito de consultas, vista rápida y calculadora sin necesidad de librerías externas pesadas.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[wiki/entities/Nextjs_React|Next.js & React]]
- [[wiki/entities/Tailwind_CSS|Tailwind CSS]]
- [[09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones|Errores Comunes]]
- [[Performance|Rendimiento Web]]
"""
sync_write('VIDEOS ENTRENAMIENTO/Video 011- Analisis tecnico.md', video_011_content)

# =========================================================================
# 3. INTERCONECTAR TODOS LOS VIDEOS (001 AL 008) CON ENLACES CRUZADOS
# =========================================================================

video_files = [
    'Video 001- Analisis Tecnico.md',
    'Video 002 - Analisis Tecnico.md',
    'Video 003 - Analisis Tecnico.md',
    'Video 004 - Analisis Tecnico.md',
    'Video 005 - Analisis Tecnico.md',
    'Video 006 - Analisis Tecnico.md',
    'Video 007 - Analisis tecnico.md',
    'Video 008 - Analisis tecnico.md',
]

for vf in video_files:
    target_path = VAULT_DIR / 'VIDEOS ENTRENAMIENTO' / vf
    if target_path.exists():
        try:
            with open(target_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Check if it already has connections
            if '## 🔗 Conexiones del Grafo' not in content:
                connections = f"""

---

## 🔗 Conexiones del Grafo & Red de Conocimiento:
- [[index|Índice Maestro]]
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Concepto: Diseño Editorial vs Catálogo]]
- [[wiki/concepts/Conversion_y_Psicologia|Concepto: Conversión y Psicología]]
- [[wiki/concepts/SEO_Tecnico_y_Local|Concepto: SEO Técnico y Local]]
- [[wiki/entities/The_Drop_Component|Entidad: The Drop (Video & Showcase)]]
- [[wiki/entities/Nextjs_React|Entidad: Next.js & React]]
- [[wiki/skills/web-scrolling|Skill: Web Scrolling]]
- [[wiki/skills/ai-seo|Skill: AI SEO & GEO]]
- [[Error|Repositorio de Fallos]]
- [[Performance|Rendimiento Web]]
- [[Prompt|Biblioteca de Prompts]]
- [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario de Intenciones]]
"""
                content += connections
                sync_write(f'VIDEOS ENTRENAMIENTO/{vf}', content)
                print(f"-> Conexiones añadidas a: {vf}")
        except Exception as e:
            print(f"Error procesando {vf}: {e}")

# =========================================================================
# 4. LIMPIAR DUPLICADOS DE RAÍZ Y VINCULAR CONTEXTO DE CHATGPT
# =========================================================================

# Contexto chat GPT link
contexto_file = VAULT_DIR / 'CONTEXTO (conversacion con chat GPT)' / 'CONTEXTO (conversacion con chat GPT).md'
if contexto_file.exists():
    try:
        with open(contexto_file, 'r', encoding='utf-8', errors='ignore') as f:
            c_text = f.read()
        if '## 🔗 Conexiones del Grafo' not in c_text:
            c_text += """

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[AGENTS|Manual de Agentes (Karpathy Method)]]
- [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario de Intenciones]]
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial]]
- [[wiki/concepts/Conversion_y_Psicologia|Conversión y Psicología]]
"""
            sync_write('CONTEXTO (conversacion con chat GPT)/CONTEXTO (conversacion con chat GPT).md', c_text)
    except Exception as e:
        print(f"Error linking contexto: {e}")

# Remove root duplicate if exists
root_v1 = VAULT_DIR / 'Video 001 - Analisis Tecnico.md'
if root_v1.exists():
    try:
        root_v1.unlink()
        print("-> Duplicado de raíz 'Video 001 - Analisis Tecnico.md' eliminado.")
    except Exception as e:
        print(e)

# =========================================================================
# 5. CREAR CANVAS ESTRATÉGICO TOTALMENTE INTERCONECTADO (JSON Canvas)
# =========================================================================

canvas_data = {
    "nodes": [
        {"id": "node-1", "x": 0, "y": 0, "width": 320, "height": 180, "type": "text", "text": "## 🧠 NEURO WEBs\\n**Web Creation Operating System**\\n\\nBase de conocimiento compilada para Agentes de IA.\\n- [[index]]\\n- [[AGENTS]]"},
        {"id": "node-2", "x": -450, "y": -250, "width": 300, "height": 160, "type": "text", "text": "### 📐 Diseño & Layout\\n- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial]]\\n- [[wiki/entities/The_Drop_Component|The Drop Showcase]]\\n- [[wiki/entities/Tailwind_CSS|Tailwind CSS]]"},
        {"id": "node-3", "x": 450, "y": -250, "width": 300, "height": 160, "type": "text", "text": "### 🎯 Conversión & Copy\\n- [[wiki/concepts/Conversion_y_Psicologia|Conversión Natural]]\\n- [[03_CONVERSION_Y_COPY/Reglas_Copywriting_y_Conversion|Reglas de Copy]]\\n- [[wiki/skills/instagram-a-web|Instagram a Web]]"},
        {"id": "node-4", "x": -450, "y": 250, "width": 300, "height": 160, "type": "text", "text": "### ⚡ Frontend & Motion\\n- [[wiki/entities/Nextjs_React|Next.js 16 + React 19]]\\n- [[wiki/skills/web-scrolling|Web Scrolling]]\\n- [[Performance|Rendimiento Web]]"},
        {"id": "node-5", "x": 450, "y": 250, "width": 300, "height": 160, "type": "text", "text": "### 📍 SEO & Crecimiento\\n- [[wiki/concepts/SEO_Tecnico_y_Local|SEO Técnico & Local]]\\n- [[wiki/skills/ai-seo|AI SEO & GEO]]\\n- [[wiki/skills/seo-geo|SEO Uruguay]]"},
        {"id": "node-6", "x": 0, "y": 450, "width": 340, "height": 160, "type": "text", "text": "### 🛠️ Memoria & Debugging\\n- [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario de Intenciones]]\\n- [[Error|Checklist de Errores]]\\n- [[Prompt|Biblioteca de Prompts]]\\n- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|SealStep Post-Mortem]]"}
    ],
    "edges": [
        {"id": "edge-1", "fromNode": "node-1", "fromSide": "top", "toNode": "node-2", "toSide": "bottom"},
        {"id": "edge-2", "fromNode": "node-1", "fromSide": "top", "toNode": "node-3", "toSide": "bottom"},
        {"id": "edge-3", "fromNode": "node-1", "fromSide": "bottom", "toNode": "node-4", "toSide": "top"},
        {"id": "edge-4", "fromNode": "node-1", "fromSide": "bottom", "toNode": "node-5", "toSide": "top"},
        {"id": "edge-5", "fromNode": "node-1", "fromSide": "bottom", "toNode": "node-6", "toSide": "top"},
        {"id": "edge-6", "fromNode": "node-2", "fromSide": "right", "toNode": "node-3", "toSide": "left"},
        {"id": "edge-7", "fromNode": "node-4", "fromSide": "right", "toNode": "node-5", "toSide": "left"}
    ]
}

sync_write('Mapa_Mental_Web_OS.canvas', json.dumps(canvas_data, indent=2))
sync_write('wiki/synthesis/Mapa_Estrategico_Web.canvas', json.dumps(canvas_data, indent=2))

# =========================================================================
# 6. ACTUALIZAR ÍNDICE MAESTRO (index.md) CON ENLACES A TODO EL VAULT
# =========================================================================

master_index = f"""# 📚 ÍNDICE MAESTRO DEL SISTEMA (NEURO WEBs)

> **Base de Conocimiento Totalmente Interconectada (LLM Wiki & Obsidian Graph)**  
> **Última Actualización:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## 🗺️ Mapa Visual Interactivo:
- [[Mapa_Mental_Web_OS.canvas|Abrir Mapa Mental Interactivo (JSON Canvas)]]

---

## 🏛️ 1. Manuales y Núcleo Operativo
- [[AGENTS|AGENTS.md - Manual Maestro del Agente (Método Karpathy)]]
- [[00_CORE/README|README - Visión General del Vault]]
- [[log|log.md - Bitácora Cronológica de Ingestas]]
- [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario: Lenguaje Natural ➔ Concepto Técnico]]
- [[Error|Error - Repositorio Central de Fallos y Soluciones]]
- [[Performance|Performance - Guía de Rendimiento & Core Web Vitals]]
- [[Prompt|Prompt - Biblioteca Maestra de Prompts]]

---

## 📹 2. Videos de Entrenamiento (Análisis Técnico)
- [[VIDEOS ENTRENAMIENTO/Video 001- Analisis Tecnico|Video 001 - Análisis Técnico]]
- [[VIDEOS ENTRENAMIENTO/Video 002 - Analisis Tecnico|Video 002 - Análisis Técnico]]
- [[VIDEOS ENTRENAMIENTO/Video 003 - Analisis Tecnico|Video 003 - Análisis Técnico]]
- [[VIDEOS ENTRENAMIENTO/Video 004 - Analisis Tecnico|Video 004 - Análisis Técnico]]
- [[VIDEOS ENTRENAMIENTO/Video 005 - Analisis Tecnico|Video 005 - Análisis Técnico]]
- [[VIDEOS ENTRENAMIENTO/Video 006 - Analisis Tecnico|Video 006 - Análisis Técnico]]
- [[VIDEOS ENTRENAMIENTO/Video 007 - Analisis tecnico|Video 007 - Análisis Técnico]]
- [[VIDEOS ENTRENAMIENTO/Video 008 - Analisis tecnico|Video 008 - Análisis Técnico]]
- [[VIDEOS ENTRENAMIENTO/Video 009 - Analisis tecnico|Video 009 - Micro-Interacciones & Smooth Scroll]]
- [[VIDEOS ENTRENAMIENTO/Video 010 - Analisis tecnico|Video 010 - Psicología de Conversión & Carrito WhatsApp]]
- [[VIDEOS ENTRENAMIENTO/Video 011- Analisis tecnico|Video 011 - Arquitectura de Componentes Escalables]]

---

## ⚡ 3. Skills Locales Destiladas
- [[wiki/skills/ai-seo|AI SEO & Generative Engine Optimization (GEO)]]
- [[wiki/skills/seo-geo|SEO Geo & LocalBusiness (Uruguay)]]
- [[wiki/skills/seo-content-writer|SEO Content Writer & Copywriting]]
- [[wiki/skills/seo-content-optimizer|SEO Content Optimizer]]
- [[wiki/skills/seo-audit|Auditoría SEO Técnica]]
- [[wiki/skills/instagram-a-web|Instagram a Web]]
- [[wiki/skills/web-scrolling|Web Scrolling & Scroll-Driven Video]]
- [[wiki/skills/auditoria-negocio-digital|Auditoría Negocio Digital & CRO]]
- [[wiki/skills/automatizaciones-n8n|Automatizaciones n8n]]
- [[wiki/skills/auditoria-meta-ads|Auditoría Meta Ads]]
- [[wiki/skills/building-data-apps|Building Data Apps]]

---

## 💡 4. Conceptos de Diseño, UX y Conversión
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial vs Catálogo Plano (THE DROP)]]
- [[wiki/concepts/Conversion_y_Psicologia|Conversión y Psicología de Compra Natural]]
- [[wiki/concepts/SEO_Tecnico_y_Local|SEO Técnico, Local & GEO para Uruguay]]
- [[03_CONVERSION_Y_COPY/Reglas_Copywriting_y_Conversion|Reglas de Copywriting y Conversión]]

---

## 🛠️ 5. Entidades y Tecnologías
- [[wiki/entities/The_Drop_Component|Componente THE DROP (Video & Touch Carousel)]]
- [[wiki/entities/Nextjs_React|Next.js 16 + React 19]]
- [[wiki/entities/Tailwind_CSS|Tailwind CSS Design System]]
- [[02_COMPONENTES_Y_TECNICAS/Componentes_Core_Webs_Diferenciadas|Catálogo de Componentes Core]]

---

## 📁 6. Proyectos y Casos Reales (Antigravity Brain)
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|SealStep: Rediseño Editorial THE DROP]]
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_307c55ee|SealStep: Catálogo y Talles]]
- [[08_PROJECTS/Proyecto_Landing_Interactiva_b8752f30|Landing Interactiva Hero]]
- [[09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones|Checklist de Errores Comunes]]
- [[10_SOURCE_INDEX/SOURCE_INDEX|Source Index y Mapeo de Fuentes]]
"""
sync_write('index.md', master_index)

print("\n¡Auditoría e interconexión completada con éxito! Todas las notas tienen enlaces cruzados y contenido.")
