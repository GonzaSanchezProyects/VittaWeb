'use client';
import { useRef, useState } from 'react';
// CORRECCIÓN: Usamos 'm'
import { m } from 'framer-motion';
import styles from './MagneticButton.module.css';

export default function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    
    // Calculamos el centro del botón
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Movemos el botón un poco
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <m.button
      ref={ref}
      className={styles.magneticBtn}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <span className={styles.text}>{children}</span>
      <div className={styles.fill} />
    </m.button>
  );
}