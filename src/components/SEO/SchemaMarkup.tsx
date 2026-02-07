import Script from 'next/script';

type SchemaProps = {
  serviceName: string;
  cityName: string;
  coords: { lat: string; geo: string };
  url: string;
  description: string;
};

export default function SchemaMarkup({ serviceName, cityName, coords, url, description }: SchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Vitta Web - ${serviceName} in ${cityName}`,
    "image": "https://vittaweb.com/logo.png", // Asegúrate de tener esta URL real
    "description": description,
    "url": url,
    "telephone": "+54 9 263 435 8897",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": "AR" // O dinámico si quieres hilar muy fino
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coords.lat,
      "longitude": coords.geo
    },
    "priceRange": "$$"
  };

  return (
    <Script id="schema-json-ld" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(schema)}
    </Script>
  );
}