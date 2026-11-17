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
              O que oferecemos
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className={styles.lead}>Uvas de mesa, geleias e sucos da família De Bastiani.</p>
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
