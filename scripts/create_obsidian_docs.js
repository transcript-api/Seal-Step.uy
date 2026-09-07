const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\USUARIO\\Desktop\\Zapatos Seal\\Chat Panel de administrador';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// ----------------------------------------------------------------------------
// 1. 00_HANDOVER_MAESTRO_PANEL_ADMIN.md
// ----------------------------------------------------------------------------
const handoverContent = `---
title: "00 — Handover Maestro: Sistema E-commerce, Panel Administrativo y CRM"
project: "SEAL STEP"
date: "2026-09-06"
status: "En desarrollo — Paso 2 Preparado"
target: "Obsidian OS & Agentes de Inteligencia Artificial"
tags:
  - "handover"
  - "panel-admin"
  - "crm"
  - "supabase"
  - "nextjs"
  - "arquitectura"
---

# 👑 00 — Handover Maestro: Arquitectura de Tienda + Panel + CRM

> [!IMPORTANT]
> **INSTRUCCIONES PARA CUALQUIER AGENTE DE IA QUE ENTRE A ESTE PROYECTO:**
> 1. Este documento es la **fuente de verdad** del proyecto SEAL STEP y el estándar para futuros paneles administrativos.
> 2. **NO MODIFIQUES CÓDIGO NI BASE DE DATOS SIN LEER ESTE HANDOVER.**
> 3. El desarrollo se ejecuta **PASO A PASO DETERMINÍSTICO**, esperando siempre la confirmación del usuario antes de avanzar de etapa.
> 4. **NUNCA EXPONGAS CREDENCIALES PRIVADAS** (\`SUPABASE_SERVICE_ROLE_KEY\`, tokens de Mercado Pago, etc.) en código, prompts o repositorios públicos.

---

## 1. Visión General del Proyecto

Transformar una tienda de calzado en Uruguay con catálogo hardcodeado (\`lib/productos.ts\`) en un **Ecosistema Completo y Escalable Data-Driven**:

\`\`\`text
CLIENTE
  ↓
TIENDA ONLINE (Next.js 16 + React 19 + Tailwind v4)
  ↓
BACKEND / API ROUTES SEGUROS
  ↓
SUPABASE (PostgreSQL + RLS + Storage)
  ↓
PANEL ADMINISTRATIVO (/admin) + CRM (/crm)
  ↓
MERCADO PAGO (Webhooks + Checkout dinámico)
  ↓
n8n (Motor de Automatizaciones)
  ↓
WHATSAPP + EMAIL + IA (Gemini vía n8n)
\`\`\`

---

## 2. Estado Actual del Desarrollo

* **Paso 1 (Auditoría Técnica)**: ✅ **COMPLETADO**.
  * Se analizó el repositorio en \`c:\\Users\\USUARIO\\Desktop\\App Vercel\\sealstep\`.
  * Framework: Next.js 16.2.6 (App Router), React 19, Tailwind CSS v4, Motion (Framer Motion), Lucide Icons.
  * 33 productos en catálogo, 142 imágenes referenciadas en \`/images/\`, 217 combinaciones de talles (34 al 43).
  * La tienda pública se mantiene 100% operativa y compilando sin errores (\`npm run build\` exitoso).

* **Paso 2 (Arquitectura de Datos y Supabase)**: 🔄 **PREPARADO Y VALIDADO (Listo para aplicar en Supabase)**.
  * Modelo relacional de 9 tablas diseñado e implementado en SQL.
  * Vistas seguras creadas para blindar el stock numérico exacto y los costos de productos.
  * Tablas de reglas de descuento, clientes, pedidos y pagos blindadas con RLS privado.
  * Scripts de extracción y migración generados (\`parse_products.js\`, \`generate_seed_sql.js\`, \`migrate_to_supabase.js\`).
  * \`lib/productos.ts\` conservado intacto como respaldo de producción.

* **Paso 3 (Conexión Tienda <-> Supabase)**: ⏳ **PENDIENTE**.
* **Paso 4 (Mercado Pago)**: ⏳ **PENDIENTE**.
* **Paso 5 (Panel Admin + CRM)**: ⏳ **PENDIENTE**.
* **Paso 6 (n8n + WhatsApp + IA)**: ⏳ **PENDIENTE**.

---

## 3. Estructura de Recursos en este Directorio

* 📁 \`sql/\`
  * \`01_init_schema_completo.sql\`: Creación de tablas, índices, triggers y RLS.
  * \`02_seed_catalogo_completo.sql\`: Inserción de los 33 productos, imágenes y variantes sin inventar stock (stock = NULL).
* 📁 \`scripts/\`
  * \`parse_products.js\`: Parser de catálogo desde TypeScript a JSON.
  * \`generate_seed_sql.js\`: Generador de sentencias SQL idempotentes (\`ON CONFLICT\`).
  * \`migrate_to_supabase.js\`: Cargador automatizado vía API REST de Supabase.
  * \`extracted_products.json\`: Snapshot de datos de catálogo extraído.
* 📁 \`config/\`
  * \`.env.example\`: Plantilla de variables de entorno para Supabase.
* 📄 \`01_ARQUITECTURA_SISTEMA_Y_PANEL.md\`: Especificación técnica del sistema completo.
* 📄 \`02_DICCIONARIO_DE_DATOS_Y_RLS.md\`: Explicación de cada campo, tabla y política de seguridad.
* 📄 \`03_GUIA_EJECUCION_SUPABASE.md\`: Guía de aplicación paso a paso para humanos y agentes.
* 📄 \`log.md\`: Bitácora cronológica de decisiones y cambios técnicos.
`;

