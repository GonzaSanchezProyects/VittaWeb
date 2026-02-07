import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://vittaweb.site'; // ⚠️ Tu dominio real

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'], // Si tuvieras rutas privadas
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}