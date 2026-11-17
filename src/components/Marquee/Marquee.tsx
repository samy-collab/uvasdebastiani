import { GrapeGlyph } from '../GrapeCluster/GrapeCluster';
import styles from './Marquee.module.css';

interface MarqueeProps {
  items: string[];
}

/** Faixa com palavras correndo em loop; pausa ao passar o mouse. */
export function Marquee({ items }: MarqueeProps) {
  // why: the track holds two identical halves so translating by -50% loops without a visible seam
  const track = [...items, ...items];

  return (
    <div className={styles.band}>
      <p className="visually-hidden">{items.join(', ')}</p>
      <div className={styles.viewport} aria-hidden="true">
        <ul className={styles.track}>
          {track.map((item, index) => (
            <li key={`${item}-${index}`} className={styles.item}>
              <span className={index % 2 === 0 ? styles.solid : styles.outline}>{item}</span>
              <GrapeGlyph className={styles.glyph} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
