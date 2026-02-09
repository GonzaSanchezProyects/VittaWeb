'use client';
import { m } from 'framer-motion';
import Link from 'next/link';
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

        {/* === NUEVA SECCIÓN DE PRECIOS (Reemplaza al párrafo) === */}
        <m.div 
          className={styles.pricingGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          {/* Tarjeta 1 */}
          <div className={styles.pricingCard}>
            <span className={styles.cardLabel}>LANDING PAGE</span>
            <div className={styles.priceContent}>
              <span className={styles.startingAt}>DESDE</span>
              <div className={styles.cardPriceContainer}>
                <span className={styles.currencySymbol}>$</span>
                <span className={styles.cardPrice}>100</span>
                <span className={styles.currencyText}>USD</span>
              </div>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className={`${styles.pricingCard} ${styles.featuredCard}`}>
            <span className={styles.cardLabel}>CORPORATIVA</span>
            <div className={styles.priceContent}>
              <span className={styles.startingAt}>DESDE</span>
              <div className={styles.cardPriceContainer}>
                <span className={styles.currencySymbol}>$</span>
                <span className={styles.cardPrice}>200</span>
                <span className={styles.currencyText}>USD</span>
              </div>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className={styles.pricingCard}>
            <span className={styles.cardLabel}>E-COMMERCE</span>
            <div className={styles.priceContent}>
              <span className={styles.startingAt}>DESDE</span>
              <div className={styles.cardPriceContainer}>
                <span className={styles.currencySymbol}>$</span>
                <span className={styles.cardPrice}>300</span>
                <span className={styles.currencyText}>USD</span>
              </div>
            </div>
          </div>
        </m.div>
        {/* === FIN SECCIÓN PRECIOS === */}

        <m.div 
          className={styles.buttonGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }} // Ajusté un poco el delay para que entre después de los precios
        >
          {/* BOTÓN 1 */}
          <Link href="#contacto" style={{ textDecoration: 'none' }}>
            <MagneticButton>Solicitar Asesoría</MagneticButton>
          </Link>

          {/* BOTÓN 2 */}
          <Link href="#work" style={{ textDecoration: 'none' }}>
            <MagneticButton>Ver Proyectos</MagneticButton>
          </Link>
          
        </m.div>

      </div>
    </section>
  );
}