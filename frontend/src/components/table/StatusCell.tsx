import React from 'react';
import { Tooltip } from '@/components/ui';
import { CheckIcon, SkipIcon, ErrorIcon } from '@/components/icons';

interface StatusCellProps {
  status: string;
  skipReason?: string;
}

const STATUS_ICONS: Record<string, React.FC> = {
  pass: CheckIcon,
  skip: SkipIcon,
  fail: ErrorIcon,
};

/**
 * Renders a status value both as a text badge (wide screens) and as an
 * icon with a tooltip (narrow screens). Visibility is toggled via CSS.
 */
export const StatusCell: React.FC<StatusCellProps> = React.memo(({ status, skipReason }) => {
  const Icon = STATUS_ICONS[status] || SkipIcon;
  const tooltip = skipReason ? `${status}: ${skipReason}` : status;

  return (
    <>
      <span className={`status-label ${status}`} title={skipReason || undefined}>{status}</span>
      <span className="cell-icon">
        <Tooltip content={tooltip}>
          <span className="cell-icon-btn" role="img" aria-label={`Status: ${tooltip}`}>
            <Icon />
          </span>
        </Tooltip>
      </span>
    </>
  );
});
