import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from './motion';

/**
 * Publica a posição do ponteiro sobre o elemento como variáveis CSS:
 * `--px`/`--py` de -1 a 1 (centro = 0) e `--mx`/`--my` em porcentagem, para inclinação e brilho.
 */
export function usePointerTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || !hasFinePointer()) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      frame = 0;
      if (!last) return;
      const rect = node.getBoundingClientRect();
      const x = (last.clientX - rect.left) / rect.width;
      const y = (last.clientY - rect.top) / rect.height;
      node.style.setProperty('--px', (x * 2 - 1).toFixed(3));
      node.style.setProperty('--py', (y * 2 - 1).toFixed(3));
      node.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      node.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    };
    const onMove = (event: PointerEvent) => {
      last = event;
      node.dataset.pointer = 'on';
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      last = null;
      delete node.dataset.pointer;
      for (const name of ['--px', '--py']) node.style.setProperty(name, '0');
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return ref;
}
