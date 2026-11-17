import { useEffect, useRef, useState } from 'react';
import styles from './BackToTop.module.css';

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Botão flutuante de voltar ao topo; o anel mostra quanto da página já foi lido. */
export function BackToTop() {
  const ringRef = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      ringRef.current?.style.setProperty('stroke-dashoffset', String(CIRCUMFERENCE * (1 - ratio)));
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <a className={styles.button} href="#inicio" data-visible={visible}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <svg className={styles.ring} viewBox="0 0 52 52" aria-hidden="true" focusable="false">
        <circle className={styles.track} cx="26" cy="26" r={RADIUS} />
        <circle
          ref={ringRef}
          className={styles.progress}
          cx="26"
          cy="26"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      <span className="visually-hidden">Voltar ao topo</span>
    </a>
  );
}
