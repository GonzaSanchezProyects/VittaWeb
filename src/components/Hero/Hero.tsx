'use client';
import { m } from 'framer-motion';
import Link from 'next/link'; // Importamos Link
import styles from './Hero.module.css';
import MagneticButton from '../MagneticButton/MagneticButton';

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      
      {/* Fondo Grilla */}
      <m.div 
        className={styles.gridBackground} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <div className={styles.contentWrapper}>

        <m.div 
          className={styles.label}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          DESARROLLO WEB PARA NEGOCIOS Y EMPRESAS
        </m.div>

        <div className={styles.textLayerContainer}>
          <span className={styles.titleWireframe}>
            Su negocio merece <br />
            Estar en internet.
          </span>

          <m.h1 
            className={styles.titleReal}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ 
              duration: 1.5, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5
            }}
          >
            Su negocio merece <br />
            <span className={styles.highlight}>Estar en internet.</span>
          </m.h1>
        </div>

        <m.p 
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Modernizamos la imagen de su empresa con sitios web profesionales, seguros y fáciles de gestionar. 
          Nosotros nos encargamos de toda la tecnología; usted solo encárguese de vender.
        </m.p>

        <m.div 
          className={styles.buttonGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          {/* BOTÓN 1: Ir a Contacto (ID #contacto) */}
          <Link href="#contacto" style={{ textDecoration: 'none' }}>
            <MagneticButton>Solicitar Asesoría</MagneticButton>
          </Link>

          {/* BOTÓN 2: Ir a Proyectos (ID #work) */}
          <Link href="#work" style={{ textDecoration: 'none' }}>
            <MagneticButton>Ver Proyectos</MagneticButton>
          </Link>
          
        </m.div>

      </div>
    </section>
  );
}