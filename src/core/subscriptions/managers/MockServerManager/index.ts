import * as vscode from 'vscode';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import { terminate } from './../../utils/terminate';
import { StatusBarManager } from './../StatusBarManager';
import { getPrismPath, getServerPort  } from './../../utils/prismConfig';  
import { getTimestamp } from './../../utils/timeUtils';

interface ServerInfo {
    process: ChildProcess;
    file: string;  	// Full path of the file
    filename: string;   // Filename
    status: string;
}
export class MockServerManager {
  private servers: Map<number, ServerInfo> = new Map();

  constructor(private statusBarManager: StatusBarManager) {}

  public async startServer(port: number, fileUri: vscode.Uri): Promise<void> {
    const file = fileUri.fsPath;
    const filename = path.basename(file);

    if (this.servers.has(port)) {
      vscode.window.showInformationMessage(`Server on port ${port} is already running!`);
      this.updateServerStatus(port, 'Already Running', file, filename);
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
    const prismArgs = ["--no-deprecation", prismPath, "mock", "-d", file, "--port", port.toString()];
    
    const process = spawn("node", prismArgs, { shell: false });
    process.on('error', (err) => {
      console.group(`[${getTimestamp()}] Failed to start server on port ${port}`);
      console.error(`File: ${file}`);
      console.error(`Error:`, err);
      console.error(`Stack Trace:`, err.stack);
      console.error(`Error Message: ${err.message}`);
      console.groupEnd();
      vscode.window.showErrorMessage(`Failed to start server on port ${port}: ${filename}`);
      this.updateServerStatus(port, `Failed: ${err.message}`, file, filename);
    });

    process.stderr.on('data', (data) => {
      console.group(`[${getTimestamp()}] Error on server port ${port}`);
      console.error(`File: ${file}`);
      console.error(`Error Data:`, data.toString());
      console.groupEnd();
      vscode.window.showErrorMessage(`Error on server port ${port}: ${filename}`);
    });

    this.servers.set(port, { process, file, filename, status: 'Running' });

    // Handle the server process (setting up stdout, stderr, and process event listeners)
    this.handleServerProcess(port, process);

    // Update the status bar to reflect that the server is now running
    console.group(`[${getTimestamp()}] Starting server on port ${port}`);
    console.log(`File: ${file}`);
    console.log(`Filename: ${filename}`);
    console.groupEnd();

    this.statusBarManager.updateForRunningServer();
  }

  public async stopServer(port: number): Promise<void> {
    const serverInfo = this.servers.get(port);

    if (!serverInfo) {
        vscode.window.showInformationMessage(`Server on port ${port} is not running.`);
        return;
    }

    if (serverInfo && serverInfo.process.pid) {
      this.statusBarManager.updateForAttemptingShutdown();
      console.log(`[${getTimestamp()}] Attempting graceful shutdown for server on port ${port}`);
      try {

        // Attempt to gracefully terminate the server process
        await terminate({ processId: serverInfo.process.pid, port}, 10000, 1500);
        this.updateServerStatus(port, 'Stopped', serverInfo.file, serverInfo.filename);

        this.servers.delete(port);  // Remove the server from the map upon successful termination
        console.log(`[${getTimestamp()}] Server on port ${port} stopped successfully.`);
        vscode.window.showInformationMessage(`Server on port ${port} stopped successfully.`);
        this.statusBarManager.updateForStoppedServer();
      } catch (error: unknown) {
        // Handle errors during termination
        this.handleTerminationError(port, error);
      } finally {
        this.logServerStatus(); // Log the current status of all servers after attempting to stop
      }
  } else {
    vscode.window.showErrorMessage(`Server on port ${port} does not have an active process.`);
    this.servers.delete(port); // Remove the server if no process is associated with it
    this.logServerStatus();
  }
}

  public async startServersLinearly(files: vscode.Uri[]): Promise<void> {
    for (const file of files) {
      const port = await getServerPort();
      await this.startServer(port, file);
    }
  this.logServerStatus();
  }

  public async startServersConcurrently(files: vscode.Uri[]): Promise<void> {
    await Promise.all(files.map(async file => {
      const port = await getServerPort();
      await this.startServer(port, file);
    }));
    this.logServerStatus();
  }
  
  public async stopAllServersLinearly(): Promise<void> {
    this.statusBarManager.updateForAttemptingShutdown();
    const runningServers = Array.from(this.servers.keys());
    for (const port of runningServers) {
      await this.stopServer(port);
      console.log(`Server on port ${port} stopped linearly.`);
    }
    this.statusBarManager.updateForStoppedServer();
    this.logServerStatus();
  }

  public async stopAllServersConcurrently(): Promise<void> {
    this.statusBarManager.updateForAttemptingShutdown();
    const runningServers = Array.from(this.servers.keys());
    await Promise.all(runningServers.map(port => this.stopServer(port)));
    console.log('All servers stopped concurrently.');
    this.statusBarManager.updateForStoppedServer();
    this.logServerStatus();
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
      const serverInfo = this.servers.get(port);
      if (serverInfo) {
        this.updateServerStatus(port, `Closed with code: ${code}`, serverInfo.file, serverInfo.filename);
        this.servers.delete(port);
      }

        console.log(`[${getTimestamp()}] Server on port ${port} closed with code: ${code}`);
        this.statusBarManager.updateForStoppedServer();
    });

