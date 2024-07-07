// validity check with attach here
import { writable } from 'svelte/store';
import { parse as parseYAML } from 'yaml';
import { openFilesData } from './openStore';

import { type FileData, type FileDataMap  } from './openStore';  // Import FileData and FileDataMap as types
// import { 
//   ParsedFileData, 
//   ParsedFileMap, 
//   type FileData, 
//   type FileDataMap 
// } from './fileMgmtTypes';

export interface ParsedFileData {
  name: string;
  content: any;
  hash: string;
}

export interface ParsedFileMap {
  [hash: string]: ParsedFileData;
}

export const parsedFilesData = writable<ParsedFileMap>({});

openFilesData.subscribe((files: FileDataMap) => {
  console.groupCollapsed('📚2️⃣📚 [parseStore]  data in (from openStore)');  // Start of the main group
  if (files && typeof files === 'object') {
    const parsedData: ParsedFileMap = {};
    Object.entries(files).forEach(([hash, file]: [string, FileData]) => {
      console.groupCollapsed(`File Name: ${file.name}`);  // Display the hash in the group title
      try {
        const parsedContent: any = parseYAML(file.content);
        console.log('Hash:', hash);  // Log the hash
        console.log('Content:', parsedContent);
        parsedData[hash] = { name: file.name, content: parsedContent, hash: hash };
      } catch (error) {
        console.error('Error parsing file:', error);
      }
      console.groupEnd();
    });
    parsedFilesData.set(parsedData);
    console.log('Updated parsedFilesData');
  } else {
    console.error('openFilesData is not an object:', files);
  }
  console.groupEnd();  // End of the main group
});

parsedFilesData.subscribe((value: ParsedFileMap) => {
  console.groupCollapsed('📚3️⃣📚 [parseStore.ts]  data out (to treeStore)');

  // Create a collapsible group for keys
  console.groupCollapsed('Keys of Parsed File Map');
  Object.keys(value).forEach(key => console.log(key));
  console.groupEnd();

  Object.entries(value).forEach(([hash, file]: [string, ParsedFileData]) => {
    console.groupCollapsed(`File Name: ${file.name}`);
    console.log('Hash:', hash); // Log the hash
    console.log('Content:', file.content);

    console.groupCollapsed('File Content (stringified):');
    console.log(JSON.stringify(file.content, null, 2)); // Pretty print the JSON data
    console.groupEnd();

    console.groupEnd();
  });
  console.groupEnd();
});
