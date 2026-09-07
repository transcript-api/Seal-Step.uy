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

print("Iniciando creación de los módulos de WhatsApp Hiper-Personalizado, Blueprint de Concesionarias y Estándar de Superar Expectativas...")

# =========================================================================
# 1. MOTOR DE PERSONALIZACIÓN DE WHATSAPP (wiki/concepts/)
# =========================================================================
whatsapp_engine_content = f"""---
title: "Motor de Conversión: Personalización Extrema de Mensajes a WhatsApp"
type: "conversion-architecture"
category: "Sales Automation & CRO"
tags: [whatsapp, conversion, sales-funnel, chatbots, ecommerce, sealstep, cro]
last_updated: "{datetime.now().strftime('%Y-%m-%d')}"
---

# 💬 Motor de Conversión: Personalización Extrema de Mensajes a WhatsApp

> **Regla de Oro de Negocio:** El cliente NUNCA debe llegar a WhatsApp con un mensaje vacío como *"Hola"*. Cada clic debe generar un mensaje pre-armado con el contexto exacto (producto, talle, color, duda del bot o resultado de test), permitiendo que el dueño del negocio cierre la venta en segundos.

---

## 📲 Los 5 Flujos de Mensajes Hiper-Personalizados (SealStep Pattern)

### 1. Desde la Página de Detalle de Producto Individual
- **Cuándo se activa:** Al hacer clic en *"Consultar por este par"* en la ficha del producto.
- **Mensaje Generado:**
```text
https://wa.me/59891234567?text=Hola%20Seal%20Step!%20Estoy%20en%20la%20web%20y%20quiero%20consultar%20por%20este%20modelo:%0A%0A*%F0%9F%91%9F%20Modelo:*%20Nike%20Air%20Force%20Blanco%0A*%F0%9F%93%8F%20Talle:*%2041%0A*%F0%9F%93%A6%20Modalidad:*%20Por%20encargue%0A%0A%C2%BFMe%20confirmas%20disponibilidad%20para%20Rivera/Montevideo?
```
- **Texto visual para el cliente:**
  > *«Hola Seal Step! Estoy en la web y quiero consultar por este modelo:*  
  > *👟 Modelo: Nike Air Force Blanco*  
  > *📏 Talle: 41*  
  > *📦 Modalidad: Por encargue*  
  > *¿Me confirmas disponibilidad para Rivera/Montevideo?»*

---

### 2. Desde el Carrito Multi-Producto (Order Drawer)
- **Cuándo se activa:** Cuando el cliente agrega 2 o más pares a su lista de consulta y pulsa *"Enviar lista a WhatsApp"*.
- **Mensaje Generado:**
```text
«Hola Seal Step! Armé mi lista de pedido en la web con estos modelos:

1. 👟 Nike Dunk Low Panda (Talle: 41)
2. 👟 Adidas Campus 00s (Talle: 40)

📦 Total de pares: 2
📍 Enviar a: [Mi Ciudad]

¿Cómo coordinamos el pago y el envío?»
```

---

### 3. Desde la Calculadora Interactiva de Talles
- **Cuándo se activa:** El usuario mide su pie en centímetros y pulsa *"Ver modelos en mi talle"*.
- **Mensaje Generado:**
```text
«Hola! Medí mi pie en la calculadora de la web (26.5 cm - Talle 41 URY) y quiero consultar qué modelos tienen disponibles para entrega inmediata en este número.»
```

---

### 4. Desde el Test de Estilo Interactivo (Quiz)
- **Cuándo se activa:** Al finalizar el test de 3 preguntas de estilo.
- **Mensaje Generado:**
```text
«Hola! Hice el Test de Estilo en la web y mi resultado fue: *Estilo Urbano / Chunky Retro*. Me gustaron las Adidas Campus y las Puma Suede XL. ¿Cuáles tienen en talle 42?»
```

---

### 5. Handoff Inteligente del Chatbot / Asistente Virtual a WhatsApp
- **Cuándo se activa:** Cuando el bot de IA no sabe responder una duda específica o el cliente escribe *"quiero hablar con una persona"*.
- **Mecanismo:** El bot resume la conversación previa y genera un enlace a WhatsApp que transfiere el contexto:
```text
«Hola! Estaba hablando con el asistente virtual en la web sobre [DUDA_DEL_CLIENTE / CONSULTA_DE_ENVÍO] y me gustaría continuar la consulta con un asesor humano.»
```

---

## 🛠️ Utilidad TypeScript Reutilizable (`lib/whatsapp.ts`)

```typescript
export function buildWhatsAppProductLink(
  phone: string,
  productoNombre: string,
  talle: string,
  modalidad: string = 'Por encargue'
) {{
  const text = `Hola! Estoy en la web y quiero consultar por este modelo:\\n\\n` +
    `*👟 Modelo:* ${{productoNombre}}\\n` +
    `*📏 Talle:* ${{talle}}\\n` +
    `*📦 Modalidad:* ${{modalidad}}\\n\\n` +
    `¿Me confirmas disponibilidad y forma de envío?`
  return `https://wa.me/${{phone}}?text=${{encodeURIComponent(text)}}`
}}
```

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[wiki/skills/webs-diferenciadas|Skill Maestra: Webs Diferenciadas]]
- [[wiki/concepts/Conversion_y_Psicologia|Conversión y Psicología]]
- [[wiki/concepts/Organizacion_Fotos_y_Pagina_Producto|Página de Detalle Multi-Foto]]
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|SealStep Post-Mortem]]
"""
sync_write('wiki/concepts/Motor_Personalizacion_WhatsApp.md', whatsapp_engine_content)

