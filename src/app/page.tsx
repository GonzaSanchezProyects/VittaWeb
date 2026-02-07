/* src/app/page.tsx */
import Hero from "@/components/Hero/Hero";
import TechStream from "@/components/TechStream/TechStream";
import Services from "@/components/Services/Services";
import Work from "@/components/Work/Work";
import Contact from "@/components/Contact/Contact";
import Spotlight from "@/components/Spotlight/Spotlight";
import Cursor from "@/components/Cursor/Cursor";
import GrowthMonitor from "@/components/GrowthMonitor/GrowthMonitor";
import Roadmap from "@/components/Roadmap/Roadmap";
import Background from "@/components/Background/Background";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main style={{ position: 'relative', overflow: 'visible' }}>
      
      <Cursor />
      <Spotlight />

      {/* 1. FONDO PLASMA GLOBAL (Detrás de todo el bloque superior) */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '150vh', /* Cubre Hero + un poco más */
        zIndex: 0, 
        overflow: 'hidden' 
      }}>
          <Background />
          {/* Degradado final del plasma para que muera en negro suavemente */}
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

      {/* 3. TECH STREAM CON SU PROPIO DEGRADADO */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '-20px' }}>
        
        {/* El componente */}
        <TechStream />
        
        {/* MÁSCARA LOCAL: Solo oscurece la parte de abajo de ESTA franja */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '80px', /* Altura pequeña para no tapar el texto */
          background: 'linear-gradient(to bottom, transparent, #050505)',
          pointerEvents: 'none',
          zIndex: 2
        }} />
      </div>

      {/* 4. RESTO DE LA WEB (Fondo Negro Sólido) */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        backgroundColor: '#050505', 
        paddingTop: '50px' /* Espacio para respirar */
      }}>
         <GrowthMonitor />
         <Services />
         <Roadmap />
         <Work />
         <Contact />
         <Footer />
      </div>
      
      
    </main>
  );
}