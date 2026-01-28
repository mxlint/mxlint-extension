import React from 'react';
import type { DocumentInfo, ProcessedTestCaseWithId } from '@/types';
import { getErrorMessages, isOpenableDocument } from '@/utils';
import { Button } from '@/components/ui';

interface DetailPanelProps {
  testcase: ProcessedTestCaseWithId | null;
  onClose: () => void;
  onOpenDocument: (docInfo: DocumentInfo) => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = React.memo(({ testcase, onClose, onOpenDocument }) => {
  if (!testcase) {
    return (
      <div className="detail-panel empty">
        <div className="detail-panel-empty">
          <span>Select a row to view details</span>
        </div>
      </div>
    );
  }

  const { rule, status, module, docname, doctype } = testcase;
  const severityClass = rule?.severity?.toLowerCase() || 'low';
  const isClickable = isOpenableDocument(docname);
  const errorMessages = status === 'fail' ? getErrorMessages(testcase) : [];

  const handleOpenDoc = () => {
    if (isClickable) {
      onOpenDocument({ document: docname, type: doctype, module });
    }
  };

  return (
    <div className="detail-panel">
      <div className="detail-panel-header">
        <h3>Rule Details</h3>
        <Button
          variant="ghost"
          size="sm"
          className="detail-panel-close"
          onClick={onClose}
          title="Close panel"
          aria-label="Close panel"
        >
          ×
        </Button>
      </div>

      <div className="detail-panel-content">
        {/* Rule name and severity */}
        <div className="detail-section">
          <div className="detail-rule-header">
            <span className={`severity-label ${severityClass}`}>{rule?.severity || 'N/A'}</span>
            <span className={`status-label ${status}`}>{status}</span>
          </div>
          <h4 className="detail-rule-name">{rule?.ruleName || 'Unknown Rule'}</h4>
          {rule?.title && <div className="detail-rule-title">{rule.title}</div>}
        </div>

        {/* Document info */}
        <div className="detail-section">
          <div className="detail-label">Document</div>
          <div className="detail-value">
            {isClickable ? (
              <a href="#" className="document-link" onClick={(e) => { e.preventDefault(); handleOpenDoc(); }}>
                {docname}
              </a>
            ) : (
              <span>{docname}</span>
            )}
          </div>

          <div className="detail-meta">
            <div className="detail-meta-item">
              <span className="detail-label">Module:</span>
              <span className="detail-value">{module || 'N/A'}</span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{doctype || 'N/A'}</span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{rule?.category || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {rule?.description && (
          <div className="detail-section">
            <div className="detail-label">Description</div>
            <div className="detail-description">{rule.description}</div>
          </div>
        )}

        {/* Remediation */}
        {rule?.remediation && (
          <div className="detail-section detail-remediation">
            <div className="detail-label">Remediation</div>
            <div className="detail-remediation-text">{rule.remediation}</div>
          </div>
        )}

        {/* Errors */}
        {errorMessages.length > 0 && (
          <div className="detail-section detail-errors">
            <div className="detail-label">Error{errorMessages.length > 1 ? 's' : ''}</div>
            <div className="detail-error-list">
              {errorMessages.map((msg, idx) => (
                <div key={idx} className="detail-error-item">{msg}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
