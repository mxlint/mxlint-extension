import React from 'react';
import type { DocumentInfo, ProcessedTestCaseWithId } from '@/types';
import { isOpenableDocument } from '@/utils';
import { SeverityCell } from './SeverityCell';
import { StatusCell } from './StatusCell';

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
  const rowClass = `${isChecked ? 'checked-row ' : ''}${isSelected ? 'selected-row' : ''}`.trim();
  const skipReason = tc.status === 'skip' ? tc.skipped?.message?.trim() : '';

  return (
    <tr className={rowClass || undefined} onClick={() => onSelectRow(tc.id)}>
      <td className="checkbox-cell col-checkbox" onClick={e => e.stopPropagation()}>
        <input type="checkbox" checked={isChecked} onChange={() => onToggleSelection(tc.id)} className="row-checkbox" />
      </td>
      <td className="col-severity"><SeverityCell severity={tc.rule?.severity} /></td>
      <td className="col-document" title={tc.docname}>
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
      <td className="col-module" title={tc.module}>{tc.module}</td>
      <td className="col-rule">{tc.rule?.ruleName || 'Unknown'}</td>
      <td className="col-status">
        <StatusCell status={tc.status} skipReason={skipReason || undefined} />
      </td>
    </tr>
  );
};
