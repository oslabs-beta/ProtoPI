import * as vscode from "vscode";
import { exec, ChildProcess } from "child_process";
import * as path from "path";
import terminate from "terminate";

import { postMessageToWebview } from "./core/router/outboundMailer";
import { findSpecFiles, groupFilesByDirectory } from "./parseWorkspace";
import { Workshop } from "./Workshop";
import { SidebarProvider } from "./SidebarProvider";
import { newRouter } from "./extension";

let mockServer: ChildProcess | null = null;
const config = vscode.workspace.getConfiguration("protopi");
const prismPath = path.join(__dirname, "..", "node_modules", ".bin", "prism");
const prismPort: number = config.get<number>("mockServer.port") ?? 3141;


let statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
  100
);

export function loadSubscriptions(context: vscode.ExtensionContext, sidebarProvider: SidebarProvider) {
  // Creates mock server for first yaml file found in workspace
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.runPrismMock", async () => {
      if (mockServer) {
        vscode.window.showInformationMessage("Server is already running!");
        return;
      }

      // Store all possible API Spec Files
      const files = (await context.workspaceState.get(
        "openAPIFiles"
      )) as vscode.Uri[];

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
        statusBarItem.command = "ProtoPI.stopPrismMock";
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

      if (mockServer.pid) {
        terminate(mockServer.pid, (err: any) => {
          if (err) {
            console.error(err);
            vscode.window.showErrorMessage("Error killing mock server process");
          } else {
            mockServer = null;
            vscode.window.showInformationMessage("Mock server is stopped");
            // update status bar item:
            statusBarItem.text = `$(gear~spin) Start Mock Server`;
            statusBarItem.tooltip = "Click to start mock server";
            statusBarItem.command = "ProtoPI.startPrismMock";
  
            statusBarItem.show();
          }
        });
      } else {
        vscode.window.showErrorMessage("Mock server PID is not defined");
      }
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

  // Open Workshop Webview
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.workShop.start", () => {
      Workshop.createOrShow(context.extensionUri);
    })
  );

  // Refresh Workshop Webview
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.workShop.refresh", () => {
      Workshop.kill();
      Workshop.createOrShow(context.extensionUri);
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

        if (sidebarProvider._view?.webview) {
          if (!newRouter) {
            sidebarProvider._view.webview.postMessage({
              type: "fileContent",
              content: textContent,
            });
          } else {
            postMessageToWebview(sidebarProvider._view.webview, {
              type: "fileContent",
              content: textContent,
            });
          }
        }

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

      if (sidebarProvider._view?.webview) {
        if (!newRouter) {
          sidebarProvider._view.webview.postMessage({
            type: "closeFile",
          });
        } else {
          postMessageToWebview(sidebarProvider._view.webview, {
            type: "closeFile",
          });
        }
      }

      vscode.window.showInformationMessage("API file closed");
    })
  );

  // Open Extension Settings
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.openSettings", () => {
      vscode.commands.executeCommand(
        "workbench.action.openSettings",
        "protopi"
      );
    })
  );
}