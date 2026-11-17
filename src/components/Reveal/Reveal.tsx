import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './Reveal.module.css';

export type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'wipe';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Atraso em milissegundos, para escalonar itens vizinhos. */
  delay?: number;
  className?: string;
}

/** Faz o conteúdo surgir com uma animação quando entra na tela pela primeira vez. */
export function Reveal({ children, variant = 'up', delay = 0, className }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={[styles.reveal, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-visible={inView}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
