import { useEffect, useRef, useState } from 'react';

/**
 * Marca o elemento como visível na primeira vez que ele entra na tela.
 * invariant: once visible it stays visible, so content never disappears again on scroll back.
 */
export function useInView<T extends Element>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);
  // why: without IntersectionObserver nothing would ever flip this, so the content would stay hidden forever
  const [inView, setInView] = useState(() => !('IntersectionObserver' in window));

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, inView]);

  return [ref, inView] as const;
}
