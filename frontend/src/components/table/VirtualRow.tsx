import React, { useCallback } from 'react';
import type { DocumentInfo, ProcessedTestCaseWithId } from '@/types';
import { BookmarkIcon } from '@/components/icons';
import { isOpenableDocument } from '@/utils';
import { Button } from '@/components/ui';

interface VirtualRowProps {
  testcase: ProcessedTestCaseWithId;
  index: number;
  isBookmarked: boolean;
  isSelected: boolean;
  isChecked: boolean;
  onOpenDocument: (docInfo: DocumentInfo) => void;
  onToggleBookmark: (id: string) => void;
  onToggleSelection: (id: string) => void;
  onSelectRow: (index: number) => void;
}

export const VirtualRow: React.FC<VirtualRowProps> = React.memo(({
  testcase,
  index,
  isBookmarked,
  isSelected,
  isChecked,
  onOpenDocument,
  onToggleBookmark,
  onToggleSelection,
  onSelectRow,
}) => {
  const { id, rule, status, module, docname, doctype } = testcase;
  const isClickable = isOpenableDocument(docname);
  const severityClass = rule?.severity?.toLowerCase() || 'low';

  const handleDocClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isClickable) {
      onOpenDocument({ document: docname, type: doctype, module });
    }
  }, [docname, doctype, module, isClickable, onOpenDocument]);

  const handleBookmark = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(id);
  }, [id, onToggleBookmark]);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggleSelection(id);
  }, [id, onToggleSelection]);

  const handleRowClick = useCallback(() => onSelectRow(index), [index, onSelectRow]);

  const rowClass = `${isBookmarked ? 'bookmarked-row ' : ''}${isSelected ? 'selected-row ' : ''}${isChecked ? 'checked-row' : ''}`.trim();

  return (
    <tr className={rowClass || undefined} onClick={handleRowClick}>
      <td className="checkbox-cell" onClick={e => e.stopPropagation()}>
        <input type="checkbox" checked={isChecked} onChange={handleCheck} className="row-checkbox" />
      </td>
      <td className="bookmark-cell">
        <Button
          variant="ghost"
          size="sm"
          className="bookmark-btn"
          onClick={handleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <BookmarkIcon filled={isBookmarked} />
        </Button>
      </td>
      <td>
        <span className={`severity-label ${severityClass}`}>{rule?.severity || 'N/A'}</span>
      </td>
      <td title={docname}>
        {isClickable ? (
          <a href="#" className="document-link" onClick={handleDocClick}>{docname}</a>
        ) : (
          <span>{docname}</span>
        )}
      </td>
      <td title={module}>{module}</td>
      <td title={doctype}>{doctype}</td>
      <td title={rule?.ruleName || 'Unknown'}>{rule?.ruleName || 'Unknown'}</td>
      <td>{rule?.category || 'N/A'}</td>
      <td><span className={`status-label ${status}`}>{status}</span></td>
    </tr>
  );
});
