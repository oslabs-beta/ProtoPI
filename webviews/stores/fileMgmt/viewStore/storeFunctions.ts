/**
 *   path:  webviews/stores/fileMgmt/viewStore/storeFunctions.ts
 */

import { get } from 'svelte/store';
import { coreStateStore } from '../fopStore/coreStateStore'; // Import the coreStateStore

import { filterCriteriaMap, filterStatusMap, initFilterStatusMap } from './filterMaps';
import { type FilterType } from './types';
import { filterManager } from './filters';
import { setActiveFilterMapInitializationCompleted } from './activeFilterMap';
import { setFilteredTreeFilesDataInitializationCompleted } from './filteredTreeFilesData';

/**
 * INITIALIZATION
 */

export function initDerivedStore() {
  if (process.env.NODE_ENV === 'development') {
    console.log("[storeFunctions.ts] Initializing Derived Store");
  }
  const coreData = get(coreStateStore);
  initFilterStatusMap(coreData, filterManager.availableFilters as FilterType[]);
  setActiveFilterMapInitializationCompleted(true);
  setFilteredTreeFilesDataInitializationCompleted(true);
  if (process.env.NODE_ENV === 'development') {
    console.log("[storeFunctions.ts] Derived Store Initialization Completed");
  }
  // Trigger updates for derived stores
  filterCriteriaMap.update(value => value);
  filterStatusMap.update(value => value);
}

export function setFilterCriteria(fileUUID: string, criteria: string) {
  filterCriteriaMap.update(criteriaMap => {
    criteriaMap.set(fileUUID, criteria);
    return criteriaMap;
  });
}

export function toggleFilter(fileUUID: string, filterType: FilterType) {
  filterStatusMap.update(statusMap => {
    const fileStatusMap = statusMap.get(fileUUID);
    if (fileStatusMap) {
      const currentStatus = fileStatusMap.get(filterType);
      if (currentStatus) {
        fileStatusMap.set(filterType, { enabled: !currentStatus.enabled });
        if (process.env.NODE_ENV === 'development') {
          console.log(`[storeFunctions.ts] Toggled filter: ${filterType} for fileUUID: ${fileUUID} to ${!currentStatus.enabled}`);
        }
      }
    }
    return statusMap;
  });
}