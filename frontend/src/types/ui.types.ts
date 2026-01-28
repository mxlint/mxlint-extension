// UI Component Library - Shared Types

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type Severity = 'error' | 'warning' | 'success' | 'info';
export type Position = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';

// Base props shared by many components
export interface BaseProps {
  className?: string;
  id?: string;
}

export interface DisableableProps {
  disabled?: boolean;
}

// Input validation state
export type ValidationState = 'default' | 'error' | 'success';

// Toast types
export interface ToastOptions {
  id?: string;
  type?: Severity;
  title?: string;
  message: React.ReactNode;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

export interface ToastState {
  id: string;
  type: Severity;
  title?: string;
  message: React.ReactNode;
  duration: number;
  action?: ToastOptions['action'];
  /** Internal callback when toast is closed via timer or context */
  onDismiss?: () => void;
}

// Dropdown item
export interface DropdownItem {
  id?: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

// Sidebar item
export interface SidebarItem {
  id: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  children?: SidebarItem[];
}

// Slider mark
export interface SliderMark {
  value: number;
  label?: string;
}
