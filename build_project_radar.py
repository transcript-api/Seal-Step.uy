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

print("Iniciando creación del Radar Maestro de Proyectos, Rutas y Sistema de Activación por Nombre...")

# 1. CREAR EL REGISTRO MAESTRO DE PROYECTOS (08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS.md)
registro_maestro_content = f"""---
title: "🗺️ RADAR MAESTRO: Registro Central de Proyectos, Rutas y Estados"
type: "project-registry"
tags: [projects, directory, vercel, local-paths, context-recall, system-radar]
last_updated: "{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
---

# 🗺️ RADAR MAESTRO DE PROYECTOS (Instant Context Recall)

> **MANDATO PARA CUALQUIER AGENTE DE IA (Claude Code, Codex, Antigravity, etc.):**
> Cuando el usuario te mencione el nombre o alias de un proyecto (ej. *"SealStep"*, *"Clínica Estética"*, *"Concesionaria"*), consulta esta tabla de inmediato, localiza su ruta en disco, su URL de Vercel/Local y su ficha de contexto en `08_PROJECTS/`. Continúa el trabajo sin pedir explicaciones.

---

## 📊 Tabla Central de Proyectos

| Proyecto / Alias Clave | Nicho / Tipo | Estado | Ruta Local en Disco | URL / Despliegue | Ficha de Memoria & Chats |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SealStep** / *Championes* | E-Commerce Calzado Urbano | 🟢 **Activo / Local** | `C:\\Users\\USUARIO\\Desktop\\App Vercel\\sealstep` | `http://localhost:3000` / Vercel | [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5\|Ficha SealStep THE DROP]] |
| **Landing Interactiva Hero** | Landing Page / Animaciones | 🟡 **Completado / Local** | `C:\\Users\\USUARIO\\Desktop\\App Vercel\\...` | Localhost | [[08_PROJECTS/Proyecto_Landing_Interactiva_b8752f30\|Ficha Landing Interactiva]] |
| **Clínica Estética** *(Ejemplo)* | Servicios Médicos / Belleza | 🔴 *Pausado / Por Crear* | `C:\\Users\\USUARIO\\Desktop\\Proyectos\\clinica-estetica` | Pendiente Vercel | [[wiki/templates/Template_Nuevo_Proyecto\|Plantilla Nuevo Proyecto]] |
| **Concesionaria de Autos** | Catálogo Automotriz / Alta Gama | 🟡 *Blueprint Listo* | `C:\\Users\\USUARIO\\Desktop\\App Vercel\\...` | Localhost | [[wiki/concepts/Arquitectura_Concesionarias_y_Productos_Avanzados\|Blueprint Concesionaria]] |

---

## ⚡ ¿Cómo funciona la Activación por Nombre?

1. **El usuario dice:** *«Sigamos con la web de SealStep, agreguemos la galería de fotos.»*
2. **El agente lee este archivo:** Identifica que la ruta es `c:\\Users\\USUARIO\\Desktop\\App Vercel\\sealstep`, abre la ficha [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5]], revisa los errores previos y continúa programando.
3. **Si el proyecto nunca se subió a Vercel o quedó a medias:** El agente lee la sección **"🎯 Puntos para Retomar"** de la ficha del proyecto y sabe exactamente qué falta para terminarlo y desplegarlo.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro del Sistema]]
- [[00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL|Handover Maestro (Zero Context Loss)]]
- [[wiki/templates/Template_Nuevo_Proyecto|Plantilla para Nuevos Proyectos]]
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|SealStep E-Commerce]]
"""
sync_write('08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS.md', registro_maestro_content)

