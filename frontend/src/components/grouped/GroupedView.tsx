import React, { useMemo } from 'react';
import type { DocumentInfo, ProcessedTestCaseWithId, GroupBy } from '@/types';
import { GroupSection } from './GroupSection';

interface GroupedViewProps {
  testcases: ProcessedTestCaseWithId[];
  groupBy: GroupBy;
  selectedIssues: Set<string>;
  selectedRowId: string | null;
  onOpenDocument: (docInfo: DocumentInfo) => void;
  onToggleSelection: (id: string) => void;
  onSelectRow: (id: string) => void;
}

export const GroupedView: React.FC<GroupedViewProps> = React.memo(({
  testcases,
  groupBy,
  selectedIssues,
  selectedRowId,
  onOpenDocument,
  onToggleSelection,
  onSelectRow,
}) => {
  const groups = useMemo(() => {
    const grouped = new Map<string, ProcessedTestCaseWithId[]>();

    for (const tc of testcases) {
      let key: string;
      switch (groupBy) {
        case 'module': key = tc.module || '(No Module)'; break;
        case 'category': key = tc.rule?.category || '(No Category)'; break;
        case 'rule': key = tc.rule?.ruleName || '(Unknown Rule)'; break;
        case 'severity': key = tc.rule?.severity || 'N/A'; break;
        default: key = 'All';
      }

      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(tc);
    }

    return Array.from(grouped.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [testcases, groupBy]);

  return (
    <div className="grouped-view">
      {groups.map(([groupName, items], idx) => (
        <GroupSection
          key={groupName}
          groupName={groupName}
          items={items}
          selectedIssues={selectedIssues}
          selectedRowId={selectedRowId}
          onOpenDocument={onOpenDocument}
          onToggleSelection={onToggleSelection}
          onSelectRow={onSelectRow}
          defaultOpen={idx === 0}
        />
      ))}
    </div>
  );
});
