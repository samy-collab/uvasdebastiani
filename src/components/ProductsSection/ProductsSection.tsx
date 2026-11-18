import { products } from '../../data/products';
import { ProductCard } from '../ProductCard/ProductCard';
import { Reveal } from '../Reveal/Reveal';
import styles from './ProductsSection.module.css';

export function ProductsSection() {
  return (
    <section id="produtos" className={styles.section} aria-labelledby="produtos-title">
      <div className="container">
        <header className={styles.intro}>
          <Reveal variant="left">
            <p className="eyebrow">Produtos</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="produtos-title" className={styles.title}>
              Para levar para casa
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className={styles.lead}>Da parreira para a sua mesa: uvas, sucos, geleias e kits com a marca da família.</p>
          </Reveal>
        </header>

        <ul className={styles.grid}>
          {products.map((product, index) => (
            <li key={product.id} className={styles.cell}>
              <Reveal delay={index * 140} className={styles.revealCell}>
                <ProductCard product={product} index={index + 1} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
