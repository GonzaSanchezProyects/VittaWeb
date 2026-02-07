'use client';
import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion'; // Importamos 'm'
import styles from './Roadmap.module.css';

const steps = [
  {
    id: "01",
    title: "Auditoría y Estrategia",
    desc: "Analizamos su situación actual y definimos objetivos comerciales claros. No escribimos una línea de código hasta entender cómo vamos a vender."
  },
  {
    id: "02",
    title: "Diseño UX/UI Premium",
    desc: "Creamos prototipos visuales de alto impacto. Su marca transmitirá solidez, confianza y modernidad antes de que el usuario lea la primera palabra."
  },
  {
    id: "03",
    title: "Desarrollo e Ingeniería",
    desc: "Construimos el sitio sobre Next.js (tecnología usada por Netflix y Uber). Rápido, seguro y preparado para escalar sin romperse."
  },
  {
    id: "04",
    title: "Lanzamiento y Entrega",
    desc: "Configuramos servidores, dominios y correos. Le entregamos las llaves de un negocio digital 100% operativo y le enseñamos a usarlo."
  }
];

export default function Roadmap() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="roadmap" className={styles.section} ref={containerRef}>
      <div className={styles.header}>
        <span className={styles.label}>PROCESO SIN FRICCIÓN</span>
        <h2 className={styles.title}>Su camino hacia la transformación digital</h2>
      </div>

      <div className={styles.timelineContainer}>
        {/* Línea Base */}
        <div className={styles.lineBase} />
        
        {/* Línea de Luz (Optimizada con m.div) */}
        <m.div 
          className={styles.lineProgress} 
          style={{ height: lineHeight }} 
        />

        {steps.map((step, index) => (
          <Step key={index} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}

function Step({ step, index }: { step: any, index: number }) {
  // Animación de entrada simple con m.div
  return (
    <m.div 
      className={styles.stepItem}
      initial={{ opacity: 0.2 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: "-100px", once: false }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.stepIcon}>{step.id}</div>
      <div className={styles.stepContent}>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </div>
    </m.div>
  );
}