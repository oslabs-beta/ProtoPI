/**
 * path:  webviews/stores/fileMgmt/fopStore/utils/rawFileService.ts
 */

import { rawFilesData } from '../rawFilesStore'; 
import { type FileInfo } from '../types';

// Specify the type argument for FileInfo
export function addFileToStore(fileUUID: string, fileInfo: FileInfo<string>) {
  rawFilesData.update(state => {
    const newData = new Map(state.data).set(fileUUID, fileInfo);
    console.log(`📚 [StoreUtils] File Added: ${fileInfo.fileName}`);
    return { ...state, data: newData };
  });
}