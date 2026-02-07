'use client';
import { useEffect, useRef } from 'react';
import styles from './Spotlight.module.css';

export default function Spotlight() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      // Actualizamos la posición del degradado instantáneamente
      divRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 229, 255, 0.06), transparent 40%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={divRef} className={styles.spotlightOverlay} />;
}