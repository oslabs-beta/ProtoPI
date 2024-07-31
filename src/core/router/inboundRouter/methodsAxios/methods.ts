import axios from 'axios';
import * as vscode from 'vscode';
import { Webview } from 'vscode';

export async function handleFetchRequest(data: any, webview: Webview) {
  if (!data.value) {
    vscode.window.showInformationMessage('No data');
    return;
  }

  const { method, requestUrl } = data.value;

  vscode.window.showInformationMessage(`Method: ${method}, URL: ${requestUrl}`);

  try {
    const res = await axios.get(requestUrl);
    vscode.window.showInformationMessage(JSON.stringify(res.data));
    webview.postMessage({
      command: 'sendFetchResponse',
      data: res.data,
    });
  } catch (err) {
    if (err instanceof Error) {
      vscode.window.showErrorMessage(JSON.stringify(err));
      webview.postMessage({
        command: 'error',
        error: err.message,
      });
    } else {
      vscode.window.showErrorMessage('An unknown error occurred');
    }
  }
}
