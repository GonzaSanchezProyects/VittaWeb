/* src/components/Services/Services.tsx */
'use client';
import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion'; 
import Image from 'next/image';
import styles from './Services.module.css';

const services = [
  {
    id: 1,
    title: "E-Commerce & Tiendas",
    desc: "Venda 24/7 con una tienda que no duerme. Gestión de stock, pagos seguros y diseño enfocado en la conversión pura.",
    tags: ["Shopify / Woocommerce", "Pagos Locales", "Automatización"],
    // NUEVA IMAGEN E-COMMERCE (Estilo neon/futurista comprando)
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=80", 
    gradient: "radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.4) 0%, rgba(0, 0, 0, 0) 70%)"
  },
  {
    id: 2,
    title: "Sitios Corporativos",
    desc: "Eleve la percepción de su marca. Webs institucionales que transmiten autoridad, confianza y profesionalismo desde el primer segundo.",
    tags: ["Identidad de Marca", "SEO Corporativo", "Multilenguaje"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    gradient: "radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.4) 0%, rgba(0, 0, 0, 0) 70%)"
  },
  {
    id: 3,
    title: "Landing Pages",
    desc: "Páginas de aterrizaje diseñadas para campañas publicitarias. Eliminamos distracciones para que el usuario solo tenga una opción: Comprar.",
    tags: ["Alta Conversión", "A/B Testing", "Copywriting"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    gradient: "radial-gradient(circle at 20% 80%, rgba(255, 0, 204, 0.4) 0%, rgba(0, 0, 0, 0) 70%)"
  },
  {
    id: 4,
    title: "Eventos & Bodas",
    desc: "La tendencia del momento. Invitaciones digitales interactivas, confirmación de asistencia (RSVP) y galerías de fotos para bodas inolvidables.",
    tags: ["RSVP Digital", "Cuenta Regresiva", "Galería Interactiva"],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    gradient: "radial-gradient(circle at 50% 0%, rgba(255, 170, 0, 0.4) 0%, rgba(0, 0, 0, 0) 70%)"
  },
  {
    id: 5,
    title: "Portfolios & CV",
    desc: "Para arquitectos, fotógrafos y profesionales que necesitan mostrar su trabajo con un impacto visual cinematográfico.",
    tags: ["Galerías 4K", "Diseño Minimalista", "Animaciones"],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    gradient: "radial-gradient(circle at 80% 80%, rgba(136, 0, 255, 0.4) 0%, rgba(0, 0, 0, 0) 70%)"
  },
  {
    id: 6,
    title: "Sistemas & Dashboards",
    desc: "Software a medida para gestionar su negocio. CRMs, paneles de administración y herramientas internas para optimizar procesos.",
    tags: ["SaaS", "Bases de Datos", "Seguridad Total"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    gradient: "radial-gradient(circle at 10% 20%, rgba(0, 136, 255, 0.4) 0%, rgba(0, 0, 0, 0) 70%)"
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
        
        <div className={styles.listContainer}>
          <h2 className={styles.headerTitle}>QUÉ CONSTRUIMOS</h2>
          
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

                {/* MOBILE CONTENT */}
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
                          <div className={styles.imageBackground}>
                            <Image 
                              src={service.image} 
                              alt={service.title} 
                              fill 
                              style={{ objectFit: 'cover' }}
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                          <div className={styles.gradientOverlay} style={{ background: service.gradient }} />
                          <div className={styles.darkOverlay} />
                          
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

        {/* DESKTOP PREVIEW */}
        <div className={styles.previewContainer}>
          <div className={styles.previewWindow}>
            
            <AnimatePresence mode="wait">
              <m.div
                key={activeId}
                className={styles.imageContainer}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                 <Image 
                    src={getActiveService().image} 
                    alt={getActiveService().title} 
                    fill 
                    priority
                    style={{ objectFit: 'cover' }}
                    sizes="(min-width: 768px) 50vw, 100vw"
                 />
                 <div className={styles.darkOverlayDesktop} />
                 <div className={styles.gradientOverlay} style={{ background: getActiveService().gradient }} />
              </m.div>
            </AnimatePresence>

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