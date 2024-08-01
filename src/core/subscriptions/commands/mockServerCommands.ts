import * as vscode from 'vscode';
import * as path from 'path';
import { MockServerManager } from '../managers/MockServerManager';
import { StatusBarManager } from '../managers/StatusBarManager';
import { updateOpenAPIFiles } from '../utils/parseWorkspace'; 
import { getServerPort } from '../utils/prismConfig';

export function registerMockServerCommands(context: vscode.ExtensionContext, statusBarManager: StatusBarManager) {
  const serverManager = new MockServerManager(statusBarManager);

  context.subscriptions.push(
      vscode.commands.registerCommand("ProtoPI.runPrismMock", async () => {
        const files = await updateOpenAPIFiles(context);
        if (files.length === 0) {
          vscode.window.showErrorMessage("No API specification files found.");
          return;
        }

        // Optionally let the user pick a file to mock
        const pickItems = files.map(file => ({
          label: path.basename(file.fsPath),
          description: file.fsPath,
          file
        }));

        const pickedFile = await vscode.window.showQuickPick(pickItems, {
          placeHolder: 'Select an API specification file to mock',
        });

        if (pickedFile) {
          const port = await getServerPort();
          serverManager.startServer(port, pickedFile.file);
        } else {
          vscode.window.showErrorMessage("No file selected");
        }
      }),

      vscode.commands.registerCommand("ProtoPI.stopPrismMock", async () => {
        const runningServers = serverManager.getRunningServers();
        if (runningServers.length === 0) {
          vscode.window.showErrorMessage("No server is currently running.");
          return;
        }
  
        const pickItems = runningServers.map(({ port }) => ({
          label: `Server on port ${port}`,
          port
        }));
  
        const pickedServer = await vscode.window.showQuickPick(pickItems, {
          placeHolder: 'Select a server to stop',
        });
  
        if (pickedServer) {
          const port = pickedServer.port;
          await serverManager.stopServer(port);
        } else {
          vscode.window.showErrorMessage("No server selected");
        }
      })
  );
}