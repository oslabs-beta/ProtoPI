/**
 * path:  webviews/stores/fileMgmt/fopStore/utils/fileService.ts
*/

import { addFileToStore } from './rawFileService';  
import { generateHash, generateUUID } from './fileUtils';  
import type { FileInfo, TreeNode } from '../types';

export function addFile(file: { filename: string; rawContent: string }) {

  const fileHash = generateHash(file.rawContent);
  const fileUUID = generateUUID();

  const fileInfo: FileInfo<string> = {  
    fileHash,
    fileUUID,
    fileName: file.filename,
    content: file.rawContent,
    wasPassedToCoreState: false,
    nodeUuidToNodeMap: new Map<string, TreeNode>(),  // Default empty map
    pathUuidToNodeMap: new Map<string, TreeNode>(),  // Default empty map
    treeNodeMap: []                                  // Default empty array
  };

  addFileToStore(fileUUID, fileInfo);
}

