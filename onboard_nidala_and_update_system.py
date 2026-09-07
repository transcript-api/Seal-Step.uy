import os
import json
from pathlib import Path
from datetime import datetime

VAULT_DIR = Path(r'C:\Users\USUARIO\Documents\Obsidian Vault\NEURO WEBs')
DESKTOP_DIR = Path(r'C:\Users\USUARIO\Desktop\Skill webs diferenciadas')
BRAIN_DIR = Path(os.path.expanduser('~/.gemini/antigravity-ide/brain'))
NIDALA_ROOT = Path(r'C:\Users\USUARIO\Downloads\NIDALA joyas\nidala')

def sync_write(rel_path, content):
    for base in [VAULT_DIR, DESKTOP_DIR]:
        target = base / rel_path
        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            with open(target, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            print(f"Error escribiendo {target}: {e}")

print("Iniciando: SealStep links reales + NIDALA onboarding + Diccionario + Proceso universal...")

# =========================================================================
# 1. ACTUALIZAR SEALSTEP CON LINKS REALES
# =========================================================================
sealstep_card_path = VAULT_DIR / '08_PROJECTS' / 'Proyecto_SealStep_ECommerce_Calzado_458fbde5.md'
if sealstep_card_path.exists():
    with open(sealstep_card_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    content = content.replace(
        '| **📦 Repositorio GitHub** | `https://github.com/santiago-sealstep/sealstep` | Código fuente versionado |',
        '| **📦 Repositorio GitHub** | `https://github.com/transcript-api/Seal-Step.uy.git` | Código fuente versionado |'
    )
    content = content.replace(
        '| **🌐 URL Local / Producción** | `http://localhost:3000` / `https://sealstep.vercel.app` | Servidor de desarrollo y despliegue |',
        '| **🌐 URL de Vercel (Producción)** | `https://seal-step-uy.vercel.app/` | Desplegado en Vercel |'
    )
    content = content.replace(
        '| **📁 Carpeta Local en Disco** | `C:\\Users\\USUARIO\\Desktop\\App Vercel\\sealstep` | Directorio raíz del código Next.js |',
        '| **📁 Carpeta Local en Disco** | `C:\\Users\\USUARIO\\Desktop\\App Vercel\\sealstep` | Directorio raíz (dev server `npm run dev`) |'
    )
    sync_write('08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5.md', content)
    print("-> SealStep links reales actualizados (GitHub + Vercel)")

# Also update REGISTRO_MAESTRO_PROYECTOS
registro_path = VAULT_DIR / '08_PROJECTS' / 'REGISTRO_MAESTRO_PROYECTOS.md'
if registro_path.exists():
    with open(registro_path, 'r', encoding='utf-8', errors='ignore') as f:
        reg_content = f.read()
    
    reg_content = reg_content.replace(
        '`http://localhost:3000` (Vercel)',
        '`https://seal-step-uy.vercel.app/` (GitHub: `https://github.com/transcript-api/Seal-Step.uy.git`)'
    )
    sync_write('08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS.md', reg_content)
    print("-> REGISTRO_MAESTRO_PROYECTOS.md actualizado con links reales de SealStep")

# =========================================================================
# 2. EXTRAER CHATS DE NIDALA DESDE EL BRAIN
# =========================================================================

nidala_convs = ['b8752f30-22e3-4740-a0bf-498a0efe3eb0']
user_msgs_nidala = []
files_nidala = set()
errors_nidala = []

for conv_id in nidala_convs:
    log_file = BRAIN_DIR / conv_id / '.system_generated' / 'logs' / 'transcript.jsonl'
    if not log_file.exists(): continue
    with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            try:
                data = json.loads(line)
                step_type = data.get('type', '')
                source = data.get('source', '')
                content = data.get('content', '') or ''
                tool_calls = data.get('tool_calls', []) or []
                
                if step_type == 'USER_INPUT' or source == 'USER_EXPLICIT':
                    # Clean metadata
                    import re
                    clean_msg = re.sub(r'<USER_REQUEST>|</USER_REQUEST>|<ADDITIONAL_METADATA>.*', '', content, flags=re.DOTALL).strip()
                    clean_msg = re.sub(r'github_pat_[A-Za-z0-9_]+', '[TOKEN REMOVIDO]', clean_msg)
                    if clean_msg and len(clean_msg) > 5 and not clean_msg.startswith('{{ CHECKPOINT'):
                        user_msgs_nidala.append(clean_msg[:300])
                        
                for tc in tool_calls:
                    args = tc.get('arguments') or tc.get('args') or {}
                    if isinstance(args, str):
                        try: args = json.loads(args)
                        except: args = {}
                    fn = tc.get('function_name') or tc.get('name', '')
                    if fn in ['replace_file_content','write_to_file','multi_replace_file_content']:
                        tf = args.get('TargetFile','')
                        if tf: files_nidala.add(Path(tf).name)
            except: continue

print(f"-> NIDALA: {len(user_msgs_nidala)} mensajes de usuario extraídos, {len(files_nidala)} archivos modificados")

# =========================================================================
# 3. CREAR FICHA DE PROYECTO NIDALA
# =========================================================================

msgs_summary = '\n'.join([f'- *"{m[:200]}"*' for m in user_msgs_nidala[:12] if m.strip()])

nidala_content = f"""---
title: "Proyecto NIDALA: Joyas, Relojes y Accesorios (E-Commerce Premium)"
type: "project-memory-card"
nicho: "Joyería, Relojes y Accesorios de Lujo"
estado: "🟡 En Desarrollo / Desplegado en Vercel (Revisión Pendiente)"
ruta_local: "C:\\\\Users\\\\USUARIO\\\\Downloads\\\\NIDALA joyas\\\\nidala"
url_produccion: "https://nidala-git-project-context-sync-santi-343a.vercel.app/"
github_repo: "https://github.com/transcript-api/nidala.git"
last_updated: "{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
---

# 💍 Ficha Técnica y Memoria: Proyecto NIDALA

> **Propósito:** E-Commerce de joyería, relojes y accesorios de lujo con estética premium oscura. Página iniciada en V0 y continuada en Antigravity.

---

## 📍 Accesos Rápidos del Proyecto (URLs y Rutas)

| Recurso | Enlace / Ruta Directa | Descripción |
| :--- | :--- | :--- |
| **📁 Carpeta Local en Disco** | `C:\\Users\\USUARIO\\Downloads\\NIDALA joyas\\nidala` | Directorio raíz del proyecto |
| **🌐 URL de Vercel (Producción)** | `https://nidala-git-project-context-sync-santi-343a.vercel.app/` | Última versión desplegada |
| **📦 Repositorio GitHub** | `https://github.com/transcript-api/nidala.git` | Código fuente versionado |
| **📸 Carpeta de Fotos de Productos** | `public/` (imágenes de joyas y relojes) | Fotos por colección |
| **💬 WhatsApp del Negocio** | Por configurar en `lib/whatsapp.ts` | Consultas por producto |

---

## 🔧 Stack Tecnológico (Auto-detectado del Proyecto)
- **Framework:** Next.js (App Router)
- **Estilos:** Tailwind CSS + `components.json` (shadcn/ui)
- **Scripts:** Directorio `scripts/` para datos o migraciones
- **Estado:** `.next/` compilado, `node_modules/` instalado, listo para `npm run dev`

---

## 🎨 1. Arquitectura Visual y Decisiones de Diseño

### Estética Premium de Joyería:
- Dark mode con tonos dorados (`amber-400`, `yellow-300`) y negros profundos.
- Fotos de joyas en fondos minimalistas blancos o negros para máximo contraste.
- Tipografía serif display para el nombre de la marca (contraste elegante con sans-serif del catálogo).
- Aplicar estructura [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Editorial THE DROP]]: colecciones destacadas arriba, catálogo filtrable por tipo (anillos, collares, pulseras, relojes) abajo.
- Página dedicada `/producto/[slug]` con galería multi-ángulo para cada joya o reloj.

---

## 💬 2. Resumen de Conversaciones con Agentes de IA

*(Sintetizado y limpio de metadatos para lectura instantánea de futuros agentes):*

1. **Creación inicial del proyecto:**
   - Santi creó la primera versión en V0 con tokens limitados y quiso continuarla en Antigravity.
   - Fue al repositorio de GitHub (`https://github.com/transcript-api/nidala.git`) para revisar si los cambios estaban.

2. **Problema con el ZIP descargado:**
   - *"Cuando descargo el zip y lo abro la carpeta se queda vacía."*
   - El proyecto tenía submodulos de Git que no se descargaban correctamente desde el ZIP. La solución es usar `git clone`.

3. **Despliegue en Vercel:**
   - Vercel asignó la URL: `https://nidala-git-project-context-sync-santi-343a.vercel.app/`
   - Hubo dificultades con la configuración del token de GitHub en V0 al querer hacer push a la rama `project-context-sync`.

4. **Conexión GitHub $\\rightarrow$ Vercel:**
   - Se resolvió autenticando con un token PAT de GitHub para sincronizar el repositorio.
   - La rama `project-context-sync` fue la rama de trabajo principal.

---

## 🎯 3. Puntos Pendientes para Retomar el Proyecto
- [ ] Revisar visualmente la URL de producción: `https://nidala-git-project-context-sync-santi-343a.vercel.app/`
- [ ] Aplicar la estructura **Editorial THE DROP** al catálogo de joyas y relojes.
- [ ] Crear páginas de detalle `/producto/[slug]` con galería multi-ángulo.
- [ ] Configurar el Motor de WhatsApp con mensajes personalizados por colección o pieza.
- [ ] Organizar fotos de joyas en carpetas por colección en `public/`.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS|Radar Maestro de Proyectos]]
- [[00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL|Handover Maestro]]
- [[00_MEMORIA_VIVA_Y_HANDOVER/01_HISTORIAL_CONVERSACIONAL_Y_FEEDBACK|Historial Conversacional y Feedback]]
- [[wiki/skills/webs-diferenciadas|Skill Maestra: Webs Diferenciadas]]
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial vs Catálogo]]
- [[wiki/concepts/Motor_Personalizacion_WhatsApp|Motor de WhatsApp Hiper-Personalizado]]
- [[wiki/concepts/Organizacion_Fotos_y_Pagina_Producto|Organización de Fotos por Carpetas]]
- [[Error|Repositorio Central de Fallos]]
"""
sync_write('08_PROJECTS/Proyecto_NIDALA_Joyas_b8752f30.md', nidala_content)
print("-> Ficha de Proyecto NIDALA creada")

# =========================================================================
# 4. ACTUALIZAR REGISTRO MAESTRO CON NIDALA
# =========================================================================
registro_path = VAULT_DIR / '08_PROJECTS' / 'REGISTRO_MAESTRO_PROYECTOS.md'
if registro_path.exists():
    with open(registro_path, 'r', encoding='utf-8', errors='ignore') as f:
        reg = f.read()
    if 'NIDALA' not in reg:
        reg = reg.replace(
            '| **Concesionaria de Autos**',
            '| **NIDALA** / *Joyas / Accesorios* | E-Commerce Joyería Lujo | 🟡 **En Desarrollo** | `C:\\Users\\USUARIO\\Downloads\\NIDALA joyas\\nidala` | `https://nidala-git-project-context-sync-santi-343a.vercel.app/` | [[08_PROJECTS/Proyecto_NIDALA_Joyas_b8752f30\\|Ficha NIDALA]] |\n| **Concesionaria de Autos**'
        )
        sync_write('08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS.md', reg)
    print("-> NIDALA añadido al Radar Maestro de Proyectos")

# =========================================================================
# 5. ACTUALIZAR DICCIONARIO CON VOCAULARIO NUEVO DE SANTI
# =========================================================================
diccionario_path = VAULT_DIR / '01_DICCIONARIO_INTENCIONES' / 'Diccionario_Lenguaje_Santi_A_Tecnico.md'
if diccionario_path.exists():
    with open(diccionario_path, 'r', encoding='utf-8', errors='ignore') as f:
        d_text = f.read()

new_vocab = """

---

## 🆕 Vocabulario Nuevo (Sesión Obsidian LLM Wiki - Agosto 2026)

| Expresión de Santi | Lo que significa en técnico | Cómo resolverlo |
| :--- | :--- | :--- |
| *"Me estoy confundiendo pensando, ya que la idea está surgiendo ahora"* | Idea emergente: el usuario está construyendo el concepto en tiempo real mientras habla. | No interrumpir. Escuchar, sintetizar y proponer la versión mejorada del concepto sin hacer preguntas innecesarias. |
| *"¿Y si sacrificara el proyecto no lo hagas"* | Semáforo en rojo: Si la implementación cuesta más problemas de los que resuelve, el agente debe detenerla y consultarle. | Evaluar el costo/beneficio antes de ejecutar. Si es riesgoso, explicar por qué y proponer alternativa más simple. |
| *"No quiero que intentes si no te permite"* | Evitar errores de sandbox o permisos sin perder tiempo en intentos fallidos. | Verificar acceso antes de ejecutar. Si no hay permisos, informar inmediatamente con la ruta alternativa. |
| *"Sin importar cuál arnés use"* | Herramienta de IA agnóstica: Claude Code, Codex, Antigravity, Cursor, Windsurf, etc. | El conocimiento y los estándares deben funcionar igual sin importar qué IA ejecute la tarea. |
| *"Se pierda cero contexto"* | Zero-context-loss: El próximo agente debe saber todo lo que sabe el actual al milímetro. | Actualizar `00_HANDOVER_MAESTRO_UNIVERSAL.md` y `01_HISTORIAL_CONVERSACIONAL_Y_FEEDBACK.md` antes de cerrar la sesión. |
| *"Literalmente todo"* | Grado máximo de completitud. Sin atajos. Todas las interacciones, errores y soluciones documentadas. | Documentar sin resumir en exceso. Preservar los matices del diálogo real. |
| *"Vamos conectando"* | Proceso incremental: sumar proyectos y conocimiento de a uno, paso a paso, sin apuro. | Ejecutar en lotes pequeños y verificar cada paso antes de continuar. |
"""

if 'Sesión Obsidian LLM Wiki' not in d_text:
    d_text += new_vocab
    sync_write('01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico.md', d_text)
    print("-> Diccionario actualizado con nuevo vocabulario de sesión")

# =========================================================================
# 6. DOCUMENTAR EL PROCESO UNIVERSAL DE ONBOARDING DE PROYECTOS
# =========================================================================

onboarding_process = f"""---
title: "Proceso Universal de Onboarding de Proyectos al Sistema NEURO WEBs"
type: "process-protocol"
tags: [onboarding, new-project, process, universal, agent-protocol]
last_updated: "{datetime.now().strftime('%Y-%m-%d')}"
---

# ⚙️ Proceso Universal de Onboarding de Nuevos Proyectos

> **MANDATO PARA AGENTES:** Cada vez que Santi traiga un proyecto nuevo o quiera conectar uno existente, este es el protocolo exacto a seguir, sin variaciones.

---

## 📋 Checklist de Onboarding (Ejecutar en orden):

### FASE 1: Localización y Recolección de Datos (2 min)
- [ ] **Buscar el proyecto en disco:** Revisar `C:\\Users\\USUARIO\\Downloads\\`, `C:\\Users\\USUARIO\\Desktop\\App Vercel\\` y subcarpetas.
- [ ] **Buscar chats en el Brain de Antigravity:** Escanear `~/.gemini/antigravity-ide/brain/` buscando el nombre del proyecto en los `transcript.jsonl`.
- [ ] **Recopilar del usuario:** Ruta en disco, URL de Vercel (si existe), repo de GitHub (si existe) y número de WhatsApp del negocio.

### FASE 2: Creación de la Ficha del Proyecto (3 min)
- [ ] Copiar la plantilla de `wiki/templates/Template_Nuevo_Proyecto.md`.
- [ ] Renombrar a `08_PROJECTS/Proyecto_[NOMBRE_LIMPIO]_[CONV_ID_CORTO].md`.
- [ ] Rellenar todos los campos: accesos rápidos, stack detectado, decisiones de diseño, resumen limpio de chats y puntos pendientes.

### FASE 3: Conexión al Grafo (1 min)
- [ ] Añadir el proyecto a `08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS.md` (tabla central).
- [ ] Añadir link en `index.md` bajo la sección "Proyectos y Casos Reales".
- [ ] Vincular la ficha con `[[00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL]]`, `[[Error]]` y `[[wiki/skills/webs-diferenciadas]]`.

### FASE 4: Sincronización y Verificación (1 min)
- [ ] Confirmar que los archivos están en ambos destinos: `Documents/Obsidian Vault/NEURO WEBs/` y `Desktop/Skill webs diferenciadas/`.
- [ ] Actualizar `log.md` con la entrada de ingesta del nuevo proyecto.
- [ ] Informar al usuario que el proyecto está conectado y listo para ser retomado en cualquier momento.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS|Radar Maestro de Proyectos]]
- [[wiki/templates/Template_Nuevo_Proyecto|Plantilla para Nuevos Proyectos]]
- [[AGENTS|Manual de Agentes]]
"""
sync_write('wiki/synthesis/Proceso_Universal_Onboarding_Proyectos.md', onboarding_process)
print("-> Proceso Universal de Onboarding documentado")

# =========================================================================
# 7. UPDATE log.md
# =========================================================================
log_path = VAULT_DIR / 'log.md'
log_entry = f"\n## [{datetime.now().strftime('%Y-%m-%d %H:%M')}] ingest | NIDALA Joyas Onboarding + SealStep links reales + Diccionario actualizado\n- Ficha de Proyecto NIDALA creada con chats, rutas y links.\n- SealStep actualizado con GitHub real y URL de Vercel real.\n- Vocabulario nuevo de Santi agregado al Diccionario.\n- Proceso Universal de Onboarding documentado en `wiki/synthesis/`.\n"
if log_path.exists():
    with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
        log_content = f.read()
    log_content += log_entry
    sync_write('log.md', log_content)

print("\n¡Todo completado! SealStep con links reales + NIDALA conectado + Diccionario + Proceso Universal listos.")
