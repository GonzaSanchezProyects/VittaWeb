/* src/app/not-found.tsx */
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#050505',
      color: '#fff',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '4rem', color: '#00e5ff', marginBottom: '0', fontWeight: 'bold' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Página no encontrada</h2>
      <p style={{ color: '#888', marginBottom: '40px', maxWidth: '400px' }}>
        Parece que te has perdido en el ciberespacio. La página que buscas no existe o ha sido movida.
      </p>
      <Link 
        href="/" 
        style={{
          padding: '14px 35px',
          background: '#fff',
          color: '#000',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: '800',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        Volver al Inicio
      </Link>
    </div>
  );
}