import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { Size, BaseProps } from '@/types/ui.types';

export interface DialogProps extends BaseProps {
  /** Whether dialog is open */
  isOpen: boolean;
  /** Callback when dialog closes */
  onClose: () => void;
  /** Dialog title */
  title?: React.ReactNode;
  /** Dialog size */
  size?: Size | 'full';
  /** Show close button */
  showCloseButton?: boolean;
  /** Close when clicking overlay */
  closeOnOverlayClick?: boolean;
  /** Close when pressing Escape */
  closeOnEscape?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
  /** Dialog body content */
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = React.memo(({
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  footer,
  className,
  id,
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus first focusable element in dialog
      const focusable = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  // Keyboard handler
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const dialogClassNames = [
    'ui-dialog',
    `ui-dialog--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return createPortal(
    <div
      className="ui-dialog-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={dialogClassNames}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${id}-title` : undefined}
      >
        {(title || showCloseButton) && (
          <div className="ui-dialog__header">
            {title && (
              <h2 className="ui-dialog__title" id={`${id}-title`}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                className="ui-dialog__close"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path d="M8 8.707l3.646 3.647.708-.708L8.707 8l3.647-3.646-.708-.708L8 7.293 4.354 3.646l-.708.708L7.293 8l-3.647 3.646.708.708L8 8.707z" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="ui-dialog__body">{children}</div>
        {footer && <div className="ui-dialog__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
});

