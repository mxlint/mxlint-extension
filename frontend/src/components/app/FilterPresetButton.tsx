import React from 'react';
import { Button } from '@/components/ui';

interface FilterPresetButtonProps {
  label: string;
  onClick: () => void;
  title?: string;
}

export const FilterPresetButton: React.FC<FilterPresetButtonProps> = React.memo(({
  label,
  onClick,
  title,
}) => (
  <Button
    variant="secondary"
    size="sm"
    className="preset-btn"
    onClick={onClick}
    title={title || label}
  >
    {label}
  </Button>
));

