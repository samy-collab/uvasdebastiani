import type { SiteImage } from '../../data/images';
import styles from './Photo.module.css';

interface PhotoProps {
  image: SiteImage;
  /** Valor de `sizes` para o navegador escolher a variante certa. */
  sizes: string;
  /** Use apenas na foto da primeira dobra. */
  priority?: boolean;
  className?: string;
}

export function Photo({ image, sizes, priority = false, className }: PhotoProps) {
  const srcSet = image.variants
    ? [...image.variants.map((v) => `${v.src} ${v.width}w`), `${image.src} ${image.width}w`].join(', ')
    : undefined;

  return (
    <figure className={[styles.figure, className].filter(Boolean).join(' ')}>
      <img
        className={styles.image}
        src={image.src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ objectPosition: image.focalPoint, objectFit: image.fit ?? 'cover' }}
      />
      {image.placeholder && <figcaption className={styles.badge}>Imagem ilustrativa</figcaption>}
    </figure>
  );
}
