// src/components/JsonLd.tsx
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // Más específico que LocalBusiness
    "name": "Vitta Web",
    "image": "https://vittaweb.site/og-image.jpg",
    "description": "Agencia de desarrollo web de alto rendimiento y transformación digital.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mendoza",
      "addressCountry": "AR"
    },
    "priceRange": "$$$", // Filtra clientes que buscan barato
    "knowsAbout": [ // KEYWORD STUFFING LEGAL
      "Next.js Development",
      "React Native",
      "SEO Técnico",
      "Cloud Architecture",
      "E-commerce High Traffic"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Desarrollo",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desarrollo Web Corporativo",
            "description": "Sitios web rápidos optimizados para conversión B2B."
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}