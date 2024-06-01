// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec } from "child_process";
import * as path from "path";
import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";
import { SidebarProvider } from "./SidebarProvider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const prismPath = path.join(__dirname, "..", "node_modules", ".bin", "prism");
  const specPath =
    "https://raw.githack.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml";
  const prismPort = 3141;

  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.runPrismMock", () => {
      // Uses local prism binary to exec command
      const prismCommand = `${prismPath} mock -d ${specPath} --port ${prismPort}
      `;

      exec(prismCommand, (error, stdout, stderr) => {
        if (error) {
          vscode.window.showErrorMessage(`Error starting Prism: ${stderr}`);
          return;
        }
        vscode.window.showInformationMessage(`${stdout}`); // Not displaying
      });

      vscode.window.showInformationMessage(`Prism started`);
    })
  );

  // Sidebar
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "protopi-sidebar",
      sidebarProvider
    )
  );

  // Open HelloWorldPanel webview
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.helloWorld", () => {
      HelloWorldPanel.createOrShow(context.extensionUri);
    })
  );

  // Reload Panel Webview
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.reload", () => {
      HelloWorldPanel.kill();
      HelloWorldPanel.createOrShow(context.extensionUri);
      // setTimeout(() => {
      //   vscode.commands.executeCommand(
      //     "workbench.action.webview.openDeveloperTools"
      //   );
      // }, 500);
    })
  );

  // Reload Side Panel Webview
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.refresh", async () => {
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.protopi-sidebar-view"
      );
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
