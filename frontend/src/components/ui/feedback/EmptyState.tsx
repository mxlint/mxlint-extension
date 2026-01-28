import React from 'react';
import type { Size, BaseProps } from '@/types/ui.types';

export interface EmptyStateProps extends BaseProps {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Call to action */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Component size */
  size?: Size;
}

const DefaultIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
);

export const EmptyState: React.FC<EmptyStateProps> = React.memo(({
  icon,
  title,
  description,
  action,
  size = 'md',
  className,
  id,
}) => {
  const classNames = [
    'ui-empty-state',
    `ui-empty-state--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} id={id}>
      <div className={`ui-empty-state__icon ui-empty-state__icon--${size}`}>
        {icon || <DefaultIcon />}
      </div>
      {title && <h3 className="ui-empty-state__title">{title}</h3>}
      {description && <p className="ui-empty-state__description">{description}</p>}
      {action && (
        <div className="ui-empty-state__action">
          <button
            className="ui-button ui-button--primary ui-button--md"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        </div>
      )}
    </div>
  );
});

