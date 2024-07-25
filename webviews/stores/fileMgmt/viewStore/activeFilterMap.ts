// activeFilterMap.ts

/**
 *   LOCAL IMPORT STATEMENTS
 */

import { derived } from 'svelte/store';
import { treeFilesData as tsaveStore } from './../tsaveStore';

import { filterCriteriaMap, filterStatusMap } from './filterMaps';
import { filterNodes } from './filterFunctions';

let initializationCompleted = false;

/**
 *   DERIVED STORE ONE - MAP OF FILTERED DATA
 */

export const ActiveFilterMap = derived(
  [tsaveStore, filterCriteriaMap, filterStatusMap],
  ([$treeFilesData, $filterCriteriaMap, $filterStatusMap], set) => {
    // if (initializationCompleted && process.env.NODE_ENV === 'development') {
      console.log("[ActiveFilterMap.ts] ActiveFilterMap derivation triggered");
      console.log("[ActiveFilterMap.ts] ActiveFilterMap data:", $treeFilesData, $filterCriteriaMap, $filterStatusMap);
      const { filterMap } = filterNodes($treeFilesData, $filterCriteriaMap, $filterStatusMap);
      set(filterMap);
    // }
  }
);

export function setActiveFilterMapInitializationCompleted(value: boolean) {
  initializationCompleted = value;
}