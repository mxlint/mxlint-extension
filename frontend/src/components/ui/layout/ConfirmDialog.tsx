import React from 'react';
import { Dialog } from './Dialog';
import type { BaseProps } from '@/types/ui.types';

export interface ConfirmDialogProps extends BaseProps {
  /** Whether dialog is open */
  isOpen: boolean;
  /** Callback when dialog closes */
  onClose: () => void;
  /** Dialog title */
  title?: string;
  /** Confirmation message */
  message: React.ReactNode;
  /** Confirm button label */
  confirmLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Callback when confirmed */
  onConfirm?: () => void;
  /** Callback when cancelled */
  onCancel?: () => void;
  /** Show as danger/destructive action */
  danger?: boolean;
  /** Loading state for confirm button */
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = React.memo(({
  isOpen,
  onClose,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
  loading = false,
  className,
  id,
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const footer = (
    <>
      <button
        className="ui-button ui-button--ghost ui-button--md"
        onClick={handleCancel}
        disabled={loading}
      >
        {cancelLabel}
      </button>
      <button
        className={`ui-button ui-button--${danger ? 'danger' : 'primary'} ui-button--md ${loading ? 'ui-button--loading' : ''}`}
        onClick={handleConfirm}
        disabled={loading}
      >
        {loading && (
          <span className="ui-button__spinner">
            <svg className="ui-spinner__circle" viewBox="0 0 24 24" width="16" height="16">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </span>
        )}
        <span className="ui-button__content">{confirmLabel}</span>
      </button>
    </>
  );

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
      className={className}
      id={id}
    >
      <div>{message}</div>
    </Dialog>
  );
});


// Alert dialog variant (single button)
export interface AlertDialogProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: React.ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = React.memo(({
  isOpen,
  onClose,
  title = 'Alert',
  message,
  confirmLabel = 'OK',
  onConfirm,
  className,
  id,
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const footer = (
    <button
      className="ui-button ui-button--primary ui-button--md"
      onClick={handleConfirm}
    >
      {confirmLabel}
    </button>
  );

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
      closeOnOverlayClick={false}
      className={className}
      id={id}
    >
      <div>{message}</div>
    </Dialog>
  );
});

