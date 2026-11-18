import { useSyncExternalStore } from 'react';

const subscribeNever = () => () => {};

/**
 * Valor que só o navegador conhece (preferências do sistema, data atual).
 * invariant: the prerendered HTML and the first client render both use `serverValue`, so hydration never mismatches; the browser value replaces it right after.
 */
export function useClientValue<T>(getClientValue: () => T, serverValue: T): T {
  return useSyncExternalStore(subscribeNever, getClientValue, () => serverValue);
}
