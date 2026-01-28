import React, { useCallback, useMemo, useState } from 'react';
import type { ToastOptions, ToastState } from '@/types/ui.types';
import { ToastContext } from './ToastContext';

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Default toast duration in ms (0 for persistent) */
  defaultDuration?: number;
}

let toastIdCounter = 0;
const generateId = () => `toast-${++toastIdCounter}`;

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultDuration = 5000,
}) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const addToast = useCallback((options: ToastOptions): string => {
    const id = options.id || generateId();
    const toast: ToastState = {
      id,
      type: options.type || 'info',
      title: options.title,
      message: options.message,
      duration: options.duration ?? defaultDuration,
      action: options.action,
      onDismiss: options.onClose,
    };

    setToasts((prev) => [...prev, toast]);
    return id;
  }, [defaultDuration]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => {
      const toast = prev.find((t) => t.id === id);
      toast?.onDismiss?.();
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setToasts((prev) => {
      prev.forEach((t) => t.onDismiss?.());
      return [];
    });
  }, []);

  const value = useMemo(
    () => ({ toasts, addToast, removeToast, clearAll }),
    [toasts, addToast, removeToast, clearAll]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};
