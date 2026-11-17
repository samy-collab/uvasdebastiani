import type { Product } from '../../data/products';
import { usePointerTilt } from '../../hooks/usePointerTilt';
import { Photo } from '../Photo/Photo';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  /** Número exibido no canto do card (1, 2, 3...). */
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const titleId = `produto-${product.id}`;
  const cardRef = usePointerTilt<HTMLElement>();

  return (
    <article ref={cardRef} className={styles.card} aria-labelledby={titleId}>
      <div className={styles.media}>
        <Photo
          image={product.image}
          className={styles.photo}
          sizes="(min-width: 60rem) 22rem, (min-width: 40rem) 36rem, 100vw"
        />
      </div>
      <div className={styles.body}>
        <span className={styles.number} aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
        <h3 id={titleId} className={styles.title}>
          {product.title}
        </h3>
        <p className={styles.description}>{product.description}</p>

        {product.items.length > 0 && (
          <div className={styles.items}>
            {product.itemsLabel && <p className={styles.itemsLabel}>{product.itemsLabel}</p>}
            <ul className={styles.itemList}>
              {product.items.map((item) => (
                <li key={item.name}>
                  <span className={styles.itemName}>{item.name}</span>
                  {item.detail && <span className={styles.itemDetail}> — {item.detail}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <span className={styles.glare} aria-hidden="true" />
    </article>
  );
}
