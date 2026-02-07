import { ImageResponse } from 'next/og';
import { LOCATIONS, SERVICES } from '@/lib/seo-data';

// Configuración: Runtime Edge para que sea instantáneo
export const runtime = 'edge';
export const alt = 'Vitta Studio Service';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = {
  params: Promise<{ service: string; city: string }>;
};

export default async function Image({ params }: Props) {
  // Buscamos los datos específicos de esta URL
  const { service: serviceSlug, city: citySlug } = await params;
  
  const serviceData = SERVICES.find((s) => s.slug === serviceSlug);
  const cityData = LOCATIONS.find((c) => c.slug === citySlug);

  // Fallbacks por seguridad
  const title = serviceData?.name || 'Vitta Studio';
  const city = cityData?.name || 'Global';
  const isEnglish = cityData?.language === 'en';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          border: '20px solid #111',
          position: 'relative',
        }}
      >
        {/* Marca de Agua / Fondo sutil */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 70%)',
          zIndex: -1
        }} />

        {/* Logo Texto */}
        <div style={{ color: '#666', fontSize: 30, marginBottom: 30, letterSpacing: '4px', textTransform: 'uppercase' }}>
          Vitta Web
        </div>

        {/* Título del Servicio */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.1,
            padding: '0 60px',
            textTransform: 'uppercase',
            // Efecto de texto gradiente
            backgroundImage: 'linear-gradient(to bottom, #ffffff, #999999)',
            backgroundClip: 'text',
            color: 'transparent', // <--- AHORA SÍ: ÚNICA DEFINICIÓN DE COLOR
          }}
        >
          {title}
        </div>

        {/* Subtítulo de Ciudad */}
        <div
          style={{
            fontSize: 45,
            fontWeight: 'bold',
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            background: '#111',
            padding: '10px 40px',
            borderRadius: '50px',
            border: '1px solid #333',
          }}
        >
          <span style={{ color: '#888', marginRight: 15 }}>
            {isEnglish ? 'serving' : 'en'}
          </span>
          <span style={{ color: '#00e5ff' }}>
            {city.toUpperCase()}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}