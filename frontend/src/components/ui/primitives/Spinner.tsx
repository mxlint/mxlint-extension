import React from 'react';
import type { Size, BaseProps } from '@/types/ui.types';

export interface SpinnerProps extends BaseProps {
  /** Spinner size */
  size?: Size;
  /** Custom color (defaults to currentColor) */
  color?: string;
  /** Accessible label for screen readers */
  label?: string;
  /** Display inline with text */
  inline?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = React.memo(({
  size = 'md',
  color = 'currentColor',
  label,
  inline = false,
  className,
  id,
}) => {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const pixelSize = sizeMap[size];

  const classNames = [
    'ui-spinner',
    `ui-spinner--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classNames}
      id={id}
      role="status"
      aria-label={label || 'Loading'}
      style={{ display: inline ? 'inline-flex' : 'flex' }}
    >
      <svg
        className="ui-spinner__circle"
        viewBox="0 0 24 24"
        width={pixelSize}
        height={pixelSize}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
      </svg>
      {label && <span className="ui-spinner__label">{label}</span>}
    </span>
  );
});

