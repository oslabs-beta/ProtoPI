// fileMgmtTypes.ts


/**
 *  Data Types for openStore.ts
 */

export interface FileData {
  name: string;
  content: string;
  hash?: string;
  // isProcessed?: boolean; // INDICATES IF DATA HAS BEEN PROCESSED
}

export interface FileDataMap {
  [hash: string]: FileData;
}


/**
 *  Data Types for parseStore.ts
 */ 

// export interface ParsedFileData {
//   name: string;
//   content: any;
//   hash: string;
//   // isProcessed?: boolean; // INDICATES IF DATA HAS BEEN PROCESSED
// }

// export interface ParsedFileMap {
//   [hash: string]: ParsedFileData;
// }
