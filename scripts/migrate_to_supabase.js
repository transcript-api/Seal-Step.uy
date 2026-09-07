const fs = require('fs');
const path = require('path');

// Cargar variables de entorno desde .env.local si existe
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      process.env[key] = val;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('================================================================');
console.log('🚀 SEAL STEP — ASISTENTE DE MIGRACIÓN A SUPABASE');
console.log('================================================================\n');

if (!supabaseUrl || !serviceKey || supabaseUrl.includes('tu-proyecto') || serviceKey.includes('tu-service-role')) {
  console.log('⚠️  AVISO DE CREDENCIALES:');
  console.log('Aún no has configurado tus credenciales reales de Supabase en .env.local.');
  console.log('\nPasos para configurarlas:');
  console.log('1. Abre o crea el archivo: sealstep/.env.local');
  console.log('2. Coloca tus valores obtenidos de tu panel de Supabase:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=https://tu-id.supabase.co');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key');
  console.log('\nAdicionalmente, se han generado 2 archivos SQL listos para tu proyecto:');
  console.log('📄 1. Estructura y RLS: sealstep/supabase/migrations/20260906_init_schema.sql');
  console.log('📄 2. Catálogo completo: sealstep/supabase/seeds/20260906_seed_productos.sql');
  console.log('\nPuedes copiar y pegar el contenido de ambos archivos en el SQL Editor');
  console.log('de Supabase (Dashboard -> SQL Editor -> New Query -> Run) para ejecutar');
  console.log('la migración de manera instantánea y 100% segura.');
  process.exit(0);
}

// Si las credenciales están presentes, ejecutar migración directa
async function runDirectMigration() {
  console.log(`📡 Conectando con Supabase: ${supabaseUrl}...`);
  const productsPath = path.join(__dirname, 'extracted_products.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  let okProds = 0;
  let okImgs = 0;
  let okVars = 0;

  for (const p of products) {
    // 1. Upsert Producto
    const prodPayload = {
      slug: p.slug,
      nombre: p.nombre,
      subtitulo: p.subtitulo || null,
      categoria: p.categoria,
      marca: p.nombre.toLowerCase().includes('nike') ? 'Nike' :
             p.nombre.toLowerCase().includes('adidas') ? 'Adidas' :
             p.nombre.toLowerCase().includes('new balance') ? 'New Balance' : 'General',
      badge: p.badge || null,
      descripcion: p.descripcion,
      detalles: p.detalles || [],
      fotos_reales: p.fotosReales ?? true,
      precio: p.precio ? Number(String(p.precio).replace(/[^0-9.]/g, '')) : null,
      estado_stock_general: p.stock || 'disponible',
      visible: true,
      activo: true
    };

    const resProd = await fetch(`${supabaseUrl}/rest/v1/productos`, {
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify(prodPayload)
    });

    if (!resProd.ok) {
      const err = await resProd.text();
      console.error(`❌ Error insertando producto ${p.slug}:`, err);
      continue;
    }

    const insertedProds = await resProd.json();
    const prodId = insertedProds[0]?.id;
    okProds++;

    if (!prodId) continue;

    // 2. Upsert Imágenes
    if (p.imagenes && p.imagenes.length > 0) {
      const imgPayloads = p.imagenes.map((img, idx) => ({
        producto_id: prodId,
        url: img.src,
        alt: img.alt || p.nombre,
        orden: idx,
        es_principal: idx === 0
      }));

      const resImgs = await fetch(`${supabaseUrl}/rest/v1/producto_imagenes`, {
        method: 'POST',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(imgPayloads)
      });

      if (resImgs.ok) {
        okImgs += imgPayloads.length;
      }
    }

    // 3. Upsert Variantes
    const colores = p.colores && p.colores.length > 0 ? p.colores : [p.subtitulo || 'Estándar'];
    if (p.talles && p.talles.length > 0) {
      const varPayloads = [];
      p.talles.forEach((talle) => {
        colores.forEach((col) => {
          varPayloads.push({
            producto_id: prodId,
            sku: `${p.slug}-${talle}-${col.toLowerCase().replace(/[^a-z0-9]/g, '-')}`.slice(0, 50),
            talle: talle,
            color: col,
            stock: null, // No inventado
            activo: true
          });
        });
      });

      const resVars = await fetch(`${supabaseUrl}/rest/v1/producto_variantes`, {
        method: 'POST',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(varPayloads)
      });

      if (resVars.ok) {
        okVars += varPayloads.length;
      }
    }
  }

  console.log(`\n🎉 Migración directa completada con éxito!`);
  console.log(`- Productos migrados: ${okProds}/${products.length}`);
  console.log(`- Imágenes vinculadas: ${okImgs}`);
  console.log(`- Variantes generadas: ${okVars}`);
}

runDirectMigration().catch((err) => {
  console.error('Error durante la migración:', err);
});
