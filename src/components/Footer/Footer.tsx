'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link'; // <--- Importamos Link
import { m } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const [time, setTime] = useState('');

  // Reloj
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      
      <div className={styles.container}>
        

        <div className={styles.separator} />

        {/* 2. GRILLA DE ENLACES (MÁS ORDENADA) */}
        <div className={styles.mainGrid}>
          
          {/* Columna 1: Brand & Status */}
          <div className={styles.brandColumn}>
            <span className={styles.logo}>VITTA WEB</span>
            <p className={styles.brandDesc}>
              Ingeniería web de alto rendimiento para negocios que buscan escalar.
            </p>
            
            {/* Status Pill Sutil */}
            <div className={styles.statusPill}>
              <span className={styles.dot}></span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className={styles.linksColumn}>
            <span className={styles.colHeader}>SITEMAP</span>
            <div className={styles.linkList}>
              <a href="#servicios" className={styles.link}>Servicios</a>
              <a href="#work" className={styles.link}>Proyectos</a>
              <a href="#roadmap" className={styles.link}>Proceso</a>
              <a href="#contacto" className={styles.link}>Contacto</a>
            </div>
          </div>

          {/* Columna 3: Socials */}
          <div className={styles.linksColumn}>
            <span className={styles.colHeader}>CONNECT</span>
            <div className={styles.linkList}>
              <a href="https://wa.link/syik33" className={styles.link}>Representante Whatsapp</a>
              <a href="mailto:hello@renderstudio.com" className={styles.link}>Representante Email</a>
            </div>
          </div>

        </div>

        {/* 3. BARRA INFERIOR (MINIMALISTA) */}
        <div className={styles.bottomBar}>
          <span className={styles.copyright}>© 2026 Vitta Web Inc.</span>
          <span className={styles.timeDisplay}>
            MZA <span className={styles.timeDivider}>//</span> {time}
          </span>
        </div>

      </div>
    </footer>
  );
}