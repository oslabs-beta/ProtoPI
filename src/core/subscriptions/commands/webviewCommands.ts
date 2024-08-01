import * as vscode from "vscode";
import { Workshop } from "../../../views/Workshop"; // Adjust path as necessary
import { Sidebar } from "../../../views/Sidebar"; // Adjust path as necessary

export function registerWebviewCommands(context: vscode.ExtensionContext, sidebar: Sidebar) {
  context.subscriptions.push(
    // Open Workshop Webview
    vscode.commands.registerCommand("ProtoPI.workShop.start", () => {
      Workshop.createOrShow(context.extensionUri);
    }),

    // Refresh Workshop Webview
    vscode.commands.registerCommand("ProtoPI.workShop.refresh", () => {
      Workshop.kill();
      Workshop.createOrShow(context.extensionUri);
      // setTimeout(() => {
      //   vscode.commands.executeCommand(
      //     "workbench.action.webview.openDeveloperTools"
      //   );
      // }, 500);
    }),

    // Reload Side Panel Webview
    vscode.commands.registerCommand("ProtoPI.refresh", async () => {
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand("workbench.view.extension.protopi-sidebar-view");
    })
  );
}