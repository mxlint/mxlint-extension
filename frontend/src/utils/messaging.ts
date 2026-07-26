import type { WebViewMessage } from '@/types';

const shouldLogMessage = (message: string, hasBridge: boolean): boolean =>
  !hasBridge || message === 'runLintNow' || message === 'MessageListenerRegistered';

const sendDiag = (event: string, detail: string): void => {
  const url = `./api/diag?source=frontend&event=${encodeURIComponent(event)}&detail=${encodeURIComponent(detail)}`;
  void fetch(url).catch(() => {
    // Ignore diagnostics failures to avoid impacting user actions.
  });
};

type ExtensionMessageResponse = {
  success?: boolean;
  error?: string;
  ran?: boolean;
  lintSucceeded?: boolean;
  transport?: 'bridge' | 'http';
};

const getWebviewBridge = () => window.chrome?.webview;

export const isWebviewBridgeAvailable = (): boolean => !!getWebviewBridge();

export const addWebviewMessageListener = (listener: (event: MessageEvent<WebViewMessage>) => void): boolean => {
  const bridge = getWebviewBridge();
  if (!bridge) {
    return false;
  }

  bridge.addEventListener('message', listener);
  return true;
};

export const removeWebviewMessageListener = (listener: (event: MessageEvent<WebViewMessage>) => void): void => {
  getWebviewBridge()?.removeEventListener('message', listener);
};

export const sendExtensionMessage = async (message: string, data?: unknown): Promise<ExtensionMessageResponse> => {
  const webview = getWebviewBridge();
  const hasBridge = !!webview;

  if (shouldLogMessage(message, hasBridge)) {
    const detail = `message=${message};hasBridge=${hasBridge};href=${window.location.href}`;
    sendDiag('postMessageAttempt', detail);
  }

  if (hasBridge) {
    webview.postMessage({ message, data });
    return { success: true, transport: 'bridge' };
  }

  try {
    const response = await fetch('./api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, data }),
    });

    if (!response.ok) {
      return { success: false, error: `Message dispatch failed (${response.status})` };
    }

    const payload = await response.json() as ExtensionMessageResponse;
    return { ...payload, transport: 'http' };
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Message dispatch failed.';
    return { success: false, error: err, transport: 'http' };
  }
};

export const postMessage = (message: string, data?: unknown): void => {
  void sendExtensionMessage(message, data);
};
