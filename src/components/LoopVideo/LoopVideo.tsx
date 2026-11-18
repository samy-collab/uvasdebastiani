import { useEffect, useRef } from 'react';
import type { SiteVideo } from '../../data/images';
import { prefersReducedMotion } from '../../hooks/motion';
import { useVisible } from '../../hooks/useVisible';
import styles from './LoopVideo.module.css';

interface LoopVideoProps {
  video: SiteVideo;
  className?: string;
}

/**
 * Vídeo curto, mudo e em loop que só toca enquanto está na tela.
 * Com movimento reduzido fica parado no primeiro quadro.
 */
export function LoopVideo({ video, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  // why: a dozen looping videos decoding at once would stall phones, so each one only plays while visible
  const visible = useVisible(ref);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    // hazard: play() rejects when the browser blocks autoplay; the poster stays up in that case
    if (visible) node.play().catch(() => {});
    else node.pause();
  }, [visible]);

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
        preload="none"
        aria-label={video.label}
      />
    </figure>
  );
}
