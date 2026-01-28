import React, { useEffect, useRef } from 'react';

interface SelectAllCheckboxProps {
  checked: boolean;
  indeterminate: boolean;
  onChange: (checked: boolean) => void;
  title?: string;
  className?: string;
}

export const SelectAllCheckbox: React.FC<SelectAllCheckboxProps> = React.memo(({
  checked,
  indeterminate,
  onChange,
  title,
  className = 'header-checkbox',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={inputRef}
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className={className}
      title={title}
      aria-label={title}
    />
  );
});

