import React from 'react';
import type { Size, Variant, BaseProps, DisableableProps } from '@/types/ui.types';

export interface ButtonProps
  extends BaseProps,
    DisableableProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Button visual style */
  variant?: Variant;
  /** Button size */
  size?: Size;
  /** Show loading spinner */
  loading?: boolean;
  /** Icon element to display */
  icon?: React.ReactNode;
  /** Position of icon relative to text */
  iconPosition?: 'left' | 'right';
  /** Make button full width */
  fullWidth?: boolean;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Button content */
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = React.memo(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
  className,
  children,
  ...props
}) => {
  const classNames = [
    'ui-button',
    `ui-button--${variant}`,
    `ui-button--${size}`,
    loading && 'ui-button--loading',
    fullWidth && 'ui-button--full-width',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="ui-button__spinner">
          <svg
            className="ui-spinner__circle"
            viewBox="0 0 24 24"
            width={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
            height={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </span>
      )}
      <span className="ui-button__content" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        {icon && iconPosition === 'left' && (
          <span className="ui-button__icon">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ui-button__icon">{icon}</span>
        )}
      </span>
    </button>
  );
});

