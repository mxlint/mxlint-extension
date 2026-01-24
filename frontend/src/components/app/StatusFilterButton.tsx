import React from 'react';
import { Button } from '@/components/ui';

interface StatusFilterButtonProps {
  active: boolean;
  count: number;
  label: string;
  title: string;
  icon: React.ReactNode;
  iconClassName: string;
  onClick: () => void;
}

export const StatusFilterButton: React.FC<StatusFilterButtonProps> = React.memo(({
  active,
  count,
  label,
  title,
  icon,
  iconClassName,
  onClick,
}) => (
  <Button
    variant="ghost"
    size="sm"
    className={`toolbar-item ${active ? 'active' : ''}`}
    onClick={onClick}
    title={title}
    aria-pressed={active}
  >
    <span className="badge">
      <span className={`badge-icon ${iconClassName}`}>{icon}</span>
      <span>{count} {label}</span>
    </span>
  </Button>
));

