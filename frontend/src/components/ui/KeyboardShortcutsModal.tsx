import React from 'react';
import { Button } from './primitives/Button';

interface KeyboardShortcutsModalProps {
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content shortcuts-modal" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <h3>Keyboard Shortcuts</h3>
        <Button
          variant="ghost"
          size="sm"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </Button>
      </div>
      <div className="modal-body shortcuts-body">
        <div className="shortcuts-columns">
          <div className="shortcuts-column">
            <div className="shortcut-group">
              <div className="shortcut-group-title">Navigation</div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>↑</kbd> <kbd>↓</kbd></span>
                <span className="shortcut-desc">Navigate rows</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>Enter</kbd></span>
                <span className="shortcut-desc">Open document</span>
              </div>
            </div>
            <div className="shortcut-group">
              <div className="shortcut-group-title">Filtering</div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>Ctrl</kbd> + <kbd>F</kbd></span>
                <span className="shortcut-desc">Focus search</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>Escape</kbd></span>
                <span className="shortcut-desc">Clear / Close</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>1</kbd></span>
                <span className="shortcut-desc">Show failures</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>2</kbd></span>
                <span className="shortcut-desc">Show skipped</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>3</kbd></span>
                <span className="shortcut-desc">Show passing</span>
              </div>
            </div>
          </div>
          <div className="shortcuts-column">
            <div className="shortcut-group">
              <div className="shortcut-group-title">Issue Selection</div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>Space</kbd> / <kbd>X</kbd></span>
                <span className="shortcut-desc">Toggle selection</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>Ctrl</kbd> + <kbd>A</kbd></span>
                <span className="shortcut-desc">Select all visible</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>Ctrl</kbd> + <kbd>D</kbd></span>
                <span className="shortcut-desc">Deselect all</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>I</kbd></span>
                <span className="shortcut-desc">Create issue</span>
              </div>
            </div>
            <div className="shortcut-group">
              <div className="shortcut-group-title">Actions</div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>B</kbd></span>
                <span className="shortcut-desc">Toggle bookmark</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>R</kbd></span>
                <span className="shortcut-desc">Refresh data</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>E</kbd></span>
                <span className="shortcut-desc">Export to CSV</span>
              </div>
              <div className="shortcut-item">
                <span className="shortcut-keys"><kbd>?</kbd></span>
                <span className="shortcut-desc">Show shortcuts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
