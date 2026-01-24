import React from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { useToast } from '@/context/ToastContext';
import type { BaseProps } from '@/types/ui.types';

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastContainerProps extends BaseProps {
  /** Position on screen */
  position?: ToastPosition;
  /** Maximum number of visible toasts */
  maxVisible?: number;
}

export const ToastContainer: React.FC<ToastContainerProps> = React.memo(({
  position = 'top-right',
  maxVisible = 5,
  className,
}) => {
  const { toasts, removeToast } = useToast();

  const visibleToasts = toasts.slice(-maxVisible);

  const classNames = [
    'ui-toast-container',
    `ui-toast-container--${position}`,
    className,
  ].filter(Boolean).join(' ');

  if (visibleToasts.length === 0) {
    return null;
  }

  return createPortal(
    <div className={classNames} aria-label="Notifications">
      {visibleToasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>,
    document.body
  );
});

