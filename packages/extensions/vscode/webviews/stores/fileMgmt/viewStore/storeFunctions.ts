// storeFunctions.ts

/**
 *   LOCAL IMPORT STATEMENTS
 */

import { get } from 'svelte/store';
import { treeFilesData as tsaveStore } from './../tsaveStore';

import { filterCriteriaMap, filterStatusMap, initFilterStatusMap } from './filterMaps';
import { type FilterType } from './filters/types';
import { filterManager } from './filters';
import { setActiveFilterMapInitializationCompleted } from './activeFilterMap';
import { setFilteredTreeFilesDataInitializationCompleted } from './filteredTreeFilesData';

import { initializeDebugging } from './_consoleLog';
/**
 * INITIALIZATION
 */

export function initDerivedStore() {
  if (process.env.NODE_ENV === 'development') {
    console.log("[storeFunctions.ts] Initializing Derived Store");
  }
  initFilterStatusMap(get(tsaveStore), filterManager.availableFilters as FilterType[]);
  setActiveFilterMapInitializationCompleted(true);
  setFilteredTreeFilesDataInitializationCompleted(true);
  if (process.env.NODE_ENV === 'development') {
    console.log("[storeFunctions.ts] Derived Store Initialization Completed");
  }
  // Trigger updates for derived stores
  filterCriteriaMap.update(value => value);
  filterStatusMap.update(value => value);

  // Initialize debugging
  initializeDebugging();
}

export function setFilterCriteria(fileHash: string, criteria: string) {
  filterCriteriaMap.update(criteriaMap => {
    criteriaMap.set(fileHash, criteria);
    return criteriaMap;
  });
}

export function toggleFilter(fileHash: string, filterType: FilterType) {
  filterStatusMap.update(statusMap => {
    const fileStatusMap = statusMap.get(fileHash);
    if (fileStatusMap) {
      const currentStatus = fileStatusMap.get(filterType);
      if (currentStatus) {
        fileStatusMap.set(filterType, { enabled: !currentStatus.enabled });
        if (process.env.NODE_ENV === 'development') {
          console.log(`[storeFunctions.ts] Toggled filter: ${filterType} for fileHash: ${fileHash} to ${!currentStatus.enabled}`);
        }
      }
    }
    return statusMap;
  });
}