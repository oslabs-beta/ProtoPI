import * as vscode from 'vscode';
import { spawn, ChildProcess } from 'child_process';
import { terminate } from './../../utils/terminate';
import { StatusBarManager } from './../StatusBarManager';
import { getPrismPath } from './../../utils/prismConfig';  
import { getTimestamp } from './../../utils/timeUtils';

export class MockServerManager {
    private servers: Map<number, ChildProcess> = new Map();

    constructor(private statusBarManager: StatusBarManager) {}

    public startServer(port: number, file: vscode.Uri): void {

      if (this.servers.has(port)) {
        vscode.window.showInformationMessage(`Server on port ${port} is already running!`);
        return;
      }

      const prismPath = getPrismPath();

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

      // Including the --no-deprecation flag to suppress deprecation warnings
      const prismArgs = ["--no-deprecation", prismPath, "mock", "-d", file.fsPath, "--port", port.toString()];
      
      // Ensuring that the shell option is false for more direct control over process spawning
      const mockProcess = spawn("node", prismArgs, { shell: false });
      this.servers.set(port, mockProcess);

      // Handle the server process (setting up stdout, stderr, and process event listeners)
      this.handleServerProcess(port, mockProcess);
  
      // Update the status bar to reflect that the server is now running
      console.log(`[${getTimestamp()}] Starting server on port ${port}`);
      this.statusBarManager.updateForRunningServer();
    }

    public async stopServer(port: number): Promise<void> {
      if (!this.servers.has(port)) {
          vscode.window.showInformationMessage(`Server on port ${port} is not running.`);
          return;
      }

      const server = this.servers.get(port);

      if (server && server.pid) {
        this.statusBarManager.updateForAttemptingShutdown();
        console.log(`[${getTimestamp()}] Attempting graceful shutdown for server on port ${port}`);
        try {
          await terminate({ processId: server.pid, port}, 10000, 1500);
            this.servers.delete(port);

            console.log(`[${getTimestamp()}] Server on port ${port} stopped successfully.`);
            vscode.window.showInformationMessage(`Server on port ${port} stopped successfully.`);
            this.statusBarManager.updateForStoppedServer();
          } catch (error: unknown) {
            this.handleTerminationError(port, error);
        }
      }
    }

    private handleServerProcess(port: number, process: ChildProcess): void {
      if ( process.stdout ){
        process.stdout.on("data", data => {
          console.log(`[${getTimestamp()}] [port ${port}] stdout: ${data}`);
          if (data.includes("Prism is listening")) {
            this.statusBarManager.updateForRunningServer();
          }
        });
      }

      if ( process.stderr ){
        process.stderr.on("data", data => {
          console.log(`[${getTimestamp()}] [port ${port}] stderr: ${data}`);
          vscode.window.showErrorMessage(`[port ${port}] stderr: ${data}`);
          this.statusBarManager.updateForStoppedServer();
        });
      }

      process.on("close", code => {
          this.servers.delete(port);

          console.log(`[${getTimestamp()}] Server on port ${port} closed with code: ${code}`);
          this.statusBarManager.updateForStoppedServer();
      });

      process.on("error", error => {
          this.servers.delete(port);
          console.log(`[${getTimestamp()}] Server on port ${port} encountered an error: ${error.message}`);
          vscode.window.showErrorMessage(`[port ${port}] Prism process error: ${error.message}`);
          this.statusBarManager.updateForStoppedServer();
      });

      this.statusBarManager.updateForRunningServer();
    }

    private handleTerminationError(port: number, error: unknown): void {
      if (error instanceof Error && error.message.includes('forcefully')) {
        this.statusBarManager.updateForPerformingSIGKILL();
        console.log(`[${getTimestamp()}] Performing SIGKILL for server on port ${port}`);
        try {
          const server = this.servers.get(port);
          if (server && server.pid) {
            process.kill(server.pid, 'SIGKILL');
            this.servers.delete(port);

            console.log(`[${getTimestamp()}] Server on port ${port} terminated with SIGKILL.`);
            vscode.window.showInformationMessage(`Server on port ${port} terminated with SIGKILL.`);
            this.statusBarManager.updateForStoppedServer();
          }
        } catch (sigkillError: unknown) {
          this.handleUnknownError(port, sigkillError);
        }
      } else if (error instanceof Error) {
        console.log(`[${getTimestamp()}] Failed to stop server on port ${port}: ${error.message}`);
        vscode.window.showErrorMessage(`Failed to stop server on port ${port}: ${error.message}`);
        this.statusBarManager.updateForStoppedServer();
      } else {
        this.handleUnknownError(port, error);
      }
    }

    private handleUnknownError(port: number, error: unknown): void {
      console.log(`[${getTimestamp()}] Failed to stop server on port ${port}: An unknown error occurred`);
      vscode.window.showErrorMessage(`Failed to stop server on port ${port}: An unknown error occurred`);
      this.statusBarManager.updateForStoppedServer();
    }


    public getRunningServers(): Array<{ port: number }> {
      return Array.from(this.servers.keys()).map(port => ({port}));
    }

}
      

