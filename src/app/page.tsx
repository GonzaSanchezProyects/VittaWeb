/* src/app/page.tsx */
import Hero from "@/components/Hero/Hero";
import TechStream from "@/components/TechStream/TechStream";
import Services from "@/components/Services/Services";
import Work from "@/components/Work/Work";
import Contact from "@/components/Contact/Contact";
import Spotlight from "@/components/Spotlight/Spotlight";
import GrowthMonitor from "@/components/GrowthMonitor/GrowthMonitor";
import Roadmap from "@/components/Roadmap/Roadmap";
import Background from "@/components/Background/Background";
import Footer from "@/components/Footer/Footer";
import About from "@/components/About/About";

export default function Home() {
  // Datos Estructurados para Google (SEO Local)
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Vitta Web',
    image: 'https://vittaweb.site/og-image.jpg',
    '@id': 'https://vittaweb.site',
    url: 'https://vittaweb.site',
    telephone: '+5492634272885', // REEMPLAZA CON TU NÚMERO REAL
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'San Martín',
      addressLocality: 'San Martín',
      addressRegion: 'Mendoza',
      postalCode: '5570',
      addressCountry: 'AR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.083, 
      longitude: -68.476
    },
    sameAs: [
      'https://www.instagram.com/vittaweb'
    ]
  };

  return (
    <main style={{ position: 'relative', overflow: 'visible' }}>
      
      {/* SCRIPT INVISIBLE PARA GOOGLE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      
      <Spotlight />

      {/* 1. FONDO PLASMA GLOBAL */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '150vh',
        zIndex: 0, 
        overflow: 'hidden' 
      }}>
          <Background />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '300px',
            background: 'linear-gradient(to bottom, transparent, #050505)',
            zIndex: 1
          }} />
      </div>

      {/* 2. HERO SECTION */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
      </div>

      {/* 3. TECH STREAM */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '-20px' }}>
        <TechStream />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '80px',
          pointerEvents: 'none',
          zIndex: 2
        }} />
      </div>

      {/* 4. RESTO DE LA WEB */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        backgroundColor: '#050505', 
        paddingTop: '50px' 
      }}> 
         <GrowthMonitor />
         <About />
         <Services />
         <Roadmap />
         <Work />
         <Contact />
         <Footer />
      </div>
    </main>
  );
}