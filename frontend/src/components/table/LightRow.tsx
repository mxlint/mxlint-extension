import React from 'react';
import type { DocumentInfo, ProcessedTestCaseWithId } from '@/types';
import { isOpenableDocument } from '@/utils';

interface LightRowProps {
  tc: ProcessedTestCaseWithId;
  isChecked: boolean;
  isSelected: boolean;
  onOpenDocument: (docInfo: DocumentInfo) => void;
  onToggleSelection: (id: string) => void;
  onSelectRow: (id: string) => void;
}

export const LightRow: React.FC<LightRowProps> = ({ tc, isChecked, isSelected, onOpenDocument, onToggleSelection, onSelectRow }) => {
  const isClickable = isOpenableDocument(tc.docname);
  const severityClass = tc.rule?.severity?.toLowerCase() || 'low';
  const rowClass = `${isChecked ? 'checked-row ' : ''}${isSelected ? 'selected-row' : ''}`.trim();

  return (
    <tr className={rowClass || undefined} onClick={() => onSelectRow(tc.id)}>
      <td className="checkbox-cell" onClick={e => e.stopPropagation()}>
        <input type="checkbox" checked={isChecked} onChange={() => onToggleSelection(tc.id)} className="row-checkbox" />
      </td>
      <td><span className={`severity-label ${severityClass}`}>{tc.rule?.severity || 'N/A'}</span></td>
      <td title={tc.docname}>
        {isClickable ? (
          <a
            href="#"
            className="document-link"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onOpenDocument({ document: tc.docname, type: tc.doctype, module: tc.module });
            }}
          >
            {tc.docname}
          </a>
        ) : tc.docname}
      </td>
      <td title={tc.module}>{tc.module}</td>
      <td>{tc.rule?.ruleName || 'Unknown'}</td>
      <td><span className={`status-label ${tc.status}`}>{tc.status}</span></td>
    </tr>
  );
};
