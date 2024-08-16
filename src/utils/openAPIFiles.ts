import * as vscode from 'vscode';
import { updateOpenAPIFiles } from '../core/subscriptions/utils/parseWorkspace';
import { postMessageToWebview } from '../core/router/outboundMailer';
import { Sidebar } from '../views/Sidebar';

export async function loadOpenAPIFilesAndNotifyWebview(context: vscode.ExtensionContext, sidebar: Sidebar): Promise<void> {
  try {
    const files = await updateOpenAPIFiles(context);
    console.log("OpenAPI Files loaded into extension state");

    if (sidebar._view?.webview) {
      postMessageToWebview(sidebar._view.webview, {
        type: 'openAPIFiles',
        content: files,
      });
      console.log('OpenAPI Files loaded into webview');
    }
  } catch (error) {
    console.error("Failed to load OpenAPI files:", error);
    vscode.window.showErrorMessage("Failed to load OpenAPI files. See console for details.");
  }
}