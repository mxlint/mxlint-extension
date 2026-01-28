import React, { useState, useCallback, useId, useMemo } from 'react';
import type { Size, BaseProps } from '@/types/ui.types';

export interface TabProps {
  /** Unique tab identifier */
  id: string;
  /** Tab label */
  label: React.ReactNode;
  /** Tab icon */
  icon?: React.ReactNode;
  /** Disable this tab */
  disabled?: boolean;
  /** Tab panel content */
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};


export interface TabsProps extends BaseProps {
  /** Controlled active tab ID */
  activeTab?: string;
  /** Default active tab ID (uncontrolled) */
  defaultActiveTab?: string;
  /** Callback when tab changes */
  onChange?: (tabId: string) => void;
  /** Tab size */
  size?: Size;
  /** Tab style variant */
  variant?: 'default' | 'pills' | 'underline';
  /** Make tabs full width */
  fullWidth?: boolean;
  /** Tab components */
  children: React.ReactElement<TabProps>[];
}

export const Tabs: React.FC<TabsProps> = React.memo(({
  activeTab: controlledActiveTab,
  defaultActiveTab,
  onChange,
  size = 'md',
  variant = 'underline',
  fullWidth = false,
  className,
  id,
  children,
}) => {
  const generatedId = useId();
  const tabsId = id || generatedId;

  const tabs = useMemo(() => {
    return React.Children.toArray(children).filter(
      (child): child is React.ReactElement<TabProps> =>
        React.isValidElement(child) && child.type === Tab
    );
  }, [children]);

  const firstTabId = tabs[0]?.props.id;
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultActiveTab || firstTabId
  );
  const activeTabId = controlledActiveTab ?? internalActiveTab;

  const handleTabChange = useCallback((tabId: string) => {
    if (onChange) {
      onChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    const enabledTabs = tabs.filter(tab => !tab.props.disabled);
    const currentEnabledIndex = enabledTabs.findIndex(tab => tab.props.id === tabs[currentIndex].props.id);

    let nextIndex: number | null = null;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = currentEnabledIndex > 0 ? currentEnabledIndex - 1 : enabledTabs.length - 1;
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = currentEnabledIndex < enabledTabs.length - 1 ? currentEnabledIndex + 1 : 0;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = enabledTabs.length - 1;
    }

    if (nextIndex !== null) {
      const nextTab = enabledTabs[nextIndex];
      handleTabChange(nextTab.props.id);
      // Focus the next tab button
      const button = document.getElementById(`${tabsId}-tab-${nextTab.props.id}`);
      button?.focus();
    }
  }, [tabs, handleTabChange, tabsId]);

  const listClassNames = [
    'ui-tabs__list',
    variant === 'pills' && 'ui-tabs__list--pills',
    fullWidth && 'ui-tabs__list--full-width',
  ].filter(Boolean).join(' ');

  const containerClassNames = ['ui-tabs', className].filter(Boolean).join(' ');

  return (
    <div className={containerClassNames} id={tabsId}>
      <div className={listClassNames} role="tablist" aria-orientation="horizontal">
        {tabs.map((tab, index) => {
          const isActive = tab.props.id === activeTabId;
          const tabClassNames = [
            'ui-tabs__tab',
            `ui-tabs__tab--${size}`,
            isActive && 'ui-tabs__tab--active',
          ].filter(Boolean).join(' ');

          return (
            <button
              key={tab.props.id}
              id={`${tabsId}-tab-${tab.props.id}`}
              className={tabClassNames}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tabsId}-panel-${tab.props.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.props.disabled}
              onClick={() => handleTabChange(tab.props.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {tab.props.icon && (
                <span className="ui-tabs__tab-icon">{tab.props.icon}</span>
              )}
              {tab.props.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => {
        const isActive = tab.props.id === activeTabId;
        return (
          <div
            key={tab.props.id}
            id={`${tabsId}-panel-${tab.props.id}`}
            className="ui-tabs__panel"
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-${tab.props.id}`}
            hidden={!isActive}
            tabIndex={0}
          >
            {isActive && tab.props.children}
          </div>
        );
      })}
    </div>
  );
});

