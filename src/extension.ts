// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ChildProcess, exec } from "child_process";
import * as path from "path";
import terminate from "terminate";
import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";
import { SidebarProvider } from "./SidebarProvider";
import { findSpecFiles, groupFilesByDirectory } from "./parseWorkspace";

// Prism binary from local extension
const prismPath = path.join(__dirname, "..", "node_modules", ".bin", "prism");
const prismPort = 3141;
// const specPath = path.join(__dirname, "..", "examples", "spec.yaml");
// const specURL =
//   "https://raw.githack.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml";

let mockServer: ChildProcess | null = null;

export function activate(context: vscode.ExtensionContext) {
  // Creates mock server for first .yaml file found in workspace
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.runPrismMock", async () => {
      if (mockServer) {
        vscode.window.showInformationMessage("Server is already running!");
        return;
      }

      // Store all possible API Spec Files
      const files = await findSpecFiles();

      // Map files for quick selection
      const fileItems = files.map((file) => ({
        label: vscode.workspace.asRelativePath(file),
        description: file.fsPath,
        file: file,
      }));

      // Prompt user for input
      const selectedFile = await vscode.window.showQuickPick(fileItems, {
        placeHolder: "Select a file",
      });

      if (selectedFile) {
        // Create prism mock command
        const prismCommand = `${prismPath} mock -d ${selectedFile.file.fsPath} --port ${prismPort}`;

        mockServer = exec(prismCommand, (error, stdout, stderr) => {
          if (error) {
            vscode.window.showErrorMessage(`Error starting Prism: ${stderr}`);
            mockServer = null;
            return;
          }
          vscode.window.showInformationMessage(`${stdout}`); // Not displaying
        });

        // Displays regardless if command was executed properly - move to exec() callback
        vscode.window.showInformationMessage(
          `Prism started on ${path.basename(selectedFile.file.fsPath)}`
        );
      } else {
        vscode.window.showErrorMessage("No file selected");
      }
    })
  );

  // Stops currently running mock server - not working currently
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.stopPrismMock", async () => {
      if (!mockServer) {
        vscode.window.showInformationMessage("No server is running");
      }
      // terminate(mockServer?.pid, (err) => console.error(err));
      // terminate(mockServer.pid, (err) => {
      //   if (err) {
      //     console.error(err);
      //     vscode.window.showErrorMessage("Error killing mock server process");
      //   }
      //   mockServer = null;
      //   vscode.window.showInformationMessage("Mock server is stopped");
      // });
    })
  );

  // Parses workspace to display available API Specifications and their directories
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.findSpecFiles", async () => {
      const files = await findSpecFiles();
      console.log(files);
      vscode.window.showInformationMessage(files.toString());

      const dirTree = groupFilesByDirectory(files);
      console.log(JSON.stringify(dirTree));
      vscode.window.showInformationMessage(JSON.stringify(dirTree));
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
export function deactivate() {
  if (mockServer) {
    mockServer.kill();
    mockServer = null;
  }
}
