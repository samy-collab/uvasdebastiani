import { useEffect, useId, useRef, useState } from 'react';
import { site } from '../../data/site';
import styles from './WhatsAppWidget.module.css';

/** Abertura de toda mensagem, para a família saber que o contato veio pelo site. */
const GREETING = 'Olá! Vim do site Uvas De Bastiani.';

/** Mensagens prontas: o visitante escolhe uma e ela já chega escrita no WhatsApp. */
const topics = [
  { label: 'Comprar uvas', message: `${GREETING} Gostaria de saber quais uvas vocês têm disponíveis.` },
  { label: 'Sucos e geleias', message: `${GREETING} Gostaria de encomendar sucos e geleias.` },
  { label: 'Kits presente', message: `${GREETING} Tenho interesse nos kits presente.` },
  { label: 'Dia de colheita', message: `${GREETING} Quando será o próximo dia de colheita?` },
];

const DEFAULT_MESSAGE = GREETING;

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [topic, setTopic] = useState<number | null>(null);
  const panelId = useId();
  const messageId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!site.whatsapp) return null;
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className={styles.widget} data-open={open}>
      <div
        ref={panelRef}
        id={panelId}
        className={styles.panel}
        role="dialog"
        aria-label="Conversar no WhatsApp"
        tabIndex={-1}
        hidden={!open}
      >
        <header className={styles.header}>
          <img className={styles.avatar} src="/brand/simbolo.webp" alt="" width={256} height={256} />
          <div>
            <p className={styles.name}>Uvas De Bastiani</p>
            <p className={styles.status}>Atendimento da família</p>
          </div>
          <button
            type="button"
            className={styles.close}
            aria-label="Fechar"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
          >
            ×
          </button>
        </header>

        <div className={styles.body}>
          <p className={styles.bubble}>
            Olá! 🍇 Somos a família De Bastiani. Sobre o que você quer conversar?
          </p>
          <div className={styles.topics} role="group" aria-label="Assunto da mensagem">
            {topics.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={styles.topic}
                aria-pressed={topic === index}
                onClick={() => {
                  setTopic(index);
                  setMessage(item.message);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {topic !== null && (
            <div key={topic} className={styles.outgoing}>
              <label className={styles.outgoingLabel} htmlFor={messageId}>
                Você vai enviar (pode editar):
              </label>
              <textarea
                id={messageId}
                className={styles.outgoingText}
                value={message}
                rows={3}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
          )}
        </div>

        <a
          className={styles.send}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={message.trim() === ''}
          onClick={(event) => {
            if (message.trim() === '') event.preventDefault();
          }}
        >
          <WhatsAppIcon />
          Conversar no WhatsApp
          <span className="visually-hidden"> (abre em nova aba)</span>
        </a>
      </div>

      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Fechar conversa do WhatsApp' : 'Falar no WhatsApp'}
        onClick={() => setOpen((value) => !value)}
      >
        <WhatsAppIcon />
        <span className={styles.toggleLabel} aria-hidden="true">
          Fale conosco
        </span>
      </button>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.8.82-3-.2-.31a8.2 8.2 0 1 1 6.96 3.84Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42l-.75-1.82c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.69c1.56.67 2.17.73 2.95.61.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
