'use client';
import { useEffect, useState } from 'react';

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState('es');

  useEffect(() => {
    // 1. Inyectar estilos CSS para ocultar la barra de Google (Método Seguro)
    const style = document.createElement('style');
    style.innerHTML = `
      body { top: 0px !important; }
      .goog-te-banner-frame { display: none !important; visibility: hidden !important; }
      .skiptranslate { display: none !important; visibility: hidden !important; }
      #google_translate_element { display: none !important; }
      .goog-tooltip { display: none !important; }
      .goog-text-highlight { background: none !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);

    // 2. Inicializar Google Translate
    // @ts-ignore
    window.googleTranslateElementInit = function () {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'es',
          includedLanguages: 'en,es',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // 3. Cargar el script solo si no existe
    const scriptId = 'google-translate-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // 4. Chequear estado actual (Visual)
    const match = document.cookie.match(/googtrans=\/es\/(en|es)/);
    if (match && match[1]) {
        setCurrentLang(match[1]);
    } 

    // 5. DETECCIÓN AUTOMÁTICA (Una sola vez)
    const hasCookie = document.cookie.match(/googtrans=/);
    if (!hasCookie) {
        const browserLang = navigator.language; 
        if (browserLang.startsWith('en')) {
             console.log("Detectado Inglés: Activando traducción...");
             setTranslationCookie('en');
        }
    }

  }, []);

  // --- FUNCIÓN ROBUSTA PARA GUARDAR COOKIE ---
  const setTranslationCookie = (lang: 'es' | 'en') => {
    const value = lang === 'en' ? '/es/en' : '/es/es';
    
    // Guardamos la cookie de varias formas para asegurar que agarre en localhost y producción
    document.cookie = `googtrans=${value}; path=/`;
    document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=${value}; path=/; domain=.${window.location.hostname}`; // Con punto para subdominios

    // Recargamos
    window.location.reload();
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />

      {/* --- BURBUJA FLOTANTE --- */}
      <div 
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 2147483647,
          display: 'flex',
          alignItems: 'center',
          gap: '8px', // Un poco más de espacio
          padding: '10px 18px', // Un poco más grande para facilitar click
          background: 'rgba(10, 10, 10, 0.75)', 
          backdropFilter: 'blur(16px)',        
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          transition: 'transform 0.2s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <button
          onClick={() => setTranslationCookie('es')}
          style={{
            background: 'transparent',
            border: 'none',
            color: currentLang === 'es' ? '#fff' : 'rgba(255,255,255,0.4)',
            fontSize: '15px',
            fontWeight: 800,
            cursor: 'pointer',
            padding: '4px',
            transition: 'color 0.2s',
            outline: 'none'
          }}
        >
          ES
        </button>

        <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />

        <button
          onClick={() => setTranslationCookie('en')}
          style={{
            background: 'transparent',
            border: 'none',
            color: currentLang === 'en' ? '#fff' : 'rgba(255,255,255,0.4)',
            fontSize: '15px',
            fontWeight: 800,
            cursor: 'pointer',
            padding: '4px',
            transition: 'color 0.2s',
            outline: 'none'
          }}
        >
          EN
        </button>
      </div>
    </>
  );
}