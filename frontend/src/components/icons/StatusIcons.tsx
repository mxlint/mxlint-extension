import React from 'react';

export const ErrorIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 16 16" width="16" height="16">
    <circle cx="8" cy="8" r="7" fill="#f14c4c" />
    <text x="8" y="11.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">×</text>
  </svg>
));

export const CheckIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="#4ec9b0">
    <circle cx="8" cy="8" r="7" />
    <path d="M5 8l2 2 4-4" stroke="#1e1e1e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));

export const SkipIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="#6e7681">
    <circle cx="8" cy="8" r="7" />
    <path d="M5 8h6" stroke="#1e1e1e" strokeWidth="2" strokeLinecap="round" />
  </svg>
));

// Severity icon rendered as signal bars: more bars = higher severity.
// Color is applied via CSS based on the `severity-<level>` class.
export const SeverityIcon: React.FC<{ severity?: string }> = React.memo(({ severity }) => {
  const level = (severity || 'low').toLowerCase();
  const bars = level === 'high' ? 3 : level === 'medium' ? 2 : 1;
  return (
    <svg
      className={`severity-icon-svg severity-${level}`}
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="1" y="9" width="3" height="6" rx="1" opacity={bars >= 1 ? 1 : 0.25} />
      <rect x="6.5" y="5" width="3" height="10" rx="1" opacity={bars >= 2 ? 1 : 0.25} />
      <rect x="12" y="1" width="3" height="14" rx="1" opacity={bars >= 3 ? 1 : 0.25} />
    </svg>
  );
});
