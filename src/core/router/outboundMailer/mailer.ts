import { Webview } from 'vscode';

export function postMessageToWebview(webview: Webview, message: any) {
  if (webview) {
    webview.postMessage(message);
  }
}