fs.writeFileSync(path.join(targetDir, '00_HANDOVER_MAESTRO_PANEL_ADMIN.md'), handoverContent, 'utf8');

// ----------------------------------------------------------------------------
// 2. 01_ARQUITECTURA_SISTEMA_Y_PANEL.md
// ----------------------------------------------------------------------------
const arquitecturaContent = `---
title: "01 — Arquitectura de Sistema y Panel Administrativo"
project: "SEAL STEP"
date: "2026-09-06"
tags:
  - "arquitectura"
  - "panel-admin"
  - "crm"
  - "n8n"
  - "mercadopago"
---

# 🏛️ 01 — Arquitectura Integral: Tienda, Panel Admin y CRM

## 1. Diagrama de Flujo de Datos

\`\`\`mermaid
graph TD
    Client[Cliente / Navegador] -->|Navegación / Carrito| WebStore[Tienda Pública Next.js 16]
    WebStore -->|Lectura segura| PublicViews[Vistas Públicas Supabase]
    
    AdminUser[Dueño / Administrador] -->|Gestión Total| AdminPanel[Panel Admin & CRM /admin /crm]
    AdminPanel -->|Lectura/Escritura total| SupabaseDB[(Supabase PostgreSQL)]
    
    Client -->|Checkout Dinámico| NextAPI[Backend Next.js Server Actions]
    NextAPI -->|Crea Preferencia| MercadoPago[Mercado Pago API]
    MercadoPago -->|Pago Confirmado Webhook| NextAPI
    NextAPI -->|Actualiza Pedido/Stock| SupabaseDB
    
    SupabaseDB -->|Webhook de Eventos| N8N[n8n Motor de Automatización]
    N8N -->|Mensaje Confirmación| WhatsApp[WhatsApp Business API]
    N8N -->|Análisis & Clasificación| GeminiAI[Google Gemini API]
\`\`\`

---

## 2. Los 5 Módulos del Panel Administrativo Futuro

### A. Módulo Catálogo & Inventario (\`/admin/productos\`)
- **CRUD Completo**: Crear, editar, ocultar y eliminar modelos sin tocar código.
- **Variantes de Talle y Color**: Control numérico exacto de existencias por talle (del 34 al 43).
- **Gestor Multimedia**: Subir fotos a Supabase Storage, reordenarlas (portada = 0), y eliminarlas.
- **Filtros Comerciales**: Banderas (\`NUEVO INGRESO\`, \`POR ENCARGUE\`, \`EDICIÓN ESPECIAL\`), categorías y marcas.

### B. Módulo Precios Dinámicos & Descuentos (\`/admin/descuentos\`)
- **Reglas Mayoristas**: Ej. 8 pares con 25% OFF, 15 pares con 30% OFF.
- **Precios Especiales**: Promociones temporales por fecha o categoría.
- **Cálculo Seguro**: El backend procesa las reglas sin exponer márgenes al público.

### C. Módulo Pedidos (\`/admin/pedidos\`)
- **Listado y Detalle**: Número de orden, cliente, agencia de envío (DAC, Mirtrans), comprobante.
- **Estados de Pedido**: \`pendiente\`, \`preparando\`, \`enviado\`, \`entregado\`, \`cancelado\`.
- **Estados de Pago**: \`pendiente\`, \`pagado\`, \`rechazado\`.
- **Inmutabilidad**: Los precios de los productos en el pedido se congelan en el momento de la compra.

### D. Módulo CRM & Clientes (\`/crm\`)
- **Directorio de Compradores**: Nombre, teléfono (WhatsApp), departamento uruguayo, historial de compras.
- **Métricas de Cliente**: LTV (Total gastado), cantidad de órdenes, fecha de última compra.
- **Bitácora de Interacciones**: Registro de conversaciones, acuerdos por WhatsApp y notas privadas.
- **Etiquetas**: Ej. \`mayorista\`, \`frecuente\`, \`pendiente_pago\`, \`interior\`.

### E. Módulo Automatizaciones & n8n (\`/admin/integraciones\`)
- **Disparadores**: Pedido creado -> Enviar resumen por WhatsApp.
- **Post-Venta**: 7 días tras entrega -> Solicitar testimonio de calce y comodidad.
- **Stock Crítico**: Notificar al dueño cuando un talle llegue a 0 pares.
`;

