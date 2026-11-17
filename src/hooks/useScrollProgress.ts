import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './motion';

/**
 * Escreve em `--progress` (0 → 1) quanto do percurso do elemento pela tela já foi rolado:
 * 0 quando o topo dele encosta no rodapé da janela, 1 quando a base dele sai pelo topo.
 * Com movimento reduzido o valor fica fixo em `fallback`.
 */
export function useScrollProgress<T extends HTMLElement>(fallback = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.style.setProperty('--progress', String(fallback));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const value = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / total));
      node.style.setProperty('--progress', value.toFixed(4));
    };
    // why: scroll fires many times per frame; batching into rAF avoids layout thrash
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [fallback]);

  return ref;
}
