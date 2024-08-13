/**
 * path:  webviews/stores/fileMgmt/fopStore/utils/logStores.ts
 */

import { get } from 'svelte/store';

import { rawFilesData } from '../rawFilesStore'; 
import { parsedTreeNodeData } from '../parsedTreeNodeStore';  
import { coreStateStore } from '../coreStateStore';

import { treeFilesData } from '../../tnodeStore';
import { treeFilesData as tsaveData } from '../../tsaveStore';

import type { StoreState, FileInfo, ParsedFileInfo, TreeNode, coreTreeData } from '../types';

// Function to log the entire map of raw files
function logRawFilesMap() {
  const state = get(rawFilesData);
  console.groupCollapsed('🗺️ [rawFilesStore] Entire Raw Files Map:');
  console.log(state);
  console.groupEnd();
}

// Function to log the entire map of parsed files
function logParsedFilesMap() {
  const state = get(parsedTreeNodeData) as StoreState<ParsedFileInfo<object>>;
  console.groupCollapsed('📚 [parsedFilesStore] Entire Parsed Files Map:');
  console.log(state);
  console.groupEnd();
}

// Function to log the entire map of core state data
function logCoreStateDataMap() {
  const state = get(coreStateStore);
  console.groupCollapsed('🗺️ [CoreStateStore] Entire Core State Store Map:');
  console.log(Array.from(state.entries()));
  console.groupEnd();
}

function logTnodeData() {
  const data = get(treeFilesData); // Retrieves the current value of the store
  console.groupCollapsed('🌳 [TreeFilesData] Tree Files Data:');
  console.log(data);
  console.groupEnd();
}

function logTsaveData() {
  const data = get(tsaveData);
  console.groupCollapsed('📚 [TsaveStore] Entire Tsave Data:');
  console.log(data);
  console.groupEnd();
}


// Export all logging functions together for easier import in other parts of the application
export function logAllData() {
  logRawFilesMap();
  logParsedFilesMap();
  logCoreStateDataMap();
  logTnodeData();
  logTsaveData();
}
