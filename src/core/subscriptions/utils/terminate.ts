import { exec } from "child_process";
import { getTimestamp } from './timeUtils';

interface TerminateParams {
  processId: number;
  port?: number;
  filename?: string;
}

// Stops currently running mock server
export async function terminate(
  { processId, port = 0, filename = 'default.type'}: TerminateParams, 
  timeout: number = 10000, 
  delay: number = 1500
): Promise<void> {

  console.groupCollapsed(`[${getTimestamp()}] Termination of process: ${processId} on port: ${port}.`);
  
  let processTerminated = false;
  console.log(`File: ${filename}`);
  console.log(`[${getTimestamp()}] Attempting to gracefully terminate process ${processId}`);

  try {
    // Start by sending SIGTERM
    await execPromise(`kill ${processId}`);
    console.log(`[${getTimestamp()}] Sent SIGTERM to process ${processId}`);

    // Wait for the process to exit
    await new Promise<void>((resolve, reject) => {
      const checkAlive = setInterval(async () => {
        try {
          // Check if the process is still alive
          await execPromise(`kill -0 ${processId}`);
          console.log(`[${getTimestamp()}] Process ${processId} is still running`);

        } catch (error: unknown) {
          // Process is not alive anymore, resolve the promise
          clearInterval(checkAlive);
          processTerminated = true;
          console.log(`[${getTimestamp()}] Process ${processId} has terminated`);
          resolve();
        }
      }, 1000);

      // Timeout if process does not exit in specified time
      setTimeout(() => {
        clearInterval(checkAlive);

        if (!processTerminated) {
          console.log(`[${getTimestamp()}] Process ${processId} did not terminate in time`);
          reject(new Error('Process did not exit in time and will be killed forcefully.'));
        }

      }, timeout);
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('not exit in time')) {
      console.log(`[${getTimestamp()}] Waiting for delay before forceful termination: ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));

      // If the process did not terminate, send SIGKILL
      console.log(`[${getTimestamp()}] Forcefully terminating process ${processId}`);
      await execPromise(`kill -9 ${processId}`);
      console.log(`[${getTimestamp()}] Sent SIGKILL to process ${processId}`);
      
    } else if (error instanceof Error) {
      console.log(`[${getTimestamp()}] Failed to kill process ${processId}: ${error.message}`);
      throw new Error(`Failed to kill process: ${error.message}`);
    } else {
      console.log(`[${getTimestamp()}] Failed to kill process ${processId}: An unknown error occurred`);
      throw new Error('Failed to kill process: An unknown error occurred');
    }
  } finally {
    console.groupEnd();
  }
}

function execPromise(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}