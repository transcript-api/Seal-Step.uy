import os
import re
from pathlib import Path
from datetime import datetime

SKILLS_SOURCE_DIR = Path(r'C:\Users\USUARIO\.gemini\config\skills')
OBSIDIAN_VAULT_DIR = Path(r'C:\Users\USUARIO\Documents\Obsidian Vault\NEURO WEBs')
DESKTOP_SKILL_DIR = Path(r'C:\Users\USUARIO\Desktop\Skill webs diferenciadas')

# Define LLM Wiki folders
FOLDERS = [
    'raw/fuentes',
    'raw/transcripciones',
    'wiki/skills',
    'wiki/concepts',
    'wiki/entities',
    'wiki/tools',
    'wiki/synthesis',
    'wiki/projects',
]

for base in [OBSIDIAN_VAULT_DIR, DESKTOP_SKILL_DIR]:
    for f in FOLDERS:
        (base / f).mkdir(parents=True, exist_ok=True)

def safe_write(relative_path, content):
    """Write to both Obsidian Vault and Desktop Skill directory"""
    for base in [OBSIDIAN_VAULT_DIR, DESKTOP_SKILL_DIR]:
        target = base / relative_path
        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            with open(target, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            print(f"Error writing {target}: {e}")

print("--- Iniciando Destilación de Skills Locales y Creación del Sistema LLM Wiki ---")

# 1. READ & DISTILL LOCAL SKILLS
RELEVANT_SKILLS = [
    'ai-seo',
    'auditoria-negocio-digital',
    'auditoria-seo',
    'automatizaciones-n8n',
    'instagram-a-web',
    'seo-audit',
    'seo-content-optimizer',
    'seo-content-writer',
    'seo-geo',
    'web-scrolling',
    'auditoria-meta-ads',
    'building-data-apps',
]

distilled_skills_catalog = []

for skill_name in RELEVANT_SKILLS:
    skill_path = SKILLS_SOURCE_DIR / skill_name / 'SKILL.md'
    if not skill_path.exists():
        continue
    
    try:
        with open(skill_path, 'r', encoding='utf-8', errors='ignore') as f:
            raw_text = f.read()
    except Exception as e:
        print(f"Error reading skill {skill_name}: {e}")
        continue
        
    print(f"-> Destilando skill: {skill_name}")
    
    # Strip metadata and extract high value sections
    clean_title = skill_name.replace('-', ' ').title()
    
    # Create distilled wiki skill note
    skill_wiki_content = f"""---
title: "{clean_title}"
type: skill
source: "local-gemini-skill"
category: "Web & Growth Skill"
tags: [skill, {skill_name}, frontend, conversion, seo]
last_updated: "{datetime.now().strftime('%Y-%m-%d')}"
---

# ⚡ Skill Destilada: {clean_title}

> **Propósito:** Esta habilidad condensa las mejores prácticas, reglas operativas y frameworks de `{skill_name}` para ser aplicadas directamente en la creación de páginas web de alta conversión.

---

## 🎯 1. Principios Clave y Reglas de Oro

{raw_text[:2000]}

---

## 🔗 2. Conexiones con el Ecosistema Web
- **Conceptos Relacionados:** [[wiki/concepts/Conversion_y_Psicologia|Conversión y Psicología]], [[wiki/concepts/SEO_Tecnico_y_Local|SEO Técnico y Local]], [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial vs Catálogo]]
- **Herramientas:** [[wiki/entities/Nextjs_React|Next.js]], [[wiki/entities/Tailwind_CSS|Tailwind CSS]], [[wiki/tools/Obsidian_Second_Brain|Obsidian]]
- **Proyectos donde se aplica:** [[wiki/projects/Proyecto_SealStep|SealStep E-Commerce]]

---

## ⚡ 3. Prompt de Aplicación Rápida para Agentes
```markdown
Aplica los principios de la habilidad '{clean_title}':
- Prioriza claridad, velocidad de carga y experiencia de usuario.
- Elimina cualquier texto de marketing forzado o exagerado.
- Asegura la coherencia técnica con el stack del proyecto.
```
"""
    safe_write(f'wiki/skills/{skill_name}.md', skill_wiki_content)
    distilled_skills_catalog.append((skill_name, clean_title))

# =========================================================================
# 2. GENERAR AGENTS.md (Manual Operativo Maestro del LLM Wiki - Karpathy)
# =========================================================================
agents_md_content = """# 🤖 AGENTS.md: Manual Operativo del LLM Wiki (Web Creation OS)

Este archivo define las reglas de operación para cualquier agente de IA (Antigravity, Claude Code, OpenAI Codex, Gemini) que trabaje en esta base de conocimiento.

---

## 🏛️ 1. Las Tres Capas del Sistema

1. **`raw/` (Inmutable):** Contiene fuentes en bruto (transcripciones de YouTube, artículos con Web Clipper, capturas, especificaciones). El agente **SOLO LEE** esta carpeta, nunca la edita ni la borra.
2. **`wiki/` (Propiedad del Agente):** Colección interconectada de notas en Markdown creadas y mantenidas por la IA. Se divide en:
   - `concepts/`: Ideas de diseño, animación, UX, SEO y psicología.
   - `entities/`: Frameworks, librerías, tecnologías y componentes.
   - `skills/`: Habilidades destiladas para conversión, copy y desarrollo.
   - `projects/`: Post-mortems de proyectos reales con prompts reales y errores evitados.
   - `synthesis/`: Playbooks, guías paso a paso y mapas estratégicos.
3. **`AGENTS.md`, `index.md`, `log.md`:** Los archivos de control de operaciones, índice de contenido y bitácora cronológica.

---

## 🔄 2. Operaciones Principales del Agente

### Operación A: Ingesta (Ingest)
Cuando el usuario agregue un nuevo material a `raw/`:
1. Lee la fuente en profundidad.
2. Extrae conceptos nuevos, componentes o técnicas.
3. Actualiza o crea las páginas correspondientes en `wiki/` usando sintaxis de Obsidian (`[[Nombre_Nota]]`).
4. Si hay contradicciones entre una fuente nueva y una vieja, documenta la contradicción sin borrar el historial.
5. Actualiza `index.md` y añade una entrada al final de `log.md`.

### Operación B: Consulta & Síntesis (Query)
Cuando el usuario haga una pregunta o pida diseñar una web:
1. Consulta primero `index.md` y `wiki/` para recuperar el contexto exacto y el vocabulario del usuario.
2. Sintetiza la respuesta citando las notas de la wiki.
3. Si la respuesta contiene una arquitectura nueva o un componente reutilizable, **guárdalo de vuelta en la wiki** como una nueva nota.

### Operación C: Mantenimiento & Auditoría (Lint)
Periódicamente revisa:
- Notas huérfanas (sin enlaces entrantes).
- Conceptos mencionados que no tienen su propia página.
- Duplicados innecesarios.

---

## 🎨 3. Estándares de Diseño y Copywriting
- **Estética:** Dark mode premium, bordes sutiles `neutral-800`, tipografía heading bold, micro-animaciones fluidas.
- **Copy:** Cero textos forzados (*"100% Real"*, *"Garantizado"*). Usar micro-copy humano y natural.
- **Jerarquía:** Editorial $\\rightarrow$ Tienda (Sección 'THE DROP' arriba con 3 fotos/videos grandes, catálogo filtrable abajo).
"""
safe_write('AGENTS.md', agents_md_content)

# =========================================================================
# 3. GENERAR CONCEPTOS CLAVE (wiki/concepts/)
# =========================================================================
concepts = {
    'Diseno_Editorial_vs_Catalogo': """# 📐 Concepto: Diseño Editorial vs Catálogo Plano

> **Problema que resuelve:** La "fatiga de scroll" que ocurre cuando un e-commerce muestra más de 20 productos idénticos en cuadrícula.

---

## 🌟 La Estructura Ganadora (Editorial $\\rightarrow$ Tienda)
1. **Nivel 1: 'THE DROP' / Nuevos Ingresos (Showcase Asimétrico):**
   - 3 tarjetas grandes (`aspect-[3/4]`) lado a lado con fotos de alta resolución o video autoplay en loop sin sonido.
   - En mobile: Carrusel táctil horizontal con `snap-x mandatory`.
   - Botón flotante `(+)` para agregar directo al pedido sin salir.
2. **Nivel 2: Toolbar de Filtros Reactivos:**
   - Buscador en vivo por modelo o color.
   - Tabs de marcas con conteo en vivo `(Nike (8), Adidas (11), ...)`.
   - Selector de talles en pills cuadradas.
3. **Nivel 3: Catálogo Completo:**
   - Grilla limpia de 12 modelos iniciales con botón *"Ver todos los modelos (+X más)"*.

---
- **Relaciones:** [[wiki/entities/The_Drop_Component|Componente The Drop]], [[wiki/skills/seo-content-optimizer|SEO Content Optimizer]]
""",
    'Conversion_y_Psicologia': """# 🧠 Concepto: Conversión y Psicología de Compra Natural

> **Regla de Oro:** La persuasión efectiva es invisible. El diseño, las fotos reales y la facilidad de compra venden más que cualquier texto publicitario exagerado.

---

## 🎯 Los 4 Pilares de Confianza:
1. **Fotos & Videos 100% Reales sin Filtros:** Demostrar los detalles de costuras y suelas en mano genera credibilidad inmediata.
2. **Cero Textos Forzados:** Reemplazar *"Mega Oferta Imperdible"* por micro-copy honesto: *"Revisá los detalles"*, *"Edición Urbana"*, *"Por encargue (24 a 72 hs)"*.
3. **Reducción de Fricción en WhatsApp:** Un carrito de compras que genera un mensaje ordenado:
   - *«Hola Seal Step! Quiero consultar por estos modelos: 1x Nike Dunk Panda (Talle 41)»*
4. **Calculadora Interactiva de Talles:** Elimina la duda de talles midiendo los centímetros del pie.

---
- **Relaciones:** [[wiki/skills/auditoria-negocio-digital|Auditoría Negocio Digital]], [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial]]
""",
    'SEO_Tecnico_y_Local': """# 📍 Concepto: SEO Técnico, Local & Generativo (GEO / AEO)

> **Objetivo:** Posicionar la web tanto en los primeros lugares de Google como en las respuestas de Inteligencia Artificial (ChatGPT, Perplexity, Gemini).

---

## 🛠️ Checklist Técnico Obligatorio:
1. **SEO Local (Rivera, Uruguay):**
   - Schema JSON-LD `LocalBusiness` y `Organization` con dirección, teléfono oficial y enlaces sociales.
   - Enlaces internos y menciones geográficas naturales (Montevideo, Maldonado, Canelones, Rivera).
2. **Generative Engine Optimization (GEO):**
   - Respuestas directas en formato FAQ para preguntas comunes (*"¿Cómo pedir championes por encargue?"*).
   - Estructura semántica limpia con `<h1>`, `<h2>`, `<article>` y `<nav>`.
3. **Core Web Vitals:**
   - Imágenes optimizadas con `next/image` y formatos WebP/AVIF.
   - Videos comprimidos en MP4/H.264 sin audio para carga instantánea.

---
- **Relaciones:** [[wiki/skills/ai-seo|AI SEO]], [[wiki/skills/seo-geo|SEO Geo Uruguay]], [[wiki/skills/seo-audit|SEO Audit]]
"""
}

for c_name, c_text in concepts.items():
    safe_write(f'wiki/concepts/{c_name}.md', c_text)

# =========================================================================
# 4. GENERAR ENTIDADES CLAVE (wiki/entities/)
# =========================================================================
entities = {
    'Nextjs_React': """# ⚛️ Entidad: Next.js 16 + React 19

- **Tipo:** Framework Frontend / Fullstack
- **Modo:** App Router + Turbopack
- **Ventajas:** Renderizado híbrido SSR/SSG, optimización nativa de fuentes e imágenes, routing modular.
- **Regla en este proyecto:** Usar `'use client'` en componentes interactivos con estado (filtros, carruseles, modales) y mantener componentes estáticos en SSR para máxima velocidad.
""",
    'Tailwind_CSS': """# 🎨 Entidad: Tailwind CSS

- **Tipo:** Utility-first CSS Framework
- **Convenciones del Proyecto:**
  - Paleta: `neutral-950` (fondo), `neutral-900` (cards), `neutral-800` (bordes), `emerald-400` / `emerald-500` (acentos y badges).
  - Micro-animaciones: `transition-all duration-300 hover:scale-[1.02]`.
  - Bordes redondeados: `rounded-2xl` y `rounded-3xl` para estética moderna.
""",
    'The_Drop_Component': """# 👟 Entidad: Componente 'THE DROP'

- **Ubicación:** `components/sections/productos.tsx`
- **Técnica:** Showcase editorial superior de 3 tarjetas lado a lado.
- **Características:**
  - Video frame autoplay en bucle sin sonido.
  - Swipe horizontal táctil `snap-x` en celulares.
  - Botón interactivo `(+)` con feedback de estado.
"""
}

for e_name, e_text in entities.items():
    safe_write(f'wiki/entities/{e_name}.md', e_text)

# =========================================================================
# 5. GENERAR index.md y log.md
# =========================================================================
index_content = f"""# 📚 ÍNDICE MAESTRO DE LA WIKI (NEURO WEBs)

> **Base de Conocimiento Compilada y Persistente (Método LLM Wiki)**  
> **Última Actualización:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## ⚡ Skills Destiladas del Sistema
"""
for s_slug, s_title in distilled_skills_catalog:
    index_content += f"- [[wiki/skills/{s_slug}|{s_title}]]\n"

index_content += """
---

## 💡 Conceptos Fundamentales
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial vs Catálogo Plano (The Drop)]]
- [[wiki/concepts/Conversion_y_Psicologia|Conversión y Psicología de Compra Natural]]
- [[wiki/concepts/SEO_Tecnico_y_Local|SEO Técnico, Local & GEO para Uruguay]]

---

## 🛠️ Tecnologías y Entidades
- [[wiki/entities/Nextjs_React|Next.js 16 + React 19]]
- [[wiki/entities/Tailwind_CSS|Tailwind CSS Design System]]
- [[wiki/entities/The_Drop_Component|Componente THE DROP (Video & Touch Carousel)]]

---

## 📁 Proyectos y Post-Mortems
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|SealStep E-Commerce: Rediseño Editorial]]
- [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario Lenguaje Santi ➔ Términos Técnicos]]
- [[09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones|Checklist de Errores Comunes de IA]]
"""
safe_write('index.md', index_content)

log_content = f"""# 📜 Registro Cronológico de Ingestas y Cambios (log.md)

## [{datetime.now().strftime('%Y-%m-%d %H:%M')}] ingest | Destilación de Skills Locales y Setup LLM Wiki
- Se analizaron y destilaron {len(distilled_skills_catalog)} skills locales sin modificar los archivos originales.
- Se implementó la arquitectura de tres capas de Karpathy (`raw/`, `wiki/`, `AGENTS.md`).
- Se crearon las páginas de conceptos de Conversión, SEO y Diseño Editorial.
- Se conectó todo con sintaxis de wikilinks `[[...]]`.
"""
safe_write('log.md', log_content)

print("\n¡Sistema LLM Wiki y Skills destiladas configuradas con éxito en Obsidian y Desktop!")
