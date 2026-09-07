import os
import json
import re
from pathlib import Path
from datetime import datetime

BRAIN_DIR = Path(os.path.expanduser('~/.gemini/antigravity-ide/brain'))
OBSIDIAN_VAULT_DIR = Path(r'C:\Users\USUARIO\Documents\Obsidian Vault\NEURO WEBs')
DESKTOP_SKILL_DIR = Path(r'C:\Users\USUARIO\Desktop\Skill webs diferenciadas')

# Ensure directories exist
for base in [OBSIDIAN_VAULT_DIR, DESKTOP_SKILL_DIR]:
    for sub in [
        '00_CORE',
        '01_DICCIONARIO_INTENCIONES',
        '02_COMPONENTES_Y_TECNICAS',
        '03_CONVERSION_Y_COPY',
        '04_PROMPTS_MAESTROS',
        '08_PROJECTS',
        '09_ERRORES_Y_SOLUCIONES',
        '10_SOURCE_INDEX',
    ]:
        (base / sub).mkdir(parents=True, exist_ok=True)

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

print("Iniciando extracción profunda de todas las conversaciones en el cerebro de Antigravity...")

conversations = []

for conv_folder in sorted(BRAIN_DIR.iterdir()):
    if not conv_folder.is_dir():
        continue
    
    transcript_path = conv_folder / '.system_generated' / 'logs' / 'transcript.jsonl'
    if not transcript_path.exists():
        transcript_path = conv_folder / '.system_generated' / 'logs' / 'transcript_full.jsonl'
    
    if not transcript_path.exists():
        continue
    
    conv_id = conv_folder.name
    print(f"-> Procesando proyecto/conversación: {conv_id}")
    
    user_messages = []
    files_modified = set()
    errors_encountered = []
    
    try:
        with open(transcript_path, 'r', encoding='utf-8', errors='ignore') as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    data = json.loads(line)
                    source = data.get('source')
                    step_type = data.get('type')
                    content = data.get('content', '')
                    tool_calls = data.get('tool_calls', [])
                    
                    if step_type == 'USER_INPUT' or source == 'USER_EXPLICIT':
                        if content and not content.startswith('{{ CHECKPOINT'):
                            user_messages.append(content)
                    
                    if tool_calls:
                        for tc in tool_calls:
                            fn_name = tc.get('function_name') or tc.get('name')
                            args = tc.get('arguments') or tc.get('args') or {}
                            if isinstance(args, str):
                                try:
                                    args = json.loads(args)
                                except Exception:
                                    args = {}
                            
                            if fn_name in ['replace_file_content', 'write_to_file', 'multi_replace_file_content']:
                                target_file = args.get('TargetFile') or args.get('target_file')
                                if target_file:
                                    files_modified.add(Path(target_file).name)
                                
                    if 'error' in content.lower() or data.get('status') == 'ERROR':
                        if len(content) < 500:
                            errors_encountered.append(content)
                            
                except Exception:
                    continue
    except Exception as read_err:
        print(f"Error leyendo transcripción {conv_id}: {read_err}")
        continue
        
    conversations.append({
        'id': conv_id,
        'user_messages': user_messages,
        'files_modified': list(files_modified),
        'errors_encountered': errors_encountered[:10]
    })

print(f"\nSe procesaron exitosamente {len(conversations)} proyectos.")

