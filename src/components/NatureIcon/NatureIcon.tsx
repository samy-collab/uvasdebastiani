export type NatureIconName = 'leaf' | 'sprout' | 'rose' | 'cover' | 'scissors' | 'trellis' | 'grapes' | 'sun';

/** Traços de 24×24, desenhados com a cor do texto ao redor (`currentColor`). */
const paths: Record<NatureIconName, string[]> = {
  leaf: ['M20 4C11 4 5 9 5 15.5c0 1.5.4 2.9 1 4', 'M20 4c0 9-4.5 15-11 15-1.2 0-2.3-.2-3.2-.6', 'M4 20l9-9'],
  sprout: ['M12 21v-8', 'M12 13C12 8.5 9 6 4 6c0 4.5 3 7 8 7Z', 'M12 11c0-4 2.5-6.5 8-6.5 0 4-2.5 6.5-8 6.5', 'M7 21h10'],
  rose: [
    'M12 13a4.5 4.5 0 0 0 4.5-4.5V4.5L14 6l-2-2.5L10 6 7.5 4.5v4A4.5 4.5 0 0 0 12 13Z',
    'M12 13v8',
    'M12 17c-2.5 0-4-1.2-4.5-3 2.2-.4 3.8.6 4.5 3Z',
    'M12 19c2.5 0 4-1.2 4.5-3-2.2-.4-3.8.6-4.5 3Z',
  ],
  cover: ['M3 13c0-5 4-9 9-9s9 4 9 9', 'M3 13h18', 'M6 13v7', 'M18 13v7', 'M12 13v7', 'M9 4.6 7.5 13', 'M15 4.6l1.5 8.4'],
  scissors: ['M6 6.5a2.5 2.5 0 1 0 0 .01', 'M6 17.5a2.5 2.5 0 1 0 0 .01', 'M8.2 7.8 20 18', 'M8.2 16.2 20 6'],
  trellis: ['M3 6h18', 'M5 6v15', 'M19 6v15', 'M8 6c0 3 1 4 2.5 4.5', 'M14 6c0 2.5 1.5 3.5 3 4'],
  grapes: [
    'M12 3v3',
    'M12 3c1.5-.8 3-.5 4 .5',
    'M9.5 9a2 2 0 1 0 0 .01',
    'M14.5 9a2 2 0 1 0 0 .01',
    'M12 13a2 2 0 1 0 0 .01',
    'M7.5 13a2 2 0 1 0 0 .01',
    'M16.5 13a2 2 0 1 0 0 .01',
    'M10 17a2 2 0 1 0 0 .01',
    'M14 17a2 2 0 1 0 0 .01',
  ],
  sun: [
    'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
    'M12 2v2',
    'M12 20v2',
    'M4.9 4.9l1.4 1.4',
    'M17.7 17.7l1.4 1.4',
    'M2 12h2',
    'M20 12h2',
    'M4.9 19.1l1.4-1.4',
    'M17.7 6.3l1.4-1.4',
  ],
};

export function NatureIcon({ name, className }: { name: NatureIconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
