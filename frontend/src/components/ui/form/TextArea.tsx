import React, { useId, useMemo } from 'react';
import type { Size, ValidationState, BaseProps, DisableableProps } from '@/types/ui.types';

export interface TextAreaProps
  extends BaseProps,
    DisableableProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** TextArea size */
  size?: Size;
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Show character count */
  showCharCount?: boolean;
  /** Maximum character count */
  maxCharCount?: number;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Validation state */
  validationState?: ValidationState;
  /** Validation message */
  validationMessage?: string;
}

export const TextArea: React.FC<TextAreaProps> = React.memo(({
  size = 'md',
  resize = 'vertical',
  showCharCount = false,
  maxCharCount,
  label,
  helperText,
  validationState = 'default',
  validationMessage,
  disabled,
  className,
  id,
  value,
  defaultValue,
  ...props
}) => {
  const generatedId = useId();
  const textareaId = id || generatedId;

  const currentLength = useMemo(() => {
    const val = value ?? defaultValue ?? '';
    return typeof val === 'string' ? val.length : 0;
  }, [value, defaultValue]);

  const charCountStatus = useMemo(() => {
    if (!maxCharCount) return 'default';
    const ratio = currentLength / maxCharCount;
    if (ratio >= 1) return 'error';
    if (ratio >= 0.9) return 'warning';
    return 'default';
  }, [currentLength, maxCharCount]);

  const textareaClassNames = [
    'ui-textarea',
    `ui-textarea--${size}`,
    `ui-textarea--resize-${resize}`,
    validationState !== 'default' && `ui-textarea--${validationState}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="ui-textarea-wrapper">
      {label && (
        <label className="ui-textarea-label" htmlFor={textareaId}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={textareaClassNames}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxCharCount}
        aria-invalid={validationState === 'error'}
        aria-describedby={
          validationMessage ? `${textareaId}-validation` :
          helperText ? `${textareaId}-helper` : undefined
        }
        {...props}
      />
      <div className="ui-textarea-footer">
        <div>
          {helperText && !validationMessage && (
            <span className="ui-textarea-helper" id={`${textareaId}-helper`}>
              {helperText}
            </span>
          )}
          {validationMessage && (
            <span
              className={`ui-textarea-validation ui-textarea-validation--${validationState}`}
              id={`${textareaId}-validation`}
              role="alert"
            >
              {validationMessage}
            </span>
          )}
        </div>
        {showCharCount && (
          <span className={`ui-textarea-char-count ui-textarea-char-count--${charCountStatus}`}>
            {currentLength}
            {maxCharCount && ` / ${maxCharCount}`}
          </span>
        )}
      </div>
    </div>
  );
});

