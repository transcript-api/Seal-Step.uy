const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ No se encontró el archivo .env.local');
  process.exit(1);
}

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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error('❌ Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local');
  process.exit(1);
}

async function testConnection() {
  console.log('📡 Verificando conexión segura con Supabase...');
  
  // Consultar la vista pública segura
  const res = await fetch(`${url}/rest/v1/v_catalogo_productos?select=id,nombre,slug`, {
    headers: {
      'apikey': anonKey,
      'Authorization': `Bearer ${anonKey}`
    }
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('❌ Error de conexión:', res.status, err);
    process.exit(1);
  }

  const data = await res.json();
  console.log(`✅ ¡Conexión 100% exitosa!`);
  console.log(`📊 Total de productos leídos desde Supabase: ${data.length}`);
  console.log(`👟 Primeros productos detectados:`);
  data.slice(0, 3).forEach((p, i) => console.log(`   ${i + 1}. ${p.nombre} (${p.slug})`));
}

testConnection().catch((err) => {
  console.error('❌ Error inesperado:', err.message);
});
