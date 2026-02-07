// src/app/servicios/[service]/[city]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LOCATIONS, SERVICES } from '@/lib/seo-data';
import SchemaMarkup from '@/components/SEO/SchemaMarkup';
import styles from './Programmatic.module.css';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ service: string; city: string }>;
};

// --- 1. METADATA DINÁMICA (SEO) ---
export async function generateMetadata({ params }: Props) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = SERVICES.find(s => s.slug === serviceSlug);
  const city = LOCATIONS.find(c => c.slug === citySlug);

  if (!service || !city) return {};

  const content = city.language === 'en' ? service.en : service.es;
  
  // Reemplazo de variables en la meta description
  const description = content.meta_desc_template
    .replace('{city}', city.name)
    .replace('{demonym}', city.demonym);

  return {
    title: `${content.title_variations[0]} ${city.language === 'en' ? 'in' : 'en'} ${city.name} | Vitta Web`,
    description: description,
    alternates: {
      canonical: `https://vittaweb.com/servicios/${serviceSlug}/${citySlug}`,
    }
  };
}

// --- 2. COMPONENTE DE PÁGINA ---
export default async function ProgrammaticPage({ params }: Props) {
  const { service: serviceSlug, city: citySlug } = await params;

  const service = SERVICES.find(s => s.slug === serviceSlug);
  const city = LOCATIONS.find(c => c.slug === citySlug);

  if (!service || !city) return notFound();

  // Detectamos idioma y cargamos contenido
  const content = city.language === 'en' ? service.en : service.es;

  // Spintax simple: Título aleatorio para evitar contenido 100% idéntico
  const randomTitle = content.title_variations[Math.floor(Math.random() * content.title_variations.length)];

  // Procesamos el texto de propuesta de valor
  const dynamicDescription = content.value_prop
    .replace('{city}', city.name)
    .replace('{neighborhoods}', city.neighborhoods.join(', '));

  return (
    <main className={styles.container}>
      
      {/* INYECCIÓN DE SCHEMA (Invisible) */}
      <SchemaMarkup 
        serviceName={service.name}
        cityName={city.name}
        coords={city.coords}
        url={`https://vittaweb.com/servicios/${serviceSlug}/${citySlug}`}
        description={dynamicDescription}
      />

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.gridBg} />
        
        <div className={styles.content}>
          <span className={styles.pill}>
            {content.available_in} {city.name.toUpperCase()}
          </span>
          
          <h1 className={styles.title}>
            {randomTitle} <br />
            <span className={styles.highlight}>
              {city.language === 'en' ? 'in' : 'en'} {city.name}.
            </span>
          </h1>
          
          <p className={styles.description}>
            {dynamicDescription}
          </p>

          <div className={styles.buttonGroup}>
            <Link href="/#contacto" className={styles.primaryBtn}>
              {content.cta}
            </Link>
            <Link href="/" className={styles.secondaryBtn}>
              {content.back_home}
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN FEATURES (NUEVA) */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          {content.features.map((feature, i) => (
            <div key={i} className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span> {feature}
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN FAQs DINÁMICAS (NUEVA - Vital para SEO) */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>
          FAQ - {service.name} {city.language === 'en' ? 'in' : 'en'} {city.name}
        </h2>
        <div className={styles.faqGrid}>
          {content.faqs.map((faq, i) => (
            <div key={i} className={styles.faqCard}>
              <h3>{faq.q.replace('{city}', city.name)}</h3>
              <p>{faq.a.replace('{city}', city.name).replace('{neighborhoods}', city.neighborhoods[0])}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERLINKING (La Telaraña) */}
      <section className={styles.nearbySection}>
        <p className={styles.nearbyTitle}>
          {city.language === 'en' ? 'Also serving:' : 'También disponible en:'}
        </p>
        <div className={styles.linksGrid}>
          {LOCATIONS
            .filter(c => c.slug !== city.slug && c.language === city.language) // Solo mostramos ciudades del mismo idioma
            .slice(0, 4) // Solo 4 para no saturar
            .map(c => (
             <Link key={c.slug} href={`/servicios/${service.slug}/${c.slug}`} className={styles.cityLink}>
               {c.name}
             </Link>
          ))}
        </div>
      </section>

    </main>
  );
}