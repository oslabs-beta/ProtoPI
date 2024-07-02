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

let statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
  100
);

export function activate(context: vscode.ExtensionContext) {
  //
  const statusBarCommandStart = "ProtoPI.runPrismMock";
  const statusBarCommandStop = "ProtoPI.stopPrismMock";

  // Create and show the status bar item
  statusBarItem.text = `$(gear~spin) Start Mock Server`;
  statusBarItem.tooltip = "Click to start Mock Server";
  statusBarItem.command = statusBarCommandStart;
  statusBarItem.show();

  // Add to context subscriptions for proper disposal
  context.subscriptions.push(statusBarItem);

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
          // if (error) {
          //   vscode.window.showErrorMessage(`Error starting Prism: ${stderr}`);
          //   mockServer = null;
          //   return;
          // }
          vscode.window.showInformationMessage(`${stdout}`); // Not displaying
        });

        // Displays regardless if command was executed properly - move to exec() callback
        vscode.window.showInformationMessage(
          `Mock server started with ${path.basename(selectedFile.file.fsPath)}`
        );

        // update the status bar item:

        statusBarItem.text = `$(stop) Stop Mock Server`;
        statusBarItem.command = statusBarCommandStop;
        statusBarItem.tooltip = `Click to stop mock server`;
        statusBarItem.show();
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
        return;
      }

      // @ts-ignore
      terminate(mockServer.pid, (err: any) => {
        if (err) {
          console.error(err);
          vscode.window.showErrorMessage("Error killing mock server process");
        }
        mockServer = null;
        vscode.window.showInformationMessage("Mock server is stopped");
        // update status bar item:
        statusBarItem.text = `$(gear~spin) Start Mock Server`;
        statusBarItem.tooltip = "Click to start mock server";
        statusBarItem.command = statusBarCommandStart;
        statusBarItem.show();
      });
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

  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.openFile", () => {
      const panel = vscode.window.createWebviewPanel(
        "webview",
        "Webview",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      panel.webview.html = getWebviewContent();

      panel.webview.onDidReceiveMessage(
        (message) => {
          if (message.command === "openFile") {
            vscode.window
              .showOpenDialog({ canSelectMany: false })
              .then((fileUri) => {
                if (fileUri && fileUri[0]) {
                  vscode.workspace.fs
                    .readFile(fileUri[0])
                    .then((fileContent) => {
                      panel.webview.postMessage({
                        command: "fileContent",
                        content: fileContent.toString(),
                      });
                    });
                }
              });
          }
        },
        undefined,
        context.subscriptions
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.openAPIFile", async () => {
      console.log("Opening API File");
      const files = await findSpecFiles();

      const fileItems = files.map((file) => ({
        label: vscode.workspace.asRelativePath(file),
        description: file.fsPath,
        file: file,
      }));

      const selectedFile = await vscode.window.showQuickPick(fileItems, {
        placeHolder: "Select a file",
      });

      if (selectedFile) {
        const content = await vscode.workspace.fs.readFile(selectedFile.file);
        const textContent = content.toString();

        sidebarProvider._view?.webview.postMessage({
          type: "fileContent",
          content: textContent,
        });

        console.log(`Opened file: ${selectedFile.label}`);
        vscode.window.showInformationMessage(
          `Opened file: ${selectedFile.label}`
        );
      } else {
        vscode.window.showErrorMessage("No file selected");
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.closeAPIFile", () => {
      console.log("Closing API File");
      sidebarProvider._view?.webview.postMessage({
        type: "closeFile",
      });
      vscode.window.showInformationMessage("API file closed");
    })
  );

  statusBarItem.show();
}

function getWebviewContent() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script>
        const vscode = acquireVsCodeApi();
        window.vscode = vscode;
      </script>
    </head>
    <body>
      <div id="app"></div>
      <script type="module" src="./out/compiled/Sidebar.js"></script>
    </body>
    </html>
  `;
}

// This method is called when your extension is deactivated
export function deactivate() {
  if (mockServer) {
    // @ts-ignore
    terminate(mockServer.pid, (err) => console.error(err));
    mockServer = null;
  }
}
