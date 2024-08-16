import * as vscode from 'vscode';

export class StatusBarManager {
    private statusBarItem: vscode.StatusBarItem;
    private statusConfig: {[key: string]: {text: string, command?: string, tooltip: string}};

    constructor() {
      this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
      this.statusConfig = {
        'stopped': {
          text: `$(gear~spin) Start Mock Server`,
          command: "ProtoPI.runPrismMock",
          tooltip: "Click to start Mock Server"
        },
        'running': {
          text: `$(stop) Stop Mock Server`,
          command: "ProtoPI.stopPrismMock",
          tooltip: "Click to stop Mock Server"
        },
        'attemptingShutdown': {
            text: `$(sync~spin) Attempting Graceful Shutdown`,
            tooltip: "Attempting graceful shutdown"
        },
        'performingSIGKILL': {
            text: `$(sync~spin) Performing a SIGKILL`,
            tooltip: "Performing a SIGKILL"
        }
      };
      this.updateStatusBarItem('stopped');
    }

    private updateStatusBarItem(state: 'stopped' | 'running' | 'attemptingShutdown' | 'performingSIGKILL'): void {
      const config = this.statusConfig[state];
      this.statusBarItem.text = config.text;
      if (config.command) {
        this.statusBarItem.command = config.command;
      } else {
        this.statusBarItem.command = undefined;
      }
      this.statusBarItem.tooltip = config.tooltip;
      this.statusBarItem.show();
      console.log(`Status bar updated to: ${state}`);
    }

    public updateForRunningServer(): void {
      this.updateStatusBarItem('running');
    }

    public updateForStoppedServer(): void {
      this.updateStatusBarItem('stopped');
    }

    public updateForAttemptingShutdown(): void {
      this.updateStatusBarItem('attemptingShutdown');
    }

    public updateForPerformingSIGKILL(): void {
      this.updateStatusBarItem('performingSIGKILL');
    }

    public dispose(): void {
      this.statusBarItem.dispose();
    }
}