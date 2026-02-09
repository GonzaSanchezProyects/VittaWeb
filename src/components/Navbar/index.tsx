/* src/components/Navbar/index.tsx */
'use client';
import { useState, useEffect } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
// YA NO IMPORTAMOS GoogleTranslate AQUÍ

const tabs = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'work', label: 'Proyectos' },
  { id: 'roadmap', label: 'Proceso' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('');
  const [time, setTime] = useState('');

  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 60], [1, 0]);
  const titleY = useTransform(scrollY, [0, 60], [0, -20]);
  const [isHidden, setIsHidden] = useState(false);
  
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsHidden(latest > 60);
    });
  }, [scrollY]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

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
      {/* ELIMINADO <GoogleTranslate /> DE AQUÍ */}

      <m.nav 
        className={styles.glassIsland}
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
      >
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/logo.png" alt="Vitta Web Logo" width={40} height={40} priority quality={75} />
              <span style={{ color: '#00e5ff', fontSize: '1.5rem', lineHeight: 1 }}>.</span>
            </div>
          </Link>
        </div>

        <div className={styles.navLinks} onMouseLeave={() => setActiveTab('')}>
          {tabs.map((tab) => (
            <a 
              key={tab.id} 
              href={`#${tab.id}`} 
              className={styles.linkItem}
              onMouseEnter={() => setActiveTab(tab.id)}
              onClick={(e) => handleScroll(e, tab.id)}
            >
              <span style={{position: 'relative', zIndex: 2}}>{tab.label}</span>
              {activeTab === tab.id && (
                <m.div layoutId="nav-pill" className={styles.activeTab} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
            </a>
          ))}
          {/* ELIMINADOS LOS BOTONES ES|EN DE AQUÍ */}
        </div>

        <div className={styles.statusPod}>
          <div className={styles.statusDot} />
          <div className={styles.statusText}>{time} <span style={{opacity: 0.5}}>MZA</span></div>
        </div>
      </m.nav>

      <m.div
          className={styles.brandTitle}
          style={{ opacity: titleOpacity, y: titleY, pointerEvents: isHidden ? 'none' : 'auto' }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
      >
          VITTA WEB<span className={styles.brandDot}>.</span>
      </m.div>
    </div>
  );
}