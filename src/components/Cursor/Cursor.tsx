'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // <--- 1. Importamos el hook de rutas
import { m, useMotionValue, useSpring, Variants } from 'framer-motion';
import styles from './Cursor.module.css';

export default function Cursor() {
  // 2. Detectamos en qué página estamos
  const pathname = usePathname();
  
  // 3. Condición: Si la URL contiene "/servicios/", es true
  const isServicePage = pathname?.includes('/servicios/');

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Para evitar flash inicial

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200, mass: 1.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Verificación de seguridad por si e.target es null
      if (!e.target) return;
      
      const target = e.target as HTMLElement;
      
      // Lógica para detectar elementos clickeables
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // --- 4. EL INTERRUPTOR MÁGICO ---
  // Si estamos en una página de servicios, retornamos NULL.
  // Esto hace que el componente NO se renderice y NO inyecte el estilo que oculta el mouse.
  if (isServicePage) return null;

  // Variantes de animación (Tus estilos originales)
  const spinnerVariants: Variants = {
    normal: { scale: 1, opacity: 0.7, borderStyle: 'dashed' },
    hover: { scale: 0.5, opacity: 1, borderStyle: 'solid', borderColor: '#fff', borderWidth: '3px' }
  };

  const bracketVariants: Variants = {
    normal: { opacity: 0, scale: 1.5 },
    hover: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  return (
    <>
      {/* 5. ESTILO CONDICIONAL: 
          Solo ocultamos el mouse nativo si este componente se está renderizando.
          Al hacer "return null" arriba, esta etiqueta <style> desaparece y vuelve el mouse normal.
      */}
      <style jsx global>{`
        * { cursor: none !important; }
        body, html, a, button, input { cursor: none !important; }
      `}</style>

      <div 
        className={styles.cursorContainer}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        
        {/* CAPA 1: El Núcleo */}
        <m.div 
          className={styles.follower}
          style={{ x: mouseX, y: mouseY }}
        >
          <div className={styles.core} />
        </m.div>

        {/* CAPA 2: El Mecanismo Pesado */}
        <m.div 
          className={styles.follower}
          style={{ x: springX, y: springY }}
        >
          {/* El Rotor Giratorio */}
          <m.div 
            className={styles.spinnerRing}
            variants={spinnerVariants}
            animate={isHovering ? "hover" : "normal"}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />

          {/* Las Miras de Bloqueo */}
          <m.div 
            className={styles.lockBrackets}
            variants={bracketVariants}
            initial="normal"
            animate={isHovering ? "hover" : "normal"}
          >
            <div className={`${styles.bracket} ${styles.topLeft}`} />
            <div className={`${styles.bracket} ${styles.topRight}`} />
            <div className={`${styles.bracket} ${styles.bottomLeft}`} />
            <div className={`${styles.bracket} ${styles.bottomRight}`} />
          </m.div>
        </m.div>

      </div>
    </>
  );
}