import { useEffect, useState, type RefObject } from 'react';
import styles from './StripControls.module.css';

interface StripControlsProps {
  /** A faixa `.snap-strip` controlada por estes botões. */
  stripRef: RefObject<HTMLElement | null>;
  count: number;
  /** O que a faixa mostra, lido junto com os botões: ex. "vídeos da colheita". */
  itemLabel: string;
}

/**
 * Setas e pontos abaixo de uma faixa que desliza para o lado (só no celular e tablet).
 * why: with a mouse there is no swipe and the strip hides its scrollbar, so without these the extra items are unreachable and nothing hints that they exist
 */
export function StripControls({ stripRef, count, itemLabel }: StripControlsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      setIndex(max > 0 ? Math.round((strip.scrollLeft / max) * (count - 1)) : 0);
    };
    strip.addEventListener('scroll', update, { passive: true });
    return () => strip.removeEventListener('scroll', update);
  }, [stripRef, count]);

  const go = (step: number) => {
    const strip = stripRef.current;
    const first = strip?.firstElementChild as HTMLElement | null;
    if (!strip || !first) return;
    const gap = parseFloat(getComputedStyle(strip).columnGap) || 0;
    strip.scrollBy({ left: step * (first.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => go(-1)}
        disabled={index === 0}
        aria-label={`Anterior: ${itemLabel}`}
      >
        <span aria-hidden="true">←</span>
      </button>
      <div className={styles.dots} aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className={styles.dot} data-active={i === index} />
        ))}
      </div>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => go(1)}
        disabled={index === count - 1}
        aria-label={`Próximo: ${itemLabel}`}
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
