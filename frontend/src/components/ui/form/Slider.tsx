import React, { useId, useMemo } from 'react';
import type { Size, BaseProps, DisableableProps, SliderMark } from '@/types/ui.types';

export interface SliderProps extends BaseProps, DisableableProps {
  /** Slider size */
  size?: Size;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Current value */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Show current value */
  showValue?: boolean;
  /** Format displayed value */
  formatValue?: (value: number) => string;
  /** Label text */
  label?: string;
  /** Marks to display on track */
  marks?: SliderMark[];
  /** Input name for forms */
  name?: string;
}

export const Slider: React.FC<SliderProps> = React.memo(({
  size = 'md',
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  showValue = false,
  formatValue,
  label,
  marks,
  disabled,
  className,
  id,
  name,
}) => {
  const generatedId = useId();
  const sliderId = id || generatedId;

  const currentValue = value ?? defaultValue ?? min;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const displayValue = useMemo(() => {
    if (formatValue) {
      return formatValue(currentValue);
    }
    return currentValue.toString();
  }, [currentValue, formatValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  const containerClassNames = [
    'ui-slider',
    disabled && 'ui-slider--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassNames}>
      {(label || showValue) && (
        <div className="ui-slider__header">
          {label && (
            <label className="ui-slider__label" htmlFor={sliderId}>
              {label}
            </label>
          )}
          {showValue && <span className="ui-slider__value">{displayValue}</span>}
        </div>
      )}
      <div className="ui-slider__track-container">
        <div className={`ui-slider__track ui-slider__track--${size}`}>
          <div
            className="ui-slider__fill"
            style={{ width: `${percentage}%` }}
          />
          <input
            type="range"
            className="ui-slider__input"
            id={sliderId}
            name={name}
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-valuetext={displayValue}
          />
          <span
            className={`ui-slider__thumb ui-slider__thumb--${size}`}
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>
      {marks && marks.length > 0 && (
        <div className="ui-slider__marks">
          {marks.map((mark) => (
            <span key={mark.value} className="ui-slider__mark">
              {mark.label ?? mark.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
});

