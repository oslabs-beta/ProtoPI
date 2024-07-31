import * as vscode from 'vscode';

export class StatusBarManager {
    private statusBarItem: vscode.StatusBarItem;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.updateStatusBarItem(`$(gear~spin) Start Mock Server`, "ProtoPI.runPrismMock", "Click to start Mock Server");
    }

    private updateStatusBarItem(text: string, command: string, tooltip: string): void {
        this.statusBarItem.text = text;
        this.statusBarItem.command = command;
        this.statusBarItem.tooltip = tooltip;
        this.statusBarItem.show();
    }

    public updateForRunningServer(): void {
        this.updateStatusBarItem(`$(stop) Stop Mock Server`, "ProtoPI.stopPrismMock", "Click to stop Mock Server");
    }

    public updateForStoppedServer(): void {
        this.updateStatusBarItem(`$(gear~spin) Start Mock Server`, "ProtoPI.runPrismMock", "Click to start Mock Server");
    }

    public dispose(): void {
        this.statusBarItem.dispose();
    }
}
