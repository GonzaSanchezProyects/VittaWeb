// src/lib/seo-data.ts

// =====================================================================
// 1. DEFINICIÓN DE TIPOS (INTERFACES)
// =====================================================================

export interface CityData {
  slug: string;
  name: string;
  language: 'es' | 'en';
  demonym: string; 
  country: string;
  neighborhoods: string[]; 
  coords: { lat: string; geo: string }; 
}

export interface ServiceContent {
  title_variations: string[];
  meta_desc_template: string;
  value_prop: string;
  features: string[];
  faqs: { q: string; a: string }[];
  cta: string;
  back_home: string;
  available_in: string;
  reasons_title: string;
}

export interface ServiceData {
  slug: string;
  name: string;
  schemaType: string;
  es: ServiceContent;
  en: ServiceContent;
}

// =====================================================================
// 2. BASE DE DATOS GEOGRÁFICA MASIVA (GLOBAL TARGETS)
// =====================================================================
export const LOCATIONS: CityData[] = [
  
  // --- 🇺🇸 USA: EAST COAST & FLORIDA (Zona Horaria Compatible) ---
  { 
    slug: 'miami', name: 'Miami', language: 'en', demonym: 'Miami', country: 'USA', 
    neighborhoods: ['Brickell', 'Wynwood', 'Downtown', 'Coral Gables', 'Design District'], 
    coords: { lat: "25.761", geo: "-80.191" } 
  },
  { 
    slug: 'new-york', name: 'New York', language: 'en', demonym: 'NYC', country: 'USA', 
    neighborhoods: ['Manhattan', 'Brooklyn', 'SoHo', 'Tribeca', 'Financial District'], 
    coords: { lat: "40.712", geo: "-74.006" } 
  },
  { 
    slug: 'boston', name: 'Boston', language: 'en', demonym: 'Boston', country: 'USA', 
    neighborhoods: ['Cambridge', 'Seaport', 'Back Bay', 'Beacon Hill'], 
    coords: { lat: "42.360", geo: "-71.058" } 
  },
  { 
    slug: 'orlando', name: 'Orlando', language: 'en', demonym: 'Orlando', country: 'USA', 
    neighborhoods: ['Downtown', 'Lake Nona', 'Winter Park'], 
    coords: { lat: "28.538", geo: "-81.379" } 
  },
  { 
    slug: 'fort-lauderdale', name: 'Fort Lauderdale', language: 'en', demonym: 'Ft. Lauderdale', country: 'USA', 
    neighborhoods: ['Las Olas', 'Flagler Village', 'Victoria Park'], 
    coords: { lat: "26.122", geo: "-80.137" } 
  },

  // --- 🇺🇸 USA: TECH HUBS (West & Central) ---
  { 
    slug: 'san-francisco', name: 'San Francisco', language: 'en', demonym: 'Bay Area', country: 'USA', 
    neighborhoods: ['SoMa', 'Mission District', 'Palo Alto', 'Cupertino'], 
    coords: { lat: "37.774", geo: "-122.419" } 
  },
  { 
    slug: 'los-angeles', name: 'Los Angeles', language: 'en', demonym: 'LA', country: 'USA', 
    neighborhoods: ['Santa Monica', 'Venice', 'Hollywood', 'Beverly Hills'], 
    coords: { lat: "34.052", geo: "-118.243" } 
  },
  { 
    slug: 'austin', name: 'Austin', language: 'en', demonym: 'Austin', country: 'USA', 
    neighborhoods: ['Downtown', 'South Congress', 'The Domain', 'East Austin'], 
    coords: { lat: "30.267", geo: "-97.743" } 
  },
  { 
    slug: 'seattle', name: 'Seattle', language: 'en', demonym: 'Seattle', country: 'USA', 
    neighborhoods: ['Capitol Hill', 'South Lake Union', 'Belltown', 'Fremont'], 
    coords: { lat: "47.606", geo: "-122.332" } 
  },
  { 
    slug: 'chicago', name: 'Chicago', language: 'en', demonym: 'Chicago', country: 'USA', 
    neighborhoods: ['The Loop', 'River North', 'West Loop', 'Lincoln Park'], 
    coords: { lat: "41.878", geo: "-87.629" } 
  },
  { 
    slug: 'dallas', name: 'Dallas', language: 'en', demonym: 'Dallas', country: 'USA', 
    neighborhoods: ['Uptown', 'Deep Ellum', 'Highland Park'], 
    coords: { lat: "32.776", geo: "-96.797" } 
  },
  { 
    slug: 'houston', name: 'Houston', language: 'en', demonym: 'Houston', country: 'USA', 
    neighborhoods: ['Downtown', 'Midtown', 'The Heights', 'River Oaks'], 
    coords: { lat: "29.760", geo: "-95.369" } 
  },

  // --- 🇨🇦 CANADÁ & 🇬🇧 UK ---
  { 
    slug: 'toronto', name: 'Toronto', language: 'en', demonym: 'Toronto', country: 'Canada', 
    neighborhoods: ['Old Toronto', 'Yorkville', 'Liberty Village', 'King West'], 
    coords: { lat: "43.651", geo: "-79.383" } 
  },
  { 
    slug: 'vancouver', name: 'Vancouver', language: 'en', demonym: 'Vancouver', country: 'Canada', 
    neighborhoods: ['Yaletown', 'Gastown', 'Kitsilano'], 
    coords: { lat: "49.282", geo: "-123.120" } 
  },
  { 
    slug: 'london', name: 'London', language: 'en', demonym: 'London', country: 'UK', 
    neighborhoods: ['Shoreditch', 'Canary Wharf', 'Soho', 'Westminster', 'Camden'], 
    coords: { lat: "51.507", geo: "-0.127" } 
  },
  { 
    slug: 'manchester', name: 'Manchester', language: 'en', demonym: 'Mancunian', country: 'UK', 
    neighborhoods: ['Northern Quarter', 'Spinningfields', 'Deansgate'], 
    coords: { lat: "53.480", geo: "-2.242" } 
  },

  // --- 🇦🇷 ARGENTINA (Federal) ---
  { 
    slug: 'mendoza', name: 'Mendoza', language: 'es', demonym: 'mendocinas', country: 'Argentina', 
    neighborhoods: ['Godoy Cruz', 'Chacras de Coria', 'Maipú', 'Ciudad', 'Dalvian'], 
    coords: { lat: "-32.889", geo: "-68.845" } 
  },
  { 
    slug: 'buenos-aires', name: 'Buenos Aires', language: 'es', demonym: 'porteñas', country: 'Argentina', 
    neighborhoods: ['Palermo', 'Recoleta', 'Puerto Madero', 'Belgrano', 'San Telmo'], 
    coords: { lat: "-34.603", geo: "-58.381" } 
  },
  { 
    slug: 'cordoba', name: 'Córdoba', language: 'es', demonym: 'cordobesas', country: 'Argentina', 
    neighborhoods: ['Nueva Córdoba', 'Cerro de las Rosas', 'General Paz', 'Villa Belgrano'], 
    coords: { lat: "-31.420", geo: "-64.188" } 
  },
  { 
    slug: 'rosario', name: 'Rosario', language: 'es', demonym: 'rosarinas', country: 'Argentina', 
    neighborhoods: ['Pichincha', 'Centro', 'Fisherton', 'Puerto Norte'], 
    coords: { lat: "-32.944", geo: "-60.650" } 
  },
  { 
    slug: 'la-plata', name: 'La Plata', language: 'es', demonym: 'platenses', country: 'Argentina', 
    neighborhoods: ['City Bell', 'Gonnet', 'Centro', 'Tolosa'], 
    coords: { lat: "-34.920", geo: "-57.954" } 
  },
  { 
    slug: 'mar-del-plata', name: 'Mar del Plata', language: 'es', demonym: 'marplatenses', country: 'Argentina', 
    neighborhoods: ['Güemes', 'Playa Grande', 'Los Troncos', 'Constitución'], 
    coords: { lat: "-38.005", geo: "-57.556" } 
  },
  { 
    slug: 'neuquen', name: 'Neuquén', language: 'es', demonym: 'neuquinas', country: 'Argentina', 
    neighborhoods: ['Vaca Muerta', 'Centro', 'Santa Genoveva'], 
    coords: { lat: "-38.951", geo: "-68.059" } 
  },
  { 
    slug: 'tucuman', name: 'San Miguel de Tucumán', language: 'es', demonym: 'tucumanas', country: 'Argentina', 
    neighborhoods: ['Yerba Buena', 'Barrio Norte', 'Centro'], 
    coords: { lat: "-26.808", geo: "-65.217" } 
  },

  // --- 🌎 LATAM POWERHOUSES ---
  { 
    slug: 'santiago', name: 'Santiago', language: 'es', demonym: 'chilenas', country: 'Chile', 
    neighborhoods: ['Las Condes', 'Vitacura', 'Providencia', 'Lo Barnechea'], 
    coords: { lat: "-33.448", geo: "-70.669" } 
  },
  { 
    slug: 'montevideo', name: 'Montevideo', language: 'es', demonym: 'uruguayas', country: 'Uruguay', 
    neighborhoods: ['Carrasco', 'Pocitos', 'Punta Carretas', 'Ciudad Vieja'], 
    coords: { lat: "-34.901", geo: "-56.164" } 
  },
  { 
    slug: 'punta-del-este', name: 'Punta del Este', language: 'es', demonym: 'esteñas', country: 'Uruguay', 
    neighborhoods: ['La Barra', 'Manantiales', 'Península', 'Beverly Hills'], 
    coords: { lat: "-34.963", geo: "-54.943" } 
  },
  { 
    slug: 'cdmx', name: 'Ciudad de México', language: 'es', demonym: 'mexicanas', country: 'México', 
    neighborhoods: ['Polanco', 'Roma Norte', 'Condesa', 'Santa Fe', 'Lomas de Chapultepec'], 
    coords: { lat: "19.432", geo: "-99.133" } 
  },
  { 
    slug: 'monterrey', name: 'Monterrey', language: 'es', demonym: 'regias', country: 'México', 
    neighborhoods: ['San Pedro Garza García', 'Valle Oriente', 'Centro'], 
    coords: { lat: "25.686", geo: "-100.316" } 
  },
  { 
    slug: 'guadalajara', name: 'Guadalajara', language: 'es', demonym: 'tapatías', country: 'México', 
    neighborhoods: ['Zapopan', 'Puerta de Hierro', 'Americana'], 
    coords: { lat: "20.659", geo: "-103.349" } 
  },
  { 
    slug: 'bogota', name: 'Bogotá', language: 'es', demonym: 'colombianas', country: 'Colombia', 
    neighborhoods: ['Chapinero', 'Usaquén', 'El Chicó', 'Zona T'], 
    coords: { lat: "4.711", geo: "-74.072" } 
  },
  { 
    slug: 'medellin', name: 'Medellín', language: 'es', demonym: 'paisas', country: 'Colombia', 
    neighborhoods: ['El Poblado', 'Laureles', 'Envigado'], 
    coords: { lat: "6.244", geo: "-75.581" } 
  },
  { 
    slug: 'lima', name: 'Lima', language: 'es', demonym: 'peruanas', country: 'Perú', 
    neighborhoods: ['Miraflores', 'San Isidro', 'Barranco', 'La Molina'], 
    coords: { lat: "-12.046", geo: "-77.042" } 
  },
  { 
    slug: 'panama', name: 'Ciudad de Panamá', language: 'es', demonym: 'panameñas', country: 'Panamá', 
    neighborhoods: ['Costa del Este', 'Punta Pacífica', 'Obarrio', 'Casco Antiguo'], 
    coords: { lat: "8.982", geo: "-79.519" } 
  },

  // --- 🇪🇸 ESPAÑA (Mercado en Euros) ---
  { 
    slug: 'madrid', name: 'Madrid', language: 'es', demonym: 'madrileñas', country: 'España', 
    neighborhoods: ['Salamanca', 'Chamberí', 'Malasaña', 'Retiro', 'Chamartín'], 
    coords: { lat: "40.416", geo: "-3.703" } 
  },
  { 
    slug: 'barcelona', name: 'Barcelona', language: 'es', demonym: 'catalanas', country: 'España', 
    neighborhoods: ['Eixample', 'Gràcia', 'Sarrià-Sant Gervasi', 'Poblenou'], 
    coords: { lat: "41.385", geo: "2.173" } 
  },
  { 
    slug: 'valencia', name: 'Valencia', language: 'es', demonym: 'valencianas', country: 'España', 
    neighborhoods: ['Ruzafa', 'El Carmen', 'Ciutat Vella'], 
    coords: { lat: "39.469", geo: "-0.376" } 
  },
  { 
    slug: 'malaga', name: 'Málaga', language: 'es', demonym: 'malagueñas', country: 'España', 
    neighborhoods: ['Soho', 'Pedregalejo', 'La Malagueta'], 
    coords: { lat: "36.721", geo: "-4.420" } 
  },
];


