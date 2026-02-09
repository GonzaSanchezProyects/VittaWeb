'use client';
import { useState, useEffect } from 'react';
import { m, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Definimos si es un link interno (#) o una página nueva (/)
const tabs = [
  { id: 'servicios', label: 'Servicios', path: '/#servicios', type: 'scroll' },
  { id: 'work', label: 'Proyectos', path: '/#work', type: 'scroll' },
  { id: 'roadmap', label: 'Proceso', path: '/#roadmap', type: 'scroll' },
  { id: 'blog', label: 'Blog', path: '/blog', type: 'page' }, // <--- NUEVO
  { id: 'contacto', label: 'Contacto', path: '/#contacto', type: 'scroll' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('');
  const [time, setTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado del menú móvil
  
  const pathname = usePathname(); // Para saber si estamos en Home o Blog
  const { scrollY } = useScroll();

  // Animaciones del Título central
  const titleOpacity = useTransform(scrollY, [0, 60], [1, 0]);
  const titleY = useTransform(scrollY, [0, 60], [0, -20]);
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

  // Manejo inteligente de clicks
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, tab: typeof tabs[0]) => {
    // 1. Siempre cerramos el menú móvil al hacer click
    setIsMobileMenuOpen(false);

    // 2. Si es el Blog, dejamos que Next.js navegue normal
    if (tab.type === 'page') return;

    // 3. Si es scroll y estamos en la HOME, hacemos scroll suave
    if (tab.type === 'scroll' && pathname === '/') {
      e.preventDefault();
      setActiveTab(tab.id);
      const targetId = tab.path.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    // 4. Si estamos en /blog y clickeamos "Servicios", el Link de Next nos llevará a la home automáticamente.
  };

  return (
    <>
      <div className={styles.navContainer}>
        
        <m.nav 
          className={styles.glassIsland}
          initial={{ y: -50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
        >
          {/* LOGO */}
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink} onClick={() => setIsMobileMenuOpen(false)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image src="/logo.png" alt="Vitta Web Logo" width={40} height={40} priority quality={75} />
                <span style={{ color: '#00e5ff', fontSize: '1.5rem', lineHeight: 1 }}>.</span>
              </div>
            </Link>
          </div>

          {/* LINKS DESKTOP (Se ocultan en móvil vía CSS) */}
          <div className={styles.desktopLinks} onMouseLeave={() => setActiveTab('')}>
            {tabs.map((tab) => (
              <Link 
                key={tab.id} 
                href={tab.path} 
                className={styles.linkItem}
                onMouseEnter={() => setActiveTab(tab.id)}
                onClick={(e) => handleLinkClick(e, tab)}
              >
                <span style={{position: 'relative', zIndex: 2}}>{tab.label}</span>
                {activeTab === tab.id && (
                  <m.div layoutId="nav-pill" className={styles.activeTab} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
              </Link>
            ))}
          </div>

          {/* STATUS POD (Desktop) */}
          <div className={styles.statusPod}>
            <div className={styles.statusDot} />
            <div className={styles.statusText}>{time} <span style={{opacity: 0.5}}>MZA</span></div>
          </div>

          {/* BOTÓN HAMBURGUESA (Móvil) */}
          <button 
            className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </m.nav>

        {/* TÍTULO CENTRAL (Desktop) */}
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

      {/* --- MENÚ MÓVIL FULLSCREEN --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div 
            className={styles.mobileMenuOverlay}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
             <div className={styles.mobileLinksContainer}>
                {tabs.map((tab, index) => (
                  <m.div
                    key={tab.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Link 
                      href={tab.path} 
                      className={styles.mobileLink}
                      onClick={(e) => handleLinkClick(e, tab)}
                    >
                      {tab.label}
                      {/* Indicador visual si es el Blog */}
                      {tab.type === 'page' && <span className={styles.pageIndicator}>↗</span>}
                    </Link>
                  </m.div>
                ))}
             </div>
             
             {/* Info extra en móvil */}
             <m.div 
               className={styles.mobileFooter}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
             >
                <p>{time} MZA, ARG</p>
                <p>gonzalo@vittaweb.site</p>
             </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}