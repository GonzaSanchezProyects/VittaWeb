import { MetadataRoute } from 'next';
import { LOCATIONS, SERVICES } from '@/lib/seo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  // ⚠️ CAMBIA ESTO POR TU DOMINIO REAL FINAL
  const baseUrl = 'https://vittaweb.site'; 

  // 1. Páginas estáticas (Home, etc)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ];

  // 2. Generación automática de las páginas programáticas
  const programmaticPages = [];

  for (const service of SERVICES) {
    for (const city of LOCATIONS) {
      // Verificamos compatibilidad de idioma si es necesario
      if (service[city.language]) {
        programmaticPages.push({
          url: `${baseUrl}/servicios/${service.slug}/${city.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8, // Alta prioridad, son tus landing pages de venta
        });
      }
    }
  }

  return [...staticPages, ...programmaticPages];
}