// filteredTreeFilesData.ts

/**
 *   LOCAL IMPORT STATEMENTS
 */

import { derived, get } from 'svelte/store';
import { treeFilesData as tsaveStore } from './../tsaveStore';

import { filterCriteriaMap, filterStatusMap } from './filterMaps';
import { filterNodes } from './filterFunctions';

let initializationCompleted = false;  

/**
 *   DERIVED STORE TWO - FILTERED DATA
 */

export const filteredTreeFilesData = derived(
  [tsaveStore, filterCriteriaMap, filterStatusMap],
  ([$treeFilesData, $filterCriteriaMap, $filterStatusMap], set) => {
    if (initializationCompleted && process.env.NODE_ENV === 'development') {
      console.log("[FilteredTreeFilesData.ts] filteredTreeFilesData derivation triggered");
      console.log("[FilteredTreeFilesData.ts] filteredTreeFilesData data:", $treeFilesData, $filterCriteriaMap, $filterStatusMap);
      const { filteredData } = filterNodes($treeFilesData, $filterCriteriaMap, $filterStatusMap);
      set(filteredData);
    }
  }
);

export function setFilteredTreeFilesDataInitializationCompleted(value: boolean) {
  initializationCompleted = value;
}