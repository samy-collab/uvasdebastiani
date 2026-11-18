import { useEffect, useState, type RefObject } from 'react';

/**
 * `true` enquanto o elemento está na tela (ou perto dela, conforme `rootMargin`).
 * Diferente de `useInView`, volta a `false` quando o elemento sai da tela.
 */
export function useVisible<T extends Element>(ref: RefObject<T | null>, rootMargin = '200px 0px'): boolean {
  // why: without IntersectionObserver nothing would ever flip this, so treat the element as always visible
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window));

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return visible;
}
