import { getContactLinks, site } from '../../data/site';
import { usePointerTilt } from '../../hooks/usePointerTilt';
import { Reveal } from '../Reveal/Reveal';
import styles from './LocationSection.module.css';

export function LocationSection() {
  const contacts = getContactLinks().filter((contact) => contact.label !== 'Google');
  const mapRef = usePointerTilt<HTMLDivElement>();

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

          <Reveal variant="scale" delay={250} className={styles.mapWrap}>
            <div ref={mapRef} className={styles.map} aria-hidden="true">
              <svg className={styles.contours} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
                <path d="M-20 60 C 80 20, 160 90, 260 50 S 380 10, 420 40" />
                <path d="M-20 110 C 90 70, 170 140, 270 100 S 390 60, 420 90" />
                <path d="M-20 160 C 100 120, 180 190, 280 150 S 400 110, 420 140" />
                <path d="M-20 210 C 110 170, 190 240, 290 200 S 410 160, 420 190" />
                <path className={styles.road} d="M-10 240 C 80 200, 120 150, 200 130" />
              </svg>
              <span className={styles.pulse} />
              <span className={styles.pulse} />
              <span className={styles.mapPin}>
                <PinIcon />
              </span>
            </div>
          </Reveal>
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
