/** Folha simples, na cor do texto ao redor (`currentColor`). */
export function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20 4c-8.5 0-14 4.6-14 11.2 0 1.4.3 2.7.8 3.8L4 21.8l1.4 1.4 2.8-2.8c1.1.5 2.4.8 3.8.8C18.4 21.2 20 13.7 20 4Zm-8 15.2c-.9 0-1.8-.2-2.6-.5l6.3-6.3-1.4-1.4-6.3 6.3c-.3-.8-.5-1.7-.5-2.6 0-4.6 3.6-8.4 10.4-9.1-.6 7.4-2.6 13.6-5.9 13.6Z" />
    </svg>
  );
}
