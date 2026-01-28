import React, { useState, useCallback, useId, useRef, useEffect } from 'react';
import type { BaseProps } from '@/types/ui.types';

export interface AccordionItemProps extends BaseProps {
  /** Unique item identifier */
  id: string;
  /** Item title */
  title: React.ReactNode;
  /** Disable this item */
  disabled?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Item content */
  children: React.ReactNode;
}

interface AccordionItemInternalProps extends AccordionItemProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  accordionId: string;
}

const AccordionItemInternal: React.FC<AccordionItemInternalProps> = React.memo(({
  id,
  title,
  disabled,
  isOpen,
  onToggle,
  accordionId,
  className,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        const contentHeight = contentRef.current.scrollHeight;
        setHeight(contentHeight);
        // After animation, set to auto for dynamic content
        const timer = setTimeout(() => setHeight(undefined), 200);
        return () => clearTimeout(timer);
      } else {
        // First set to current height, then animate to 0
        const contentHeight = contentRef.current.scrollHeight;
        setHeight(contentHeight);
        requestAnimationFrame(() => setHeight(0));
      }
    }
  }, [isOpen]);

  const handleClick = () => {
    if (!disabled) {
      onToggle(id);
    }
  };

  const itemClassNames = [
    'ui-accordion-item',
    isOpen && 'ui-accordion-item--open',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={itemClassNames}>
      <button
        className="ui-accordion-item__trigger"
        id={`${accordionId}-trigger-${id}`}
        aria-expanded={isOpen}
        aria-controls={`${accordionId}-content-${id}`}
        disabled={disabled}
        onClick={handleClick}
      >
        <span>{title}</span>
        <span className="ui-accordion-item__icon">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path d="M4.646 5.646a.5.5 0 01.708 0L8 8.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="ui-accordion-item__content"
        id={`${accordionId}-content-${id}`}
        role="region"
        aria-labelledby={`${accordionId}-trigger-${id}`}
        style={{ height: height !== undefined ? `${height}px` : undefined }}
      >
        <div className="ui-accordion-item__content-inner">
          {children}
        </div>
      </div>
    </div>
  );
});


export const AccordionItem: React.FC<AccordionItemProps> = ({ children }) => {
  return <>{children}</>;
};


export interface AccordionProps extends BaseProps {
  /** Allow multiple items open simultaneously */
  allowMultiple?: boolean;
  /** Default open item IDs */
  defaultOpenItems?: string[];
  /** Controlled open items */
  openItems?: string[];
  /** Callback when open items change */
  onChange?: (openItems: string[]) => void;
  /** AccordionItem components */
  children: React.ReactElement<AccordionItemProps>[];
}

export const Accordion: React.FC<AccordionProps> = React.memo(({
  allowMultiple = false,
  defaultOpenItems = [],
  openItems: controlledOpenItems,
  onChange,
  className,
  id,
  children,
}) => {
  const generatedId = useId();
  const accordionId = id || generatedId;

  // Process children to extract default open states
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<AccordionItemProps> =>
      React.isValidElement(child) && child.type === AccordionItem
  );

  const defaultOpen = React.useMemo(() => {
    const fromProps = new Set(defaultOpenItems);
    items.forEach((item) => {
      if (item.props.defaultOpen) {
        fromProps.add(item.props.id);
      }
    });
    return Array.from(fromProps);
  }, [defaultOpenItems, items]);

  const [internalOpenItems, setInternalOpenItems] = useState<string[]>(defaultOpen);
  const openItemsSet = React.useMemo(
    () => new Set(controlledOpenItems ?? internalOpenItems),
    [controlledOpenItems, internalOpenItems]
  );

  const handleToggle = useCallback((itemId: string) => {
    const isOpen = openItemsSet.has(itemId);
    let newOpenItems: string[];

    if (isOpen) {
      newOpenItems = Array.from(openItemsSet).filter((id) => id !== itemId);
    } else {
      if (allowMultiple) {
        newOpenItems = [...Array.from(openItemsSet), itemId];
      } else {
        newOpenItems = [itemId];
      }
    }

    if (onChange) {
      onChange(newOpenItems);
    } else {
      setInternalOpenItems(newOpenItems);
    }
  }, [openItemsSet, allowMultiple, onChange]);

  const containerClassNames = ['ui-accordion', className].filter(Boolean).join(' ');

  return (
    <div className={containerClassNames} id={accordionId}>
      {items.map((item) => (
        <AccordionItemInternal
          key={item.props.id}
          {...item.props}
          isOpen={openItemsSet.has(item.props.id)}
          onToggle={handleToggle}
          accordionId={accordionId}
        />
      ))}
    </div>
  );
});

