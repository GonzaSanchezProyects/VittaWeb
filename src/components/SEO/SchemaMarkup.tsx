import Script from 'next/script';

type SchemaProps = {
  serviceName: string;
  cityName: string;
  coords: { lat: string; geo: string };
  url: string;
  description: string;
};

export default function SchemaMarkup({ serviceName, cityName, coords, url, description }: SchemaProps) {
  // 1. Schema del Servicio Local
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Vitta Studio - ${serviceName}`,
    "image": "https://vittaweb.site/og-image.jpg",
    "description": description,
    "url": url,
    "telephone": "+54 9 263 435 8897",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": "AR" // Idealmente esto debería venir de cityData.countryCode si lo tuvieras
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coords.lat,
      "longitude": coords.geo
    },
    "priceRange": "$$$",
    "areaServed": {
      "@type": "City",
      "name": cityName
    }
  };

  // 2. NUEVO: Schema de Breadcrumbs (Jerarquía)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://vittaweb.site"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": serviceName,
        "item": url // Técnicamente debería ser la categoría, pero esto sirve para SEO Local
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${serviceName} en ${cityName}`,
        "item": url
      }
    ]
  };

  return (
    <>
      <Script id="local-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(localBusinessSchema)}
      </Script>
      <Script id="breadcrumb-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
    </>
  );
}