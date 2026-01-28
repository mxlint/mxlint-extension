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
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  column,
  title,
  className,
  sortColumn,
  sortDirection,
  onSort,
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
  </th>
);
