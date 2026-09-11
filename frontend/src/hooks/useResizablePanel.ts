import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_PANEL_WIDTH = 240;
const MAX_PANEL_WIDTH = 720;
const DEFAULT_PANEL_WIDTH = 320;
const KEYBOARD_STEP = 16;
const STORAGE_KEY = 'mxlint.detailPanelWidth.v1';

const clampPanelWidth = (width: number, containerWidth?: number): number => {
  // Leave room for the table next to the panel on wider layouts.
  const dynamicMax = containerWidth && containerWidth > 0
    ? Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, containerWidth - 280))
    : MAX_PANEL_WIDTH;
  return Math.round(Math.min(dynamicMax, Math.max(MIN_PANEL_WIDTH, width)));
};

const loadStoredWidth = (): number => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw === null ? NaN : Number(raw);
    return Number.isFinite(parsed) ? clampPanelWidth(parsed) : DEFAULT_PANEL_WIDTH;
  } catch {
    return DEFAULT_PANEL_WIDTH;
  }
};

/**
 * Drag (and keyboard) resizing for the detail side panel. The width persists
 * in localStorage; double-clicking the splitter restores the default width.
 */
export function useResizablePanel(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState<number>(loadStoredWidth);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef<{ startX: number; startWidth: number } | null>(null);

  useEffect(() => {
    try {
      if (width === DEFAULT_PANEL_WIDTH) {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, String(width));
      }
    } catch {
      // Persistence is best-effort; ignore storage failures.
    }
  }, [width]);

  const startResize = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    dragRef.current = { startX: event.clientX, startWidth: width };
    setIsResizing(true);

    const containerWidth = containerRef.current?.clientWidth;

    const handlePointerMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      // The panel sits to the right, so dragging left grows it.
      const next = clampPanelWidth(drag.startWidth + (drag.startX - e.clientX), containerWidth);
      setWidth(prev => (prev === next ? prev : next));
    };

    const stopResize = () => {
      dragRef.current = null;
      setIsResizing(false);
      document.body.classList.remove('is-resizing-columns');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResize);
      window.removeEventListener('pointercancel', stopResize);
    };

    document.body.classList.add('is-resizing-columns');
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopResize);
    window.addEventListener('pointercancel', stopResize);
  }, [containerRef, width]);

  const resetWidth = useCallback(() => setWidth(DEFAULT_PANEL_WIDTH), []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const containerWidth = containerRef.current?.clientWidth;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      setWidth(prev => clampPanelWidth(prev + KEYBOARD_STEP, containerWidth));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      setWidth(prev => clampPanelWidth(prev - KEYBOARD_STEP, containerWidth));
    } else if (event.key === 'Home') {
      event.preventDefault();
      event.stopPropagation();
      setWidth(DEFAULT_PANEL_WIDTH);
    }
  }, [containerRef]);

  return { width, isResizing, startResize, resetWidth, handleKeyDown };
}
