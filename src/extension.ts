// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ChildProcess, exec } from "child_process";
import { loadSubscriptions } from "./subscriptions";
import * as path from "path";
import terminate from "terminate";
import * as vscode from "vscode";

/**
 * ROUTER IMPORTS
 */
import { postMessageToWebview } from "./core/router/outboundMailer";
export const newRouter: boolean = true;
/**
 * ROUTER IMPORTS
 */

import { Workshop } from "./Workshop";

import { SidebarProvider } from "./SidebarProvider";
import {
  findSpecFiles,
  groupFilesByDirectory,
  updateOpenAPIFiles,
} from "./parseWorkspace";

// Fetch user's extension settings
const config = vscode.workspace.getConfiguration("protopi");
const prismPath = path.join(__dirname, "..", "node_modules", ".bin", "prism");
const prismPort: number = config.get<number>("mockServer.port") ?? 3141;

let mockServer: ChildProcess | null = null;

let statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
  100
);

export function activate(context: vscode.ExtensionContext) {
  // Update openAPIFiles workspace state
  updateOpenAPIFiles(context).then((files) => {
    console.log("OpenAPI Files loaded into extension state");

    //  Check if sidebarProvider._view?.webview is not undefined. 
    //  If it is, the function is called, ensuring type safety.
    if (sidebarProvider._view?.webview) {
      if (!newRouter) {
        // OLD ROUTER HERE
        sidebarProvider._view.webview.postMessage({
          type: "openAPIFiles",
          content: files,
        });
      } else {
        // NEW ROUTER HERE
        postMessageToWebview(sidebarProvider._view.webview, {
          type: "openAPIFiles",
          content: files,
        });
      }
    }
  });

  // Create and show the status bar item
  statusBarItem.text = `$(gear~spin) Start Mock Server`;
  statusBarItem.tooltip = "Click to start Mock Server";
  statusBarItem.command = "ProtoPI.runPrismMock";
  statusBarItem.show();

  // Add to context subscriptions for proper disposal
  context.subscriptions.push(statusBarItem);

  // Initialize the sidebar provider
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "protopi-sidebar",
      sidebarProvider
    )
  );

  // Load subscriptions from external file
  loadSubscriptions(context, sidebarProvider);
}


// This method is called when your extension is deactivated
export function deactivate() {
  if (mockServer && mockServer.pid) {
    terminate(mockServer.pid, (err) => {
      if (err) {
        console.error(err);
      }
    });
    mockServer = null;
  }
}