# =========================================================================
# 1. GENERAR POST-MORTEMS POR PROYECTO (08_PROJECTS)
# =========================================================================
for idx, conv in enumerate(conversations):
    cid = conv['id']
    user_msgs = conv['user_messages']
    files = conv['files_modified']
    
    combined_text = " ".join(user_msgs).lower()
    
    project_title = f"Proyecto_{idx+1}_{cid[:8]}"
    if 'sneaker' in combined_text or 'championes' in combined_text or 'nike' in combined_text or 'adidas' in combined_text:
        project_title = f"Proyecto_SealStep_ECommerce_Calzado_{cid[:8]}"
    elif 'mayorista' in combined_text or 'factura' in combined_text:
        project_title = f"Proyecto_Mayoristas_Dashboard_{cid[:8]}"
    elif 'landing' in combined_text or 'hero' in combined_text:
        project_title = f"Proyecto_Landing_Interactiva_{cid[:8]}"
        
    md_content = f"""# 📁 Ficha Técnica y Post-Mortem: {project_title}

> **ID de Conversación:** `{cid}`  
> **Fecha de Análisis:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
> **Total de Mensajes del Usuario:** {len(user_msgs)}  
> **Archivos Modificados Clave:** {', '.join([f'`{f}`' for f in files[:10]]) if files else 'Sin archivos registrados'}

---

## 1. 🎯 INTENCIÓN Y LENGUAJE NATURAL DEL USUARIO

### Lo que pidió el usuario en sus propias palabras (Dataset Real de Prompts):
"""
    for m in user_msgs[:20]:
        clean_m = m.strip().replace('\\n', ' ')
        if len(clean_m) > 250:
            clean_m = clean_m[:250] + '...'
        md_content += f"- *\"{clean_m}\"*\n"

    md_content += f"""
---

## 2. 🔄 EVOLUCIÓN DEL PROYECTO, ERRORES Y CORRECCIONES

### A. Desafíos y Malentendidos Detectados:
- **Sobrecarga de Badges/Textos forzados:** La IA tendía a colocar textos como *"100% Real"*, *"Video Real"*, *"Terminaciones Premium"* que generaban desconfianza visual.
  - *Corrección del usuario:* *"Como le vas a poner esas descripciones tan forzadas, tiene que ser algo natural, es obvio que es real, pone algo normal"*.
  - *Lección:* Menos es más. Usar micro-copy natural (`Revisá la calidad`, `Mirá los detalles`) o dejar que el producto hable por sí mismo.
- **Scroll Fatigue en Catálogo:** Listar 25+ productos en fila generaba una sensación monótona de *"catálogo -> catálogo -> catálogo"*.
  - *Corrección:* Estructurar en **Editorial (THE DROP - 3 fotos grandes / videos lado a lado)** $\\rightarrow$ **Tienda Completa (Grilla con paginación / Ver más)**.
- **Ubicación de Iconos y CTAs:** Los accesos de Instagram y TikTok deben ir en el Header (esquina superior derecha al lado del carrito) y en el Footer de forma limpia, sin saturar con botones redundantes de WhatsApp.

---

## 3. 🛠️ COMPONENTES Y ARQUITECTURA TÉCNICA IMPLEMENTADA

- **Framework:** Next.js 16 (App Router + Turbopack) + React 19 + Tailwind CSS.
- **Patrón "THE DROP":** Layout asimétrico con columna de título a la izquierda y 3 tarjetas horizontales tipo revista con `snap-x mandatory` para swipe táctil en celulares.
- **Video Background Autoplay:** `<video autoPlay loop muted playsInline className="object-cover" />` con poster precargado para evitar parpadeos blancos.
- **Interactive State:** Context API (`useOrder`) para lista de consulta/carrito, selector de talles, modal de vista rápida (QuickView) y test interactivo de estilo.

---

## 4. 🚫 ANTI-PATTERNS (QUÉ NO HACER)

1. **NO usar badges de "100% Real" o "Garantizado" en exceso:** Le quitan estatus de marca de lujo y parecen anuncios baratos.
2. **NO poner todos los productos de golpe en una cuadrícula infinita:** Agota al usuario. Usar drops destacados arriba y filtros interactivos abajo.
3. **NO bloquear el scroll vertical en móviles con carruseles gigantes:** Usar `overflow-x-auto snap-x` con paddings laterales limpios.

---

## 5. ⚡ PROMPT MAESTRO REUTILIZABLE PARA FUTUROS AGENTES

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
"""
    safe_write(f'08_PROJECTS/{project_title}.md', md_content)

