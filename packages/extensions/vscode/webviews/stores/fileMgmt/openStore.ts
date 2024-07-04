import { writable } from 'svelte/store';
import CryptoJS from 'crypto-js';

export interface FileData {  // Exporting the interface
  name: string;
  content: string;
  hash?: string; 
}

export interface FileDataMap {
  [hash: string]: FileData;
}

export const openFilesData = writable<FileDataMap>({});

openFilesData.subscribe((value: FileDataMap) => {
  if (value && typeof value === 'object') {
    console.groupCollapsed('1️⃣ openStore:: File(s) Opened:');
    Object.values(value).forEach((file: FileData) => {
      console.groupCollapsed(`File Name: ${file.name}`);
      console.log('Hash:', file.hash);
      console.groupCollapsed('Content:'); // Use groupCollapsed for content
      console.log(file.content); // This will be inside the collapsible group
      console.groupEnd(); // Ends the group for File Content
      console.groupEnd(); // Ends the group for File Name
    });
    console.groupEnd(); // Ends the group for Current openFilesData
  } else {
    console.error('openFilesData is not an object:', value);
  }
});

// Function to create a hash of the file content
function createFileHash(content: string): string {
  const hash = CryptoJS.SHA256(content).toString(CryptoJS.enc.Hex);
  return hash;
}

// Function to add a file to the store
export function addFile(file: FileData) {
  // Generate the hash for the file content
  const fileHash = createFileHash(file.content);
  
  openFilesData.update((files) => {
    // Check if a file with the same hash already exists
    if (files[fileHash]) {
      console.warn(`❌ File with hash ${fileHash} already exists.`);
    } else {
      // Add the new file with its hash
      const newFile: FileData = { ...file, hash: fileHash };
      return { ...files, [fileHash]: newFile};
    }
    return files;
  });
}