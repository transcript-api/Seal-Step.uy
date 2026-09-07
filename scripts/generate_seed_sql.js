const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'extracted_products.json');
const products = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function escapeSqlArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return "'{}'::TEXT[]";
  const items = arr.map((item) => `"${String(item).replace(/"/g, '\\"')}"`);
  return `'${JSON.stringify(items).replace(/'/g, "''")}'::TEXT[]`.replace('[', '{').replace(']', '}');
}

function inferBrand(nombre, categoria) {
  const n = nombre.toLowerCase();
  if (n.includes('nike')) return 'Nike';
  if (n.includes('adidas')) return 'Adidas';
  if (n.includes('new balance')) return 'New Balance';
  if (n.includes('vans')) return 'Vans';
  if (n.includes('puma')) return 'Puma';
  if (n.includes('chancla') || n.includes('slide')) return 'Slides';
  return 'General';
}

function parsePrice(precio) {
  if (!precio) return 'NULL';
  // si contiene números ej: "$ 2500" o "2500"
  const clean = String(precio).replace(/[^0-9.]/g, '');
  if (clean && !isNaN(Number(clean))) {
    return Number(clean).toFixed(2);
  }
  return 'NULL';
}

let sql = `-- ==============================================================================
-- SEAL STEP — POBLACIÓN DE DATOS DE PRODUCTOS (SEED IDEMPOTENTE)
-- Total de productos: ${products.length}
-- Generado automáticamente desde lib/productos.ts
-- ==============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Iniciando carga de catálogo en Supabase...';
END $$;

`;

let totalVariantesCount = 0;
let totalImagenesCount = 0;

products.forEach((p, idx) => {
  const brand = inferBrand(p.nombre, p.categoria);
  const precioVal = parsePrice(p.precio);
  const fotosRealesVal = p.fotosReales ? 'true' : 'false';
  const stockGeneral = escapeSql(p.stock || 'disponible');
  const detallesSql = p.detalles && p.detalles.length > 0
    ? `ARRAY[${p.detalles.map(d => escapeSql(d)).join(', ')}]::TEXT[]`
    : `'{}'::TEXT[]`;

  sql += `\n-- ----------------------------------------------------------------------------\n`;
  sql += `-- Producto #${idx + 1}: ${p.slug}\n`;
  sql += `-- ----------------------------------------------------------------------------\n`;

  // 1. Insert Producto
  sql += `INSERT INTO public.productos (
  slug, nombre, subtitulo, categoria, marca, badge, descripcion, detalles, fotos_reales, precio, estado_stock_general, visible, activo
) VALUES (
  ${escapeSql(p.slug)},
  ${escapeSql(p.nombre)},
  ${escapeSql(p.subtitulo || null)},
  ${escapeSql(p.categoria)},
  ${escapeSql(brand)},
  ${escapeSql(p.badge || null)},
  ${escapeSql(p.descripcion || '')},
  ${detallesSql},
  ${fotosRealesVal},
  ${precioVal},
  ${stockGeneral},
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  subtitulo = EXCLUDED.subtitulo,
  categoria = EXCLUDED.categoria,
  marca = EXCLUDED.marca,
  badge = EXCLUDED.badge,
  descripcion = EXCLUDED.descripcion,
  detalles = EXCLUDED.detalles,
  fotos_reales = EXCLUDED.fotos_reales,
  precio = EXCLUDED.precio,
  estado_stock_general = EXCLUDED.estado_stock_general,
  updated_at = now();\n\n`;

  // 2. Insert Imágenes
  if (p.imagenes && p.imagenes.length > 0) {
    p.imagenes.forEach((img, imgIdx) => {
      totalImagenesCount++;
      const esPrincipal = imgIdx === 0 ? 'true' : 'false';
      sql += `INSERT INTO public.producto_imagenes (producto_id, url, alt, orden, es_principal)
VALUES (
  (SELECT id FROM public.productos WHERE slug = ${escapeSql(p.slug)}),
  ${escapeSql(img.src)},
  ${escapeSql(img.alt || p.nombre)},
  ${imgIdx},
  ${esPrincipal}
)
ON CONFLICT (producto_id, url) DO UPDATE SET
  alt = EXCLUDED.alt,
  orden = EXCLUDED.orden,
  es_principal = EXCLUDED.es_principal;\n`;
    });
  }

  // 3. Insert Variantes (Talles y Colores)
  const colores = p.colores && p.colores.length > 0 ? p.colores : [p.subtitulo || 'Estándar'];
  if (p.talles && p.talles.length > 0) {
    p.talles.forEach((talle) => {
      colores.forEach((color) => {
        totalVariantesCount++;
        const sku = `${p.slug}-${talle}-${color.toLowerCase().replace(/[^a-z0-9]/g, '-')}`.slice(0, 50);
        sql += `INSERT INTO public.producto_variantes (producto_id, sku, talle, color, stock, activo)
VALUES (
  (SELECT id FROM public.productos WHERE slug = ${escapeSql(p.slug)}),
  ${escapeSql(sku)},
  ${escapeSql(talle)},
  ${escapeSql(color)},
  NULL, -- Stock inicial no inventado: queda NULL para conteo físico posterior
  true
)
ON CONFLICT (producto_id, talle, color) DO NOTHING;\n`;
      });
    });
  }
});

sql += `\n-- Resumen final\n`;
sql += `DO $$
DECLARE
  prod_count INT;
  img_count INT;
  var_count INT;
BEGIN
  SELECT COUNT(*) INTO prod_count FROM public.productos;
  SELECT COUNT(*) INTO img_count FROM public.producto_imagenes;
  SELECT COUNT(*) INTO var_count FROM public.producto_variantes;
  RAISE NOTICE '✅ Migración completada exitosamente.';
  RAISE NOTICE 'Total productos en base: %', prod_count;
  RAISE NOTICE 'Total imágenes registradas: %', img_count;
  RAISE NOTICE 'Total variantes registradas: %', var_count;
END $$;\n`;

const outDir = path.join(__dirname, '..', 'supabase', 'seeds');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, '20260906_seed_productos.sql');
fs.writeFileSync(outFile, sql, 'utf8');

console.log(`\n🎉 Archivo de migración SQL generado con éxito!`);
console.log(`📁 Destino: supabase/seeds/20260906_seed_productos.sql`);
console.log(`📊 Estadísticas:`);
console.log(`   - ${products.length} productos procesados.`);
console.log(`   - ${totalImagenesCount} sentencias de imágenes.`);
console.log(`   - ${totalVariantesCount} variantes de talle/color (stock = NULL documentado).`);
