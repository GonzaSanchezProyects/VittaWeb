'use client';
import { useInView, useSpring, useTransform, m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './GrowthMonitor.module.css';

// Componente Counter con protección 'notranslate'
function Counter({ value, unit = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Ajusté la duración a 2.5s para que se aprecie la subida
  const springValue = useSpring(0, { duration: 2500, bounce: 0 });
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
    // AQUI ESTÁ LA CLAVE: 'notranslate' y translate="no"
    <span 
      ref={ref} 
      className={`${styles.counterWrapper} notranslate`} 
      translate="no"
    >
      {prefix}{display}<span className={styles.metricUnit}>{unit}</span>
    </span>
  );
}

export default function GrowthMonitor() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.textContent}>
          <span className={styles.label}>DOMINIO EN GOOGLE</span>
          <h2 className={styles.title}>
            De nada sirve una web <br/>
            <span className={styles.highlightText}>que nadie visita.</span>
          </h2>
          <p className={styles.description}>
            La mayoría de las webs son desiertos digitales. Nosotros construimos 
            autopistas. Con una arquitectura <strong>SEO-First</strong>, hacemos que 
            su negocio aparezca justo cuando sus clientes lo están buscando.
            Sin pagar publicidad.
          </p>
          
          <div className={styles.trustBadge}>
            <div className={styles.greenDot}></div>
            <span>Estrategias indexables por Google 2024</span>
          </div>
        </div>

        <div className={styles.metricsGrid}>
          
          {/* TARJETA 1: TRÁFICO */}
          <div className={`${styles.card} ${styles.cardFeatured}`}>
            <span className={styles.metricTitle}>Visitas Orgánicas / Mes</span>
            <div className={styles.metricValueContainer}>
              <Counter value={15} unit="k" prefix="+" />
            </div>
            <p className={styles.metricSub}>Clientes potenciales gratis</p>
            
            <svg className={styles.chartSvg} viewBox="0 0 100 40" preserveAspectRatio="none">
              <m.path 
                d="M0 35 Q 20 35 30 25 T 60 15 T 100 5" 
                fill="none" 
                stroke="url(#gradientTraffic)" 
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradientTraffic" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#00e5ff"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* TARJETA 2: VELOCIDAD */}
          <div className={styles.card}>
            <span className={styles.metricTitle}>Velocidad de Carga</span>
             <div className={styles.metricValueContainer}>
              <Counter value={99} unit="/100" />
            </div>
            <p className={styles.metricSub}>Google premia la rapidez</p>
             <svg className={styles.chartSvg} viewBox="0 0 100 30" preserveAspectRatio="none">
              <m.path 
                d="M0 20 L 100 20" 
                fill="none" 
                stroke="#4ade80" 
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              />
            </svg>
          </div>

          {/* TARJETA 3: CONVERSIÓN */}
          <div className={styles.card}>
            <span className={styles.metricTitle}>Tasa de Conversión</span>
             <div className={styles.metricValueContainer}>
              <Counter value={300} unit="%" prefix="+" />
            </div>
            <p className={styles.metricSub}>Visitantes que compran</p>
            <svg className={styles.chartSvg} viewBox="0 0 100 40" preserveAspectRatio="none">
               <m.path 
                d="M0 35 L 20 30 L 40 32 L 60 15 L 80 20 L 100 2" 
                fill="none" 
                stroke="#a855f7" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
            </svg>
          </div>

           {/* TARJETA 4: INDEXACIÓN */}
           <div className={styles.card}>
            <span className={styles.metricTitle}>Visibilidad Web</span>
             <div className={styles.metricValueContainer}>
               {/* Agregamos notranslate aquí también por si acaso */}
              <span className={`${styles.staticText} notranslate`} translate="no">Top 3</span>
            </div>
            <p className={styles.metricSub}>Resultados de búsqueda</p>
             <div className={styles.rankBars}>
               <m.div className={styles.bar} initial={{height: 10}} whileInView={{height: 20}} transition={{delay:0.5}} />
               <m.div className={styles.bar} initial={{height: 10}} whileInView={{height: 35}} transition={{delay:0.6}} />
               <m.div className={`${styles.bar} ${styles.activeBar}`} initial={{height: 10}} whileInView={{height: 50}} transition={{delay:0.7}} />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}