import React from 'react';
import type { Size, Severity, BaseProps } from '@/types/ui.types';

export interface BadgeProps extends BaseProps {
  /** Badge color variant */
  variant?: Severity | 'default';
  /** Badge size */
  size?: Size;
  /** Show as a dot indicator */
  dot?: boolean;
  /** Icon element to display */
  icon?: React.ReactNode;
  /** Badge content */
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = React.memo(({
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className,
  id,
  children,
}) => {
  const classNames = [
    'ui-badge',
    `ui-badge--${variant}`,
    `ui-badge--${size}`,
    dot && 'ui-badge--dot',
    className,
  ].filter(Boolean).join(' ');

  if (dot) {
    return <span className={classNames} id={id} aria-hidden="true" />;
  }

  return (
    <span className={classNames} id={id}>
      {icon && <span className="ui-badge__icon">{icon}</span>}
      {children}
    </span>
  );
});

