/* src/components/GrowthMonitor/GrowthMonitor.tsx */
'use client';
import { useRef } from 'react';
import { useInView, m, useSpring, useTransform } from 'framer-motion';
import styles from './GrowthMonitor.module.css';

interface CounterProps {
  value: number;
  unit?: string;
  prefix?: string;
}

function Counter({ value, unit = "", prefix = "" }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  if (isInView) {
    spring.set(value);
  }

  return (
    <span ref={ref} className="notranslate" translate="no">
      {prefix}
      <m.span>{display}</m.span>
      {unit}
    </span>
  );
}

export default function GrowthMonitor() {
  return (
    <section className={styles.monitorSection}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Resultados que se ven en el banco.</h2>
          <p className={styles.subtitle}>
            El código limpio no es solo estética. Es velocidad, posicionamiento y ventas.
          </p>
        </div>

        <div className={styles.grid}>
          {/* CARD 1: TRÁFICO */}
          <div className={styles.card}>
            <div className={styles.chartContainer}>
               <svg viewBox="0 0 100 40" className={styles.chart}>
                 <m.path 
                   d="M0 35 Q 25 35, 35 20 T 70 15 T 100 5" 
                   fill="none" 
                   stroke="#00e5ff" 
                   strokeWidth="2"
                   initial={{ pathLength: 0 }}
                   whileInView={{ pathLength: 1 }}
                   transition={{ duration: 1.5, ease: "easeInOut" }}
                 />
                 <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0, 229, 255, 0.2)" />
                    <stop offset="100%" stopColor="rgba(0, 229, 255, 0)" />
                 </linearGradient>
                 <m.path 
                   d="M0 35 Q 25 35, 35 20 T 70 15 T 100 5 V 40 H 0 Z" 
                   fill="url(#gradient1)" 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ delay: 0.5, duration: 1 }}
                 />
               </svg>
            </div>
            <div className={styles.metric}>
              <h3>
                <Counter value={15} prefix="+" unit="k" />
              </h3>
              <p>Visitas Orgánicas / Mes</p>
            </div>
          </div>

          {/* CARD 2: VELOCIDAD */}
          <div className={styles.card}>
            <div className={styles.chartContainer}>
               <div className={styles.speedCircle}>
                 <svg viewBox="0 0 36 36">
                   <path
                     d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                     fill="none"
                     stroke="rgba(255, 255, 255, 0.1)"
                     strokeWidth="2"
                   />
                   <m.path
                     d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                     fill="none"
                     stroke="#00ff88"
                     strokeWidth="2"
                     strokeDasharray="100, 100"
                     initial={{ pathLength: 0 }}
                     whileInView={{ pathLength: 0.99 }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                   />
                 </svg>
                 <div className={styles.circleText}>
                    <span className="notranslate" translate="no">99</span>
                 </div>
               </div>
            </div>
            <div className={styles.metric}>
              <h3>Google PageSpeed</h3>
              <p>Carga Instantánea (&lt;1s)</p>
            </div>
          </div>

          {/* CARD 3: CONVERSIÓN */}
          <div className={styles.card}>
            <div className={styles.chartContainer}>
               <svg viewBox="0 0 100 40" className={styles.chart}>
                 <m.rect 
                   x="10" y="20" width="10" height="20" fill="#333" 
                   initial={{ height: 0, y: 40 }}
                   whileInView={{ height: 20, y: 20 }}
                   transition={{ duration: 0.5 }}
                 />
                 <m.rect 
                   x="30" y="15" width="10" height="25" fill="#444" 
                   initial={{ height: 0, y: 40 }}
                   whileInView={{ height: 25, y: 15 }}
                   transition={{ duration: 0.5, delay: 0.1 }}
                 />
                 <m.rect 
                   x="50" y="25" width="10" height="15" fill="#333" 
                   initial={{ height: 0, y: 40 }}
                   whileInView={{ height: 15, y: 25 }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                 />
                 <m.rect 
                   x="70" y="5" width="10" height="35" fill="#00e5ff" 
                   initial={{ height: 0, y: 40 }}
                   whileInView={{ height: 35, y: 5 }}
                   transition={{ duration: 0.5, delay: 0.3 }}
                 />
               </svg>
            </div>
            <div className={styles.metric}>
              <h3>
                 <Counter value={300} prefix="+" unit="%" />
              </h3>
              <p>Tasa de Conversión</p>
            </div>
          </div>

          {/* CARD 4: RANKING (FAKE GOOGLE AWARD) */}
          <div className={styles.card}>
             <div className={styles.googleBadge}>
                <div className={styles.googleRing}></div>
                <div className={styles.googleInner}>
                   <span className={styles.googleG}>G</span>
                   <span className="notranslate" translate="no">#1</span>
                </div>
             </div>
             <div className={styles.metric}>
              <h3>Top 3</h3>
              <p>En Keywords Locales</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}   