fs.writeFileSync(path.join(targetDir, '01_ARQUITECTURA_SISTEMA_Y_PANEL.md'), arquitecturaContent, 'utf8');

// ----------------------------------------------------------------------------
// 3. 02_DICCIONARIO_DE_DATOS_Y_RLS.md
// ----------------------------------------------------------------------------
const diccionarioContent = `---
title: "02 — Diccionario de Datos y Políticas de Seguridad (RLS)"
project: "SEAL STEP"
date: "2026-09-06"
tags:
  - "database"
  - "postgresql"
  - "supabase"
  - "rls"
  - "seguridad"
---

# 📚 02 — Diccionario de Datos Relacional y Seguridad RLS

## 1. Esquema de Tablas (PostgreSQL)

| Tabla | Propósito | Nivel de Acceso RLS |
| :--- | :--- | :--- |
| \`productos\` | Ficha técnica y comercial maestra | Lectura pública filtrada / Edición solo Admin |
| \`producto_imagenes\` | URLs y orden de fotos por producto | Lectura pública / Edición solo Admin |
| \`producto_variantes\` | Inventario detallado por talle, color y stock | Lectura pública de variantes / Stock numérico protegido |
| \`reglas_descuento\` | Reglas comerciales mayoristas y promociones | **100% PRIVADA** (Solo Backend y Admin) |
| \`clientes\` | Perfil de compradores para el CRM | **100% PRIVADA** (Solo Admin y Backend) |
| \`pedidos\` | Cabecera de órdenes de compra | **100% PRIVADA** (Solo Admin y Backend) |
| \`pedido_items\` | Líneas de pedido con precios congelados | **100% PRIVADA** (Solo Admin y Backend) |
| \`pagos\` | Registro de transacciones Mercado Pago / Webhooks | **100% PRIVADA** (Solo Backend) |
| \`crm_interacciones\` | Notas y registros de WhatsApp/n8n | **100% PRIVADA** (Solo Admin y Backend) |

---

## 2. Vistas Públicas de Blindaje Comercial

Para impedir que curiosos o scrapers inspeccionen el código de red y vean:
1. El **costo interno** del producto.
2. El **número exacto de pares en stock** (ej: 2 pares vs 200 pares).

Se crearon dos vistas seguras en Supabase:

### A. \`v_catalogo_productos\`
Excluye la columna \`costo\` y solo expone productos con \`visible = true AND activo = true\`.

### B. \`v_catalogo_variantes\`
Reemplaza la columna numérica \`stock\` por un indicador booleano seguro:
\`\`\`sql
(stock IS NULL OR stock > 0) AS disponible
\`\`\`
El cliente solo sabe si puede comprar o encargar su número, sin enterarse del volumen físico del almacén.
`;

