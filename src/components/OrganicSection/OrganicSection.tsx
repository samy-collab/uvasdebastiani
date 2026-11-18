import { images } from '../../data/images';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { NatureIcon, type NatureIconName } from '../NatureIcon/NatureIcon';
import { Photo } from '../Photo/Photo';
import { Reveal } from '../Reveal/Reveal';
import styles from './OrganicSection.module.css';

const pillars: { title: string; text: string; icon: NatureIconName }[] = [
  {
    title: 'Manejo orgânico',
    icon: 'sprout',
    text: 'A uva cresce sem agrotóxicos sintéticos, no tempo da natureza.',
  },
  {
    title: 'Roseiras no parreiral',
    icon: 'rose',
    text: 'As roseiras floridas nas cabeceiras das fileiras fazem parte da paisagem e do cuidado com a lavoura.',
  },
  {
    title: 'Cultivo protegido',
    icon: 'cover',
    text: 'A cobertura sobre as parreiras resguarda os cachos da chuva forte e do granizo.',
  },
  {
    title: 'Colheita à mão',
    icon: 'scissors',
    text: 'Cada cacho é escolhido e cortado com tesoura, só quando chega ao ponto certo.',
  },
];

export function OrganicSection() {
  const sectionRef = useScrollProgress<HTMLElement>();

  return (
    <section ref={sectionRef} id="cultivo-organico" className={styles.section} aria-labelledby="organico-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.media}>
          <Reveal variant="wipe">
            <Photo image={images.organicoRoseiras} className={styles.photo} sizes="(min-width: 60rem) 32rem, 100vw" />
          </Reveal>
          <Reveal variant="scale" delay={300} className={styles.badgeWrap}>
            <p className={styles.badge}>
              <NatureIcon name="leaf" className={styles.badgeIcon} />
              <span>
                Cultivo
                <strong>orgânico</strong>
              </span>
            </p>
          </Reveal>
        </div>

        <div className={styles.content}>
          <Reveal variant="left">
            <p className={`eyebrow ${styles.eyebrow}`}>Cultivo orgânico</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="organico-title" className={styles.title}>
              Uva com o cuidado da natureza
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className={styles.lead}>
              Nosso parreiral é cultivado de forma orgânica: respeitamos o solo, as plantas e o
              tempo de cada cacho, para que a fruta chegue à sua mesa como deve ser.
            </p>
          </Reveal>

          <ul className={styles.pillars}>
            {pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <Reveal delay={240 + index * 90} className={styles.pillar}>
                  <NatureIcon name={pillar.icon} className={styles.pillarIcon} />
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarText}>{pillar.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
