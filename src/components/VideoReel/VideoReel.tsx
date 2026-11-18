import type { SiteVideo } from '../../data/images';
import { LoopVideo } from '../LoopVideo/LoopVideo';
import { Reveal } from '../Reveal/Reveal';
import styles from './VideoReel.module.css';

export interface ReelItem {
  video: SiteVideo;
  caption: string;
}

/** Fileira de vídeos curtos com legenda; no celular vira uma faixa que desliza para o lado. */
export function VideoReel({ items }: { items: ReelItem[] }) {
  return (
    <ul className={`snap-strip ${styles.reel}`}>
      {items.map((item, index) => (
        <li key={item.caption} className={styles.item}>
          <Reveal variant="up" delay={index * 120}>
            <LoopVideo video={item.video} className={styles.video} />
            <p className={styles.caption}>{item.caption}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
