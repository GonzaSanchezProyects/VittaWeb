'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
// 1. CAMBIO IMPORTANTE: Usamos 'motion' en lugar de 'm'
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import styles from './Cursor.module.css';

export default function Cursor() {
  const pathname = usePathname();
  
  // Si quieres que funcione en todas partes por ahora, comenta esta línea para probar
  const isServicePage = pathname?.includes('/servicios/');

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200, mass: 1.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      // Solo hacemos visible el cursor cuando el usuario mueve el mouse por primera vez
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!e.target) return;
      
      const target = e.target as HTMLElement;
      
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
  }, [mouseX, mouseY, isVisible]); // isVisible añadido a dependencias

  if (isServicePage) return null;

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
      <style jsx global>{`
        /* IMPORTANTE: Agregamos 'body' para asegurar que oculte el nativo */
        body, html, a, button, input { 
            cursor: none !important; 
        }
      `}</style>

      <div 
        className={styles.cursorContainer}
        // Usamos una clase condicional para la opacidad si prefieres, 
        // pero inline style está bien para esto.
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        
        {/* 2. CAMBIO IMPORTANTE: <motion.div> en vez de <m.div> */}
        
        {/* CAPA 1: El Núcleo */}
        <motion.div 
          className={styles.follower}
          style={{ x: mouseX, y: mouseY }}
        >
          <div className={styles.core} />
        </motion.div>

        {/* CAPA 2: El Mecanismo Pesado */}
        <motion.div 
          className={styles.follower}
          style={{ x: springX, y: springY }}
        >
          {/* El Rotor Giratorio */}
          <motion.div 
            className={styles.spinnerRing}
            variants={spinnerVariants}
            animate={isHovering ? "hover" : "normal"}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />

          {/* Las Miras de Bloqueo */}
          <motion.div 
            className={styles.lockBrackets}
            variants={bracketVariants}
            initial="normal"
            animate={isHovering ? "hover" : "normal"}
          >
            <div className={`${styles.bracket} ${styles.topLeft}`} />
            <div className={`${styles.bracket} ${styles.topRight}`} />
            <div className={`${styles.bracket} ${styles.bottomLeft}`} />
            <div className={`${styles.bracket} ${styles.bottomRight}`} />
          </motion.div>
        </motion.div>

      </div>
    </>
  );
}