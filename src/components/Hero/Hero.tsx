import { images } from '../../data/images';
import { site } from '../../data/site';
import { usePointerTilt } from '../../hooks/usePointerTilt';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { GrapeCluster } from '../GrapeCluster/GrapeCluster';
import { Photo } from '../Photo/Photo';
import { SplitText } from '../SplitText/SplitText';
import styles from './Hero.module.css';

const STAMP_TEXT = `Da parreira à sua mesa • ${site.city} • ${site.stateAbbr} • `;

export function Hero() {
  const sectionRef = usePointerTilt<HTMLElement>();
  const mediaRef = useScrollProgress<HTMLDivElement>();

  return (
    <section ref={sectionRef} id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.blobs} aria-hidden="true">
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <p className={`eyebrow ${styles.enter}`} style={{ animationDelay: '0.1s' }}>
            {site.city}, {site.stateAbbr}
          </p>
          <h1 id="hero-title" className={styles.title}>
            <SplitText text="Da nossa parreira à sua mesa" delay={200} stagger={90} />
          </h1>
          <p className={`${styles.lead} ${styles.enter}`} style={{ animationDelay: '0.85s' }}>
            Somos a família De Bastiani. Cultivamos uvas de mesa em {site.city} e também
            oferecemos geleias e sucos.
          </p>
          <div className={`${styles.actions} ${styles.enter}`} style={{ animationDelay: '1.05s' }}>
            <a className="button button-primary" href="#produtos">
              Conheça os produtos
              <span className="button-arrow" aria-hidden="true">→</span>
            </a>
            <a className="button button-secondary" href="#localizacao">
              Como chegar
            </a>
          </div>
        </div>

        <div ref={mediaRef} className={styles.media}>
          <div className={styles.frame}>
            <Photo
              image={images.hero}
              className={styles.photo}
              sizes="(min-width: 60rem) 36rem, 100vw"
              priority
            />
          </div>

          <div className={styles.clusterWrap}>
            <GrapeCluster className={styles.cluster} />
          </div>

          <svg className={styles.stamp} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
            <defs>
              <path id="hero-stamp-circle" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
            </defs>
            <circle cx="100" cy="100" r="96" className={styles.stampDisc} />
            <text className={styles.stampText}>
              <textPath href="#hero-stamp-circle" textLength="462">
                {STAMP_TEXT}
              </textPath>
            </text>
            <circle cx="100" cy="100" r="22" className={styles.stampCore} />
          </svg>
        </div>
      </div>

      <a className={styles.scrollCue} href="#produtos" aria-label="Rolar até os produtos">
        <span className={styles.scrollLabel} aria-hidden="true">Role</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}
