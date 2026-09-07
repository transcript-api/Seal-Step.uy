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

print("Creando y vinculando la Skill Maestra: Webs Diferenciadas...")

webs_diferenciadas_content = f"""---
title: "Skill Maestra: Webs Diferenciadas (Kit de Transformación Web)"
type: "master-skill"
category: "Frontend & Conversion Architecture"
tags: [master-skill, webs-diferenciadas, frontend, conversion, cro, motion, whatsapp]
last_updated: "{datetime.now().strftime('%Y-%m-%d')}"
---

# 🌟 Skill Maestra: Kit de Webs Diferenciadas

> **Propósito Central:** Esta es la habilidad madre del sistema. Transforma sitios web genéricos o planos en experiencias digitales interactivas, modernas y de altísima conversión, adaptadas a cualquier nicho de negocio (E-commerce, servicios, inmobiliarias, gastronomía, marcas de calzado/moda).

---

## 🏛️ Los 10 Principios de una Web Diferenciada

1. **No inventar datos:** Preguntar siempre datos clave del negocio (precios, modalidades, WhatsApp, catálogo real).
2. **Obtención automática:** Extraer información estructurada directamente de los catálogos y fuentes.
3. **Auto-instalación de dependencias:** Configurar Tailwind, Lucide, Framer Motion o GSAP según la necesidad.
4. **Libertad creativa en diseño (Sin CSS rígido):** Priorizar estéticas premium y oscuras inspiradas en Apple, Nike y Linear.
5. **Adaptabilidad de branding:** Personalizar paletas HSL, tipografías display y bordes según la identidad visual.
6. **Flujo conversacional:** Resolver dudas y necesidades sin saturar al usuario.
7. **Diseño Editorial $\\rightarrow$ Tienda (THE DROP):** Evitar la fatiga de scroll mostrando drops destacados arriba y filtros interactivos abajo.
8. **Micro-Copy Natural (Cero Cringe):** Eliminar sellos de *"100% Garantizado"* o *"Mega Oferta"* en favor de descripciones limpias sobre materiales y texturas.
9. **Conversión Fluida a WhatsApp:** Checkout en un solo mensaje estructurado que previene la fricción de carritos complejos.
10. **Performance & Accesibilidad Extrema:** 95+ en Core Web Vitals, soporte para lectores de pantalla y navegación por teclado.

---

## 🧩 Los 5 Módulos Core del Kit

### 1. Showcase Editorial 'THE DROP' (3 Tarjetas Grandes)
- **Técnica:** Layout asimétrico con columna de título a la izquierda y 3 tarjetas horizontales tipo revista con `snap-x` táctil en móviles.
- **Relación:** [[wiki/entities/The_Drop_Component|Componente The Drop]]

### 2. Galería de Reels de Video en Vivo
- **Técnica:** Grilla de videos verticales `aspect-[9/16]` con reproducción automática en bucle sin sonido, badge minimalista de cuenta de Instagram y botón de consulta directa por modelo.
- **Relación:** [[wiki/skills/instagram-a-web|Skill: Instagram a Web]]

### 3. Automatización Dinámica de Pedidos por WhatsApp
- **Técnica:** Enlaces dinámicos codificados con mensaje pre-armado:
  - *«Hola! Quiero consultar por estos modelos: 1x Nike Dunk Panda (Talle 41)...»*
- **Relación:** [[wiki/concepts/Conversion_y_Psicologia|Conversión y Psicología]]

### 4. Toolbar de Filtros Reactivos en Memoria
- **Técnica:** Buscador en tiempo real + tabs por marca con conteo en vivo + selector de talles en pills de 36px.
- **Relación:** [[wiki/entities/Nextjs_React|Next.js & React]]

### 5. Testimonios Infinitos en Movimiento (Marquee)
- **Técnica:** Carrusel continuo sin cortes ni saltos con testimonios de clientes reales y roles específicos.

---

## ⚡ Prompt de Activación para Agentes de IA
```markdown
Aplica la Skill Maestra 'Webs Diferenciadas':
1. Transforma el layout a estructura Editorial → Tienda (sección THE DROP arriba, catálogo filtrable abajo).
2. Integra video autoplay en bucle para los modelos estrella.
3. Configura checkout en un solo mensaje estructurado de WhatsApp.
4. Aplica dark mode premium con bordes neutral-800 y micro-copy natural.
```

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro de la Wiki]]
- [[AGENTS|Manual Operativo de Agentes (Karpathy Method)]]
- [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario de Intenciones]]
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial vs Catálogo Plano]]
- [[wiki/concepts/Conversion_y_Psicologia|Conversión y Psicología]]
- [[wiki/concepts/SEO_Tecnico_y_Local|SEO Técnico y Local]]
- [[wiki/entities/The_Drop_Component|The Drop Showcase]]
- [[wiki/entities/Nextjs_React|Next.js 16 + React 19]]
- [[wiki/entities/Tailwind_CSS|Tailwind CSS]]
- [[wiki/skills/web-scrolling|Web Scrolling]]
- [[wiki/skills/instagram-a-web|Instagram a Web]]
- [[wiki/skills/ai-seo|AI SEO]]
- [[Error|Repositorio Central de Fallos]]
- [[Performance|Rendimiento Web]]
- [[Prompt|Biblioteca de Prompts]]
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|Proyecto SealStep Post-Mortem]]
"""

sync_write('wiki/skills/webs-diferenciadas.md', webs_diferenciadas_content)

# Update index.md to highlight the Master Skill
index_path = VAULT_DIR / 'index.md'
if index_path.exists():
    with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
        idx_text = f.read()
    
    if '[[wiki/skills/webs-diferenciadas|⭐ SKILL MAESTRA: WEBS DIFERENCIADAS]]' not in idx_text:
        idx_text = idx_text.replace(
            '## ⚡ Skills Destiladas del Sistema',
            '## 🌟 SKILL MAESTRA DEL SISTEMA\n- [[wiki/skills/webs-diferenciadas|⭐ SKILL MAESTRA: WEBS DIFERENCIADAS (Kit de Transformación Web)]]\n\n## ⚡ Skills Especializadas'
        )
        sync_write('index.md', idx_text)

print("Skill Maestra 'Webs Diferenciadas' integrada y conectada al Grafo con éxito.")