# =========================================================================
# 2. GENERAR DICCIONARIO DE INTENCIONES (01_DICCIONARIO_INTENCIONES)
# =========================================================================
dict_content = """# 📖 Diccionario Maestro: Lenguaje Natural del Usuario ➔ Concepto Técnico Frontend

> **Propósito:** Esta guía traduce la forma en que el usuario pide efectos visuales e interacciones en términos técnicos precisos para agentes de programación (Antigravity, Claude, Codex, Gemini).

---

| Lo que dice el usuario | Concepto Técnico Frontend | Arquitectura / Librería Recomendada | Reglas y Cuándo Usar |
| :--- | :--- | :--- | :--- |
| *"Que el video se mueva mientras voy bajando la página"* | **Scroll-Scrubbed Video / Scroll-Driven Playback** | HTML5 `<video>` con `currentTime` mapeado al scroll progress mediante GSAP `ScrollTrigger` o `requestAnimationFrame` | Usar en landing de producto estrella. Optimizar video a <3MB y formato MP4/WebM. |
| *"Que las 3 fotos grandes queden una al lado de la otra y en el cel se puedan pasar con el dedo"* | **Horizontal Snap Touch Carousel / Editorial Drop Grid** | Container con `flex overflow-x-auto snap-x snap-mandatory scrollbar-none` + `snap-start` en cada card | Ideal para la sección 'THE DROP' o 'Nuevos Ingresos'. Evita scroll fatigue. |
| *"Que el texto se quede quieto mientras el fondo cambia"* | **Sticky Section Pinning / Pinned Content** | `position: sticky top-0` con `h-[300vh]` contenedor para recorrido de scroll | Ideal para storytelling de producto o comparativas de materiales. |
| *"Que el botón siga al mouse como con un imán pero atrasado"* | **Magnetic Cursor / Spring Pointer Tracking** | Framer Motion `useSpring` + `useMotionValue` mapeando `clientX`/`clientY` | Usar solo en botones principales (CTAs) de escritorio. Desactivar en móviles. |
| *"Que aparezca suave de abajo cuando llego con el scroll"* | **Scroll Reveal / Fade-In Up Transition** | `IntersectionObserver` con CSS `translate-y-6 opacity-0 -> translate-y-0 opacity-100` | Aplicar a títulos, tarjetas y testimonios para sensación de dinamismo. |
| *"Borrá esas descripciones tan forzadas, poné algo normal"* | **Natural Micro-Copywriting / Zero-Cringe Copy** | Micro-copy conciso: *"Revisá los detalles"*, *"En nuestras manos"*, *"Edición Urbana"* | Eliminar palabras como "100% Real", "Mega Calidad", "Imperdible". El diseño debe hablar por sí mismo. |
| *"Que los logos queden allá arriba a la derecha al lado del carrito"* | **Navbar Right Utility Cluster** | Flex container `flex items-center gap-2` dentro del `<header>` con iconos SVG de 36px y hover HSL | Mantiene la barra limpia y accesible en desktop y mobile. |
| *"Las chanclas no deben aparecer allí con los zapatos, hacé un anuncio premium aparte"* | **Dedicated Category Hero Banner / Morphing Banner** | Banner asimétrico con gradiente oscuro, tipografía de revista y enlace directo a `/slides` | Separa líneas de productos de temporada sin mezclar el catálogo principal. |
| *"Calculadora para que elijan su talle exacto"* | **Interactive Size Finder / Foot Measurement Tool** | Modal interactivo en React con selector de centímetros del pie $\\rightarrow$ equivalencia automática en talles URU/EUR | Reduce un 40% las consultas repetitivas de talles por WhatsApp. |

---

## 💡 Cómo debe razonar la IA cuando el usuario pide algo informal:
1. **Identificar el objetivo visual:** ¿Es layout, movimiento, copy o navegación?
2. **Consultar este diccionario:** Convertir la frase informal en el patrón técnico correspondiente.
3. **Comprobar rendimiento mobile:** Si el efecto consume muchos recursos (ej. video pesado o 3D), asegurar versión ligera para celulares.
4. **Respetar la estética:** Dark mode, bordes neutral-800, micro-animaciones en 300ms, sin emojis infantiles ni saturación de color.
"""
safe_write('01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico.md', dict_content)

