/* src/components/Work/Work.tsx */
'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { m, useScroll, useTransform } from 'framer-motion';
import styles from './Work.module.css';

const projects = [
  { 
    id: '01', 
    title: "GenFit (2026)", 
    category: "Fitness & Wellness",
    tech: "React / Next.js / Prisma / Clerk", 
    img: "/projects/genfit.png" 
  },
  { 
    id: '02', 
    title: "Universalload (2026)", 
    category: "Web Tools",
    tech: "React / Vite / Supabase", 
    img: "/projects/uni.png" 
  },
  { 
    id: '03', 
    title: "CryptoBot (2026)", 
    category: "Crypto & Automation",
    tech: "React / Vite / N8N / Supabase", 
    img: "/projects/cry.png" 
  },
  { 
    id: '04', 
    title: "Portfolio (2026)", 
    category: "Personal Branding",
    tech: "Framer Vite", 
    img: "/projects/port.png" 
  },
  { 
    id: '05', 
    title: "Web Catering (2026)", 
    category: "Business",
    tech: "React Vite", 
    img: "/projects/cat.png" 
  },
  { 
    id: '06', 
    title: "Web Personal Arquitecto (2026)", 
    category: "Business",
    tech: "React / Vite", 
    img: "/projects/ar.png" 
  },
  { 
    id: '07', 
    title: "Daily Ready (2026)", 
    category: "Web App",
    tech: "React / Vite / Supabase", 
    img: "/projects/day.png" 
  },
];

export default function Work() {
  const targetRef = useRef<HTMLElement>(null);
  
  // 1. Estado para controlar qué tan lejos llega el scroll
  const [endPosition, setEndPosition] = useState("-75%");

  // 2. Detectamos si es móvil para alargar el recorrido
  useEffect(() => {
    const updatePosition = () => {
      const isMobile = window.innerWidth < 768;
      // En móvil la fila es muy larga relativa a la pantalla, necesita ir más lejos (-95%)
      // En escritorio (-75%) suele ser suficiente para 7 items
      setEndPosition(isMobile ? "-87%" : "-75%");
    };

    updatePosition(); // Ejecutar al cargar
    window.addEventListener('resize', updatePosition); // Recalcular si giran la pantalla
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] 
  });

  // 3. Usamos la variable dinámica en lugar del valor fijo
  const x = useTransform(scrollYProgress, [0, 1], ["1%", endPosition]);

  return (
    <section ref={targetRef} className={styles.workSection} id="work">
      <div className={styles.stickyContainer}>
        
        {/* Título flotante fijo */}
        <div className={styles.header}>
          <span className={styles.label}>Selected Works</span>
        </div>

        <m.div style={{ x }} className={styles.cardsContainer}>
          
          {/* INTRO TITLE CARD */}
          <div className={styles.introCard}>
            <h2 className={styles.mainTitle}>
              Casos de estudio <br/>
              <span className={styles.highlight}>seleccionados.</span>
            </h2>
          </div>

          {/* CARDS ESTILO "CINEMATIC" */}
          {projects.map((p) => (
            <div key={p.id} className={styles.cardWrapper}>
              
              <div className={styles.cardImageContainer}>
                <Image 
                  src={p.img} 
                  alt={p.title}
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay sutil al hover */}
                <div className={styles.hoverOverlay} />
              </div>

              {/* Info Limpia Debajo */}
              <div className={styles.cardInfo}>
                <div className={styles.infoTop}>
                  <span className={styles.cat}>{p.category}</span>
                  <span className={styles.techBadge}>{p.tech}</span>
                </div>
                <h3 className={styles.projectTitle}>{p.title}</h3>
              </div>

            </div>
          ))}

        </m.div>
      </div>
    </section>
  );
}