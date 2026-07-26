import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, ToastContainer } from '@/components/ui';
import { ClipboardIcon, RefreshIcon } from '@/components/icons';
import { ToastProvider, ThemeProvider, useToast } from '@/context';
import './App.css';

const CliLogViewer: React.FC = () => {
  const { success, error: toastError } = useToast();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const logRef = useRef<HTMLPreElement>(null);

  const loadCliLog = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true);
    }
    try {
      const response = await fetch('./api/cli-log');
      if (!response.ok) {
        throw new Error(`Failed to load CLI log (${response.status})`);
      }
      const payload = await response.json() as { success?: boolean; content?: string; error?: string };
      if (!payload.success) {
        throw new Error(payload.error || 'Failed to load CLI log.');
      }
      setContent(payload.content || '(No CLI output captured yet. Run lint to generate logs.)');
      requestAnimationFrame(() => {
        if (logRef.current) {
          logRef.current.scrollTop = logRef.current.scrollHeight;
        }
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load CLI log.';
      setContent(`[ERROR] ${message}`);
      if (!silent) {
        toastError(message);
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, [toastError]);

  useEffect(() => {
    void loadCliLog();
  }, [loadCliLog]);

  useEffect(() => {
    if (!autoRefresh) {
      return;
    }
    const interval = setInterval(() => {
      void loadCliLog(true);
    }, 2000);
    return () => clearInterval(interval);
  }, [autoRefresh, loadCliLog]);

  const copyCliLog = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      success('CLI log copied to clipboard.');
    } catch {
      toastError('Failed to copy CLI log.');
    }
  }, [content, success, toastError]);

  return (
    <div className="cli-log-pane">
      <div className="cli-log-pane-toolbar">
        <div className="cli-log-pane-title">mxlint-cli output</div>
        <div className="cli-log-pane-actions">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setAutoRefresh(prev => !prev)}
            className={autoRefresh ? 'active' : ''}
            title="Automatically refresh log every 2 seconds"
          >
            Auto {autoRefresh ? 'On' : 'Off'}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            icon={<RefreshIcon />}
            onClick={() => void loadCliLog()}
            disabled={loading}
            title="Reload log from disk"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            icon={<ClipboardIcon />}
            onClick={() => void copyCliLog()}
            disabled={loading || !content}
            title="Copy log to clipboard"
          >
            Copy
          </Button>
        </div>
      </div>
      <pre ref={logRef} className="cli-log-viewer cli-log-viewer--pane">
        {loading && !content ? 'Loading CLI log...' : content}
      </pre>
    </div>
  );
};

const CliLogApp: React.FC = () => (
  <ThemeProvider defaultTheme="light">
    <ToastProvider>
      <CliLogViewer />
      <ToastContainer position="top-right" />
    </ToastProvider>
  </ThemeProvider>
);

export default CliLogApp;
