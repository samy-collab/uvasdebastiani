import { images } from '../../data/images';
import { site } from '../../data/site';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { Photo } from '../Photo/Photo';
import { Reveal } from '../Reveal/Reveal';
import { VineJourney } from '../VineJourney/VineJourney';
import styles from './AboutSection.module.css';

export function AboutSection() {
  const sectionRef = useScrollProgress<HTMLElement>();

  return (
    <section ref={sectionRef} id="familia" className={styles.section} aria-labelledby="familia-title">
      <svg className={styles.wave} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 80 V40 C 240 0, 480 0, 720 36 S 1200 80, 1440 30 V80 Z" />
      </svg>

      <span className={styles.watermark} aria-hidden="true">
        De Bastiani
      </span>

      <div className={`container ${styles.grid}`}>
        <div className={styles.photoCol}>
          <Reveal variant="wipe">
            <Photo
              image={images.aboutHarvest}
              className={styles.photo}
              sizes="(min-width: 60rem) 34rem, 100vw"
            />
          </Reveal>
          <span className={styles.photoAccent} aria-hidden="true" />
        </div>

        <div className={styles.content}>
          <Reveal variant="left">
            <p className="eyebrow">Nossa família</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="familia-title" className={styles.title}>
              Cultivo em família, em {site.city}
            </h2>
          </Reveal>
          {/* A história da propriedade entra aqui, em novos parágrafos <p>. */}
          <Reveal delay={200} className={styles.text}>
            <p>
              Somos a família De Bastiani e cultivamos uvas de mesa em {site.city}, no{' '}
              {site.state}. Além das uvas, oferecemos geleias e sucos, com o cuidado de quem
              trabalha a terra em família.
            </p>
          </Reveal>
          <VineJourney />
        </div>
      </div>
    </section>
  );
}
