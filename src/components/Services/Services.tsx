'use client';
import { useState } from 'react';
// Importamos 'm' y AnimatePresence
import { m, AnimatePresence } from 'framer-motion'; 
import styles from './Services.module.css';

const services = [
  {
    id: 1,
    title: "Desarrollo High-End",
    desc: "Sitios web que cargan instantáneamente. Tecnología de Netflix y Uber para su negocio.",
    tags: ["Velocidad Extrema", "Seguridad Total", "Escalable"],
    gradient: "radial-gradient(circle at 50% 50%, #00e5ff 0%, #0044ff 40%, #000 100%)"
  },
  {
    id: 2,
    title: "Posicionamiento SEO",
    desc: "Optimizamos su estructura para dominar Google. Más visibilidad significa más ventas.",
    tags: ["#1 en Google", "Más Tráfico", "Captación"],
    gradient: "radial-gradient(circle at 80% 20%, #00ff88 0%, #004d2e 50%, #000 100%)"
  },
  {
    id: 3,
    title: "Diseño de Conversión",
    desc: "Cada píxel está diseñado psicológicamente para guiar al visitante hacia la compra.",
    tags: ["UI/UX Premium", "Identidad de Marca", "Retención"],
    gradient: "radial-gradient(circle at 20% 80%, #ff00cc 0%, #330044 50%, #000 100%)"
  },
  {
    id: 4,
    title: "E-Commerce Blindado",
    desc: "Venda 24/7. Gestión de inventario, pagos seguros y automatización.",
    tags: ["Pasarelas de Pago", "Dashboard", "Anti-Fraude"],
    gradient: "radial-gradient(circle at 50% 0%, #ffaa00 0%, #662200 50%, #000 100%)"
  }
];

export default function Services() {
  const [activeId, setActiveId] = useState(1);

  const handleInteraction = (id: number) => {
    setActiveId(id);
  };

  const getActiveService = () => services.find(s => s.id === activeId) || services[0];

  return (
    <section className={styles.section} id="servicios">
      <div className={styles.container}>
        
        {/* LISTA */}
        <div className={styles.listContainer}>
          <span className={styles.headerTitle}>NUESTRAS CAPACIDADES</span>
          
          {services.map((service, index) => {
            const isActive = activeId === service.id;
            
            return (
              <div 
                key={service.id}
                className={styles.serviceItem}
                data-active={isActive}
                onMouseEnter={() => handleInteraction(service.id)}
                onClick={() => handleInteraction(service.id)}
              >
                <div className={styles.itemHeader}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={styles.itemIndex}>0{index + 1}</span>
                    <h3 className={styles.itemTitle}>{service.title}</h3>
                  </div>
                  <div className={styles.arrowIcon}>→</div>
                </div>

                {/* CONTENIDO MÓVIL (AnimatePresence + m.div) */}
                <div className={styles.mobileContent}>
                  <AnimatePresence>
                    {isActive && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className={styles.mobileCard}>
                          <div className={styles.gradientBg} style={{ background: service.gradient }} />
                          <div className={styles.overlay} />
                          <div className={styles.previewContent}>
                            <p className={styles.previewDesc}>{service.desc}</p>
                            <div className={styles.techTags}>
                              {service.tags.map(tag => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* PREVIEW WINDOW (DESKTOP) */}
        <div className={styles.previewContainer}>
          <div className={styles.previewWindow}>
            
            <AnimatePresence mode="wait">
              <m.div
                key={activeId}
                className={styles.gradientBg}
                style={{ background: getActiveService().gradient }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            <div className={styles.overlay} />

            <div className={styles.previewContent}>
              <AnimatePresence mode="wait">
                <m.div
                  key={activeId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <h4 className={styles.previewTitle}>{getActiveService().title}</h4>
                  <p className={styles.previewDesc}>{getActiveService().desc}</p>
                  
                  <div className={styles.techTags}>
                    {getActiveService().tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </m.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}