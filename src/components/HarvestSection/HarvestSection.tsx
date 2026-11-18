import { images, videos } from '../../data/images';
import { getContactLinks } from '../../data/site';
import { Photo } from '../Photo/Photo';
import { Reveal } from '../Reveal/Reveal';
import { VideoReel, type ReelItem } from '../VideoReel/VideoReel';
import styles from './HarvestSection.module.css';

const reel: ReelItem[] = [
  { video: videos.colheitaMao, caption: 'Colha direto da latada' },
  { video: videos.colheitaCaixas, caption: 'Escolha os seus cachos' },
  { video: videos.colheitaLatada, caption: 'Cachos maduros no ponto' },
  { video: videos.colheitaMesa, caption: 'Mesa posta à sombra' },
];

export function HarvestSection() {
  const instagram = getContactLinks().find((contact) => contact.label === 'Instagram');

  return (
    <section id="colheita" className={styles.section} aria-labelledby="colheita-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <Reveal variant="left">
            <p className="eyebrow">Dia de colheita</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="colheita-title" className={styles.title}>
              Venha colher com a gente
            </h2>
          </Reveal>
          <Reveal delay={200} className={styles.text}>
            <p>
              Na época da safra, abrimos a propriedade para visitas: você caminha entre as latadas,
              escolhe os cachos e colhe com as próprias mãos.
            </p>
            <p>
              As uvas são pesadas na hora, e a mesa fica posta com limonada, frutas e os nossos sucos e
              geleias. É um passeio para toda a família.
            </p>
          </Reveal>
          {instagram && (
            <Reveal delay={280}>
              <a className="button button-primary" href={instagram.href} target="_blank" rel="noopener noreferrer">
                Acompanhe as datas no Instagram
                <span className="button-arrow" aria-hidden="true">→</span>
              </a>
            </Reveal>
          )}
        </div>

        <Reveal variant="wipe" delay={150} className={styles.stand}>
          <Photo image={images.banca} className={styles.standPhoto} sizes="(min-width: 60rem) 26rem, 100vw" />
          <p className={styles.standCaption}>Banca com sucos, geleias e uvas na propriedade</p>
        </Reveal>
      </div>

      <div className="container">
        <VideoReel items={reel} />
      </div>
    </section>
  );
}
