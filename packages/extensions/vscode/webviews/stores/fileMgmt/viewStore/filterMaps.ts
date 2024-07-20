// filterMaps.ts

/**
 *   LOCAL IMPORT STATEMENTS
 */

import { writable, type Writable, get } from 'svelte/store';

import { type FileFilterStatusMap,  type FilterType } from './filters/types';
import { type TreeFileMap } from '../tnodeStore';

// Writable store for managing filter criteria mappings.
export const filterCriteriaMap: Writable<Map<string, string>> = writable(new Map());

// Writable store for managing the status of filters applied to files.
export const filterStatusMap: Writable<FileFilterStatusMap> = writable(new Map());

// Function to initialize the filter status map with data and filters.
export function initFilterStatusMap(treeFilesData: TreeFileMap, filters: FilterType[]) {
  const statusMap: FileFilterStatusMap = new Map();
  if (process.env.NODE_ENV === 'development') {
    console.log("[filterMaps.ts] Initializing Filter Status Map with:", treeFilesData, filters);
  }

  Object.keys(treeFilesData).forEach(fileHash => {
    const fileFilterMap = new Map<FilterType, { enabled: boolean }>();
    filters.forEach(filter => {
      fileFilterMap.set(filter, { enabled: false });
    });
    statusMap.set(fileHash, fileFilterMap);
  });

  filterStatusMap.set(statusMap);
  if (process.env.NODE_ENV === 'development') {
    console.log('[filterMaps.ts] filterStatusMap initialized:', get(filterStatusMap));
  }
}