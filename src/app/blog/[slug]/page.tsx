/* src/app/blog/[slug]/page.tsx */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts } from '@/lib/posts';
import styles from '../blog.module.css';

type Props = {
  params: Promise<{ slug: string }>;
};

// SEO
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Artículo no encontrado' };
  
  return {
    title: `${post.title} | Vitta Web Blog`,
    description: post.excerpt,
  };
}

// Rutas Estáticas
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// COMPONENTE PRINCIPAL
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.articleContainer}>
      
      {/* 1. Botón Volver (Animación base) */}
      <div className={styles.animateEntry}>
        <Link href="/blog" className={styles.backLink}>← Volver al Blog</Link>
      </div>
      
      {/* 2. Encabezado (Delay 1) */}
      <header className={`${styles.articleHeader} ${styles.animateEntry} ${styles.delay1}`}>
        <div className={styles.tags}>
           {post.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
        <h1 className={styles.articleTitle}>{post.title}</h1>
        <div className={styles.meta}>
           {post.date} • {post.readTime} de lectura
        </div>
      </header>

      {/* 3. Contenido del Artículo (Delay 2) */}
      <div 
        className={`${styles.content} ${styles.animateEntry} ${styles.delay2}`}
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />

      {/* 4. CAJA CTA CON BOTÓN (Delay 3) */}
      <div className={`${styles.ctaBox} ${styles.animateEntry} ${styles.delay3}`}>
        <h3>¿Listo para escalar tu negocio?</h3>
        <p>No dejes que tu competencia te gane por tener una mejor web. Agenda una consultoría estratégica hoy mismo.</p>
        
        <Link href="/#contacto" className={styles.ctaButton}>
          Solicitar Cotización
        </Link>
      </div>

    </main>
  );
}