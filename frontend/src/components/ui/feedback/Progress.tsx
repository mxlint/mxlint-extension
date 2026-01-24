import React, { useMemo } from 'react';
import type { Size, Severity, BaseProps } from '@/types/ui.types';

export interface ProgressProps extends BaseProps {
  /** Progress value (0-100) */
  value?: number;
  /** Progress variant */
  variant?: 'linear' | 'circular';
  /** Progress size */
  size?: Size;
  /** Color variant */
  color?: Severity | 'default';
  /** Show percentage value */
  showValue?: boolean;
  /** Label text */
  label?: string;
  /** Indeterminate state (animated) */
  indeterminate?: boolean;
  /** Stroke width for circular variant */
  strokeWidth?: number;
}

export const Progress: React.FC<ProgressProps> = React.memo(({
  value = 0,
  variant = 'linear',
  size = 'md',
  color = 'default',
  showValue = false,
  label,
  indeterminate = false,
  strokeWidth = 4,
  className,
  id,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const circularSize = useMemo(() => {
    switch (size) {
      case 'sm': return 32;
      case 'lg': return 64;
      default: return 48;
    }
  }, [size]);

  const radius = (circularSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  if (variant === 'circular') {
    const classNames = [
      'ui-progress',
      'ui-progress--circular',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div
        className={classNames}
        id={id}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: circularSize, height: circularSize }}
      >
        <svg
          className="ui-progress__circular"
          width={circularSize}
          height={circularSize}
          viewBox={`0 0 ${circularSize} ${circularSize}`}
        >
          <circle
            className="ui-progress__circular-track"
            cx={circularSize / 2}
            cy={circularSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className={`ui-progress__circular-fill ui-progress__circular-fill--${color} ${indeterminate ? 'ui-progress__circular-fill--indeterminate' : ''}`}
            cx={circularSize / 2}
            cy={circularSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? circumference * 0.75 : strokeDashoffset}
            style={indeterminate ? { transformOrigin: 'center' } : undefined}
          />
        </svg>
        {showValue && !indeterminate && (
          <span className="ui-progress__circular-value">{Math.round(clampedValue)}%</span>
        )}
      </div>
    );
  }

  const classNames = [
    'ui-progress',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} id={id}>
      {(label || showValue) && (
        <div className="ui-progress__header">
          {label && <span className="ui-progress__label">{label}</span>}
          {showValue && !indeterminate && (
            <span className="ui-progress__value">{Math.round(clampedValue)}%</span>
          )}
        </div>
      )}
      <div
        className={`ui-progress__track ui-progress__track--${size}`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`ui-progress__fill ui-progress__fill--${color} ${indeterminate ? 'ui-progress__fill--indeterminate' : ''}`}
          style={{ width: indeterminate ? undefined : `${clampedValue}%` }}
        />
      </div>
    </div>
  );
});

