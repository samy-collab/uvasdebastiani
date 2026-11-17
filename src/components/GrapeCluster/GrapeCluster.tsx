import { useId, type CSSProperties } from 'react';
import styles from './GrapeCluster.module.css';

const ROWS = [4, 5, 4, 3, 3, 2, 1];
const R = 15;
const STEP_X = 29;
const STEP_Y = 25;

// why: computed once at module load; the berries are a fixed triangle so there is no per-render cost
const BERRIES = ROWS.flatMap((count, row) =>
  Array.from({ length: count }, (_, col) => ({
    cx: 110 + (col - (count - 1) / 2) * STEP_X + (row % 2 ? 3 : -3),
    cy: 92 + row * STEP_Y,
    order: row * 5 + col,
  })),
);

interface GrapeClusterProps {
  className?: string;
}

/** Cacho de uva ilustrado: as bagas surgem uma a uma e o cacho balança devagar. Decorativo. */
export function GrapeCluster({ className }: GrapeClusterProps) {
  // why: the cluster can appear more than once per page and SVG gradient ids are document-global
  const shadeId = `berry-shade-${useId().replace(/[^\w-]/g, '')}`;

  return (
    <svg
      className={[styles.cluster, className].filter(Boolean).join(' ')}
      viewBox="0 0 220 290"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={shadeId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" style={{ stopColor: 'var(--berry-light, #8a4a7b)' }} />
          <stop offset="55%" style={{ stopColor: 'var(--berry-mid, #5a2c50)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--berry-dark, #2e1328)' }} />
        </radialGradient>
      </defs>
      <g className={styles.sway}>
        <path className={styles.tendril} d="M112 70 C 140 40, 170 60, 160 82 C 152 98, 132 88, 142 76" />
        <path className={styles.stem} d="M110 76 L 112 30" />
        <path
          className={styles.leaf}
          d="M112 40 C 80 6, 30 20, 34 52 C 50 50, 58 66, 74 62 C 84 74, 104 64, 112 40 Z"
        />
        <path className={styles.vein} d="M112 40 C 90 42, 66 46, 44 46" />
        {BERRIES.map(({ cx, cy, order }) => (
          <g key={order} className={styles.berry} style={{ '--i': order } as CSSProperties}>
            <circle cx={cx} cy={cy} r={R} fill={`url(#${shadeId})`} />
            <circle className={styles.shine} cx={cx - 5} cy={cy - 6} r={3.5} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Pequeno ícone de cacho usado como separador. Decorativo. */
export function GrapeGlyph({ className }: GrapeClusterProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <g fill="currentColor">
        <circle cx="8" cy="8" r="2.6" />
        <circle cx="13.5" cy="8" r="2.6" />
        <circle cx="16.5" cy="12" r="2.4" opacity="0.85" />
        <circle cx="10.5" cy="12.5" r="2.6" />
        <circle cx="7" cy="12.8" r="2.2" opacity="0.85" />
        <circle cx="13.5" cy="16.5" r="2.4" />
        <circle cx="9" cy="17" r="2.2" opacity="0.85" />
        <circle cx="11.5" cy="21" r="2" />
      </g>
    </svg>
  );
}
