import React from 'react';

export const IssueIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z" />
  </svg>
));

export const ClipboardIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M4 2a2 2 0 012-2h4a2 2 0 012 2h1a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h1zm2-1a1 1 0 00-1 1h6a1 1 0 00-1-1H6zM3 4a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1h-1v1a1 1 0 01-1 1H5a1 1 0 01-1-1V4H3z" />
  </svg>
));

export const BookmarkIcon: React.FC<{ filled?: boolean }> = React.memo(({ filled }) => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill={filled ? '#cca700' : 'none'} stroke={filled ? '#cca700' : 'currentColor'} strokeWidth="1.5">
    <path d="M3 2h10v12l-5-3-5 3V2z" />
  </svg>
));