// =====================================================================
// 3. BASE DE DATOS DE SERVICIOS (CONTENIDO BILINGÜE COMPLETO)
// =====================================================================
export const SERVICES: ServiceData[] = [
  // --- SERVICIO 1: DESARROLLO WEB ---
  { 
    slug: 'desarrollo-web', 
    name: 'Web Development', 
    schemaType: 'WebSite',
    
    es: {
      title_variations: ['Desarrollo Web de Alto Impacto', 'Diseño de Páginas Web Profesionales', 'Agencia de Programación Web', 'Soluciones Web Corporativas'],
      meta_desc_template: 'Agencia líder en desarrollo web en {city}. Creamos sitios ultra-rápidos con Next.js para empresas {demonym}. Diseño premium y código limpio.',
      value_prop: 'Tu empresa en {city} merece más que una plantilla lenta. Desarrollamos ingeniería de software real para que destaques en zonas como {neighborhoods} y superes a tu competencia en Google.',
      features: ['Velocidad de carga < 1s', 'Optimización SEO Nativa', 'Diseño UX/UI Premium', 'Hosting Edge Global'],
      faqs: [
        { q: '¿Por qué Vitta Web es diferente a otras agencias de {city}?', a: 'Porque no usamos constructores visuales lentos. Programamos a mano usando React y Next.js, la misma tecnología que usan Uber y Airbnb, garantizando escalabilidad absoluta.' },
        { q: '¿Cuánto tarda un desarrollo web?', a: 'Depende del alcance, pero un sitio corporativo de alto rendimiento para el mercado de {city} suele estar listo en 3 a 4 semanas.' }
      ],
      cta: 'COTIZAR PROYECTO',
      back_home: 'VOLVER AL INICIO',
      available_in: 'DISPONIBLE EN',
      reasons_title: 'Por qué elegirnos en'
    },

    en: {
      title_variations: ['High-Performance Web Development', 'Custom Web Design Agency', 'Next.js & React Experts', 'Corporate Web Solutions'],
      meta_desc_template: 'Top-tier web development agency serving {city}. We build ultra-fast Next.js websites for {demonym} businesses. US-quality code, nearshore rates.',
      value_prop: 'Stop losing customers to slow websites. We engineer high-performance digital experiences tailored for the {city} market, helping you dominate areas like {neighborhoods}.',
      features: ['Sub-second Load Times', 'Technical SEO Core', 'Premium UX/UI Design', 'Edge Network Hosting'],
      faqs: [
        { q: 'Why choose Vitta Web for my business in {city}?', a: 'We offer Silicon Valley quality code at competitive nearshore rates. We are aligned with your timezone and understand the fast-paced nature of the {city} market.' },
        { q: 'Do you use templates?', a: 'Never. We build custom software solutions using Next.js and Tailwind CSS to ensure maximum performance and security.' }
      ],
      cta: 'GET A QUOTE',
      back_home: 'BACK TO HOME',
      available_in: 'SERVING',
      reasons_title: 'Why choose us in'
    }
  },

  // --- SERVICIO 2: E-COMMERCE ---
  { 
    slug: 'ecommerce', 
    name: 'E-Commerce', 
    schemaType: 'OnlineStore',
    
    es: {
      title_variations: ['Tiendas Online que Venden Solas', 'Desarrollo de E-commerce a Medida', 'Tu Negocio Abierto 24/7', 'Expertos en Shopify y Woocommerce'],
      meta_desc_template: 'Vende tus productos en todo {country} desde {city}. Tiendas online optimizadas para conversión con pagos locales y logística integrada.',
      value_prop: 'Transformamos visitantes en compradores leales. Creamos experiencias de compra sin fricción adaptadas al consumidor de {city}, integrando MercadoPago y logística local.',
      features: ['Pasarelas de Pago Locales', 'Panel Autoadministrable', 'Recuperación de Carritos', 'Sincronización de Stock'],
      faqs: [
        { q: '¿Puedo vender fuera de {city}?', a: 'Por supuesto. Configuramos la logística para que puedas enviar tus productos desde {city} a todo el país e incluso exportar.' },
        { q: '¿Es seguro para mis clientes?', a: 'Implementamos seguridad de grado bancario (SSL) y cumplimos con todas las normativas de protección de datos vigentes en {country}.' }
      ],
      cta: 'CREAR TIENDA',
      back_home: 'VOLVER AL INICIO',
      available_in: 'VENTAS EN',
      reasons_title: 'E-commerce en'
    },

    en: {
      title_variations: ['High-Conversion E-commerce', 'Custom Online Store Development', 'Scalable Digital Retail Solutions', 'Headless E-commerce Experts'],
      meta_desc_template: 'Scale your sales in {city} and beyond. Custom e-commerce architectures integrated with Stripe, PayPal, and modern logistics.',
      value_prop: 'Turn traffic into revenue. We build friction-free shopping experiences tailored for the {city} customer base, optimized for mobile and high conversion rates.',
      features: ['Stripe & PayPal Integration', 'Headless Architecture', 'Real-time Inventory', 'Global Shipping Logic'],
      faqs: [
        { q: 'Do you work with Shopify or Custom Code?', a: 'We specialize in both. For high-scale brands in {city}, we recommend Headless Shopify (Shopify Plus + Next.js frontend) for maximum speed.' },
        { q: 'Is my store secure?', a: 'Absolutely. We implement PCI-compliant payment flows and enterprise-grade security protocols.' }
      ],
      cta: 'START SELLING',
      back_home: 'BACK TO HOME',
      available_in: 'COMMERCE IN',
      reasons_title: 'E-commerce in'
    }
  },

  // --- SERVICIO 3: SOFTWARE A MEDIDA ---
  { 
    slug: 'software-a-medida', 
    name: 'Custom Software', 
    schemaType: 'SoftwareApplication',
    
    es: {
      title_variations: ['Desarrollo de Software a Medida', 'Sistemas de Gestión SaaS', 'Automatización de Procesos', 'Ingeniería de Software Corporativo'],
      meta_desc_template: 'Software empresarial diseñado para optimizar procesos en {city}. Dashboards, CRMs y herramientas internas desarrolladas a medida.',
      value_prop: 'Tu empresa en {city} es única, tu software también debería serlo. Eliminamos las planillas de Excel y automatizamos tu operación con sistemas en la nube seguros y escalables.',
      features: ['Dashboards en Tiempo Real', 'APIs Escalables', 'Seguridad Corporativa', 'Propiedad del Código'],
      faqs: [
        { q: '¿El software será propiedad de mi empresa?', a: 'Sí. A diferencia de alquilar un SaaS, al finalizar el proyecto te entregamos el 100% del código fuente y la propiedad intelectual.' },
        { q: '¿Dan soporte en {city}?', a: 'Brindamos soporte técnico prioritario y mantenimiento evolutivo para asegurar que tu sistema crezca junto con tu negocio.' }
      ],
      cta: 'SOLICITAR CONSULTORÍA',
      back_home: 'VOLVER AL INICIO',
      available_in: 'SOLUCIONES EN',
      reasons_title: 'Software en'
    },

    en: {
      title_variations: ['Custom Software Engineering', 'SaaS Product Development', 'Enterprise Digital Solutions', 'Internal Tools & Automation'],
      meta_desc_template: 'Enterprise-grade software solutions for businesses in {city}. Custom Dashboards, CRMs, and SaaS platforms built to scale.',
      value_prop: 'Streamline your operations in {city} with custom software. We build secure, scalable cloud systems that automate workflows and provide real-time business intelligence.',
      features: ['BI Dashboards', 'Scalable Microservices', 'Enterprise Security', 'Full IP Ownership'],
      faqs: [
        { q: 'Will I own the code?', a: 'Yes. We work as your technical partners. Upon completion, full intellectual property and source code are transferred to your company.' },
        { q: 'Can you integrate with our existing tools?', a: 'Yes, we are experts in API integrations, connecting your new software seamlessly with tools like Salesforce, HubSpot, or Slack.' }
      ],
      cta: 'BOOK CONSULTATION',
      back_home: 'BACK TO HOME',
      available_in: 'SOLUTIONS IN',
      reasons_title: 'Software in'
    }
  },

  // --- SERVICIO 4: SEO TÉCNICO ---
  { 
    slug: 'seo-tecnico', 
    name: 'Technical SEO', 
    schemaType: 'ProfessionalService',
    
    es: {
      title_variations: ['Consultoría SEO Técnico', 'Posicionamiento Web Avanzado', 'Estrategia de SEO Local', 'Auditoría y Optimización SEO'],
      meta_desc_template: 'Domina los resultados de búsqueda en {city}. Estrategias de SEO Técnico y optimización de velocidad para rankear primero en Google.',
      value_prop: 'No hacemos magia, hacemos ingeniería. Optimizamos la arquitectura de tu web, los Core Web Vitals y la relevancia semántica para capturar el tráfico de {city}.',
      features: ['Auditoría Técnica', 'Optimización Core Web Vitals', 'Linkbuilding de Autoridad', 'Estrategia de Contenidos'],
      faqs: [
        { q: '¿Cuánto tiempo tarda en funcionar el SEO en {city}?', a: 'El SEO es una inversión a mediano plazo. Sin embargo, con nuestras optimizaciones técnicas, solemos ver mejoras notables en impresiones y clics a partir del tercer mes.' },
        { q: '¿Sirve para negocios locales?', a: 'Es vital. Optimizamos tu ficha de Google Maps y tu sitio para aparecer cuando alguien busca tus servicios desde barrios como {neighborhoods}.' }
      ],
      cta: 'AUDITORÍA GRATIS',
      back_home: 'VOLVER AL INICIO',
      available_in: 'SEO EN',
      reasons_title: 'SEO en'
    },

    en: {
      title_variations: ['Technical SEO Consulting', 'Advanced Search Engine Optimization', 'Local SEO Strategy', 'Google Ranking Experts'],
      meta_desc_template: 'Dominate search results in {city}. Technical SEO strategies and Core Web Vitals optimization to outrank your competitors.',
      value_prop: 'We don\'t believe in SEO magic, we believe in engineering. We optimize your site architecture, speed, and semantic relevance to capture high-intent traffic in {city}.',
      features: ['Deep Technical Audit', 'Core Web Vitals Optimization', 'Authority Linkbuilding', 'Local SEO Domination'],
      faqs: [
        { q: 'How long to see results in {city}?', a: 'SEO is a mid-to-long term game. However, our technical fixes often result in significant ranking boosts within the first 90 days.' },
        { q: 'Do you handle Local SEO?', a: 'Yes. We optimize your digital footprint to ensure you appear top-of-page for searches originating from areas like {neighborhoods}.' }
      ],
      cta: 'FREE AUDIT',
      back_home: 'BACK TO HOME',
      available_in: 'RANKING IN',
      reasons_title: 'Why SEO in'
    }
  }
];