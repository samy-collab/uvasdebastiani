import { getContactLinks, site } from '../../data/site';
import { Reveal } from '../Reveal/Reveal';
import styles from './LocationSection.module.css';

export function LocationSection() {
  const contacts = getContactLinks().filter((contact) => contact.label !== 'Google');

  return (
    <section id="localizacao" className={styles.section} aria-labelledby="localizacao-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <Reveal variant="left">
            <p className="eyebrow">Localização</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="localizacao-title" className={styles.title}>
              Venha nos visitar
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className={styles.place}>
              <PinIcon />
              <span>
                {site.city}, {site.state}
              </span>
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className={styles.easy}>
              <strong>Fácil de chegar.</strong> Estamos na localidade de Aparecida, a poucos minutos do
              centro de {site.city}. Siga o mapa ou toque em “Traçar rota” para abrir o caminho direto
              no seu celular.
            </p>
          </Reveal>

          {site.mapEmbedUrl && (
            <Reveal variant="scale" delay={300} className={styles.mapWrap}>
              <iframe
                className={styles.map}
                src={site.mapEmbedUrl}
                title={`Mapa com a localização da ${site.name} em ${site.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          )}
        </div>

        <Reveal variant="right" delay={150}>
          <div className={styles.card}>
            <dl className={styles.details}>
              {site.address && (
                <div>
                  <dt>Endereço</dt>
                  <dd>
                    <address>{site.address}</address>
                  </dd>
                </div>
              )}
              {site.openingHours && site.openingHours.length > 0 && (
                <div>
                  <dt>Horários</dt>
                  {site.openingHours.map((line) => (
                    <dd key={line}>{line}</dd>
                  ))}
                </div>
              )}
              {contacts.map((contact) => (
                <div key={contact.label}>
                  <dt>{contact.label}</dt>
                  <dd>
                    <a href={contact.href} target="_blank" rel="noopener noreferrer">
                      {contact.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            {!site.address && (
              <p className={styles.note}>
                Encontre nossa localização e as informações de contato no perfil da empresa no
                Google.
              </p>
            )}

            <div className={styles.actions}>
              <a
                className="button button-primary"
                href={site.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver perfil no Google
                <span className="visually-hidden"> (abre em nova aba)</span>
              </a>
              {site.directionsUrl && (
                <a
                  className="button button-secondary"
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Traçar rota
                  <span className="visually-hidden"> (abre em nova aba)</span>
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PinIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
      />
    </svg>
  );
}
