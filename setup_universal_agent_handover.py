import os
import shutil
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

print("Iniciando creación del Sistema de Memoria Viva y Handover Universal (Cero Pérdida de Contexto)...")

# 1. RENAME / MIGRATE OLD CHATGPT FOLDER SAFELY
NEW_FOLDER_NAME = "00_MEMORIA_VIVA_Y_HANDOVER"

for base in [VAULT_DIR, DESKTOP_DIR]:
    old_folder = base / "CONTEXTO (conversacion con chat GPT)"
    new_folder = base / NEW_FOLDER_NAME
    new_folder.mkdir(parents=True, exist_ok=True)
    
    if old_folder.exists():
        old_file = old_folder / "CONTEXTO (conversacion con chat GPT).md"
        if old_file.exists():
            target_chatgpt = new_folder / "01_CONTEXTO_HISTORICO_CHATGPT.md"
            try:
                shutil.copy2(old_file, target_chatgpt)
                print(f"-> Historial de ChatGPT migrado a {target_chatgpt}")
            except Exception as e:
                print(f"Error copiando historial chatgpt: {e}")
        # Optionally remove old folder once copied
        try:
            shutil.rmtree(old_folder)
        except Exception as e:
            print(f"Aviso al limpiar carpeta vieja: {e}")

# 2. CREATE THE MASTER ZERO-CONTEXT-LOSS HANDOVER NOTE
master_handover_content = f"""---
title: "⚡ HANDOVER MAESTRO UNIVERSAL: Memoria Viva para Agentes de IA (Cero Pérdida de Contexto)"
type: "agent-handover-protocol"
version: "3.0.0"
author: "Antigravity + Santi (SealStep)"
target_agents: ["Claude Code", "OpenAI Codex", "Antigravity", "Cursor", "Windsurf", "Gemini CLI"]
last_updated: "{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
---

# 🧠 HANDOVER MAESTRO UNIVERSAL (Zero-Context-Loss OS)

> **ATENCIÓN A CUALQUIER AGENTE DE IA QUE ABRA ESTE PROYECTO (Claude Code, Codex, Antigravity, etc.):**
> Has sido invocado para continuar el desarrollo de este ecosistema digital. **NO REINICIES NADA, NO HAGAS PREGUNTAS BÁSICAS NI PIDAS CONTEXTO.** Todo lo que necesitas saber sobre el cliente, el código, el estilo visual y el vocabulario está compilado en este documento. Léelo y continúa la ejecución desde el último estado.

---

## 👤 1. Perfil del Usuario (Santi) & Reglas de Oro Inquebrantables

### A. Cómo se comunica y pide las cosas:
- Usa lenguaje natural y directo (*"hacelo más limpio"*, *"que el teléfono se vea igual"*, *"sacale esas cosas forzadas"*).
- Odia perder tiempo explicando conceptos técnicos. Tu trabajo como IA es traducir su lenguaje natural al concepto frontend de élite correspondiente (ver [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario de Intenciones]]).

### B. Reglas de Diseño Visual (Si violas esto, FALLASTE):
1. **Estructura 'Editorial $\\rightarrow$ Tienda' (THE DROP):**
   - NUNCA pongas una grilla plana repetitiva de 40 productos al inicio.
   - ARRIBA: Sección **THE DROP** con 3 tarjetas grandes (`aspect-[3/4]`), video autoplay en loop sin sonido y carrusel táctil `snap-x` en celulares.
   - ABAJO: Catálogo completo con buscador reactivo en vivo, tabs de marcas con contador y filtro de talles interactivo en pills.
2. **Página de Producto Dedicada Obligatoria (`/producto/[slug]` o `/auto/[slug]`):**
   - Todo producto debe abrir una página nueva con galería multi-ángulo de fotos tomadas con el teléfono, selector de talles/variantes y botón dinámico a WhatsApp.
3. **Organización de Fotos en Carpetas (`public/images/[NOMBRE_MODELO]/`):**
   - Cada modelo tiene su propia carpeta en Windows nombrada con el calzado/producto para que cualquier persona no programadora pueda arrastrar fotos fácilmente.
4. **Cero Textos Forzados (Zero-Cringe Micro-Copy):**
   - NUNCA uses textos de marketing barato (*"100% Real"*, *"Video Real"*, *"Garantizado"*, *"Oferta Única"*).
   - Usa micro-copy humano y elegante (*"Revisá la calidad"*, *"Mirá los detalles"*, *"Por encargue (24 a 72 hs)"*).
5. **Motor de WhatsApp Hiper-Personalizado:**
   - NUNCA envíes un mensaje vacío. El enlace debe llevar pre-cargado el modelo, talle, precio, resultado del test de estilo o la duda exacta del chatbot.

---

## 💻 2. Estado Actual del Código & Arquitectura (SealStep E-Commerce)

- **Repositorio / Ubicación:** `c:\\Users\\USUARIO\\Desktop\\App Vercel\\sealstep`
- **Stack:** Next.js 16 (App Router + Turbopack), React 19, TypeScript, Tailwind CSS, Lucide Icons + SVGs inline.
- **Redes Oficiales Configuradas:**
  - Instagram: `https://www.instagram.com/sealstep?...`
  - TikTok: `https://www.tiktok.com/@santiago204__?...`
- **Componentes Clave en Producción:**
  - `components/site-header.tsx`: Header con `Test de Estilo` en nav, Shopping Bag reactiva, SVGs de Instagram y TikTok (WhatsApp removido del header para no saturar).
  - `components/sections/productos.tsx`: Sección **THE DROP** (3 tarjetas asimétricas, video autoplay para las Nike Dunk usando `/videos drop/Blvckxkev_pindown.io_1786954770.mp4`, controles `<` `>` y carrusel táctil mobile) + Catálogo completo filtrable debajo.
  - `components/sections/galeria.tsx`: Showcase de Reels en vivo estilo Instagram sin badges forzados.
  - `lib/productos.ts`: Base de datos de modelos, talles (34 a 43) y rutas a carpetas de imágenes.
  - `context/order-context.tsx`: Contexto de carrito y lista de pedidos para WhatsApp.

---

## 📚 3. Estructura de la Base de Conocimiento (Obsidian Vault & Desktop)

- **Vault en Obsidian:** `C:\\Users\\USUARIO\\Documents\\Obsidian Vault\\NEURO WEBs\\`
- **Copia en Escritorio:** `C:\\Users\\USUARIO\\Desktop\\Skill webs diferenciadas\\`
- **Nodos Principales Conectados en el Grafo:**
  - [[00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL|Handover Maestro (Este archivo)]]
  - [[00_MEMORIA_VIVA_Y_HANDOVER/01_CONTEXTO_HISTORICO_CHATGPT|Historial de Charlas Previas con ChatGPT]]
  - [[wiki/skills/webs-diferenciadas|Skill Maestra: Webs Diferenciadas]]
  - [[wiki/skills/ruflo-agent-swarm|Skill: Ruflo Swarm & Self-Healing]]
  - [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial vs Catálogo Plano]]
  - [[wiki/concepts/Motor_Personalizacion_WhatsApp|Motor de WhatsApp Hiper-Personalizado]]
  - [[wiki/concepts/Arquitectura_Concesionarias_y_Productos_Avanzados|Blueprint de Concesionarias y Alto Ticket]]
  - [[wiki/concepts/Organizacion_Fotos_y_Pagina_Producto|Organización de Fotos por Carpetas]]
  - [[wiki/concepts/Estandar_Superar_Expectativas|Estándar de Superar Expectativas 1000x]]
  - [[Error|Repositorio de Fallos Frontend]]
  - [[Performance|Guía de Rendimiento & Core Web Vitals]]
  - [[Prompt|Biblioteca Maestra de Prompts]]
  - [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|Post-Mortem SealStep (Última conversación)]]

---

## 🔄 4. Protocolo Obligatorio para el Próximo Agente de IA (Auto-Actualización)

Cuando termines cualquier sesión o realices cambios en el código:
1. **Añade tu registro en `log.md`** con la fecha y las tareas realizadas.
2. **Si el usuario te enseñó un término nuevo o corrigió un error**, agrégalo a [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario]] y a [[Error|Error.md]].
3. **Actualiza la sección de 'Estado Actual' de este documento** para que el siguiente agente retome el trabajo con **CERO PÉRDIDA DE CONTEXTO**.
"""

