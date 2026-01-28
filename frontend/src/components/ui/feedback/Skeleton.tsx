import React from 'react';
import type { BaseProps } from '@/types/ui.types';

export interface SkeletonProps extends BaseProps {
  /** Skeleton shape variant */
  variant?: 'text' | 'circular' | 'rectangular';
  /** Width (number for px, string for other units) */
  width?: number | string;
  /** Height (number for px, string for other units) */
  height?: number | string;
  /** Number of text lines (for text variant) */
  lines?: number;
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = React.memo(({
  variant = 'text',
  width,
  height,
  lines = 1,
  animation = 'pulse',
  className,
  id,
}) => {
  const getWidth = () => {
    if (width !== undefined) {
      return typeof width === 'number' ? `${width}px` : width;
    }
    if (variant === 'circular') return height || '40px';
    return '100%';
  };

  const getHeight = () => {
    if (height !== undefined) {
      return typeof height === 'number' ? `${height}px` : height;
    }
    if (variant === 'circular') return width || '40px';
    if (variant === 'text') return '1em';
    return '100px';
  };

  const classNames = [
    'ui-skeleton',
    `ui-skeleton--${variant}`,
    animation !== 'none' && `ui-skeleton--${animation}`,
    className,
  ].filter(Boolean).join(' ');

  if (variant === 'text' && lines > 1) {
    return (
      <div className="ui-skeleton-text" id={id}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={classNames}
            style={{
              width: index === lines - 1 ? '80%' : getWidth(),
              height: getHeight(),
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={classNames}
      id={id}
      style={{
        width: getWidth(),
        height: getHeight(),
      }}
    />
  );
});

