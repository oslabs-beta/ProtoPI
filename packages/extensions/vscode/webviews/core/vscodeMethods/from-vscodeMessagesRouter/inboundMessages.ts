import type { Writable } from 'svelte/store';
import { addFile, type FileData } from '../../../stores/fileMgmt/openStore';

export function handleFileContentMessage(
  message: any,
  parsedData: Writable<any>,
  selectedData: Writable<any>
) {
  const content = message.content;
  const fileName = message.fileName || 'unknown.yaml'; // Assuming fileName is passed in the message
  console.groupCollapsed("File content set in fileContent store via message:");
  console.log(content);
  console.groupEnd();

  // Update the writable stores with the raw content
  parsedData.set(content);  // Store raw content
  selectedData.set(content);  // Store raw content
  console.log("File content set in parsedData and selectedData.");

  // Create a FileData object and add it to the openFilesData store
  const fileData: FileData = {
    name: fileName,
    content: content
  };
  addFile(fileData);
}

export function handleCloseFileMessage(fileInput: HTMLInputElement) {
  // Implement the logic to handle closing a file
  console.log("Handling close file message.");
  // Your logic here
}
