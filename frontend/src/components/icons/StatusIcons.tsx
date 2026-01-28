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