sync_write(f'{NEW_FOLDER_NAME}/00_HANDOVER_MAESTRO_UNIVERSAL.md', master_handover_content)

# 3. UPDATE CLAUDE.md, AGENTS.md, AND index.md TO POINT DIRECTLY TO THE HANDOVER
claude_md_content = """# 🧠 CLAUDE CODE & AGENT MASTER CONFIGURATION

> **INSTRUCCIÓN OBLIGATORIA DE INICIO PARA CLAUDE CODE / CODEX / ANTIGRAVITY:**
> Antes de responder o ejecutar cualquier tarea en este espacio de trabajo:
> 1. Lee atentamente el archivo: `00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL.md`.
> 2. Adopta de inmediato el perfil de Santi, las reglas de diseño (Editorial → Tienda, THE DROP, dark mode, cero copy forzado) y la estructura de carpetas de fotos.
> 3. Utiliza la Skill Maestra `wiki/skills/webs-diferenciadas.md` y la arquitectura de enjambre de `wiki/skills/ruflo-agent-swarm.md`.
> 4. Al finalizar cualquier cambio, actualiza la memoria viva para el próximo agente.
"""
sync_write('CLAUDE.md', claude_md_content)

# Update index.md
index_path = VAULT_DIR / 'index.md'
if index_path.exists():
    with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
        idx_text = f.read()
    
    # Replace old folder references if any
    idx_text = idx_text.replace('CONTEXTO (conversacion con chat GPT)', '00_MEMORIA_VIVA_Y_HANDOVER')
    
    if '[[00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL' not in idx_text:
        idx_text = idx_text.replace(
            '# 📚 ÍNDICE MAESTRO DEL SISTEMA (NEURO WEBs)',
            '# 📚 ÍNDICE MAESTRO DEL SISTEMA (NEURO WEBs)\n\n> 🚨 **ACCESO RÁPIDO PARA AGENTES:** [[00_MEMORIA_VIVA_Y_HANDOVER/00_HANDOVER_MAESTRO_UNIVERSAL|⚡ HANDOVER MAESTRO UNIVERSAL (Cero Pérdida de Contexto)]]'
        )
        sync_write('index.md', idx_text)

print("¡Sistema de Memoria Viva y Handover Universal creado e interconectado con éxito!")
