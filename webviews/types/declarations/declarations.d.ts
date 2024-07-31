import * as _vscode from "vscode";

declare global {
  const tsvscode: {
    postMessage: (message: { type: string; value: any }) => void;
  };
}

declare module '*.svg' {
  const content: string;
  export default content;
}