fs.writeFileSync(path.join(targetDir, '02_DICCIONARIO_DE_DATOS_Y_RLS.md'), diccionarioContent, 'utf8');

// ----------------------------------------------------------------------------
// 4. 03_GUIA_EJECUCION_SUPABASE.md
// ----------------------------------------------------------------------------
const guiaContent = `---
title: "03 — Guía de Ejecución y Migración en Supabase"
project: "SEAL STEP"
date: "2026-09-06"
tags:
  - "supabase"
  - "migracion"
  - "tutorial"
  - "deploy"
---

# 🚀 03 — Guía de Ejecución en Supabase Paso a Paso

Esta guía explica exactamente cómo aplicar la base de datos para humanos o agentes.

---

## Método 1: Vía Supabase Dashboard (Recomendado)

1. Ingresa a [https://supabase.com](https://supabase.com) e inicia sesión.
2. Crea un nuevo proyecto llamado **Seal Step** (o selecciona el existente).
3. Ve a la sección **SQL Editor** en la barra lateral izquierda.
4. Haz clic en **+ New Query**.
5. Abre el archivo local:
   \`sql/01_init_schema_completo.sql\`
6. Copia todo su contenido, pégalo en el editor y haz clic en **Run**.
   *(Verás el mensaje de confirmación creando tablas, vistas, índices y RLS).*
7. Crea una segunda consulta (**+ New Query**).
8. Abre el archivo local:
   \`sql/02_seed_catalogo_completo.sql\`
9. Copia todo su contenido, pégalo en el editor y haz clic en **Run**.
   *(Verás la confirmación cargando los 33 productos, 142 imágenes y 217 variantes).*

---

## Método 2: Vía Script Automatizado

1. Crea el archivo local \`.env.local\` en la carpeta \`sealstep/\` basándote en \`config/.env.example\`.
2. Completa tus claves:
   - \`NEXT_PUBLIC_SUPABASE_URL\`
   - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
   - \`SUPABASE_SERVICE_ROLE_KEY\`
3. Ejecuta en tu terminal:
   \`\`\`bash
   node scripts/migrate_to_supabase.js
   \`\`\`

> [!CAUTION]
> **REGLA DE SEGURIDAD ESTRICTA:**
> NUNCA pegues tus credenciales privadas en chats, prompts de IA ni commits de Git.
`;

fs.writeFileSync(path.join(targetDir, '03_GUIA_EJECUCION_SUPABASE.md'), guiaContent, 'utf8');

// ----------------------------------------------------------------------------
// 5. log.md (Protocolo Cronista Obsidian)
// ----------------------------------------------------------------------------
const logContent = `# 📜 Bitácora de Desarrollo — Seal Step (Panel Admin & CRM)

## [2026-09-06] — Auditoría Técnica y Arquitectura de Datos (Pasos 1 y 2)

### Hitos Completados:
1. **Auditoría Técnica (Paso 1)**:
   - Diagnóstico completo del e-commerce actual (Next.js 16, React 19, Tailwind v4).
   - Verificación de 33 productos hardcodeados en \`lib/productos.ts\`.
   - Compilación limpia con Turbopack (\`npm run build\` exitoso con 49 rutas).

2. **Diseño de Base de Datos PostgreSQL / Supabase (Paso 2)**:
   - Creación de 9 tablas relacionales normalizadas.
   - Implementación de RLS estricto: \`reglas_descuento\`, \`clientes\`, \`pedidos\`, \`pagos\` y \`crm_interacciones\` 100% privadas.
   - Creación de vistas de blindaje comercial (\`v_catalogo_productos\` y \`v_catalogo_variantes\`) para ocultar costos y cantidades numéricas de stock al cliente.
   - Extracción de datos y generación de script seed idempotente (\`ON CONFLICT\`).
   - Respaldo de \`lib/productos.ts\` intacto.
   - Exportación de todo el kit maestro a la carpeta de Obsidian: \`C:\\Users\\USUARIO\\Desktop\\Zapatos Seal\\Chat Panel de administrador\`.
`;

fs.writeFileSync(path.join(targetDir, 'log.md'), logContent, 'utf8');

console.log('✅ Todos los documentos para Obsidian generados exitosamente en:');
console.log(targetDir);
