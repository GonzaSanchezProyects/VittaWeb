// src/components/Background/Background.tsx
import styles from './Background.module.css';

export default function Background() {
  return (
    <div className={styles.bgContainer}>
      {/* El "ruido" que ya teníamos para textura */}
      <div className={styles.noise}></div>
      
      {/* Los orbes de luz flotantes */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.orb3}></div>
      
      {/* Una capa oscura encima para que el texto sea legible */}
      <div className={styles.overlay}></div>
    </div>
  );
}