import React, { useEffect, useState, useCallback } from 'react';
import type { ToastState } from '@/types/ui.types';

export interface ToastProps extends Omit<ToastState, 'onDismiss'> {
  /** Additional class name */
  className?: string;
  /** Callback when toast is dismissed by user or timer */
  onClose: (id: string) => void;
}

const ToastIcon: React.FC<{ type: ToastState['type'] }> = ({ type }) => {
  const icons = {
    info: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  };

  return <span className={`ui-toast__icon ui-toast__icon--${type}`}>{icons[type]}</span>;
};

export const Toast: React.FC<ToastProps> = React.memo(({
  id,
  type,
  title,
  message,
  duration,
  action,
  onClose,
  className,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 150);
  }, [id, onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const classNames = [
    'ui-toast',
    isExiting && 'ui-toast--exiting',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="alert" aria-live="polite">
      <ToastIcon type={type} />
      <div className="ui-toast__content">
        {title && <div className="ui-toast__title">{title}</div>}
        <div className="ui-toast__message">{message}</div>
        {action && (
          <div className="ui-toast__action">
            <button
              className="ui-toast__action-btn"
              onClick={action.onClick}
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
      <button
        className="ui-toast__close"
        onClick={handleClose}
        aria-label="Dismiss"
      >
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M8 8.707l3.646 3.647.708-.708L8.707 8l3.647-3.646-.708-.708L8 7.293 4.354 3.646l-.708.708L7.293 8l-3.647 3.646.708.708L8 8.707z" />
        </svg>
      </button>
    </div>
  );
});

