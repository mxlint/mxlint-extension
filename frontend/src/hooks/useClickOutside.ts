import { useEffect, type RefObject } from 'react';

/**
 * Call `handler` when a completed click starts and ends outside `ref`.
 *
 * Using `mousedown` alone would close a popup as soon as the pointer left it,
 * including when a selection started inside and was released outside.
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | PointerEvent) => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    let startedOutside = false;

    const isOutside = (event: Event) => {
      const el = ref.current;
      const target = event.target as Node | null;
      return !!el && !!target && !el.contains(target);
    };

    const onPointerDown = (event: PointerEvent) => {
      startedOutside = isOutside(event);
    };

    const onClick = (event: MouseEvent) => {
      if (startedOutside && isOutside(event)) {
        handler(event);
      }
      startedOutside = false;
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('click', onClick);
    };
  }, [ref, handler, enabled]);
}
