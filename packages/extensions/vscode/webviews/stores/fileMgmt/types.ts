// fileMgmtTypes.ts

// Data Types for openStore.ts

export interface FileData {
  name: string;
  content: string;
  hash?: string;
}

export interface FileDataMap {
  [hash: string]: FileData;
}


// Data Types for parseStore.ts


