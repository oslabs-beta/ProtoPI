import { Webview } from 'vscode';
import { nativeMessageHandler } from './routerNative';
import { axiosMessageHandler } from './routerAxios';

// Define the types for the handlers
type MessageHandler = (data: any, webview: Webview) => void | Promise<void>;

interface MessageHandlers {
  [key: string]: MessageHandler;
}

// COMBINE HANDLERS
const messageHandlers: MessageHandlers = {
  ...nativeMessageHandler,
  ...axiosMessageHandler,
};

// ROUTER
export function handleMessage(data: any, webview: Webview) {
  const handler = messageHandlers[data.type] || messageHandlers.default;
  handler(data, webview);
}