import React from 'react';
import type { GroupBy } from '@/types';

interface GroupBySelectProps {
  value: GroupBy;
  onChange: (value: GroupBy) => void;
}

const options: { value: GroupBy; label: string }[] = [
  { value: 'none', label: 'No Grouping' },
  { value: 'module', label: 'Module' },
  { value: 'category', label: 'Category' },
  { value: 'rule', label: 'Rule' },
  { value: 'severity', label: 'Severity' },
];

export const GroupBySelect: React.FC<GroupBySelectProps> = React.memo(({ value, onChange }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value as GroupBy)}
    className="group-select"
    aria-label="Group results"
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
));

