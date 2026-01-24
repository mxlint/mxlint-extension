import React, { useState, useEffect, useRef, useCallback } from 'react';

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = React.memo(({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const toggle = useCallback((opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
  }, [selected, onChange]);

  const displayText = selected.length === 0 || selected.length === options.length
    ? 'All' : selected.length === 1 ? selected[0] : `${selected.length} selected`;

  return (
    <div className="multi-select" ref={ref}>
      <label className="multi-select-label">{label}</label>
      <button className="multi-select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="multi-select-text">{displayText}</span>
        <span className="multi-select-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="multi-select-dropdown">
          <div className="multi-select-actions">
            <button onClick={() => onChange(options)} className="multi-select-action">All</button>
            <button onClick={() => onChange([])} className="multi-select-action">Clear</button>
          </div>
          <div className="multi-select-options">
            {options.map(opt => (
              <label key={opt} className="multi-select-option">
                <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
                <span>{opt || '(empty)'}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
