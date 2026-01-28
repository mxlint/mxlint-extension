import React from 'react';

export const SortAscIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
    <path d="M8 4l4 5H4l4-5z" />
  </svg>
));

export const SortDescIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
    <path d="M8 12l4-5H4l4 5z" />
  </svg>
));

export const GroupIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M2 3h5v2H2V3zm7 0h5v2H9V3zM2 7h5v2H2V7zm7 0h5v2H9V7zm-7 4h5v2H2v-2zm7 0h5v2H9v-2z" />
  </svg>
));

export const KeyboardIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M14 3H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM4 6h2v2H4V6zm0 3h2v2H4V9zm3-3h2v2H7V6zm0 3h5v2H7V9zm3-3h2v2h-2V6z" />
  </svg>
));

export const PresetIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M13.5 2h-11A1.5 1.5 0 001 3.5v9A1.5 1.5 0 002.5 14h11a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0013.5 2zM4 11H3V5h1v6zm2 0H5V5h1v6zm2-3H7V5h1v3zm2 3H9V8h1v3zm2-1h-1V5h1v5z" />
  </svg>
));
