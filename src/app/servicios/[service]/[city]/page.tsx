import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LOCATIONS, SERVICES } from '@/lib/seo-data';
import SchemaMarkup from '@/components/SEO/SchemaMarkup';
import styles from './Programmatic.module.css';

// 1. GENERACIÓN ESTÁTICA (SSG) - ¡La clave de la velocidad!
export async function generateStaticParams() {
  const params = [];

  for (const service of SERVICES) {
    for (const city of LOCATIONS) {
      // Verificamos si existe el contenido para ese idioma
      if ((city.language === 'en' && service.en) || (city.language === 'es' && service.es)) {
        params.push({
          service: service.slug,
          city: city.slug,
        });
      }
    }
  }

  return params;
} // <--- ¡ESTA LLAVE ERA LA QUE FALTABA O ESTABA MAL PUESTA!

// 2. METADATA DINÁMICA
type Props = {
  params: Promise<{ service: string; city: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { service: serviceSlug, city: citySlug } = await params;
  
  const service = SERVICES.find(s => s.slug === serviceSlug);
  const city = LOCATIONS.find(c => c.slug === citySlug);

  if (!service || !city) return {};

  const content = city.language === 'en' ? service.en : service.es;
  
  // Reemplazamos variables en la descripción
  const description = content.meta_desc_template
    .replace('{city}', city.name)
    .replace('{demonym}', city.demonym);

  return {
    title: `${content.title_variations[0]} ${city.language === 'en' ? 'in' : 'en'} ${city.name} | Vitta Web`,
    description: description,
    alternates: {
      canonical: `https://vittaweb.site/servicios/${serviceSlug}/${citySlug}`,
    }
  };
}

// 3. COMPONENTE DE PÁGINA
export default async function ProgrammaticPage({ params }: Props) {
  const { service: serviceSlug, city: citySlug } = await params;

  const service = SERVICES.find(s => s.slug === serviceSlug);
  const city = LOCATIONS.find(c => c.slug === citySlug);

  if (!service || !city) return notFound();

  const content = city.language === 'en' ? service.en : service.es;
  
  // Título aleatorio para variar el contenido
  const randomTitle = content.title_variations[Math.floor(Math.random() * content.title_variations.length)];

  const dynamicDescription = content.value_prop
    .replace('{city}', city.name)
    .replace('{neighborhoods}', city.neighborhoods.join(', '));

  return (
    <main className={styles.container}>
      
      <SchemaMarkup 
        serviceName={service.name}
        cityName={city.name}
        coords={city.coords}
        url={`https://vittaweb.site/servicios/${serviceSlug}/${citySlug}`}
        description={dynamicDescription}
      />

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

      <section className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          {content.features.map((feature, i) => (
            <div key={i} className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span> {feature}
            </div>
          ))}
        </div>
      </section>

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

      <section className={styles.nearbySection}>
        <p className={styles.nearbyTitle}>
          {city.language === 'en' ? 'Also serving:' : 'También disponible en:'}
        </p>
        <div className={styles.linksGrid}>
          {LOCATIONS
            .filter(c => c.slug !== city.slug && c.language === city.language)
            .slice(0, 4)
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