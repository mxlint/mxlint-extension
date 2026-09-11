import { useCallback, useRef } from 'react';

/**
 * Close an overlay only when the pointer both pressed and released on it.
 *
 * A click that starts inside a popup (for example while selecting text) and
 * ends on the backdrop would otherwise count as an overlay click, because the
 * click event is dispatched on the common ancestor. That feels like the popup
 * dismissed itself mid-selection.
 */
export function useOverlayDismiss(onDismiss: () => void, enabled: boolean = true) {
  const pressStartedOnOverlay = useRef(false);
  const pressEndedOnOverlay = useRef(false);

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    pressStartedOnOverlay.current = enabled && event.target === event.currentTarget;
    pressEndedOnOverlay.current = false;
  }, [enabled]);

  const onPointerUp = useCallback((event: React.PointerEvent) => {
    pressEndedOnOverlay.current = enabled && event.target === event.currentTarget;
  }, [enabled]);

  const onClick = useCallback((event: React.MouseEvent) => {
    if (
      enabled &&
      pressStartedOnOverlay.current &&
      pressEndedOnOverlay.current &&
      event.target === event.currentTarget
    ) {
      onDismiss();
    }
    pressStartedOnOverlay.current = false;
    pressEndedOnOverlay.current = false;
  }, [enabled, onDismiss]);

  return { onPointerDown, onPointerUp, onClick };
}
