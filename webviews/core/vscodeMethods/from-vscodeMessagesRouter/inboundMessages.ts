import type { Writable } from 'svelte/store';
// TODO CONNECTION
// import { addFile, type FileData } from '../../../stores/fileMgmt/openStore';

// Function to handle a single file content message
export function handleFileContentMessage(
  message: any,
  parsedData: Writable<any>,
  selectedData: Writable<any>
) {
  processFileContent(message, parsedData, selectedData);
}

// New function to handle multiple file content messages
export function handleFilesContentMessages(
  messages: any[], // Array of file content messages
  parsedData: Writable<any[]>,
  selectedData: Writable<any[]>
) {
  console.groupCollapsed("Processing multiple file content messages:");
  
  const parsedContents: any[] = [];
  const selectedContents: any[] = [];

  // Process each message and collect data for stores
  messages.forEach(message => {
    const content = message.content;
    const fileName = message.fileName || 'unknown.yaml';

    console.log(`Processing file: ${fileName}`);
    console.log(content);

    const fileData: FileData = {
      name: fileName,
      content: content
    };
    addFile(fileData);

    parsedContents.push(content);
    selectedContents.push(content);
  });

  console.groupEnd();

  // Update stores with all contents at once
  parsedData.set(parsedContents);
  selectedData.set(selectedContents);

  console.log("All file contents set in parsedData and selectedData.");
}

// Helper function to process content of a single file
function processFileContent(
  message: any,
  parsedData: Writable<any>,
  selectedData: Writable<any>
) {
  const content = message.content;
  const fileName = message.fileName || 'unknown.yaml'; // Assuming fileName is passed in the message
  console.groupCollapsed("File content set in store via message:");
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

// Function to handle closing a file message
export function handleCloseFileMessage(fileInput: HTMLInputElement) {
  // Implement the logic to handle closing a file
  console.log("Handling close file message.");
}
