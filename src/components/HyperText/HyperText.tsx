'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './HyperText.module.css';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?";

interface HyperTextProps {
  text: string;
  className?: string;
  triggerOnLoad?: boolean; // Si queremos que pase al cargar
}

export default function HyperText({ text, className, triggerOnLoad = false }: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const iterations = useRef(0);

  const startScramble = () => {
    let iteration = 0;

    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return LETTERS[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }

      // Velocidad de resolución: 1/3 de letra por frame
      iteration += 1 / 3;
    }, 30); // Velocidad del cambio (ms)
  };

  // Efecto al pasar el mouse
  const handleMouseOver = () => {
    startScramble();
  };

  // Efecto al cargar (opcional)
  useEffect(() => {
    if (triggerOnLoad) {
      startScramble();
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []);

  return (
    <span 
      className={`${styles.hyperText} ${className || ''}`}
      onMouseOver={handleMouseOver}
      data-value={text}
    >
      {displayText}
    </span>
  );
}