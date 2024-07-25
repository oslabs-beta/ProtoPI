// vscode-env.d.ts
// Declare 'acquireVSCodeAPI' function as: 
//  It is part of the Visual Studio Code extension API used specifically within webview environments to acquire the API interface for interacting with the rest of VS Code. 
//  It's not recognized by default in the TypeScript environment because it's provided by the VS Code runtime when a webview is created.

interface VsCodeApi {
  postMessage(message: any): void;
  setState(state: any): void;
  getState(): any;
}

declare function acquireVsCodeApi(): VsCodeApi;
