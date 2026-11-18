import { imageCredits } from '../../data/images';
import { getContactLinks, navLinks, site } from '../../data/site';
import { useClientValue } from '../../hooks/useClientValue';
import { Reveal } from '../Reveal/Reveal';
import styles from './Footer.module.css';

const buildYear = new Date().getFullYear();
const getCurrentYear = () => new Date().getFullYear();

export function Footer() {
  const contacts = getContactLinks();
  const currentYear = useClientValue(getCurrentYear, buildYear);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.hero}`}>
        <Reveal className={styles.wordmarkWrap}>
          <p className={styles.wordmark} aria-hidden="true">
            Da parreira <em>à sua mesa</em>
          </p>
        </Reveal>
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.brandBlock}>
          <img className={styles.logo} src="/brand/logo-claro.webp" alt={site.name} width={900} height={335} loading="lazy" />
          <p className={styles.muted}>
            {site.city}, {site.state}
          </p>
        </div>

        <nav aria-label="Atalhos do rodapé">
          <h2 className={styles.heading}>Navegue</h2>
          <ul className={styles.list}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Contato</h2>
          <ul className={styles.list}>
            {contacts.map((contact) => (
              <li key={contact.label}>
                <a href={contact.href} target="_blank" rel="noopener noreferrer">
                  {contact.label === 'Google' ? 'Perfil no Google' : `${contact.label}: ${contact.value}`}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {imageCredits.length > 0 && (
        <div className={`container ${styles.credits}`}>
          <p>
            Imagens ilustrativas:{' '}
            {imageCredits.map((credit, index) => (
              <span key={credit.sourceUrl}>
                {index > 0 && '; '}
                <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">
                  foto
                </a>{' '}
                de{' '}
                <a href={credit.authorUrl} target="_blank" rel="noopener noreferrer">
                  {credit.author}
                </a>{' '}
                ({credit.source},{' '}
                <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">
                  {credit.license}
                </a>
                {credit.changes && `; ${credit.changes}`})
              </span>
            ))}
            .
          </p>
        </div>
      )}

      <div className={`container ${styles.bottom}`}>
        <p>
          © {currentYear} {site.name}
        </p>
      </div>
    </footer>
  );
}
