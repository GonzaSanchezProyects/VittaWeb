/* src/app/sitemap.ts */
import { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';
import { SERVICES, LOCATIONS } from '@/lib/seo-data'; // Importamos tu data maestra

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vittaweb.site'; 

  // 1. Páginas Estáticas (Home, Blog Index)
  const staticRoutes = [
    '',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  // 2. Artículos del Blog
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. SEO PROGRAMÁTICO (Servicios x Ciudades)
  // Generamos automáticamente las URLs para cada combinación
  const programmaticRoutes = SERVICES.flatMap((service) => 
    LOCATIONS.map((city) => ({
      url: `${baseUrl}/servicios/${service.slug}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Alta prioridad porque son Landing Pages de venta
    }))
  );

  return [...staticRoutes, ...blogRoutes, ...programmaticRoutes];
}