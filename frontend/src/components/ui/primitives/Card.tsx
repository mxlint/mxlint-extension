import React from 'react';
import type { BaseProps } from '@/types/ui.types';

export interface CardProps extends BaseProps {
  /** Card header content */
  header?: React.ReactNode;
  /** Card footer content */
  footer?: React.ReactNode;
  /** Body padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Show border */
  bordered?: boolean;
  /** Enable hover effect */
  hoverable?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Card body content */
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = React.memo(({
  header,
  footer,
  padding = 'md',
  bordered = true,
  hoverable = false,
  onClick,
  className,
  id,
  children,
}) => {
  const classNames = [
    'ui-card',
    bordered && 'ui-card--bordered',
    hoverable && 'ui-card--hoverable',
    className,
  ].filter(Boolean).join(' ');

  const bodyClassNames = [
    'ui-card__body',
    `ui-card__body--padding-${padding}`,
  ].join(' ');

  const handleClick = hoverable && onClick ? onClick : undefined;
  const handleKeyDown = hoverable && onClick ? (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  } : undefined;

  return (
    <div
      className={classNames}
      id={id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={hoverable && onClick ? 0 : undefined}
      role={hoverable && onClick ? 'button' : undefined}
    >
      {header && <div className="ui-card__header">{header}</div>}
      <div className={bodyClassNames}>{children}</div>
      {footer && <div className="ui-card__footer">{footer}</div>}
    </div>
  );
});

