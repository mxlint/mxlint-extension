import React, { useState, useCallback } from 'react';
import type { BaseProps, SidebarItem } from '@/types/ui.types';

export interface SidebarProps extends BaseProps {
  /** Navigation items */
  items: SidebarItem[];
  /** Collapsed state */
  collapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Allow collapsing */
  collapsible?: boolean;
  /** Sidebar width (expanded) */
  width?: number;
  /** Sidebar width (collapsed) */
  collapsedWidth?: number;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Active item ID */
  activeId?: string;
  /** Callback when item is clicked */
  onItemClick?: (item: SidebarItem) => void;
}

const SidebarItemComponent: React.FC<{
  item: SidebarItem;
  isActive: boolean;
  onClick: (item: SidebarItem) => void;
}> = React.memo(({ item, isActive, onClick }) => {
  const handleClick = () => {
    if (!item.disabled) {
      onClick(item);
      item.onClick?.();
    }
  };

  const classNames = [
    'ui-sidebar__item',
    isActive && 'ui-sidebar__item--active',
  ].filter(Boolean).join(' ');

  if (item.href) {
    return (
      <a
        href={item.href}
        className={classNames}
        aria-disabled={item.disabled}
        onClick={(e) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          onClick(item);
        }}
      >
        {item.icon && <span className="ui-sidebar__item-icon">{item.icon}</span>}
        <span className="ui-sidebar__item-label">{item.label}</span>
      </a>
    );
  }

  return (
    <button
      className={classNames}
      onClick={handleClick}
      disabled={item.disabled}
    >
      {item.icon && <span className="ui-sidebar__item-icon">{item.icon}</span>}
      <span className="ui-sidebar__item-label">{item.label}</span>
    </button>
  );
});


export const Sidebar: React.FC<SidebarProps> = React.memo(({
  items,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  collapsible = true,
  width = 240,
  collapsedWidth = 48,
  header,
  footer,
  activeId,
  onItemClick,
  className,
  id,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed ?? internalCollapsed;

  const handleToggle = useCallback(() => {
    const newCollapsed = !isCollapsed;
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsed);
    } else {
      setInternalCollapsed(newCollapsed);
    }
  }, [isCollapsed, onCollapsedChange]);

  const handleItemClick = useCallback((item: SidebarItem) => {
    onItemClick?.(item);
  }, [onItemClick]);

  const sidebarClassNames = [
    'ui-sidebar',
    isCollapsed && 'ui-sidebar--collapsed',
    className,
  ].filter(Boolean).join(' ');

  const currentWidth = isCollapsed ? collapsedWidth : width;

  return (
    <aside
      className={sidebarClassNames}
      id={id}
      style={{ width: currentWidth }}
    >
      {(header || collapsible) && (
        <div className="ui-sidebar__header">
          {header}
          {collapsible && (
            <button
              className="ui-sidebar__toggle"
              onClick={handleToggle}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="currentColor"
                style={{
                  transform: isCollapsed ? 'rotate(180deg)' : undefined,
                  transition: 'transform 0.2s ease',
                }}
              >
                <path d="M10.354 3.646a.5.5 0 010 .708L6.707 8l3.647 3.646a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708 0z" />
              </svg>
            </button>
          )}
        </div>
      )}
      <nav className="ui-sidebar__content">
        <div className="ui-sidebar__nav" role="navigation">
          {items.map((item) => (
            <SidebarItemComponent
              key={item.id}
              item={item}
              isActive={item.active || item.id === activeId}
              onClick={handleItemClick}
            />
          ))}
        </div>
      </nav>
      {footer && <div className="ui-sidebar__footer">{footer}</div>}
    </aside>
  );
});

