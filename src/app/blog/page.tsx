/* src/app/blog/page.tsx */
import Link from 'next/link';
import { posts } from '@/lib/posts';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog | Vitta Web',
  description: 'Artículos sobre desarrollo web, SEO y estrategia digital para negocios.',
};

export default function BlogIndex() {
  return (
    <main className={styles.mainContainer}>
      
      {/* HEADER DEL BLOG (Entrada suave inicial) */}
      <header className={`${styles.header} ${styles.animateEntry}`}>
        <h1 className={styles.title}>Blog<span style={{color:'#00e5ff'}}>.</span></h1>
        <p className={styles.subtitle}>Estrategias, tecnología y crecimiento digital.</p>
      </header>

      {/* GRILLA DE POSTS */}
      <div className={styles.grid}>
        {posts.map((post, index) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug} 
            // 1. Agregamos la clase base de animación
            className={`${styles.card} ${styles.animateEntry}`}
            // 2. Calculamos el retraso matemático para que aparezcan una por una (0.1s, 0.2s, 0.3s...)
            style={{ animationDelay: `${(index + 1) * 0.15}s` }}
          >
            <article>
              <div className={styles.tags}>
                {post.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              
              <div className={styles.meta}>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime} lectura</span>
              </div>
              
              <div className={styles.arrow}>Leer artículo →</div>
            </article>
          </Link>
        ))}
      </div>

    </main>
  );
}