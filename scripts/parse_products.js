const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'productos.ts');
const content = fs.readFileSync(filePath, 'utf8');

const startStr = 'export const PRODUCTOS: Producto[] = [';
const startIdx = content.indexOf(startStr);
if (startIdx === -1) {
  console.error('No se encontró el array PRODUCTOS en lib/productos.ts');
  process.exit(1);
}

const arrayStart = startIdx + startStr.length - 1;
let depth = 0;
let arrayEnd = -1;

for (let i = arrayStart; i < content.length; i++) {
  if (content[i] === '[') depth++;
  else if (content[i] === ']') {
    depth--;
    if (depth === 0) {
      arrayEnd = i + 1;
      break;
    }
  }
}

const arrayCode = content.slice(arrayStart, arrayEnd);
const products = eval(arrayCode);

console.log(`\n✅ Extraídos exitosamente ${products.length} productos desde lib/productos.ts\n`);

const summary = products.map((p, index) => ({
  n: index + 1,
  slug: p.slug,
  nombre: p.nombre,
  categoria: p.categoria,
  precio: p.precio,
  talles: p.talles.join(', '),
  colores: (p.colores || []).join(', '),
  totalImagenes: p.imagenes ? p.imagenes.length : 0,
  portada: p.imagenes && p.imagenes[0] ? p.imagenes[0].src : null
}));

console.table(summary.slice(0, 10)); // Mostrar los primeros 10
console.log(`... y ${summary.length - 10} productos más.`);

// Guardar JSON temporal de referencia para validación y auditoría
const outputPath = path.join(__dirname, 'extracted_products.json');
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`\n📁 Datos exportados para migración en: scripts/extracted_products.json`);
