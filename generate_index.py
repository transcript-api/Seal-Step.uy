import os
from pathlib import Path
from datetime import datetime

OBSIDIAN_VAULT_DIR = Path(r'C:\Users\USUARIO\Documents\Obsidian Vault\NEURO WEBs')
DESKTOP_SKILL_DIR = Path(r'C:\Users\USUARIO\Desktop\Skill webs diferenciadas')

source_content = f"""# 🗺️ SOURCE INDEX: Mapa Maestro de Fuentes y Proyectos

> **Total de Proyectos Procesados del Cerebro de Antigravity:** 10  
> **Fecha de Sincronización:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## 📁 1. Proyectos y Conversaciones Reales (Antigravity Brain)

| Proyecto / ID | Archivo de Documentación | Temática Principal | Tecnologías y Patrones |
| :--- | :--- | :--- | :--- |
| `458fbde5...` | [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|SealStep - Rediseño Editorial THE DROP]] | E-Commerce, Video Frame, Drop Showcase, Filtros | Next.js 16, Turbopack, Tailwind, HTML5 Video, Touch Carousel |
| `307c55ee...` | [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_307c55ee|SealStep - Catálogo y Talles]] | Catálogo de championes, talles URU/EUR | React 19, Context API, Order Drawer |
| `334e5e86...` | [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_334e5e86|SealStep - Estructura Base]] | Layout inicial, componentes y marcas | Next.js, Tailwind CSS |
| `b8752f30...` | [[08_PROJECTS/Proyecto_Landing_Interactiva_b8752f30|Landing Interactiva Hero]] | Animaciones de entrada, scroll y micro-interacciones | CSS Animations, Reveal, IntersectionObserver |
| `91fed82f...` | [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_91fed82f|E-Commerce Calzado]] | Productos importados y marcas | React, Next.js |
| `e92abe61...` | [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_e92abe61|Integración WhatsApp & Pedidos]] | Enlaces de WhatsApp con mensaje estructurado | WA API, URL Encoding |
| `f4910151...` | [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_f4910151|E-Commerce Calzado]] | Galería y showcase de calzado | Responsive Grid, Aspect Ratio |
| `f9c081d0...` | [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_f9c081d0|E-Commerce Calzado]] | Ajustes de catálogo y variantes | Next.js App Router |
| `433d95cc...` | [[08_PROJECTS/Proyecto_3_433d95cc|Proyecto Base]] | Componentes UI y utilidades | Tailwind CSS, TypeScript |
| `670250c7...` | [[08_PROJECTS/Proyecto_5_670250c7|Proyecto Base]] | Optimización y refactorización | Next.js, Node.js |

---

## 📚 2. Conexiones Cruzadas de Conocimiento:

- **Efectos de Scroll & Video:**
  - [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario: Scroll-Scrubbed Video]] $\\leftrightarrow$ [[02_COMPONENTES_Y_TECNICAS/Componentes_Core_Webs_Diferenciadas|Componente: THE DROP]] $\\leftrightarrow$ `Proyecto_SealStep_ECommerce_Calzado_458fbde5`
- **Copywriting y Confianza:**
  - [[03_CONVERSION_Y_COPY/Reglas_Copywriting_y_Conversion|Reglas de Copywriting]] $\\leftrightarrow$ `Proyecto_SealStep_ECommerce_Calzado_458fbde5` (Corrección de badges forzados)
- **Checklist Antifallos:**
  - [[09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones|Checklist de Errores]] $\\leftrightarrow$ Todos los proyectos de Next.js / Tailwind.
"""

for base in [OBSIDIAN_VAULT_DIR, DESKTOP_SKILL_DIR]:
    target = base / '10_SOURCE_INDEX' / 'SOURCE_INDEX.md'
    target.parent.mkdir(parents=True, exist_ok=True)
    with open(target, 'w', encoding='utf-8') as f:
        f.write(source_content)

print("SOURCE_INDEX generado exitosamente.")
