export const postMessage = (message: string, data?: unknown): void => {
  if (window.chrome?.webview) {
    window.chrome.webview.postMessage({ message, data });
  }
};
