import React, { useState, useRef, useCallback } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { Position, Alignment, BaseProps, DropdownItem } from '@/types/ui.types';

export interface DropdownProps extends BaseProps {
  /** Trigger element */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: React.ReactElement<any>;
  /** Menu items */
  items: DropdownItem[];
  /** Position relative to trigger */
  position?: Position;
  /** Alignment relative to trigger */
  align?: Alignment;
  /** Close menu when item is selected */
  closeOnSelect?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

export const Dropdown: React.FC<DropdownProps> = React.memo(({
  trigger,
  items,
  position = 'bottom',
  align = 'start',
  closeOnSelect = true,
  open: controlledOpen,
  onOpenChange,
  className,
  id,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback((value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  }, [onOpenChange]);

  const handleToggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleItemClick = useCallback((item: DropdownItem) => {
    if (item.disabled) return;
    item.onClick?.();
    if (closeOnSelect) {
      handleClose();
    }
  }, [closeOnSelect, handleClose]);

  useClickOutside(containerRef, handleClose, isOpen);

  // Clone trigger to add onClick
  const triggerElement = React.cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      trigger.props.onClick?.(e);
      handleToggle();
    },
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
  });

  const menuClassNames = [
    'ui-dropdown__menu',
    `ui-dropdown__menu--${position}`,
    `ui-dropdown__menu--align-${align}`,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={`ui-dropdown ${className || ''}`}
      id={id}
    >
      {triggerElement}
      {isOpen && (
        <div
          ref={menuRef}
          className={menuClassNames}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, index) => {
            if (item.divider) {
              return <div key={item.id || index} className="ui-dropdown__divider" />;
            }

            const itemClassNames = [
              'ui-dropdown__item',
              item.danger && 'ui-dropdown__item--danger',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={item.id || index}
                className={itemClassNames}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                role="menuitem"
              >
                {item.icon && (
                  <span className="ui-dropdown__item-icon">{item.icon}</span>
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

