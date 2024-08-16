import * as vscode from 'vscode';
import { registerMockServerCommands } from './mockServerCommands';
import { registerWebviewCommands } from './webviewCommands';
import { registerSpecFileCommands } from './specFileCommands';
import { registerSettingsCommands } from './settingsCommands';
import { Sidebar } from '../../../views/Sidebar';
import { StatusBarManager } from '../managers/StatusBarManager';

export function registerAllCommands(context: vscode.ExtensionContext, sidebar: Sidebar, statusBarManager: StatusBarManager) {
    registerMockServerCommands(context, statusBarManager);
    registerSpecFileCommands(context);
    registerWebviewCommands(context, sidebar);
    registerSettingsCommands(context);
}
