import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Position, BaseProps } from '@/types/ui.types';

export interface TooltipProps extends BaseProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Position relative to trigger */
  position?: Position;
  /** Delay before showing (ms) */
  delay?: number;
  /** Trigger element */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any>;
  /** Disable the tooltip */
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = React.memo(({
  content,
  position = 'top',
  delay = 200,
  children,
  disabled = false,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = 8;

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.top - tooltipRect.height - gap;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.bottom + gap;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - gap;
        y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
      case 'right':
        x = triggerRect.right + gap;
        y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
    }

    // Keep tooltip within viewport
    const padding = 8;
    x = Math.max(padding, Math.min(x, window.innerWidth - tooltipRect.width - padding));
    y = Math.max(padding, Math.min(y, window.innerHeight - tooltipRect.height - padding));

    setCoords({ x, y });
  }, [position]);

  const showTooltip = useCallback(() => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay, disabled]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible, calculatePosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    showTooltip();
    children.props.onMouseEnter?.(e);
  }, [children, showTooltip]);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    hideTooltip();
    children.props.onMouseLeave?.(e);
  }, [children, hideTooltip]);

  const handleFocus = useCallback((e: React.FocusEvent) => {
    showTooltip();
    children.props.onFocus?.(e);
  }, [children, showTooltip]);

  const handleBlur = useCallback((e: React.FocusEvent) => {
    hideTooltip();
    children.props.onBlur?.(e);
  }, [children, hideTooltip]);

  const classNames = ['ui-tooltip', className].filter(Boolean).join(' ');

  return (
    <>
      <span
        ref={triggerRef}
        className="ui-tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </span>
      {isVisible && createPortal(
        <div
          ref={tooltipRef}
          className={classNames}
          role="tooltip"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
});

