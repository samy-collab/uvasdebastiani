import { images, videos } from '../../data/images';
import { NatureIcon, type NatureIconName } from '../NatureIcon/NatureIcon';
import { Photo } from '../Photo/Photo';
import { Reveal } from '../Reveal/Reveal';
import { VideoReel, type ReelItem } from '../VideoReel/VideoReel';
import styles from './KidsSection.module.css';

const freedoms: { text: string; icon: NatureIconName }[] = [
  { text: 'Colher e provar a uva direto do cacho', icon: 'grapes' },
  { text: 'Correr e brincar ao ar livre, entre as parreiras', icon: 'sun' },
  { text: 'Cama elástica, sombra e espaço de sobra', icon: 'leaf' },
  { text: 'Descobrir de onde vem a fruta que chega à mesa', icon: 'sprout' },
];

const reel: ReelItem[] = [
  { video: videos.criancasUva, caption: 'Provar a uva na hora' },
  { video: videos.criancasCamaElastica, caption: 'Pular com um cacho na mão' },
  { video: videos.criancasBrincando, caption: 'Brincar sem pressa' },
  { video: videos.criancasLimonada, caption: 'Limonada fresquinha' },
];

export function KidsSection() {
  return (
    <section id="criancas" className={styles.section} aria-labelledby="criancas-title">
      <div className={`container ${styles.layout}`}>
        <Reveal variant="scale" className={styles.polaroidWrap}>
          <figure className={styles.polaroid}>
            <Photo image={images.criancasColheita} className={styles.photo} sizes="18rem" />
            <figcaption className={styles.polaroidCaption}>Colheita com a criançada</figcaption>
          </figure>
        </Reveal>

        <div className={styles.content}>
          <Reveal variant="left">
            <p className="eyebrow">Para as crianças</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="criancas-title" className={styles.title}>
              Liberdade para ser criança
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className={styles.lead}>
              Aqui as crianças têm espaço para correr, brincar e provar a uva no pé. Enquanto a família
              colhe, elas ficam livres, no meio da natureza.
            </p>
          </Reveal>
          <ul className={styles.list}>
            {freedoms.map((item, index) => (
              <li key={item.text}>
                <Reveal delay={240 + index * 80} className={styles.listItem}>
                  <span className={styles.iconBadge}>
                    <NatureIcon name={item.icon} className={styles.icon} />
                  </span>
                  {item.text}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <VideoReel items={reel} />
      </div>
    </section>
  );
}
