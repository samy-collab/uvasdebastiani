import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { navLinks, site } from '../../data/site';
import styles from './Header.module.css';

const sectionIds = navLinks.map((link) => link.href.slice(1));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    // why: once the layout switches to the desktop nav, an open mobile state would leave the menu stuck open on the next shrink
    const desktop = window.matchMedia('(min-width: 52rem)');
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [menuOpen]);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty('--read', String(max > 0 ? y / max : 0));
      setScrolled(y > 12);
      // why: hiding on the way down frees the screen for reading; any upward scroll brings the menu back at once
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > window.innerHeight * 0.6);
        lastY = y;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
    };
  }, []);

  return (
    <header
      className={styles.header}
      data-scrolled={scrolled}
      data-hidden={hidden && !menuOpen}
      onFocusCapture={() => setHidden(false)}
    >
      <div className={`container ${styles.bar}`}>
        <a className={styles.brand} href="#inicio" onClick={() => setMenuOpen(false)}>
          <img className={styles.logo} src="/brand/logo.webp" alt={site.name} width={900} height={335} />
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.toggleIcon} aria-hidden="true" data-open={menuOpen} />
          <span className="visually-hidden">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>

        <nav
          id="menu-principal"
          className={styles.nav}
          data-open={menuOpen}
          aria-label="Navegação principal"
        >
          <ul className={styles.list}>
            {navLinks.map((link, index) => (
              <li key={link.href} style={{ '--i': index } as CSSProperties}>
                <a
                  className={styles.link}
                  href={link.href}
                  aria-current={active === link.href.slice(1) ? 'location' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div ref={progressRef} className={styles.progress} aria-hidden="true" />
    </header>
  );
}
