/**
 * path: webviews/stores/fileMgmt/fopStore/utils/coreService.ts
 */

import { rawFilesData } from '../rawFilesStore';
// Remove treeNodesData import since it's a derived store
import { type FileInfo } from '../types';

// Function to mark a file as passed to the core state and clear its content
// export function markFileAsPassedToCoreState(fileUUID: string) {
//   rawFilesData.update((state) => {
//     const fileInfo = state.data.get(fileUUID); // Access the data property, which is the Map
//     if (fileInfo) {
//       state.data.set(fileUUID, {
//         ...fileInfo,
//         wasPassedToCoreState: true,
//         content: 'cleared', // Clear content and set a flag
//       });
//     }
//     return {
//       ...state,
//       data: new Map(state.data) // Ensure a new instance to maintain reactivity
//     };
//   });
// }

export function resetContentInStores() {
  rawFilesData.update((state) => {
    const updatedFiles = new Map<string, FileInfo<string>>();
    state.data.forEach((file, uuid) => {
      // Skip files that have already been marked as passed to core state
      if (file.wasPassedToCoreState) return;
      updatedFiles.set(uuid, {
        ...file,
        content: '', // Clear content
        wasPassedToCoreState: true, // Set the flag
      });
    });
    return {
      ...state,
      data: updatedFiles, // Return updated Map
    };
  });
}