import { writable } from 'svelte/store';
import YAML from 'yaml';
import { openFilesData, type FileData } from './openStore';  // Import FileData as type

export interface ParsedFileData {
  name: string;
  content: any;
}

export const parsedFilesData = writable<ParsedFileData[]>([]);

openFilesData.subscribe((files: FileData[]) => {
  if (Array.isArray(files)) {
    const parsedData: ParsedFileData[] = files.map((file: FileData) => {
      const parsedContent: any = YAML.parse(file.content);
      console.groupCollapsed(`Parsed Content for ${file.name}`);
      console.log(parsedContent);
      console.groupEnd();
      return { name: file.name, content: parsedContent };
    });
    parsedFilesData.set(parsedData);
  } else {
    console.error('openFilesData is not an array:', files);
  }
});

parsedFilesData.subscribe((value: ParsedFileData[]) => {
  console.groupCollapsed('Current parsedFilesData:');
  value.forEach((file: ParsedFileData) => {
    console.groupCollapsed(`File Name: ${file.name}`);
    console.log('File Content:', file.content);

    console.groupCollapsed('File Content (stringified):');
    console.log(JSON.stringify(file.content, null, 2)); // Pretty print the JSON data
    console.groupEnd();

    console.groupEnd();
  });
  console.groupEnd();
});
