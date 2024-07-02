import { writable } from 'svelte/store';

export interface FileData {  // Exporting the interface
  name: string;
  content: string;
}

export const openFilesData = writable<FileData[]>([]);

openFilesData.subscribe((value: FileData[]) => {
  if (Array.isArray(value)) {
    console.groupCollapsed('Current openFilesData:');
    value.forEach((file: FileData) => {
      console.groupCollapsed(`File Name: ${file.name}`);
      console.log('File Content:', file.content);
      console.groupEnd();
    });
    console.groupEnd();
  } else {
    console.error('openFilesData is not an array:', value);
  }
});