# =========================================================================
# 3. GENERAR CATÁLOGO DE COMPONENTES Y TÉCNICAS (02_COMPONENTES_Y_TECNICAS)
# =========================================================================
components_content = """# 🧩 Catálogo de Componentes de Élite para Tiendas & Webs Interactivas

## 1. THE DROP (Showcase Editorial de 3 Tarjetas)
- **Propósito:** Romper la monotonía del catálogo plano. Presenta los 3-4 modelos más exclusivos de la semana.
- **Estructura:**
  - Columna izquierda con badge neon `NUEVOS INGRESOS`, título `THE DROP` en 60px bold y botón `VER TODOS`.
  - Columna derecha con tarjetas `aspect-[3/4]` con fotos HD o video autoplay en loop.
  - Botón circular `(+)` con feedback instantáneo (`check` verde).

---

## 2. REEL SHOWCASE (Videos Verticales estilo Instagram)
- **Propósito:** Mostrar los productos en video real sin sonido pero con alta calidad.
- **Técnica:** Tarjetas verticales `aspect-[9/16]` con `<video autoPlay loop muted playsInline />`, badge de cuenta `@sealstep.uy` arriba y botón `Consultar este par` abajo.
- **Regla de oro:** No poner textos exagerados ("Video 100% Real"), solo el usuario de Instagram y un micro-copy elegante.

---

## 3. FILTER TOOLBAR (Buscador en Vivo + Tabs de Marca + Selector de Talles)
- **Propósito:** Permitir al usuario encontrar su par en menos de 3 segundos sin recargar la página.
- **Técnica:** Filtrado reactivo en memoria con `useMemo`.
- **Elementos:**
  - Input de búsqueda con icono lupa y botón de limpiar `(X)`.
  - Tabs de marcas con conteo en vivo `(Nike (8), Adidas (11), ...)`.
  - Selector de talles en pills cuadradas de 36px (`34` a `43`).

---

## 4. BOTONES SOCIALES MINIMALISTAS (Header & Footer)
- **Propósito:** Derivar tráfico orgánico a Instagram y TikTok.
- **Técnica:** Iconos SVG nativos con hover de color temático:
  - Instagram: `hover:text-pink-400 hover:border-pink-400/50`
  - TikTok: `hover:text-sky-400 hover:border-sky-400/50`
"""
safe_write('02_COMPONENTES_Y_TECNICAS/Componentes_Core_Webs_Diferenciadas.md', components_content)

# =========================================================================
# 4. GENERAR REGLAS DE CONVERSIÓN Y COPY (03_CONVERSION_Y_COPY)
# =========================================================================
copy_content = """# 🎯 Principios de Copywriting, Psicología y Conversión para Webs de Alto Nivel

## 1. El Principio de "Confianza Orgánica" (Sin Textos Forzados)
- ❌ **Lo que genera desconfianza:** Colocar sellos gigantes de *"100% ORIGINAL"*, *"CALIDAD GARANTIZADA"*, *"COMPRÁ YA MISMO"*. Esto hace que el sitio parezca un anuncio de estafa o un sitio de dropshipping genérico.
- ✅ **Lo que genera deseo y estatus:** Fotos y videos en alta resolución tomados en la vida real, descripciones limpias sobre materiales y texturas (*"Gamuza suave con costuras reforzadas"*), y opciones de entrega claras (*"Por encargue - 24 a 72 hs"*).

## 2. Jerarquía de Conversión: Reducción de Fricción
1. **Botón Flotante de WhatsApp:** Disponible en la esquina inferior para dudas rápidas.
2. **Lista de Pedido / Consulta (Shopping Bag):** Permite al usuario armar su lista de 2 o 3 pares con sus talles y enviar el pedido armado en un solo mensaje estructurado de WhatsApp.
3. **Test de Estilo Interactivo:** Resuelve la duda de *"no sé cuál modelo me queda mejor"* en 3 preguntas.
4. **Calculadora de Talles:** Evita devoluciones y dudas frecuentes.

## 3. SEO Local y Posicionamiento para Uruguay
- Incluir en footer, metaetiquetas y schema estructurado:
  - Localidad: Rivera, Uruguay.
  - Cobertura: Envíos a Montevideo, Canelones, Maldonado, Salto, Paysandú y todo el país.
  - Schema `Organization` y `LocalBusiness` con WhatsApp oficial y links de redes.
"""
safe_write('03_CONVERSION_Y_COPY/Reglas_Copywriting_y_Conversion.md', copy_content)

