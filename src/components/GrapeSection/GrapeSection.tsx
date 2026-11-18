import type { GrapeType } from '../../data/grapes';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { NatureIcon } from '../NatureIcon/NatureIcon';
import { LoopVideo } from '../LoopVideo/LoopVideo';
import { Photo } from '../Photo/Photo';
import { Reveal } from '../Reveal/Reveal';
import styles from './GrapeSection.module.css';

interface GrapeSectionProps {
  grape: GrapeType;
  /** `true` coloca as fotos à esquerda e o texto à direita. */
  reversed?: boolean;
}

export function GrapeSection({ grape, reversed = false }: GrapeSectionProps) {
  const sectionRef = useScrollProgress<HTMLElement>();
  const titleId = `${grape.id}-title`;
  const [first, second, wide] = grape.photos;

  return (
    <section
      ref={sectionRef}
      id={grape.id}
      className={styles.section}
      data-tone={grape.tone}
      data-reversed={reversed}
      aria-labelledby={titleId}
    >
      <span className={styles.watermark} aria-hidden="true">
        {grape.title}
      </span>

      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <Reveal variant="left">
            <p className={`eyebrow ${styles.eyebrow}`}>{grape.eyebrow}</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id={titleId} className={styles.title}>
              {grape.title}
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className={styles.lead}>{grape.lead}</p>
          </Reveal>
          <Reveal delay={260} className={styles.text}>
            {grape.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={320}>
            <p className={styles.label} id={`${grape.id}-cultivo`}>
              Cultivo
            </p>
            <ul className={styles.practices} aria-labelledby={`${grape.id}-cultivo`}>
              {grape.practices.map((practice) => (
                <li key={practice.label} className={styles.practice}>
                  <NatureIcon name={practice.icon} className={styles.icon} />
                  {practice.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={380}>
            <ul className={styles.traits}>
              {grape.traits.map((trait) => (
                <li key={trait}>{trait}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className={`snap-strip ${styles.collage}`}>
          <Reveal variant="wipe" className={`${styles.tile} ${styles.tileVideo}`}>
            <LoopVideo video={grape.video} className={styles.fill} />
          </Reveal>
          <Reveal variant="wipe" delay={120} className={`${styles.tile} ${styles.tileA}`}>
            <Photo image={first} className={styles.fill} sizes="(min-width: 60rem) 18rem, 70vw" />
          </Reveal>
          <Reveal variant="wipe" delay={220} className={`${styles.tile} ${styles.tileB}`}>
            <Photo image={second} className={styles.fill} sizes="(min-width: 60rem) 18rem, 70vw" />
          </Reveal>
          <Reveal variant="wipe" delay={320} className={`${styles.tile} ${styles.tileWide}`}>
            <Photo image={wide} className={styles.fill} sizes="(min-width: 60rem) 36rem, 70vw" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
