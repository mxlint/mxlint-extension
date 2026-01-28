import { useState, useEffect, useMemo, useRef, useSyncExternalStore, useCallback } from 'react';
import { ROW_HEIGHT, OVERSCAN } from '@/constants';

export function useVirtualList<T>(
  items: T[],
  containerRef: React.RefObject<HTMLDivElement | null>,
  rowHeight: number = ROW_HEIGHT,
  overscan: number = OVERSCAN
) {
  const [containerHeight, setContainerHeight] = useState(0);
  const prevItemsLengthRef = useRef(items.length);
  const scrollTopRef = useRef(0);

  // Subscribe to scroll events using useSyncExternalStore pattern
  const subscribe = useCallback((onStoreChange: () => void) => {
    const container = containerRef.current;
    if (!container) return () => {};

    const handleScroll = () => {
      scrollTopRef.current = container.scrollTop;
      onStoreChange();
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  const getSnapshot = useCallback(() => scrollTopRef.current, []);

  const scrollTop = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  // Reset scroll position when items length changes
  useEffect(() => {
    if (prevItemsLengthRef.current !== items.length) {
      prevItemsLengthRef.current = items.length;
      scrollTopRef.current = 0;
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  }, [items.length, containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => setContainerHeight(container.clientHeight);
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [containerRef]);

  const totalHeight = items.length * rowHeight;

  // Clamp scroll position to valid range to handle filter changes
  const clampedScrollTop = Math.min(scrollTop, Math.max(0, totalHeight - containerHeight));

  const startIndex = Math.max(0, Math.floor(clampedScrollTop / rowHeight) - overscan);
  const endIndex = Math.min(
    items.length,
    Math.ceil((clampedScrollTop + containerHeight) / rowHeight) + overscan
  );

  const visibleItems = useMemo(() => {
    const result: { item: T; index: number }[] = [];
    for (let i = startIndex; i < endIndex; i++) {
      result.push({ item: items[i], index: i });
    }
    return result;
  }, [items, startIndex, endIndex]);

  const offsetY = startIndex * rowHeight;

  return { visibleItems, totalHeight, offsetY, startIndex, endIndex };
}
