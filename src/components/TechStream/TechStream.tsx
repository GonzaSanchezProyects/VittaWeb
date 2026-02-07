'use client';
// Importamos 'm' para la animación de entrada (fade-in)
import { m } from 'framer-motion';
import styles from './TechStream.module.css';

const stack = [
  "Next.js 15", "React Server Components", "TypeScript", "Vercel Edge",
  "Node.js", "Framer Motion", "Stripe API", "PostgreSQL", "Tailwind Free", "CSS Modules"
];

export default function TechStream() {
  const infiniteStack = [...stack, ...stack];

  return (
    // Usamos m.div para que aparezca suavemente al hacer scroll
    <m.div 
      className={styles.streamContainer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className={styles.track}>
        {infiniteStack.map((tech, index) => (
          <div key={index} className={styles.techItem}>
            <span className={styles.dot}></span>
            {tech}
          </div>
        ))}
      </div>
    </m.div>
  );
}