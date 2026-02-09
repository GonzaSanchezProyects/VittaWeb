'use client';
import { useState, useEffect } from 'react';
import { m, useScroll, useTransform } from 'framer-motion'; // Importamos useScroll y useTransform
import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link'; 


const tabs = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'work', label: 'Proyectos' },
  { id: 'roadmap', label: 'Proceso' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('');
  const [time, setTime] = useState('');

  // 1. Detectamos el scroll global
  const { scrollY } = useScroll();

  // 2. Transformamos el scroll en opacidad y escala para el título
  // De 0px a 60px de scroll -> Opacidad baja de 1 a 0.
  const titleOpacity = useTransform(scrollY, [0, 60], [1, 0]);
  
  // Opcional: Que también se vaya un poco para arriba
  const titleY = useTransform(scrollY, [0, 60], [0, -20]);
  
  // Opcional: Controlar "pointer-events" para que no se pueda clickear cuando es invisible
  const [isHidden, setIsHidden] = useState(false);
  
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsHidden(latest > 60);
    });
  }, [scrollY]);


  // Reloj
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  // --- FUNCIÓN DE SCROLL SUAVE ---
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.navContainer}>
      
      <m.nav 
        className={styles.glassIsland}
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
      >
        
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <div style={{ display: 'flex', alignItems: 'center' }}> {/* Flex para alinear imagen y punto */}
              
              <Image 
                src="/logo.png" 
                alt="Vitta Web Logo" 
                width={40}       // ANCHO REAL de tu imagen (cámbialo al correcto)
                height={40}       // ALTO REAL de tu imagen
                priority          // ¡CRUCIAL! Esto le dice a Google "carga esto primero"
                quality={75}     // Para que el logo se vea nítido
              />
              
              {/* El punto cian */}
              <span style={{ color: '#00e5ff', fontSize: '1.5rem', lineHeight: 1 }}>.</span>
              
            </div>
          </Link>
        </div>

        <div 
          className={styles.navLinks} 
          onMouseLeave={() => setActiveTab('')} 
        >
          {tabs.map((tab) => (
            <a 
              key={tab.id} 
              href={`#${tab.id}`} 
              className={styles.linkItem}
              onMouseEnter={() => setActiveTab(tab.id)}
              onClick={(e) => handleScroll(e, tab.id)}
            >
              <span style={{position: 'relative', zIndex: 2}}>
                {tab.label}
              </span>

              {activeTab === tab.id && (
                <m.div
                  layoutId="nav-pill" 
                  className={styles.activeTab}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className={styles.statusPod}>
          <div className={styles.statusDot} />
          <div className={styles.statusText}>
            {time} <span style={{opacity: 0.5}}>MZA</span>
          </div>
        </div>
      </m.nav>

      {/* 3. TÍTULO QUE DESAPARECE AL SCROLL */}
      <m.div
          className={styles.brandTitle}
          // Usamos los valores transformados del scroll
          style={{ 
            opacity: titleOpacity, 
            y: titleY,
            pointerEvents: isHidden ? 'none' : 'auto' // Evita clicks fantasma
          }}
          initial={{ opacity: 0, y: -30 }} // La animación inicial de entrada se mantiene, pero Framer la fusionará
          animate={{ opacity: 1, y: 0 }}   // Esto podría pelear con el scroll, mejor dejar que el style controle después de la carga
          transition={{ duration: 0.8, ease: "easeOut" }}
      >
          VITTA WEB<span className={styles.brandDot}>.</span>
      </m.div>
    </div>
  );
}