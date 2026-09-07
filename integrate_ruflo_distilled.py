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

print("Iniciando destilación e integración quirúrgica de Ruflo (Multi-Agent Swarm & Self-Healing)...")

ruflo_skill_content = f"""---
title: "Skill Destilada: Ruflo Multi-Agent Swarm & Self-Healing Architecture"
type: "orchestration-skill"
source: "ruvnet/ruflo"
category: "Agent Orchestration & Quality Assurance"
tags: [ruflo, multi-agent, swarm, self-healing, qa, goap, memory, optimization]
last_updated: "{datetime.now().strftime('%Y-%m-%d')}"
---

# 🐝 Skill Destilada: Ruflo Multi-Agent Swarm & Self-Healing

> **Propósito:** Adapta la arquitectura de enjambre de agentes y auto-corrección de **Ruflo** para crear páginas web diferenciadas de nivel mundial, dividiendo la tarea en especialistas coordinados (Estratega $\\rightarrow$ Creador Frontend $\\rightarrow$ Auditor Crítico) sin errores de código ni regresiones.

---

## 🏛️ 1. El Trío de Especialistas (Web Creation Swarm)

En lugar de que un solo agente intente resolver diseño, lógica, copy y SEO al mismo tiempo en un solo pase, el enjambre de Ruflo divide la ejecución en 3 roles:

```mermaid
graph LR
    User[Pedido del Usuario] --> Router[Ruflo Orchestrator]
    Router --> Agent1[1. Estratega CRO & Copy]
    Agent1 --> Agent2[2. Creative Frontend & Motion]
    Agent2 --> Agent3[3. Auditor Crítico & Self-Healing]
    Agent3 --> Result[Web Final 1000x]
```

### Rol 1: Estratega de Conversión & Copy (CRO Lead)
- **Misión:** Extraer el deseo del cliente, definir la jerarquía (Editorial $\\rightarrow$ Tienda), estructurar los flujos a WhatsApp y redactar micro-copy 100% natural (sin textos forzados).
- **Referencia:** [[wiki/concepts/Conversion_y_Psicologia|Conversión y Psicología]], [[wiki/concepts/Motor_Personalizacion_WhatsApp|Motor de WhatsApp]].

### Rol 2: Arquitecto Frontend & Motion (Creative Coder)
- **Misión:** Desarrollar los componentes (`THE DROP`, carruseles táctiles `snap-x`, video autoplay sin sonido, toolbar de filtros en tiempo real y dark mode premium).
- **Referencia:** [[wiki/entities/The_Drop_Component|The Drop]], [[wiki/entities/Nextjs_React|Next.js & React]], [[wiki/entities/Tailwind_CSS|Tailwind CSS]].

### Rol 3: Auditor Crítico & Auto-Sanación (Self-Healing QA)
- **Misión:** Probar activamente la web antes de entregarla al usuario:
  - Verificar que las imágenes tengan contenedores `relative` correctos (adiós error Next.js Image).
  - Comprobar que no existan advertencias de Hydration Mismatch.
  - Validar que todos los enlaces a WhatsApp lleven el mensaje dinámico codificado.
  - Garantizar 60 FPS en animaciones y 95+ en Core Web Vitals.
- **Referencia:** [[Error|Repositorio de Fallos]], [[Performance|Rendimiento Web]].

---

## 🔄 2. Bucle de Auto-Sanación (Self-Healing Loop)

Cuando el compilador o la prueba de interfaz detecte un fallo:
1. **Detección Automática:** El agente captura el error en consola sin esperar a que el usuario se queje.
2. **Consulta a la Base de Conocimiento:** Revisa inmediatamente [[Error|Error.md]] y [[09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones|Checklist de Errores]].
3. **Parche Quirúrgico:** Modifica la línea exacta afectada (ej. corrigiendo la ruta de la imagen o agregando `use client`).
4. **Re-Verificación:** Confirma que el servidor de desarrollo devuelva código 200 sin advertencias.

---

## 🧠 3. Memoria Persistente de Estándares (Trajectory Learning)

Ruflo aprende de cada sesión y registra las preferencias del usuario:
- **Preferencia A:** Organización de fotos en carpetas individuales con el nombre del modelo (`public/images/ADIDAS CAMPUS 00s/`).
- **Preferencia B:** Páginas dedicadas `/producto/[slug]` obligatorias para cada producto o auto.
- **Preferencia C:** Cero frases clichés de marketing (*"100% Real"*, *"Garantizado"*).

---

## ⚡ 4. Prompt Maestro para Activar el Enjambre Ruflo
```markdown
Activa el Enjambre de Especialistas Ruflo:
1. FASE ESTRATEGIA: Define la jerarquía visual (The Drop arriba, catálogo filtrable abajo) y los mensajes hiper-personalizados de WhatsApp.
2. FASE DESARROLLO: Programa los componentes en Next.js 16 + React 19 + Tailwind, usando la carpeta de fotos estructurada del producto.
3. FASE AUTO-SANACIÓN: Audita la consola, elimina errores de hydration, asegura 'relative' en imágenes fill y verifica carga fluida a 60 FPS antes de entregar.
```

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[AGENTS|Manual de Agentes]]
- [[wiki/skills/webs-diferenciadas|Skill Maestra: Webs Diferenciadas]]
- [[wiki/concepts/Estandar_Superar_Expectativas|Estándar de Superar Expectativas 1000x]]
- [[wiki/concepts/Motor_Personalizacion_WhatsApp|Motor de WhatsApp]]
- [[wiki/concepts/Organizacion_Fotos_y_Pagina_Producto|Organización de Fotos]]
- [[Error|Repositorio Central de Fallos]]
- [[Performance|Rendimiento Web]]
- [[Prompt|Biblioteca de Prompts]]
"""

sync_write('wiki/skills/ruflo-agent-swarm.md', ruflo_skill_content)

# Update index.md
index_path = VAULT_DIR / 'index.md'
if index_path.exists():
    with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
        idx_text = f.read()
    
    if '[[wiki/skills/ruflo-agent-swarm' not in idx_text:
        idx_text = idx_text.replace(
            '## ⚡ Skills Especializadas',
            '## ⚡ Skills Especializadas & Orquestación\n- [[wiki/skills/ruflo-agent-swarm|🐝 Ruflo Multi-Agent Swarm & Self-Healing Architecture]]'
        )
        sync_write('index.md', idx_text)

print("¡Skill de Ruflo destilada e integrada al Grafo con éxito en Obsidian y Desktop!")
