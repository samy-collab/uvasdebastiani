import type { CSSProperties } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import styles from './VineJourney.module.css';

const STEPS = ['Parreira', 'Colheita', 'Sua mesa'];

/**
 * Um ramo de videira que se desenha conforme a página rola, acendendo três etapas
 * do caminho "da parreira à sua mesa". Movimento reduzido mostra o ramo completo.
 */
export function VineJourney() {
  const ref = useScrollProgress<HTMLDivElement>(1);

  return (
    <div ref={ref} className={styles.journey}>
      <svg className={styles.vine} viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className={styles.base} d="M10 40 C 110 0, 190 80, 300 40 S 490 0, 590 40" pathLength={1} />
        <path className={styles.draw} d="M10 40 C 110 0, 190 80, 300 40 S 490 0, 590 40" pathLength={1} />
      </svg>
      <ol className={styles.steps}>
        {STEPS.map((step, index) => (
          <li key={step} className={styles.step} style={{ '--at': index / (STEPS.length - 1) } as CSSProperties}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.label}>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