# =========================================================================
# 2. BLUEPRINT DE CONCESIONARIAS Y PRODUCTOS AVANZADOS (wiki/concepts/)
# =========================================================================
dealership_content = f"""---
title: "Blueprint Maestro: Concesionarias, Automóviles & Productos de Alta Gama"
type: "architecture-blueprint"
category: "Niche Architectures"
tags: [dealership, automotive, cars, product-page, multi-filter, 360-gallery, high-ticket]
last_updated: "{datetime.now().strftime('%Y-%m-%d')}"
---

# 🚗 Blueprint Maestro: Concesionarias, Autos & Productos de Alta Gama

> **Objetivo:** Plantilla arquitectónica para concesionarias de vehículos y productos de alto valor que supere 1000x las expectativas del cliente y del dueño del negocio.

---

## 🏛️ 1. Estructura Obligatoria de Producto: Página Dedicada (`/auto/[slug]`)

Cada vehículo o producto de alto valor **DEBE tener su propia página dedicada**, jamás limitarse a un simple modal.

### Elementos de la Página de Vehículo:
1. **Galería Multi-Ángulo HD:**
   - Fotos organizadas en `public/images/concesionaria/[MARCA_MODELO_AÑO]/` (Exterior, Interior, Tablero, Asientos, Baúl, Motor, Documentación).
   - Selector de vistas con zoom de alta fidelidad.
2. **Ficha Técnica & Atributos Clave (Pills & Badges):**
   - **Año:** ej. 2023 | **Kilómetros:** ej. 34.000 km | **Motor:** ej. 2.0 Turbo (211 CV)
   - **Transmisión:** Automática Secuencial | **Combustible:** Nafta / Híbrido
   - **Tracción:** 4x4 / Delantera | **Color Exterior / Interior:** Gris Nardo / Cuero Negro
   - **Estado:** Único dueño, services oficiales al día, patente paga todo el año.
3. **Calculadora Interactiva de Financiación y Cuotas:**
   - Deslizador de entrega inicial ($ / USD) $\\rightarrow$ cálculo automático de cuotas a 12, 24, 36 o 48 meses.
4. **Cotización de Permuta / Entrega de Usado:**
   - Formulario rápido de 2 pasos para cotizar el auto del cliente como parte de pago.
5. **Botón WhatsApp Hiper-Personalizado con el Auto:**
   - *«Hola! Estoy en la web viendo el *BMW Serie 3 330i M-Sport (2022 - 28.000 km)* publicado en USD 52.000. Quiero coordinar para verlo y consultar por permuta.»*

---

## 🔍 2. Toolbar de Filtros Avanzados para Catálogos Automotrices

- **Buscador Inteligente:** Búsqueda por marca, modelo, rango de año o presupuesto.
- **Filtros Dinámicos:**
  - Carrocería: SUV, Sedán, Hatchback, Pick-Up, Coupé.
  - Combustible: Nafta, Diesel, Híbrido, Eléctrico.
  - Transmisión: Automática, Manual.
  - Rango de Precio y Kilometraje con sliders en tiempo real.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[wiki/concepts/Estandar_Superar_Expectativas|Estándar de Superar Expectativas]]
- [[wiki/concepts/Motor_Personalizacion_WhatsApp|Motor de Personalización de WhatsApp]]
- [[wiki/concepts/Organizacion_Fotos_y_Pagina_Producto|Organización de Fotos]]
- [[wiki/skills/webs-diferenciadas|Skill Maestra: Webs Diferenciadas]]
"""
sync_write('wiki/concepts/Arquitectura_Concesionarias_y_Productos_Avanzados.md', dealership_content)

