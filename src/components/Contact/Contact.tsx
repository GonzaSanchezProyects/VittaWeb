'use client';
import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import styles from './Contact.module.css';
import HyperText from '../HyperText/HyperText';

type Log = { id: number; text: string; type: 'sys' | 'user' };

export default function Contact() {
  const [step, setStep] = useState(1);
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, text: "SYSTEM_BOOT...", type: 'sys' },
    { id: 2, text: "LOADING PROJECT_INITIATOR v3.5...", type: 'sys' },
    { id: 3, text: "WAITING FOR INPUT.", type: 'sys' },
  ]);

  const [formData, setFormData] = useState({
    entity: '',      
    goal: '',        
    location: '',    
    scale: '',       
    name: '',
    email: ''
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (text: string, type: 'sys' | 'user' = 'sys') => {
    setLogs(prev => [...prev, { id: Date.now(), text, type }]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSelect = (key: string, value: string, label: string, autoAdvance = true) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    addLog(`> SELECT: ${label.toUpperCase()}`, 'user');
    
    if(autoAdvance) {
      setTimeout(() => setStep(prev => prev + 1), 400);
    }
  };

  const submitForm = () => {
    addLog(`> COMPILING CONFIGURATION...`, 'sys');
    addLog(`> GENERATING WHATSAPP LINK...`, 'sys');
    setTimeout(() => setStep(5), 1500); 
  };

  const generateWhatsAppLink = () => {
    const phoneNumber = "5492634272885";
    
    const message = `
Hola Vitta Web, quiero iniciar un proyecto web.
Aquí están los detalles de mi configuración:

*Tipo de Proyecto:* ${formData.entity.toUpperCase()}
*Objetivo Principal:* ${formData.goal.toUpperCase()}
*Ubicación:* ${formData.location}
*Escala:* ${formData.scale.toUpperCase()}

*Mis Datos:*
*Nombre:* ${formData.name}
*Email:* ${formData.email}

Quedo a la espera para coordinar.
    `.trim();

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className={styles.section} id="contacto">
      
      <div className={styles.headerContainer}>
        <h2 className={styles.glitchTitle}>
          <HyperText text="VAMOS A CREAR TU PÁGINA" triggerOnLoad={true} />
        </h2>
        <span className={styles.subTitle}>CONFIGURACIÓN DE SISTEMA</span>
      </div>

      <div className={styles.container}>
        
        <div className={styles.interface}>
          <div className={styles.headerTitle}>
             <div className={styles.headerDot} />
             STEP 0{step} / 05
          </div>

          <AnimatePresence mode="wait">
            
            {/* PASO 1 */}
            {step === 1 && (
              <m.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className={styles.stepTitle}>Definir Entidad</h3>
                <p className={styles.stepDesc}>¿Qué estamos construyendo hoy?</p>
                
                <div className={styles.optionsGrid}>
                  {[
                    { id: 'negocio', label: 'Negocio Local', sub: 'Tienda física / Servicios' },
                    { id: 'empresa', label: 'Empresa / Corp', sub: 'Institucional' },
                    { id: 'ecommerce', label: 'E-Commerce', sub: 'Venta 100% Online' },
                    { id: 'portfolio', label: 'Portfolio', sub: 'Marca Personal' },
                    { id: 'otro', label: 'Otro / Startup', sub: 'Proyecto a medida' },
                  ].map((opt) => (
                    <div 
                      key={opt.id}
                      className={`${styles.optionCard} ${formData.entity === opt.id ? styles.selected : ''}`}
                      onClick={() => handleSelect('entity', opt.id, opt.label)}
                    >
                      <span className={styles.optionTitle}>{opt.label}</span>
                      <span className={styles.optionSubtitle}>{opt.sub}</span>
                    </div>
                  ))}
                </div>
              </m.div>
            )}

            {/* PASO 2 */}
            {step === 2 && (
              <m.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className={styles.stepTitle}>Objetivo Principal</h3>
                <p className={styles.stepDesc}>¿Cuál es la función crítica del sistema?</p>
                
                <div className={styles.optionsGrid}>
                  {[
                    { id: 'ventas', label: 'Ventas Directas', sub: 'Maximizar facturación' },
                    { id: 'publicidad', label: 'Publicidad / Ads', sub: 'Tráfico masivo' },
                    { id: 'impulso', label: 'Impulso de Marca', sub: 'Posicionamiento' },
                    { id: 'trabajo', label: 'Conseguir Trabajo', sub: 'Para profesionales' },
                  ].map((opt) => (
                    <div 
                      key={opt.id}
                      className={styles.optionCard}
                      onClick={() => handleSelect('goal', opt.id, opt.label)}
                    >
                      <span className={styles.optionTitle}>{opt.label}</span>
                      <span className={styles.optionSubtitle}>{opt.sub}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.navButtons}>
                  <button className={`${styles.btn} ${styles.btnBack}`} onClick={() => setStep(1)}>ATRÁS</button>
                </div>
              </m.div>
            )}

            {/* PASO 3 */}
            {step === 3 && (
              <m.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className={styles.stepTitle}>Dimensiones</h3>
                <p className={styles.stepDesc}>Ubicación operativa y magnitud del desarrollo.</p>

                <label className={styles.terminalInputLabel} style={{color:'#666', fontSize:'0.8rem', display:'block', marginBottom:'5px'}}>
                  &gt; SERVER_LOCATION (PAÍS/CIUDAD)
                </label>
                <input 
                  type="text" 
                  placeholder="Ej: Mendoza, Argentina" 
                  className={styles.terminalInput}
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  onBlur={(e) => addLog(`> LOCATION SET: ${e.target.value}`, 'user')}
                />

                <label className={styles.terminalInputLabel} style={{color:'#666', fontSize:'0.8rem', display:'block', marginBottom:'5px', marginTop:'20px'}}>
                  &gt; SYSTEM_SCALE (SECCIONES)
                </label>
                <div className={styles.scaleGrid}>
                  {[
                    { id: 'landing', label: 'Landing (1)', num: '01' },
                    { id: 'small', label: 'Standard (3-5)', num: '3-5' },
                    { id: 'large', label: 'Completa (+6)', num: '+06' },
                  ].map((opt) => (
                    <div 
                      key={opt.id}
                      className={`${styles.scaleOption} ${formData.scale === opt.id ? styles.selected : ''}`}
                      onClick={() => {
                        setFormData({...formData, scale: opt.id});
                        addLog(`> SCALE SET: ${opt.label.toUpperCase()}`, 'user');
                      }}
                    >
                      <span className={styles.scaleNumber}>{opt.num}</span>
                      <span className={styles.scaleLabel}>{opt.label}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.navButtons}>
                  <button className={`${styles.btn} ${styles.btnBack}`} onClick={() => setStep(2)}>ATRÁS</button>
                  <button 
                    className={styles.btn} 
                    onClick={() => setStep(4)} 
                    disabled={!formData.location || !formData.scale}
                  >
                    CONTINUAR
                  </button>
                </div>
              </m.div>
            )}

            {/* PASO 4 */}
            {step === 4 && (
              <m.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className={styles.stepTitle}>Autorización</h3>
                <p className={styles.stepDesc}>¿A quién entregamos las llaves del sistema?</p>

                <input 
                  type="text" 
                  placeholder="Tu Nombre / ID" 
                  className={styles.terminalInput}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Email de Contacto" 
                  className={styles.terminalInput}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                
                <div className={styles.navButtons}>
                  <button className={`${styles.btn} ${styles.btnBack}`} onClick={() => setStep(3)}>ATRÁS</button>
                  <button className={styles.btn} onClick={submitForm} disabled={!formData.email}>
                    EJECUTAR BUILD
                  </button>
                </div>
              </m.div>
            )}

            {/* PASO 5: FINALIZAR EN WHATSAPP */}
            {step === 5 && (
              <m.div 
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', paddingTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{fontSize:'3rem', marginBottom:'20px'}}>✅</div>
                <h3 className={styles.stepTitle} style={{ color: '#00e5ff' }}>CONFIGURACIÓN COMPLETA</h3>
                <p className={styles.stepDesc}>
                  Tu perfil técnico ha sido generado.<br/>
                  Para iniciar el desarrollo, envía esta ficha a nuestro equipo de ingeniería vía WhatsApp.
                </p>
                
                {/* BOTÓN WHATSAPP */}
                <a 
                  href={generateWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.whatsappButton} // Clase nueva para estilo verde
                  style={{ textDecoration: 'none', width: '100%', marginTop: '20px' }}
                >
                  CONTINUAR EN WHATSAPP &rarr;
                </a>

                <button 
                  className={styles.btn} 
                  style={{background: 'transparent', border: '1px solid #333', color: '#666', marginTop:'15px', fontSize:'0.8rem'}}
                  onClick={() => window.location.reload()}
                >
                  REINICIAR SISTEMA
                </button>
              </m.div>
            )}

          </AnimatePresence>
        </div>

        {/* DERECHA: CONSOLA */}
        <div className={styles.console} ref={scrollRef}>
          {logs.map((log) => (
            <div key={log.id} className={styles.logEntry}>
              <span style={{opacity: 0.5, marginRight: 10}}>
                [{new Date(log.id).toLocaleTimeString([], {hour12: false, hour:'2-digit', minute:'2-digit', second:'2-digit'})}]
              </span>
              <span className={log.type === 'sys' ? styles.logWarning : styles.logSuccess}>
                {log.type === 'sys' ? 'SYS_ROOT' : 'USR_ADMIN'}
              </span>
              {` >> ${log.text}`}
            </div>
          ))}
          <div style={{marginTop: 10, color: '#00e5ff'}}>_</div>
        </div>

      </div>
    </section>
  );
}