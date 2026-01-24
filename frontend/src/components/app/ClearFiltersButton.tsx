import React from 'react';
import { Button } from '@/components/ui';

interface ClearFiltersButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
}

export const ClearFiltersButton: React.FC<ClearFiltersButtonProps> = React.memo(({
  onClick,
  icon,
  label = 'Clear All Filters',
}) => (
  <Button
    variant="ghost"
    size="sm"
    className="clear-filters-btn"
    onClick={onClick}
    icon={icon}
  >
    {label}
  </Button>
));

