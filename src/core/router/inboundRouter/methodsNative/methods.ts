import * as vscode from 'vscode';
import { Webview } from 'vscode';

export function handleGetFiles(data: any, webview: Webview) {
  if (!data.value) {
    return;
  }
  vscode.window.showInformationMessage(data.value);
}

export function handleStartMock(data: any, webview: Webview) {
  if (!data.value) {
    return;
  }
  vscode.window.showErrorMessage(data.value);
}

export function handleError(data: any, webview: Webview) {
  if (!data.value) {
    return;
  }
  vscode.window.showErrorMessage(data.value);
}

export function handleUnknownMessageType(data: any, webview: Webview) {
  vscode.window.showErrorMessage('Unknown message type');
}