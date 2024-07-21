import type { Writable } from 'svelte/store';
import { 
  handleFileContentMessage, 
  handleCloseFileMessage 
} from './inboundMessages';

export function vscodeEventRouter(
  message: any,
  parsedData: Writable<any>,
  selectedData: Writable<any>,
  fileInput: HTMLInputElement
) {
  console.log("Message received in Sidebar:", message);

  const commandHandlers: { [key: string]: Function } = {
    fileContent: () => handleFileContentMessage(message, parsedData, selectedData),
    closeFile: () => handleCloseFileMessage(fileInput),
  };

  const handler = commandHandlers[message.command];
  if (handler) {
    handler();
  } else {
    console.warn("Unhandled message command:", message.command);
  }
}