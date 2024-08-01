import * as vscode from 'vscode';

import { registerAllCommands } from './core/subscriptions/commands/index';
import { loadOpenAPIFilesAndNotifyWebview } from './utils/openAPIFiles';

import { Workshop } from './views/Workshop';
import { Sidebar } from './views/Sidebar';
import { StatusBarManager } from './core/subscriptions/managers/StatusBarManager';


export function activate(context: vscode.ExtensionContext) {
  console.log('Activating ProtoPI extension.');

  // Initialize the status bar item
  const statusBarManager = new StatusBarManager();
  
  // Initialize the sidebar
  const sidebar = new Sidebar(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'protopi-sidebar', 
      sidebar,
    )
  );

  // Load OpenAPI files and notify webview
  loadOpenAPIFilesAndNotifyWebview(context, sidebar);

  // Register all commands
  registerAllCommands(context, sidebar, statusBarManager);

  // Uncomment the following line to make the Workshop panel appear on load
  Workshop.createOrShow(context.extensionUri);
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log('Deactivating ProtoPI extension.');
}