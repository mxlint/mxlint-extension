import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type ResizableColumnKey =
  | 'severity'
  | 'document'
  | 'module'
  | 'doctype'
  | 'rule'
  | 'category'
  | 'status';

export const RESIZABLE_COLUMNS: readonly ResizableColumnKey[] = [
  'severity',
  'document',
  'module',
  'doctype',
  'rule',
  'category',
  'status',
];

/** Width of the fixed (non-resizable) checkbox and bookmark columns. */
const FIXED_COLUMNS_WIDTH = 36 + 36;
const MIN_COLUMN_WIDTH = 48;
const MAX_COLUMN_WIDTH = 1200;
const STORAGE_KEY = 'mxlint.tableColumnWidths.v1';

type ColumnWidths = Partial<Record<ResizableColumnKey, number>>;

const clampWidth = (width: number): number =>
  Math.round(Math.min(MAX_COLUMN_WIDTH, Math.max(MIN_COLUMN_WIDTH, width)));

const loadStoredWidths = (): ColumnWidths => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const widths: ColumnWidths = {};
    for (const key of RESIZABLE_COLUMNS) {
      const value = parsed[key];
      if (typeof value === 'number' && Number.isFinite(value)) {
        widths[key] = clampWidth(value);
      }
    }
    return widths;
  } catch {
    return {};
  }
};

interface DragState {
  column: ResizableColumnKey;
  startX: number;
  startWidth: number;
}

/**
 * Drag-to-resize behaviour for the lint results table columns.
 *
 * On the first drag all column widths are snapshotted to pixel values so the
 * rest of the table stays put while one column is resized. Widths persist in
 * localStorage; double-clicking any resize handle restores the default
 * proportional layout.
 */
export function useResizableColumns(tableRef: React.RefObject<HTMLTableElement | null>) {
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(loadStoredWidths);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => {
    try {
      if (Object.keys(columnWidths).length === 0) {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(columnWidths));
      }
    } catch {
      // Persistence is best-effort; ignore storage failures (e.g. sandboxed webview).
    }
  }, [columnWidths]);

  const measureCurrentWidths = useCallback((): ColumnWidths => {
    const table = tableRef.current;
    const widths: ColumnWidths = {};
    if (!table) return widths;
    for (const key of RESIZABLE_COLUMNS) {
      const th = table.querySelector<HTMLTableCellElement>(`thead th.col-${key}`);
      if (th && th.offsetWidth > 0) {
        widths[key] = clampWidth(th.offsetWidth);
      }
    }
    return widths;
  }, [tableRef]);

  const startResize = useCallback((column: ResizableColumnKey, event: React.PointerEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Snapshot every column to pixels (reflecting the current rendered
    // layout) so only the dragged column moves during the drag.
    const snapshot = measureCurrentWidths();
    const startWidth = snapshot[column];
    if (startWidth === undefined) return;

    setColumnWidths(snapshot);

    dragRef.current = { column, startX: event.clientX, startWidth };
    setIsResizing(true);

    const handlePointerMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const nextWidth = clampWidth(drag.startWidth + (e.clientX - drag.startX));
      setColumnWidths(prev =>
        prev[drag.column] === nextWidth ? prev : { ...prev, [drag.column]: nextWidth }
      );
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
  }, [measureCurrentWidths]);

  const resetColumnWidths = useCallback(() => {
    setColumnWidths({});
  }, []);

  const hasCustomWidths = Object.keys(columnWidths).length > 0;

  // When every column has an explicit width the table is sized to their sum,
  // so dragging tracks the pointer exactly and wide layouts scroll
  // horizontally instead of crushing other columns.
  const tableStyle = useMemo((): React.CSSProperties | undefined => {
    if (!hasCustomWidths) return undefined;
    let total = FIXED_COLUMNS_WIDTH;
    for (const key of RESIZABLE_COLUMNS) {
      const width = columnWidths[key];
      if (width === undefined) return undefined;
      total += width;
    }
    return { width: total, minWidth: '100%' };
  }, [columnWidths, hasCustomWidths]);

  return { columnWidths, tableStyle, isResizing, hasCustomWidths, startResize, resetColumnWidths };
}
