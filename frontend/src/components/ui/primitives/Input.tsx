import React, { useRef, useId, useCallback } from 'react';
import type { Size, ValidationState, BaseProps, DisableableProps } from '@/types/ui.types';

export interface InputProps
  extends BaseProps,
    DisableableProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size */
  size?: Size;
  /** Validation state */
  validationState?: ValidationState;
  /** Validation message to display */
  validationMessage?: string;
  /** Icon on the left side */
  leftIcon?: React.ReactNode;
  /** Icon on the right side */
  rightIcon?: React.ReactNode;
  /** Show clear button when input has value */
  clearable?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Label text above input */
  label?: string;
  /** Helper text below input */
  helperText?: string;
}

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  validationState = 'default',
  validationMessage,
  leftIcon,
  rightIcon,
  clearable = false,
  onClear,
  label,
  helperText,
  className,
  id,
  disabled,
  value,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = id || generatedId;

  const showClear = clearable && value && !disabled;

  const containerClassNames = [
    'ui-input-container',
    `ui-input-container--${size}`,
    validationState !== 'default' && `ui-input-container--${validationState}`,
    disabled && 'ui-input-container--disabled',
  ].filter(Boolean).join(' ');

  const inputClassNames = [
    'ui-input',
    `ui-input--${size}`,
    className,
  ].filter(Boolean).join(' ');

  const setInputRef = useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
    inputRef.current?.focus();
  };

  return (
    <div className="ui-input-wrapper">
      {label && (
        <label className="ui-input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={containerClassNames}>
        {leftIcon && <span className="ui-input-icon">{leftIcon}</span>}
        <input
          ref={setInputRef}
          id={inputId}
          className={inputClassNames}
          disabled={disabled}
          value={value}
          aria-invalid={validationState === 'error'}
          aria-describedby={
            validationMessage ? `${inputId}-validation` :
            helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {showClear && (
          <button
            type="button"
            className="ui-input-clear"
            onClick={handleClear}
            aria-label="Clear input"
            tabIndex={-1}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M8 8.707l3.646 3.647.708-.708L8.707 8l3.647-3.646-.708-.708L8 7.293 4.354 3.646l-.708.708L7.293 8l-3.647 3.646.708.708L8 8.707z" />
            </svg>
          </button>
        )}
        {rightIcon && !showClear && <span className="ui-input-icon">{rightIcon}</span>}
      </div>
      {helperText && !validationMessage && (
        <span className="ui-input-helper" id={`${inputId}-helper`}>
          {helperText}
        </span>
      )}
      {validationMessage && (
        <span
          className={`ui-input-validation ui-input-validation--${validationState}`}
          id={`${inputId}-validation`}
          role="alert"
        >
          {validationMessage}
        </span>
      )}
    </div>
  );
});


export const Input = React.memo(InputComponent);

