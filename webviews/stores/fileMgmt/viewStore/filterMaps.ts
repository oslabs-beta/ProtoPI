/**
 *   path:  webviews/stores/fileMgmt/viewStore/filterMaps.ts
 */

import { writable, type Writable, get } from 'svelte/store';
import { type FileFilterStatusMap, type FilterType, type coreTreeData } from '../fopStore/types';

export const filterCriteriaMap: Writable<Map<string, string>> = writable(new Map());
export const filterStatusMap: Writable<FileFilterStatusMap> = writable(new Map());

export function initFilterStatusMap(coreData: Map<string, coreTreeData>, filters: FilterType[]) {
  const statusMap: FileFilterStatusMap = new Map();

  coreData.forEach((data, uuid) => {
    const fileFilterMap = new Map<FilterType, { enabled: boolean }>();
    filters.forEach(filter => {
      fileFilterMap.set(filter, { enabled: false });
    });
    statusMap.set(data.fileUUID, fileFilterMap);
  });

  filterStatusMap.set(statusMap);
}
