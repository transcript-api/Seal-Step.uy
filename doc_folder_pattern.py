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

print("Documentando el Patrón de Organización de Fotos por Carpetas y Página de Detalle...")

content = f"""---
title: "Patrón de Organización: Carpetas de Fotos por Producto & Página de Detalle Multi-Foto"
type: "architecture-pattern"
category: "Asset Management & Product UX"
tags: [assets, images, folder-structure, product-page, gallery, ecommerce, sealstep]
last_updated: "{datetime.now().strftime('%Y-%m-%d')}"
---

# 📁 Patrón de Organización de Fotos por Carpeta & Página de Detalle Multi-Foto

> **Problema que resuelve:** En tiendas de calzado, moda o productos con múltiples ángulos, tener todas las imágenes sueltas en una sola carpeta crea desorden y dificulta que una persona sin conocimientos técnicos pueda agregar o cambiar fotos.

---

## 🗂️ 1. Estructura de Carpetas Intuitiva (`public/images/`)

Cada modelo o producto tiene su **propia carpeta dedicada** con su nombre exacto en lenguaje claro:

```text
public/images/
├── 📁 ADIDAS CAMPUS 00s/
│   ├── 01_frontal.jpg
│   ├── 02_lateral.jpg
│   └── 03_suela.jpg
├── 📁 -ADIDAS SAMBA BLANCO-LATEX/
│   ├── 01.jpg
│   └── 02.jpg
├── 📁 -NEW BALANCE 1000 ALL BLACK/
│   ├── foto_principal.jpg
│   └── detalle_talon.jpg
├── 📁 Chanclas SLIDE Nike beige/
│   └── 01.jpg
└── 📁 -NIKE AIR FORCE BLANCO/
    └── 01.jpg
```

### 💡 Por qué esta organización es superior:
1. **Cero fricción para no programadores:** Para agregar un modelo nuevo o más fotos de un par existente, simplemente abres el Explorador de Windows, creas la carpeta con el nombre del modelo y pegas las fotos tomadas con el teléfono.
2. **Claridad visual instantánea:** Las carpetas muestran miniaturas automáticas de los championes en Windows, permitiendo identificar cualquier producto de un vistazo.
3. **Escalabilidad limpia:** El proyecto puede tener 100 modelos y 500 fotos sin que `public/` se convierta en un basurero inmanejable.

---

## 📱 2. Página de Detalle de Producto (`/producto/[slug]`)

Cuando el cliente hace clic en cualquier tarjeta del catálogo o de la sección **THE DROP**, se abre automáticamente una **página dedicada para ese producto**.

### 🌟 Elementos de la Página de Detalle:
- **Galería Multi-Ángulo:** Imagen principal en gran formato (`aspect-square` u `object-cover` 100% full-bleed) con carrusel de miniaturas debajo para alternar entre frontal, lateral, suela y caja.
- **Selector de Talles en Stock:** Botones interactivos con los talles disponibles para ese modelo exacto (ej. 38 al 43).
- **Badge de Modalidad:** Indicador claro de entrega (*"📦 Por encargue (24 a 72 hs)"* o *"⚡ Stock Inmediato"*).
- **Botón de Pedido por WhatsApp con Mensaje Pre-armado:**
  - *«Hola Seal Step! Estoy en la web y quiero consultar por este par: Nike Air Force Blanco en Talle 40.»*

---

## 🛠️ 3. Mapeo en el Código (`lib/productos.ts`)

Centralizar los datos en un archivo maestro que apunte directamente a las carpetas:

```typescript
export const PRODUCTOS: Producto[] = [
  {{
    slug: 'adidas-campus-00s',
    nombre: 'Adidas Campus 00s',
    categoria: 'Championes Urbanos',
    talles: ['38', '39', '40', '41', '42', '43'],
    imagenes: [
      {{ src: '/images/ADIDAS%20CAMPUS%2000s/01.jpg', alt: 'Adidas Campus 00s Frontal' }},
      {{ src: '/images/ADIDAS%20CAMPUS%2000s/02.jpg', alt: 'Adidas Campus 00s Lateral' }},
      {{ src: '/images/ADIDAS%20CAMPUS%2000s/03.jpg', alt: 'Adidas Campus 00s Suela' }},
    ],
    descripcion: 'Silueta chunky inspirada en el skate de los 2000. Gamuza suave con costuras reforzadas.',
  }},
]
```

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[wiki/skills/webs-diferenciadas|Skill Maestra: Webs Diferenciadas]]
- [[wiki/entities/The_Drop_Component|Componente The Drop]]
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Diseño Editorial vs Catálogo]]
- [[wiki/concepts/Conversion_y_Psicologia|Conversión y Psicología]]
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|SealStep E-Commerce Post-Mortem]]
- [[09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones|Checklist de Errores]]
"""

sync_write('wiki/concepts/Organizacion_Fotos_y_Pagina_Producto.md', content)

# Also update index.md
index_path = VAULT_DIR / 'index.md'
if index_path.exists():
    with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
        idx_text = f.read()
    if '[[wiki/concepts/Organizacion_Fotos_y_Pagina_Producto' not in idx_text:
        idx_text = idx_text.replace(
            '## 💡 4. Conceptos de Diseño, UX y Conversión',
            '## 💡 4. Conceptos de Diseño, UX y Conversión\n- [[wiki/concepts/Organizacion_Fotos_y_Pagina_Producto|Organización de Fotos por Carpeta & Página de Detalle Multi-Foto]]'
        )
        sync_write('index.md', idx_text)

print("Patrón documentado e integrado con éxito.")
