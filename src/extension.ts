// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import terminate from 'terminate';

import { ChildProcess, exec } from 'child_process';
import { loadSubscriptions } from './subscriptions';
import { postMessageToWebview } from './core/router/outboundMailer';

import { Workshop } from './Workshop';
import { Sidebar } from './Sidebar';
import { updateOpenAPIFiles } from './parseWorkspace';
import { StatusBarManager } from './StatusBarManager';

// Fetch user's extension settings
const config = vscode.workspace.getConfiguration("protopi");
const prismPath = path.join(__dirname, "..", "node_modules", ".bin", "prism");
const prismPort: number = config.get<number>("mockServer.port") ?? 3141;

let mockServer: ChildProcess | null = null;


export function activate(context: vscode.ExtensionContext) {
  console.log('Activating ProtoPI extension.');

  const sidebar = new Sidebar(context.extensionUri);
  context.subscriptions.push(
      vscode.window.registerWebviewViewProvider('protopi-sidebar', sidebar)
  );

  // Initialize the status bar item
  const statusBarManager = new StatusBarManager();
  loadOpenAPIFilesAndNotifyWebview(context, sidebar);

  // Load subscriptions from subscriptions file
  loadSubscriptions(context, sidebar, statusBarManager);

  // Uncomment the following line to make the Workshop panel appear on load
  Workshop.createOrShow(context.extensionUri);
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log('Deactivating ProtoPI extension.');
  terminateMockServer();
}

function terminateMockServer(){
  if (mockServer && mockServer.pid) {
    terminate(mockServer.pid, (err) => {
      if (err){
        console.error('Failed to terminate mock server:', err);
      } else {
        console.log('Mock server terminated successfully.');
        mockServer = null;
      }
    });
  }
}

function loadOpenAPIFilesAndNotifyWebview(context: vscode.ExtensionContext, sidebar: Sidebar) {
  updateOpenAPIFiles(context).then((files) => {
    console.log("OpenAPI Files loaded into extension state");

    if (sidebar._view?.webview) {
      postMessageToWebview(sidebar._view.webview, {
        type: 'openAPIFiles',
        content: files,
      });
      console.log('OpenAPI Files loaded into webview');
    }
  });
};