# CLAUDE.md - Guía de Proyecto & Reglas de Desarrollo

Este proyecto es **Seal Step**, una tienda e-commerce de calzado urbano e importado desarrollada con Next.js (App Router), React, Tailwind CSS y TypeScript.

---

## 🛠️ Skills Globales Instaladas (`C:\Users\USUARIO\.gemini\config\skills\`)
Claude Code debe consultar y aplicar según corresponda las siguientes skills activas:
- **Kit Adri y Juanpe**:
  - `web-scrolling`
  - `instagram-a-web`
  - `auditoria-seo`
  - `dashboard-facturas`
  - `automatizaciones-n8n`
  - `prospeccion-firecrawl`
  - `auditoria-negocio-digital`
  - `auditoria-meta-ads`
  - `extension-chrome`
  - `skill-creator`
- **Diseño & Animación**:
  - `vox-motion-graphics`
  - `building-data-apps`

---

## 🎨 Estética & Diseño (Inspiración Nike / Venefo)
- **Tema & Colores**: Dark mode exclusivo (`#050505`, `#0a0a0a`, `#121212`). Acentos en verde/esmeralda `#10b981` y bordes sutiles de alto contraste.
- **Tipografía**: Todo en mayúsculas (ALL-CAPS) para títulos y badges. Tipografía limpia, moderna y compacta.
- **Selectores de Talle**: Filas únicas horizontales con círculos/pills (`h-9 w-9` a `h-10 w-10`), interactivos con ring al seleccionar.
- **Imágenes**: Formatos `.jpg`, `.png`, `.webp` reales guardados en `public/images/`. No usar placeholders genéricos.

---

## 📁 Estructura del Proyecto & Datos
- **Catálogo de Productos**: Mantenido en `lib/productos.ts`.
  - Estructura `Producto`: `slug`, `nombre`, `subtitulo`, `categoria`, `precio`, `talles`, `colores`, `stock`, `descripcion`, `detalles`, `imagenes: { src: string; alt: string }[]`.
  - La primera imagen (`imagenes[0].src`) es la portada principal que se renderiza en las tarjetas del catálogo.
- **Páginas**:
  - `app/page.tsx`: Landing principal con Hero, Catálogo de Productos (`components/sections/productos.tsx`), Beneficios, FAQ.
  - `app/producto/[slug]/page.tsx`: Vista de detalle de producto (`components/producto-detalle.tsx`).

---

## 🛠️ Comandos Frecuentes
- **Dev Server**: `npm run dev`
- **Verificación de Tipos**: `npx tsc --noEmit`
- **Build**: `npm run build`

---

## 🤖 Reglas para Asistentes AI / Claude Code
1. **Conservar la Estética Premium**: No usar fuentes gigantes desproporcionadas ni colores primarios puros.
2. **Validar Archivos de Imagen**: Antes de vincular imágenes en `lib/productos.ts`, verificar siempre que el archivo exista en `public/images/` y sea una imagen real (JPEG/PNG/WebP).
3. **TypeScript Estricto**: Asegurar 0 errores de compilación (`npx tsc --noEmit`).
