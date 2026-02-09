'use client';
import { useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './GrowthMonitor.module.css';

// Componente para animar el número (Usa hooks, no necesita 'm' directo para el texto plano, pero es ligero)
function Counter({ value, unit }: { value: number, unit: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); 
  const springValue = useSpring(0, { duration: 2000, bounce: 0 });
  const displayValue = useTransform(springValue, (current) => Math.round(current));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      setDisplay(latest);
    });
    return () => unsubscribe();
  }, [displayValue]);

  return (
    <span ref={ref}>
      {display}<span className={styles.metricUnit}>{unit}</span>
    </span>
  );
}

export default function GrowthMonitor() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.textContent}>
          <span className={styles.label}>RENTABILIDAD DIGITAL</span>
          <h2 className={styles.title}>
            Diseñamos para <br/>
            mover la aguja.
          </h2>
          <p className={styles.description}>
            Una web bonita no sirve si no convierte. En Vitta Web priorizamos 
            la velocidad, la estructura SEO y la experiencia de usuario para 
            maximizar el retorno de su inversión.
          </p>
        </div>

        <div className={styles.metricsGrid}>
          
          <div className={styles.card}>
            <span className={styles.metricValue}>
              <Counter value={98} unit="%" />
            </span>
            <span className={styles.metricLabel}>Performance Google</span>
            <svg className={`${styles.chartLine} notranslate`} viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M0 35 Q 25 35 35 20 T 70 15 T 100 5" />
            </svg>
          </div>

          <div className={styles.card}>
            <span className={styles.metricValue}>
              <Counter value={2} unit="s" />
            </span>
            <span className={styles.metricLabel}>Tiempo de Carga</span>
             <svg className={`${styles.chartLine} notranslate`} viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M0 5 Q 50 5 50 35 T 100 35" /> 
            </svg>
          </div>

          <div className={styles.card}>
            <span className={styles.metricValue}>
              +<Counter value={45} unit="%" />
            </span>
            <span className={styles.metricLabel}>Retención de Clientes</span>
             <svg className={`${styles.chartLine} notranslate`} viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M0 30 L 20 25 L 40 28 L 60 10 L 80 15 L 100 2" />
            </svg>
          </div>

           <div className={styles.card}>
            <span className={styles.metricValue}>
              24<span className={styles.metricUnit}>/7</span>
            </span>
            <span className={styles.metricLabel}>Ventas Automáticas</span>
            <svg className={`${styles.chartLine} notranslate`} viewBox="0 0 100 40" preserveAspectRatio="none">
               <path d="M0 35 L 100 35" strokeDasharray="5,5" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}