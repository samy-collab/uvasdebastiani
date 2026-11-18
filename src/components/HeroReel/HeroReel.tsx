import { useEffect, useRef, useState } from 'react';
import type { SiteVideo } from '../../data/images';
import { prefersReducedMotion } from '../../hooks/motion';
import { useVisible } from '../../hooks/useVisible';
import styles from './HeroReel.module.css';

export interface ReelClip {
  video: SiteVideo;
  /** Frase curta exibida ao lado do vídeo enquanto ele toca. */
  caption: string;
  /** Linha menor acima da frase, ex.: "Cultivo orgânico". */
  kicker: string;
}

interface HeroReelProps {
  clips: ReelClip[];
  className?: string;
  /** Classe do quadro dos vídeos (proporção, cantos, animação de entrada). */
  stageClassName?: string;
}

/**
 * Sequência de vídeos do topo: quando um termina, o próximo entra com outra legenda.
 * Os botões abaixo da legenda pulam para qualquer vídeo. Com movimento reduzido nada
 * toca sozinho; os botões trocam a imagem e a legenda.
 */
export function HeroReel({ clips, className, stageClassName }: HeroReelProps) {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const visible = useVisible(rootRef);
  const [autoplay] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    const video = videoRefs.current[active];
    if (video) video.currentTime = 0;
    // why: after the reel wraps around, the segment would otherwise start full from its previous run
    progressRef.current?.style.setProperty('--fill', '0');
  }, [active]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && visible && autoplay) {
        // hazard: play() rejects when the browser blocks autoplay; the poster and caption stay up in that case
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, visible, autoplay]);

  const next = (active + 1) % clips.length;
  const clip = clips[active];

  return (
    <div ref={rootRef} className={[styles.reel, className].filter(Boolean).join(' ')}>
      <div className={[styles.stage, stageClassName].filter(Boolean).join(' ')}>
        {clips.map((item, index) => (
          <video
            key={item.video.src}
            ref={(node) => {
              videoRefs.current[index] = node;
            }}
            className={styles.video}
            data-active={index === active}
            src={item.video.src}
            poster={item.video.poster}
            muted
            playsInline
            // why: only the playing clip and the one after it download, so the hand-off is instant without fetching all six up front
            preload={index === active || index === next ? 'auto' : 'none'}
            aria-hidden={index !== active}
            aria-label={item.video.label}
            onEnded={() => setActive(next)}
            onTimeUpdate={(event) => {
              const { currentTime, duration } = event.currentTarget;
              if (index === active && duration > 0) {
                progressRef.current?.style.setProperty('--fill', String(currentTime / duration));
              }
            }}
          />
        ))}
        {autoplay && (
          <div className={styles.progress} aria-hidden="true">
            {clips.map((item, index) => (
              <span
                key={item.video.src}
                ref={index === active ? progressRef : undefined}
                className={styles.segment}
                data-state={index < active ? 'done' : index === active ? 'playing' : 'waiting'}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.caption}>
        <p key={active} className={styles.captionText}>
          <span className={styles.kicker}>{clip.kicker}</span>
          {clip.caption}
        </p>
        <div className={styles.dots} role="group" aria-label="Escolher vídeo">
          {clips.map((item, index) => (
            <button
              key={item.video.src}
              type="button"
              className={styles.dot}
              aria-label={item.caption}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
