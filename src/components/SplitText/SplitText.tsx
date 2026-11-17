import { Fragment, type CSSProperties } from 'react';
import styles from './SplitText.module.css';

interface SplitTextProps {
  text: string;
  /** Atraso inicial em ms antes da primeira palavra. */
  delay?: number;
  /** Intervalo em ms entre uma palavra e a seguinte. */
  stagger?: number;
}

/**
 * Anima o texto palavra por palavra, subindo de dentro de uma máscara.
 * invariant: screen readers get the whole sentence once via the hidden copy; the animated words are aria-hidden.
 */
export function SplitText({ text, delay = 0, stagger = 70 }: SplitTextProps) {
  const words = text.split(' ');

  return (
    <>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className={styles.mask}>
              <span
                className={styles.word}
                style={{ '--i': index, '--delay': `${delay}ms`, '--stagger': `${stagger}ms` } as CSSProperties}
              >
                {word}
              </span>
            </span>
            {/* why: a space inside the inline-block mask is trimmed, gluing the words together */}
            {index < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </>
  );
}