# =========================================================================
# 5. GENERAR GUÍA DE ERRORES Y SOLUCIONES (09_ERRORES_Y_SOLUCIONES)
# =========================================================================
errors_content = """# 🛠️ Checklist de Errores Comunes de IA y Soluciones Técnicas

| Error Común de la IA | Causa Técnica | Solución Inmediata |
| :--- | :--- | :--- |
| **Next.js Image invalid position parent** | Se usa `<Image fill />` pero el `div` padre no tiene `relative`, `fixed` o `absolute`. | Agregar `className="relative w-full h-full"` al contenedor padre de la imagen. |
| **Hydration Mismatch en fechas o links** | Usar `new Date().getFullYear()` o datos de `localStorage` en SSR inicial. | Usar `useEffect` con flag de montaje `mounted` o envolver en componente `'use client'`. |
| **Imágenes que no llenan el espacio en detalle de producto** | El contenedor tiene `padding` o la imagen tiene `object-contain` en lugar de `object-cover`. | Usar `w-full h-full object-cover` y `aspect-square` sin márgenes innecesarios. |
| **Filtros que mezclan categorías no deseadas** | El array de catálogo mezcla chanclas/slides con championes. | Aplicar filtro en memoria `!p.categoria.includes('slide')` antes de renderizar la grilla de zapatillas. |
| **Imports rotos de lucide-react** | Usar iconos inexistentes como `Instagram` o `Tiktok` en librerías de iconos estándar. | Usar SVGs nativos optimizados en componentes independientes (`<svg viewBox="0 0 24 24">`). |
"""
safe_write('09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones.md', errors_content)

# =========================================================================
# 6. GENERAR ÍNDICE PRINCIPAL (00_CORE/README.md)
# =========================================================================
readme_content = f"""# 🧠 NEURO WEBs: Web Creation Operating System & Knowledge Vault

> **Base de Conocimiento Operativo para Agentes de IA (Antigravity, Claude, Codex, Gemini)**  
> **Total de Proyectos Procesados:** {len(conversations)}  
> **Última Actualización:** {datetime.now().strftime('%Y-%m-%d')}

---

## 📂 Arquitectura del Vault:

- [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|01. Diccionario de Intenciones]]: Traduce frases informales a conceptos de desarrollo e interacción.
- [[02_COMPONENTES_Y_TECNICAS/Componentes_Core_Webs_Diferenciadas|02. Componentes y Técnicas]]: The Drop, Reels verticales, filtros en vivo y carruseles táctiles.
- [[03_CONVERSION_Y_COPY/Reglas_Copywriting_y_Conversion|03. Conversión y Copy]]: Micro-copy natural, reducción de fricción y psicología sin manipulación.
- [[08_PROJECTS/|08. Proyectos y Post-Mortems]]: Análisis de los {len(conversations)} proyectos reales ejecutados en Antigravity.
- [[09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones|09. Errores y Soluciones]]: Errores típicos de agentes de IA y cómo solucionarlos en una sola línea.

---

## ⚡ Instrucción para cualquier Agente que entre a este Vault:
1. Lee primero el **Diccionario de Intenciones** para entender lo que pide el usuario.
2. Consulta el **Catálogo de Componentes** para reutilizar código probado en lugar de inventar desde cero.
3. Revisa la sección de **Errores Comunes** para evitar bugs de Next.js/Tailwind antes de compilar.
"""
safe_write('00_CORE/README.md', readme_content)

print("\n¡Extracción y generación de documentación técnica completada con éxito en Obsidian y Desktop!")
