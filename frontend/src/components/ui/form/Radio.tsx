import React, { useId } from 'react';
import type { Size, BaseProps, DisableableProps } from '@/types/ui.types';

export interface RadioProps
  extends BaseProps,
    DisableableProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Radio size */
  size?: Size;
  /** Label text */
  label?: React.ReactNode;
  /** Description text below label */
  description?: string;
}

export const Radio: React.FC<RadioProps> = React.memo(({
  size = 'md',
  label,
  description,
  disabled,
  checked,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const radioId = id || generatedId;

  const containerClassNames = [
    'ui-radio',
    disabled && 'ui-radio--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={containerClassNames}>
      <input
        type="radio"
        className="ui-radio__input"
        id={radioId}
        disabled={disabled}
        checked={checked}
        aria-describedby={description ? `${radioId}-description` : undefined}
        {...props}
      />
      <span className={`ui-radio__circle ui-radio__circle--${size}`}>
        <span className={`ui-radio__dot ui-radio__dot--${size}`} />
      </span>
      {(label || description) && (
        <span className="ui-radio__content">
          {label && <span className="ui-radio__label">{label}</span>}
          {description && (
            <span className="ui-radio__description" id={`${radioId}-description`}>
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

