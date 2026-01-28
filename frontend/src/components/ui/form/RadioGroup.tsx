import React, { useCallback, useId } from 'react';
import type { BaseProps, DisableableProps } from '@/types/ui.types';
import { RadioGroupContext } from './RadioGroupContext';

export interface RadioGroupProps extends BaseProps, DisableableProps {
  /** Radio group name (required for form submission) */
  name?: string;
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Radio options as children */
  children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = React.memo(({
  name,
  value,
  onChange,
  direction = 'vertical',
  disabled,
  className,
  id,
  children,
}) => {
  const generatedName = useId();
  const groupName = name || generatedName;

  const handleChange = useCallback((newValue: string) => {
    onChange?.(newValue);
  }, [onChange]);

  const classNames = [
    'ui-radio-group',
    `ui-radio-group--${direction}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <RadioGroupContext.Provider
      value={{
        name: groupName,
        value,
        onChange: handleChange,
        disabled,
      }}
    >
      <div className={classNames} id={id} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});

