import { MetadataRoute } from 'next'
import { PRODUCTOS, MARCAS } from '@/lib/productos'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sealstep.uy'

  // Rutas estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mayoristas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/slides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Rutas por marca
  const brandRoutes: MetadataRoute.Sitemap = MARCAS.map((marca) => ({
    url: `${baseUrl}/marca/${marca.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Rutas dinámicas de productos
  const productRoutes: MetadataRoute.Sitemap = PRODUCTOS.map((producto) => ({
    url: `${baseUrl}/producto/${producto.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [...staticRoutes, ...brandRoutes, ...productRoutes]
}