# =========================================================================
# 3. ESTÁNDAR DE SUPERAR EXPECTATIVAS (wiki/concepts/)
# =========================================================================
exceed_expectations_content = f"""---
title: "Principio Operativo: El Estándar de Superar Expectativas 1000x"
type: "core-philosophy"
category: "Agent Quality Standard"
tags: [quality, exceed-expectations, elite-design, micro-interactions, ux-excellence]
last_updated: "{datetime.now().strftime('%Y-%m-%d')}"
---

# 🚀 Principio Operativo: El Estándar de Superar Expectativas 1000x

> **Mandato para cualquier Agente de IA:** Nunca construyas un producto "mínimo viable" plano ni una copia genérica. Cuando se te pida una web, debes entregar una experiencia de software de nivel mundial que asombre al usuario al primer segundo.

---

## 💎 Los 6 Pilares del Estándar de Excelencia

1. **Jerarquía Visual de Impacto Inmediato:**
   - Usar composiciones asimétricas (como la sección [[wiki/concepts/Diseno_Editorial_vs_Catalogo|THE DROP]]), tipografías display con personalidad y contrastes oscuros con gradientes HSL sutiles.
2. **Página Dedicada Obligatoria por Ítem:**
   - En cualquier e-commerce, catálogo o concesionaria, cada producto debe tener su página `/producto/[slug]` con galería completa, atributos enriquecidos y WhatsApp pre-cargado.
3. **Micro-Animaciones a 60 FPS:**
   - Hover states con zoom suave (`scale-105 duration-500`), transiciones de color sutiles en bordes, y estados de feedback interactivo instantáneo (ej. check verde al agregar a la lista).
4. **Zero-Cringe Copywriting:**
   - Hablar como una marca de lujo o boutique especializada. Jamás usar textos de infomercial de televisión.
5. **Herramientas Interactivas de Alto Valor:**
   - Integrar siempre calculadoras útiles (talles, financiación, cuotas, quizzes de estilo) que aumenten el tiempo de permanencia y resuelvan objeciones antes de hablar por WhatsApp.
6. **Mobile First Impecable:**
   - Toda interacción pesada en escritorio debe tener su contraparte táctil suave (`snap-x`, swipe horizontal) en teléfonos sin bloquear el scroll vertical.

---

## 🔗 Conexiones del Grafo:
- [[index|Índice Maestro]]
- [[AGENTS|Manual de Agentes]]
- [[wiki/skills/webs-diferenciadas|Skill Maestra: Webs Diferenciadas]]
- [[wiki/concepts/Arquitectura_Concesionarias_y_Productos_Avanzados|Blueprint de Concesionarias]]
- [[wiki/concepts/Motor_Personalizacion_WhatsApp|Motor de WhatsApp]]
"""
sync_write('wiki/concepts/Estandar_Superar_Expectativas.md', exceed_expectations_content)

# =========================================================================
# 4. ACTUALIZAR AGENTS.md e index.md
# =========================================================================

# Update AGENTS.md with mandatory rules
agents_path = VAULT_DIR / 'AGENTS.md'
if agents_path.exists():
    with open(agents_path, 'r', encoding='utf-8', errors='ignore') as f:
        ag_text = f.read()
    
    if '## 🚀 4. El Estándar de Superar Expectativas 1000x' not in ag_text:
        ag_text += """

---

## 🚀 4. El Estándar Obligatorio de Superar Expectativas 1000x
1. **Página Dedicada Obligatoria:** Todo catálogo o e-commerce (calzado, ropa, autos, inmuebles) debe abrir una página nueva `/producto/[slug]` o `/auto/[slug]` al hacer clic, con galería multi-foto y ficha técnica completa.
2. **Motor de WhatsApp Hiper-Personalizado:** Jamás generar enlaces con mensajes vacíos. Incluir modelo, talle, año o duda del chatbot en el mensaje pre-cargado.
3. **Estética de Nivel Mundial:** Aplicar el [[wiki/concepts/Estandar_Superar_Expectativas|Estándar de Excelencia]] en cada componente.
"""
        sync_write('AGENTS.md', ag_text)

# Update index.md
index_path = VAULT_DIR / 'index.md'
if index_path.exists():
    with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
        idx_text = f.read()
    
    if '[[wiki/concepts/Motor_Personalizacion_WhatsApp' not in idx_text:
        idx_text = idx_text.replace(
            '## 💡 4. Conceptos de Diseño, UX y Conversión',
            '## 💡 4. Conceptos de Diseño, UX y Conversión\n- [[wiki/concepts/Estandar_Superar_Expectativas|Principio: El Estándar de Superar Expectativas 1000x]]\n- [[wiki/concepts/Motor_Personalizacion_WhatsApp|Motor de Conversión: Personalización Extrema de Mensajes a WhatsApp]]\n- [[wiki/concepts/Arquitectura_Concesionarias_y_Productos_Avanzados|Blueprint: Concesionarias, Autos y Productos de Alta Gama]]\n- [[wiki/concepts/Organizacion_Fotos_y_Pagina_Producto|Organización de Fotos por Carpeta & Página de Detalle Multi-Foto]]'
        )
        sync_write('index.md', idx_text)

print("¡Módulos de WhatsApp, Concesionarias y Estándar de Excelencia creados e interconectados con éxito!")
