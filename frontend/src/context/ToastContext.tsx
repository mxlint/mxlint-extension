import { createContext, useContext, useCallback } from 'react';
import type { ToastOptions, ToastState, Severity } from '@/types/ui.types';

interface ToastContextValue {
  toasts: ToastState[];
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export interface UseToastReturn {
  toasts: ToastState[];
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
  info: (message: string, options?: Partial<ToastOptions>) => string;
  success: (message: string, options?: Partial<ToastOptions>) => string;
  warning: (message: string, options?: Partial<ToastOptions>) => string;
  error: (message: string, options?: Partial<ToastOptions>) => string;
}

export const useToast = (): UseToastReturn => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { toasts, addToast, removeToast, clearAll } = context;

  const createTypedToast = useCallback(
    (type: Severity) => (message: string, options?: Partial<ToastOptions>) =>
      addToast({ ...options, type, message }),
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    clearAll,
    info: createTypedToast('info'),
    success: createTypedToast('success'),
    warning: createTypedToast('warning'),
    error: createTypedToast('error'),
  };
};