    process.on("error", error => {
      const serverInfo = this.servers.get(port);
      if (serverInfo) {
        this.updateServerStatus(port, `Error: ${error.message}`, serverInfo.file, serverInfo.filename);
        this.servers.delete(port);
      }
        console.log(`[${getTimestamp()}] Server on port ${port} encountered an error: ${error.message}`);
        vscode.window.showErrorMessage(`[port ${port}] Prism process error: ${error.message}`);
        this.statusBarManager.updateForStoppedServer();
    });

    this.statusBarManager.updateForRunningServer();
  }

  private handleTerminationError(port: number, error: unknown): void {
    const serverInfo = this.servers.get(port);
    if (error instanceof Error && error.message.includes('forcefully')) {
      this.statusBarManager.updateForPerformingSIGKILL();
      console.log(`[${getTimestamp()}] Performing SIGKILL for server on port ${port}`);
      try {
        if (serverInfo && serverInfo.process.pid) {
          process.kill(serverInfo.process.pid, 'SIGKILL');
          this.updateServerStatus(port, 'Terminated with SIGKILL', serverInfo.file, serverInfo.filename);
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
      this.updateServerStatus(port, `Failed to stop: ${error.message}`, serverInfo.file, serverInfo.filename);
    } else {
      this.handleUnknownError(port, error);
    }
      this.logServerStatus();
  }

  private handleUnknownError(port: number, error: unknown): void {
    console.log(`[${getTimestamp()}] Failed to stop server on port ${port}: An unknown error occurred`);
    vscode.window.showErrorMessage(`Failed to stop server on port ${port}: An unknown error occurred`);
    this.statusBarManager.updateForStoppedServer();
    const serverInfo = this.servers.get(port);
    this.updateServerStatus(port, 'Unknown error', serverInfo.file, serverInfo.filename);
    this.logServerStatus();
  }

  private updateServerStatus(port: number, status: string, file: string, filename: string): void {
    const serverInfo = this.servers.get(port);
    if (serverInfo) {
      serverInfo.status = status;
    } else {
      // Correctly handle missing serverInfo scenarios
      this.servers.set(port, { process: null!, file, filename, status });
    }
  }

  public logServerStatus(): void {
    if (this.servers.size === 0) {
      console.log("No servers are currently running.");
      return;
    }

    const statusArray = Array.from(this.servers.entries()).map(([port, info]) => ({
      file: info.file,
      port,
      status: info.status
    }));
    console.table(statusArray);
  }

  public getRunningServers(): Array<{ port: number }> {
    return Array.from(this.servers.keys()).map(port => ({port}));
  }
}