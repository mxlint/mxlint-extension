import React, { useRef, useEffect, useId } from 'react';
import type { Size, BaseProps, DisableableProps } from '@/types/ui.types';

export interface CheckboxProps
  extends BaseProps,
    DisableableProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Checkbox size */
  size?: Size;
  /** Label text */
  label?: React.ReactNode;
  /** Show indeterminate state (partially checked) */
  indeterminate?: boolean;
  /** Description text below label */
  description?: string;
}

export const Checkbox: React.FC<CheckboxProps> = React.memo(({
  size = 'md',
  label,
  indeterminate = false,
  description,
  disabled,
  checked,
  className,
  id,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const checkboxId = id || generatedId;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const containerClassNames = [
    'ui-checkbox',
    disabled && 'ui-checkbox--disabled',
    className,
  ].filter(Boolean).join(' ');

  const iconSize = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;

  return (
    <label className={containerClassNames}>
      <input
        ref={inputRef}
        type="checkbox"
        className="ui-checkbox__input"
        id={checkboxId}
        disabled={disabled}
        checked={checked}
        aria-describedby={description ? `${checkboxId}-description` : undefined}
        {...props}
      />
      <span className={`ui-checkbox__box ui-checkbox__box--${size}`}>
        <svg
          className="ui-checkbox__icon ui-checkbox__icon--check"
          viewBox="0 0 16 16"
          width={iconSize}
          height={iconSize}
          fill="currentColor"
        >
          <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
        </svg>
        <svg
          className="ui-checkbox__icon ui-checkbox__icon--indeterminate"
          viewBox="0 0 16 16"
          width={iconSize}
          height={iconSize}
          fill="currentColor"
          style={{ position: 'absolute' }}
        >
          <path d="M3.5 8a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013.5 8z" />
        </svg>
      </span>
      {(label || description) && (
        <span className="ui-checkbox__content">
          {label && (
            <span className={`ui-checkbox__label ui-checkbox__label--${size}`}>
              {label}
            </span>
          )}
          {description && (
            <span
              className="ui-checkbox__description"
              id={`${checkboxId}-description`}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

