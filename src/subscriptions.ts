import * as vscode from "vscode";
import { exec, spawn, ChildProcess } from "child_process";
import * as path from "path";
import terminate from "terminate";

import { postMessageToWebview } from "./core/router/outboundMailer";
import { findSpecFiles, groupFilesByDirectory } from "./parseWorkspace";
import { Workshop } from "./Workshop";
import { Sidebar } from "./Sidebar";
import { StatusBarManager } from './StatusBarManager';

const config = vscode.workspace.getConfiguration("protopi");
const prismPath = path.join(__dirname, "..", "node_modules", ".bin", "prism");
const prismPort: number = config.get<number>("mockServer.port") ?? 3141;
export let mockServer: ChildProcess | null = null;

export function loadSubscriptions(
  context: vscode.ExtensionContext, 
  sidebar: Sidebar,
  statusBarManager: StatusBarManager,
) {
  // Initialization of commands and UI elements
  initializeCommands(context, sidebar, statusBarManager);
}

function initializeCommands(
  context: vscode.ExtensionContext, 
  sidebar: Sidebar,
  statusBarManager: StatusBarManager,
){
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
        placeHolder: "Select a file to mock",
      });

      if (selectedFile) {
        // Create prism mock command
        // @TODO:  --no-deprecation TURNS OFF an error for "punycode".   
        // This is from ES LINT which needs to be ugpraded to get rid of it.  
        // Errors are:

        // Error starting Prism: (node:84449) [DEP0040] DeprecationWarning: 
        // The punycode module is deprecated. Please use a userland alternative 
        // instead. (Use node --trace-deprecation ... to show where the warning 
        // was created)

        // Error starting Prism: (node:84865) [DEP0040] DeprecationWarning: 
        // The punycode module is deprecated. Please use a userland alternative 
        // instead. (Use node --trace-deprecation ... to show where the warning 
        // was created)

        //  NOTE:  Since the --no-deprecation flag is a Node.js runtime option and 
        //  not an argument for the prism CLI, it cannot be used directly in the 
        //  prism command we run the Node.js process with the --no-deprecation flag.

        const prismArgs = [
          prismPath,
          "mock",
          "-d",
          selectedFile.file.fsPath,
          "--port",
          prismPort.toString()
        ];

        mockServer = spawn("node", ["--no-deprecation", ...prismArgs]);

        if (mockServer.stdout) {
          mockServer.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
          });
        }
        
        if (mockServer.stderr) {
          mockServer.stderr.on("data", (data) => {
            if (data.includes('[DEP0040]')) {
              console.warn(`Warning: Deprecated module used - ${data}`);
            } else {
              vscode.window.showErrorMessage(`Error starting Prism: ${data}`);
            }
          });
        }

        mockServer.on("close", (code) => {
          console.log(`Prism process exited with code ${code}`);
          if (code !== 0 && code !== null) {
            vscode.window.showErrorMessage(`Prism process exited with code ${code}`);
          }
          mockServer = null;
        });

        mockServer.on("error", (error) => {
          console.error(`Prism process error: ${error.message}`);
          vscode.window.showErrorMessage(`Prism process error: ${error.message}`);
          mockServer = null;
        });

        statusBarManager.updateForRunningServer();

      } else {
        vscode.window.showErrorMessage("No file selected");
      }
    }),

  // Stops currently running mock server - not working currently
    vscode.commands.registerCommand("ProtoPI.stopPrismMock", async () => {
      if (!mockServer) {
        vscode.window.showInformationMessage("No server is running");
        return;
      }

      if (mockServer.pid) {
        terminate(mockServer.pid, (err: any) => {
          if (err) {
            console.error(`Error killing mock server process:`, err);
            vscode.window.showErrorMessage("Error killing mock server process");
          } else {
            mockServer = null;
            vscode.window.showInformationMessage("Mock server is stopped");
            statusBarManager.updateForStoppedServer();
            // update status bar item:
            // statusBarItem.text = `$(gear~spin) Start Mock Server`;
            // statusBarItem.tooltip = "Click to start mock server";
            // statusBarItem.command = "ProtoPI.runPrismMock";
  
            // statusBarItem.show();
          }
        });
      } else {
        vscode.window.showErrorMessage("Mock server PID is not defined");
      }
    }),

  // Parses workspace to display available API Specifications and their directories
    vscode.commands.registerCommand("ProtoPI.findSpecFiles", async () => {
      const files = await findSpecFiles();
      vscode.window.showInformationMessage(`Files found: ${files.length}`);

      const dirTree = groupFilesByDirectory(files);
      vscode.window.showInformationMessage(`Directory tree: ${JSON.stringify(dirTree)}`);
    }),

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
    }),

    vscode.commands.registerCommand("ProtoPI.openFile", () => openFilePanel(context)),

    vscode.commands.registerCommand("ProtoPI.openAPIFile", async () => {
      await openAPIFile(context, sidebar);
    }),

    vscode.commands.registerCommand("ProtoPI.closeAPIFile", () => {
      if (sidebar._view?.webview) {
        postMessageToWebview(sidebar._view.webview, { type: "closeFile" });
        vscode.window.showInformationMessage("API file closed");
      }
    }),

    vscode.commands.registerCommand("ProtoPI.openSettings", () => {
      vscode.commands.executeCommand("workbench.action.openSettings", "protopi");
    })
  );
}

async function openFilePanel(context: vscode.ExtensionContext)  {
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
}

  async function openAPIFile(context: vscode.ExtensionContext, sidebar: Sidebar) {
    console.log("Opening API File");
    const files = await findSpecFiles();

    const fileItems = files.map(file => ({
      label: vscode.workspace.asRelativePath(file),
      description: file.fsPath,
      file: file,
    }));

    const selectedFile = await vscode.window.showQuickPick(fileItems, {
      placeHolder: "Select an API file",
    });

    if (selectedFile) {
      const content = await vscode.workspace.fs.readFile(selectedFile.file);

      if (sidebar._view?.webview) {

        postMessageToWebview(sidebar._view.webview, {
          type: "fileContent",
          content: content.toString(),
        });
        vscode.window.showInformationMessage(`Opened file: ${selectedFile.label}`);
      }

      // console.log(`Opened file: ${selectedFile.label}`);
      // vscode.window.showInformationMessage(
      //   `Opened file: ${selectedFile.label}`
      // );
    } else {
      vscode.window.showErrorMessage("No file selected");
    }
  };

//   context.subscriptions.push(
//     vscode.commands.registerCommand("ProtoPI.closeAPIFile", () => {
//       console.log("Closing API File");

//       if (sidebar._view?.webview) {

//         postMessageToWebview(sidebar._view.webview, {
//           type: "closeFile",
//         });
  
//       }

//       vscode.window.showInformationMessage("API file closed");
//     })
//   );

//   // Open Extension Settings
//   context.subscriptions.push(
//     vscode.commands.registerCommand("ProtoPI.openSettings", () => {
//       vscode.commands.executeCommand(
//         "workbench.action.openSettings",
//         "protopi"
//       );
//     })
//   );
// }