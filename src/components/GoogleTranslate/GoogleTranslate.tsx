'use client';
import { useEffect, useState } from 'react';

// --- COMPONENTES SVG DE LAS BANDERAS (Optimizados) ---
const FlagAR = () => (
  <svg width="24" height="24" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%', objectFit: 'cover', display: 'block' }}>
    <path fill="#75aadb" d="M0 0h640v480H0z"/>
    <path fill="#fff" d="M0 160h640v160H0z"/>
    <g transform="translate(320 240) scale(5)">
      <circle fill="#f6b40e" r="9"/>
      <circle fill="#85340a" r="4"/>
    </g>
  </svg>
);

const FlagUS = () => (
  <svg width="24" height="24" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%', objectFit: 'cover', display: 'block' }}>
    <path fill="#bd3d44" d="M0 0h640v480H0"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
    <path fill="#192f5d" d="M0 0h247v221H0z"/>
    <g fill="#fff">
      <path d="M42 16h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zM16 42h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zM95 42h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9z"/>
      <path d="M69 16h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zM95 42h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9zm0 24h9v9h-9z"/>
    </g>
  </svg>
);

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState('es');

  useEffect(() => {
    // 1. INYECTAR CSS NUCLEAR (Esto reemplaza al bucle JS)
    // Usamos styles muy específicos para anular el layout shift de Google sin usar CPU.
    const style = document.createElement('style');
    style.innerHTML = `
      /* Ocultar el iframe de la barra superior */
      .goog-te-banner-frame { 
          display: none !important; 
          visibility: hidden !important; 
          height: 0 !important; 
          width: 0 !important;
      }
      /* Ocultar el contenedor que a veces inyecta Google al body */
      .skiptranslate { 
          display: none !important; 
      }
      /* FORZAR al body a ignorar el top: 40px que pone Google */
      body { 
          top: 0px !important; 
          position: static !important; 
      }
      /* Ocultar tooltips y highlights */
      .goog-tooltip { display: none !important; }
      .goog-text-highlight { background: none !important; box-shadow: none !important; }
      
      /* IMPORTANTE: Asegurar que el widget original no ocupe espacio */
      #google_translate_element { display: none !important; }
    `;
    document.head.appendChild(style);

    // 2. INICIALIZAR GOOGLE
    // @ts-ignore
    window.googleTranslateElementInit = function () {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        { pageLanguage: 'es', includedLanguages: 'en,es', autoDisplay: false },
        'google_translate_element'
      );
    };

    // 3. CARGAR SCRIPT (Solo si no existe)
    const scriptId = 'google-translate-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // 4. DETECTAR IDIOMA ACTUAL
    const match = document.cookie.match(/googtrans=\/es\/(en|es)/);
    if (match && match[1]) setCurrentLang(match[1]);

    // 5. DETECCIÓN AUTOMÁTICA (Sin bucles)
    // Solo chequeamos una vez al cargar
    if (!document.cookie.match(/googtrans=/)) {
        if (navigator.language.startsWith('en')) {
             setLanguage('en');
        }
    }
  }, []);

  const setLanguage = (lang: 'es' | 'en') => {
    const value = lang === 'en' ? '/es/en' : '/es/es';
    document.cookie = `googtrans=${value}; path=/`;
    document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
    window.location.reload();
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />

      <div 
        className="translate-bubble" // Clase para referenciar si necesitas
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 14px',
          background: 'rgba(15, 15, 15, 0.6)', 
          backdropFilter: 'blur(12px)',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {/* BOTÓN ARGENTINA */}
        <button
          onClick={() => setLanguage('es')}
          title="Español"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            filter: currentLang === 'es' ? 'none' : 'grayscale(100%)',
            opacity: currentLang === 'es' ? 1 : 0.4,
            transition: 'all 0.3s ease',
            transform: currentLang === 'es' ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <FlagAR />
        </button>

        {/* SEPARADOR */}
        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.15)' }} />

        {/* BOTÓN USA */}
        <button
          onClick={() => setLanguage('en')}
          title="English"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            filter: currentLang === 'en' ? 'none' : 'grayscale(100%)',
            opacity: currentLang === 'en' ? 1 : 0.4,
            transition: 'all 0.3s ease',
            transform: currentLang === 'en' ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <FlagUS />
        </button>
      </div>
    </>
  );
}