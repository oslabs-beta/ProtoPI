import * as vscode from "vscode";

export function registerSettingsCommands(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("ProtoPI.openSettings", () => {
      vscode.commands.executeCommand("workbench.action.openSettings", "protopi");
    })
  );
}