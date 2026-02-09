export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Vitta Studio", // Asegúrate que coincida con tu marca
    "image": "https://vittaweb.site/og-image.jpg",
    "description": "Estudio de ingeniería web especializado en Next.js, diseño de alto impacto y SEO técnico.",
    "@id": "https://vittaweb.site",
    "url": "https://vittaweb.site",
    "telephone": "+5492634XXXXXX", // ¡PON TU NÚMERO REAL!
    "priceRange": "$$", 
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mendoza",
      "addressCountry": "AR"
    },
    // ESTRATEGIA INTERNACIONAL (PRAGMATIC SEO)
    "areaServed": [
      { "@type": "Country", "name": "Argentina" },
      { "@type": "Country", "name": "United States" },
      { "@type": "City", "name": "Mendoza" },
      { "@type": "City", "name": "Miami" },
      { "@type": "City", "name": "New York" },
      { "@type": "City", "name": "Austin" },
      { "@type": "City", "name": "San Francisco" }
    ],
    "sameAs": [
      "https://www.linkedin.com/in/tuperfil",
      "https://www.instagram.com/tustudio"
    ],
    "knowsAbout": [
      "Next.js Development",
      "React Native",
      "SEO Técnico",
      "Cloud Architecture",
      "High Performance Web",
      "Desarrollo Web Argentina"
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
            "description": "Sitios web rápidos optimizados para conversión B2B y SEO."
          }
        },
        {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web App Development",
              "description": "Aplicaciones web progresivas (PWA) y SaaS."
            }
          }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}