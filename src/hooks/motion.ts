/** `true` quando o visitante pediu menos movimento no sistema operacional. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** `true` em mouse/trackpad — efeitos que seguem o ponteiro não fazem sentido no toque. */
export function hasFinePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
