import React, { useId } from 'react';
import type { Size, BaseProps, DisableableProps } from '@/types/ui.types';

export interface SwitchProps extends BaseProps, DisableableProps {
  /** Switch size */
  size?: Size;
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when state changes */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: React.ReactNode;
  /** Position of label */
  labelPosition?: 'left' | 'right';
  /** Input name for forms */
  name?: string;
}

export const Switch: React.FC<SwitchProps> = React.memo(({
  size = 'md',
  checked,
  defaultChecked,
  onChange,
  label,
  labelPosition = 'right',
  disabled,
  className,
  id,
  name,
}) => {
  const generatedId = useId();
  const switchId = id || generatedId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  const containerClassNames = [
    'ui-switch',
    disabled && 'ui-switch--disabled',
    labelPosition === 'left' && 'ui-switch--label-left',
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={containerClassNames}>
      <input
        type="checkbox"
        className="ui-switch__input"
        id={switchId}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
      />
      <span className={`ui-switch__track ui-switch__track--${size}`}>
        <span className={`ui-switch__thumb ui-switch__thumb--${size}`} />
      </span>
      {label && <span className="ui-switch__label">{label}</span>}
    </label>
  );
});

