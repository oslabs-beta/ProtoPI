import * as vscode from 'vscode';
import { Webview } from 'vscode';
import { 
  handleGetFiles, 
  handleStartMock, 
  handleError, 
  handleUnknownMessageType 
} from './methodsNative'; // Import the methods

// HANDLERS FOR NATIVE MESSAGES
export const nativeMessageHandler = {
  getFiles: handleGetFiles,
  startMock: handleStartMock,
  onError: handleError,
  default: handleUnknownMessageType,
};
