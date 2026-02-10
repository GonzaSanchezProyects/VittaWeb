/* src/components/About/About.tsx */
'use client';
import { m } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.aboutSection} id="nosotros">
      <div className={styles.container}>
        
        {/* IMAGEN */}
        <m.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={styles.imagePlaceholder}>
            {/* TIP: Usa una imagen vertical (Portrait) de buena calidad */}
            <Image 
              src="/CEO.png"  // <--- CAMBIA ESTO POR TU FOTO EN /public
              alt="Gonzalo Sanchez - Vitta Web" 
              width={600} 
              height={800} 
              className={styles.photo}
              priority={false} // Lazy load está bien aquí
            />
            
            <div className={styles.glassCard}>
              <span>Gonzalo Sanchez</span>
              <small>Fundador & Lead Developer</small>
            </div>
          </div>
        </m.div>

        {/* TEXTO */}
        <m.div 
          className={styles.contentWrapper}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className={styles.title}>
            Más que código, <br />
            <span className={styles.highlight}>construimos negocios.</span>
          </h2>
          
          <p className={styles.text}>
            En <strong>Vitta Web</strong>, no solo escribimos líneas de código. Entendemos que tu sitio web es la herramienta de ventas más importante de tu empresa.
          </p>
          
          <p className={styles.text}>
            Soy Gonzalo, desarrollador especializado en <strong>Next.js</strong> y tecnologías modernas. Mi objetivo es simple: eliminar la complejidad técnica para que tú puedas enfocarte en lo que mejor sabes hacer: <strong>hacer crecer tu negocio.</strong>
          </p>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h3>+7</h3>
              <p>Años de Exp.</p>
            </div>
            <div className={styles.statItem}>
              <h3>100%</h3>
              <p>A medida</p>
            </div>
            <div className={styles.statItem}>
              <h3>24/7</h3>
              <p>Soporte</p>
            </div>
          </div>

        </m.div>

      </div>
    </section>
  );
}