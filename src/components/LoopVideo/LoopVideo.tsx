import { useEffect, useRef } from 'react';
import type { SiteVideo } from '../../data/images';
import { prefersReducedMotion } from '../../hooks/motion';
import styles from './LoopVideo.module.css';

interface LoopVideoProps {
  video: SiteVideo;
  className?: string;
  /** Use apenas no vídeo da primeira dobra. */
  priority?: boolean;
}

/**
 * Vídeo curto, mudo e em loop que só toca enquanto está na tela.
 * Com movimento reduzido fica parado no primeiro quadro.
 */
export function LoopVideo({ video, className, priority = false }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

    // why: a dozen looping videos decoding at once would stall phones, so each one only plays while visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // hazard: play() rejects when the browser blocks autoplay; the poster stays up in that case
          node.play().catch(() => {});
        } else {
          node.pause();
        }
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className={[styles.figure, className].filter(Boolean).join(' ')}>
      <video
        ref={ref}
        className={styles.video}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'none'}
        aria-label={video.label}
      />
    </figure>
  );
}
