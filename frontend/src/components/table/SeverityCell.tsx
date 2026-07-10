import React from 'react';
import { Tooltip } from '@/components/ui';
import { SeverityIcon } from '@/components/icons';

interface SeverityCellProps {
  severity?: string;
}

/**
 * Renders a severity value both as a text badge (wide screens) and as an
 * icon with a tooltip (narrow screens). Visibility is toggled via CSS.
 */
export const SeverityCell: React.FC<SeverityCellProps> = React.memo(({ severity }) => {
  const label = severity || 'N/A';
  const level = (severity || 'low').toLowerCase();

  return (
    <>
      <span className={`severity-label ${level}`}>{label}</span>
      <span className="cell-icon">
        <Tooltip content={label}>
          <span className="cell-icon-btn" role="img" aria-label={`Severity: ${label}`}>
            <SeverityIcon severity={severity} />
          </span>
        </Tooltip>
      </span>
    </>
  );
});
