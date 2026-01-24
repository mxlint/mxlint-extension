import React, { useState, useCallback } from 'react';
import type { DocumentInfo, ProcessedTestCaseWithId } from '@/types';
import { LightRow } from '@/components/table';
import { Button } from '@/components/ui';

interface GroupSectionProps {
  groupName: string;
  items: ProcessedTestCaseWithId[];
  selectedIssues: Set<string>;
  selectedRowId: string | null;
  onOpenDocument: (docInfo: DocumentInfo) => void;
  onToggleSelection: (id: string) => void;
  onSelectRow: (id: string) => void;
  defaultOpen?: boolean;
}

export const GroupSection: React.FC<GroupSectionProps> = React.memo(({
  groupName,
  items,
  selectedIssues,
  selectedRowId,
  onOpenDocument,
  onToggleSelection,
  onSelectRow,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [visibleCount, setVisibleCount] = useState(50);

  const failCount = items.filter(i => i.status === 'fail').length;
  const skipCount = items.filter(i => i.status === 'skip').length;
  const passCount = items.filter(i => i.status === 'pass').length;

  const visibleItems = isOpen ? items.slice(0, visibleCount) : [];
  const hasMore = items.length > visibleCount;

  const handleToggle = useCallback((e: React.SyntheticEvent<HTMLDetailsElement>) => {
    setIsOpen((e.target as HTMLDetailsElement).open);
  }, []);

  const showMore = useCallback(() => {
    setVisibleCount(prev => prev + 100);
  }, []);

  return (
    <details className="group-section" open={isOpen} onToggle={handleToggle}>
      <summary className="group-header">
        <span className="group-name">{groupName}</span>
        <span className="group-count">{items.length} items</span>
        <span className="group-stats">
          {failCount > 0 && <span className="group-stat fail">{failCount} fail</span>}
          {skipCount > 0 && <span className="group-stat skip">{skipCount} skip</span>}
          {passCount > 0 && <span className="group-stat pass">{passCount} pass</span>}
        </span>
      </summary>
      {isOpen && (
        <>
          <table className="lint-table grouped-table">
            <tbody>
              {visibleItems.map((tc) => (
                <LightRow
                  key={tc.id}
                  tc={tc}
                  isChecked={selectedIssues.has(tc.id)}
                  isSelected={selectedRowId === tc.id}
                  onOpenDocument={onOpenDocument}
                  onToggleSelection={onToggleSelection}
                  onSelectRow={onSelectRow}
                />
              ))}
            </tbody>
          </table>
          {hasMore && (
            <Button
              variant="secondary"
              size="sm"
              className="show-more-btn"
              onClick={showMore}
            >
              Show more ({items.length - visibleCount} remaining)
            </Button>
          )}
        </>
      )}
    </details>
  );
});
