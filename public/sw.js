// Seal Step — Service Worker v1.0
// Habilita el criterio de instalación PWA en Chrome/Edge/Android

const CACHE_NAME = 'sealstep-v1'

self.addEventListener('install', (event) => {
  // Activar inmediatamente sin esperar que se cierren otras pestañas
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// Estrategia: Network first, con fallback a cache para recursos estáticos
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Solo interceptar recursos del mismo origen y assets estáticos
  if (event.request.method !== 'GET') return
  if (!url.origin.includes(self.location.origin)) return

  // Para assets estáticos (imágenes, fuentes, CSS): cache first
  if (
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|woff2|woff|ico)$/)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached
          return fetch(event.request).then((response) => {
            if (response && response.status === 200) {
              cache.put(event.request, response.clone())
            }
            return response
          })
        })
      )
    )
    return
  }

  // Para todo lo demás: network first
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  )
})
