import React from 'react';
import type { SortColumn, SortDirection } from '@/types';
import { SortAscIcon, SortDescIcon } from '@/components/icons';

interface SortableHeaderProps {
  column: SortColumn;
  title: string;
  className?: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  /** Start a drag-resize of this column (renders a resize handle when set). */
  onResizeStart?: (column: SortColumn, event: React.PointerEvent) => void;
  /** Reset all column widths to their defaults (double-click on the handle). */
  onResizeReset?: () => void;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  column,
  title,
  className,
  sortColumn,
  sortDirection,
  onSort,
  onResizeStart,
  onResizeReset,
}) => (
  <th
    className={`${className || ''} sortable-header`}
    onClick={() => onSort(column)}
    title={`Sort by ${title}`}
  >
    <span className="header-content">
      {title}
      {sortColumn === column && (
        <span className="sort-indicator">
          {sortDirection === 'asc' ? <SortAscIcon /> : <SortDescIcon />}
        </span>
      )}
    </span>
    {onResizeStart && (
      <span
        className="column-resize-handle"
        role="separator"
        aria-orientation="vertical"
        aria-label={`Resize ${title} column`}
        title="Drag to resize. Double-click to reset all columns."
        onClick={e => e.stopPropagation()}
        onDoubleClick={e => {
          e.stopPropagation();
          onResizeReset?.();
        }}
        onPointerDown={e => onResizeStart(column, e)}
      />
    )}
  </th>
);
