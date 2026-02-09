'use client';
import { useEffect, useState } from 'react';

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState('es');

  useEffect(() => {
    // 1. CARGAR SCRIPT DE GOOGLE
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

    const scriptId = 'google-translate-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // 2. DETECCIÓN AUTOMÁTICA (AUTO-DETECT)
    const hasCookie = document.cookie.match(/googtrans=/);
    
    // Si NO hay cookie (es la primera vez que entra el usuario)
    if (!hasCookie) {
        // Detectamos el idioma del navegador
        const browserLang = navigator.language; 
        
        // Si el navegador está en Inglés (en-US, en-GB, etc.)
        if (browserLang.startsWith('en')) {
            // FORZAMOS LA TRADUCCIÓN A INGLÉS
            document.cookie = `googtrans=/es/en; path=/; domain=${window.location.hostname}`;
            // Recargamos para aplicar
            window.location.reload();
        } else {
            // Si es español u otro, marcamos español por defecto para no volver a chequear
            // (Opcional, pero ayuda a mantener la consistencia)
             document.cookie = `googtrans=/es/es; path=/; domain=${window.location.hostname}`;
        }
    } else {
        // Si YA hay cookie, actualizamos el estado visual de los botones
        const match = document.cookie.match(/googtrans=\/es\/(en|es)/);
        if (match && match[1]) {
            setCurrentLang(match[1]);
        }
    }

    // 3. EL EXTERMINADOR (Limpieza de la barra fea de Google)
    const intervalId = setInterval(() => {
      const body = document.body;
      if (body.style.top && body.style.top !== '0px') {
        body.style.top = '0px';
        body.style.position = 'static';
      }
      const banner = document.querySelector('.goog-te-banner-frame');
      const skiptranslate = document.querySelector('body > .skiptranslate');
      if (banner) banner.remove();
      if (skiptranslate) skiptranslate.remove();
    }, 100);

    setTimeout(() => clearInterval(intervalId), 5000);
    return () => clearInterval(intervalId);
  }, []);

  const changeLanguage = (lang: 'es' | 'en') => {
    const value = lang === 'en' ? '/es/en' : '/es/es';
    document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
    window.location.reload();
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />

      {/* --- LA BURBUJA FLOTANTE (SOLO ESTO, SIN CARTEL) --- */}
      <div 
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 2147483647, // Z-Index máximo posible para asegurar que se vea
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '8px 16px',
          background: 'rgba(10, 10, 10, 0.6)', 
          backdropFilter: 'blur(12px)',        
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        <button
          onClick={() => changeLanguage('es')}
          style={{
            background: 'transparent',
            border: 'none',
            color: currentLang === 'es' ? '#fff' : 'rgba(255,255,255,0.4)',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '2px',
            transition: 'color 0.2s'
          }}
        >
          ES
        </button>

        <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.2)' }} />

        <button
          onClick={() => changeLanguage('en')}
          style={{
            background: 'transparent',
            border: 'none',
            color: currentLang === 'en' ? '#fff' : 'rgba(255,255,255,0.4)',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '2px',
            transition: 'color 0.2s'
          }}
        >
          EN
        </button>
      </div>
    </>
  );
}