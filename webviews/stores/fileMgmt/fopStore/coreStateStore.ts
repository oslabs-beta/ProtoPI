/**
 * path: webviews/stores/fileMgmt/fopStore/coreStateStore.ts
 */

import { writable } from 'svelte/store';
import { parsedTreeNodeData } from './parsedTreeNodeStore';
import type { coreTreeData, StoreState, ParsedFileInfo, ParsedContent } from './types';

// Initialize coreStateStore as a writable store with the type Map<string, coreTreeData>
const coreStateStore = writable(new Map<string, coreTreeData>());

// Function to update coreStateStore based on parsedTreeNodeData changes
function updateCoreState($parsedTreeNodeData: StoreState<Map<string, ParsedFileInfo<ParsedContent>>>) {
  if ($parsedTreeNodeData.loading || $parsedTreeNodeData.error) {
    return;
  }

  const newCoreData = new Map<string, coreTreeData>();

  $parsedTreeNodeData.data.forEach((fileInfo, uuid) => {
    if (fileInfo) {
      const coreTreeData: coreTreeData = {
        fileHash: fileInfo.fileHash,
        fileName: fileInfo.fileName,
        fileUUID: fileInfo.fileUUID,
        nodeUuidToNodeMap: fileInfo.nodeUuidToNodeMap,
        pathUuidToNodeMap: fileInfo.pathUuidToNodeMap,
        TreeNodes: fileInfo.treeNodeMap,
      };

      newCoreData.set(uuid, coreTreeData);
    }
  });

  coreStateStore.set(newCoreData);
}

// Subscribe to changes in parsedTreeNodeData and update coreStateStore accordingly
parsedTreeNodeData.subscribe($parsedTreeNodeData => {
  updateCoreState($parsedTreeNodeData);
});

export { coreStateStore };