# 2. CREAR PLANTILLA MAESTRA PARA CUALQUIER PROYECTO NUEVO O PAUSADO
template_proyecto = """---
title: "Proyecto: [NOMBRE_DEL_PROYECTO]"
type: "project-memory-card"
nicho: "[Nicho: Moda / Estética / Autos / Inmobiliaria / Servicios]"
estado: "[🟢 Activo / 🟡 En Desarrollo / 🔴 Pausado]"
ruta_disco: "C:\\Users\\USUARIO\\Desktop\\[CARPETA_DEL_PROYECTO]"
url_produccion: "[https://tu-proyecto.vercel.app o Localhost]"
last_updated: "2026-08-27"
---

# 🚀 Proyecto: [NOMBRE DEL PROYECTO]

> **Resumen Ejecutivo:** Descripción corta del negocio, propuesta de valor y objetivo de la página web.

---

## 📍 1. Rutas, Accesos y Despliegue
- **📁 Carpeta Local en Disco:** `C:\\Users\\USUARIO\\Desktop\\[CARPETA]`
- **🌐 URL de Vercel / Producción:** `https://...`
- **📦 Repositorio Git:** `https://github.com/...`
- **💬 Número de WhatsApp del Negocio:** `+598 ...`

---

## 🎨 2. Decisiones de Diseño & Arquitectura
- **Estructura:** [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Editorial THE DROP]] / Catálogo con página dedicada `/producto/[slug]`.
- **Paleta Visual:** Dark mode premium, acentos HSL y bordes `neutral-800`.
- **Fotos:** Organizadas en carpetas nombradas por producto en `public/images/`.

---

## 🎯 3. Puntos Pendientes para Retomar el Proyecto
*(Si el proyecto quedó a medias o nunca se subió a Vercel, aquí se listan las tareas exactas para finalizarlo):*
- [ ] Conectar la galería multi-ángulo de fotos tomadas con el teléfono.
- [ ] Configurar el mensaje pre-cargado a WhatsApp en [[wiki/concepts/Motor_Personalizacion_WhatsApp|Motor de WhatsApp]].
- [ ] Ejecutar prueba de consola sin errores de hydration y subir a Vercel con `npm run build`.

---

## 💬 4. Historial de Charlas & Prompts con la IA
*(Resumen de lo que se habló con el agente en este proyecto, qué cambios pidió el usuario y qué soluciones se implementaron).*

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS|Radar Maestro de Proyectos]]
- [[00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL|Handover Maestro]]
- [[wiki/skills/webs-diferenciadas|Skill Maestra: Webs Diferenciadas]]
- [[Error|Repositorio de Fallos]]
"""
sync_write('wiki/templates/Template_Nuevo_Proyecto.md', template_proyecto)

# 3. ACTUALIZAR AGENTS.md, 00_HANDOVER_MAESTRO e index.md CON LA REGLA DE RECALL POR NOMBRE
handover_path = VAULT_DIR / '00_MEMORIA_VIVA_Y_HANDOVER' / '00_HANDOVER_MAESTRO_UNIVERSAL.md'
if handover_path.exists():
    with open(handover_path, 'r', encoding='utf-8', errors='ignore') as f:
        h_text = f.read()
    if '## 🗺️ 5. Acceso Instantáneo a Proyectos por Nombre o Alias' not in h_text:
        h_text += """

---

## 🗺️ 5. Acceso Instantáneo a Proyectos por Nombre o Alias
- **Regla:** Si Santi te dice *"Vamos a trabajar en [Proyecto X]"* (ej. *SealStep*, *Clínica Estética*, *Concesionaria*):
  1. Abre inmediatamente [[08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS|Registro Maestro de Proyectos]].
  2. Lee la ruta en disco, la URL de Vercel y su ficha de memoria con los chats previos.
  3. Revisa la sección **"Puntos para Retomar"** si el proyecto quedó sin terminar y continúa la ejecución directamente.
"""
        sync_write('00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL.md', h_text)

# Update index.md
index_path = VAULT_DIR / 'index.md'
if index_path.exists():
    with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
        idx_text = f.read()
    if '[[08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS' not in idx_text:
        idx_text = idx_text.replace(
            '## 📁 6. Proyectos y Casos Reales (Antigravity Brain)',
            '## 🗺️ RADAR MAESTRO DE PROYECTOS\n- [[08_PROJECTS/REGISTRO_MAESTRO_PROYECTOS|🗺️ REGISTRO CENTRAL: Proyectos, Rutas en Disco, URLs y Estados]]\n- [[wiki/templates/Template_Nuevo_Proyecto|📄 Plantilla para Nuevos Proyectos]]\n\n## 📁 6. Proyectos y Casos Reales (Antigravity Brain)'
        )
        sync_write('index.md', idx_text)

print("¡Radar de Proyectos y Activación por Nombre implementado con éxito!")
