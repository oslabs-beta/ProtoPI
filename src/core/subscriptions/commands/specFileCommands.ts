import * as vscode from "vscode";
import { findSpecFiles, groupFilesByDirectory } from '../utils/parseWorkspace'; 

export function registerSpecFileCommands(context: vscode.ExtensionContext) {
  context.subscriptions.push(

    // Parses workspace to display available API Specifications and their directories
    vscode.commands.registerCommand("ProtoPI.findSpecFiles", async () => {
      const files = await findSpecFiles();
      vscode.window.showInformationMessage(`Files found: ${files.length}`);

      const dirTree = groupFilesByDirectory(files);
      vscode.window.showInformationMessage(`Directory tree: ${JSON.stringify(dirTree)}`);
    }),

    vscode.commands.registerCommand("ProtoPI.openAPIFile", async () => {
      const files = await findSpecFiles();
      const fileItems = files.map(file => ({
        label: vscode.workspace.asRelativePath(file),
        description: file.fsPath,
        file: file,
      }));

      const selectedFile = await vscode.window.showQuickPick(fileItems, {
        placeHolder: "Select an API file",
      });

      if (!selectedFile) {
        vscode.window.showErrorMessage("No file selected");
        return;
      }

      const content = await vscode.workspace.fs.readFile(selectedFile.file);
      // TODO: some mechanism or webview to display the content
      vscode.window.showTextDocument(selectedFile.file);
      vscode.window.showInformationMessage(`Opened file: ${selectedFile.label}`);
    }),

    vscode.commands.registerCommand("ProtoPI.closeAPIFile", () => {
      // TODO: a specific way you handle the closing of files, perhaps through a webview
      // This might be a simple notification or some clean-up task
      vscode.window.showInformationMessage("API file closed");
    })
  );
}