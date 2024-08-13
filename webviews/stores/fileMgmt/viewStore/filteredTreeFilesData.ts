/**
 *   path:  webviews/stores/fileMgmt/viewStore/filteredTreeFilesData.ts
 */

import { derived } from 'svelte/store';
import { coreStateStore } from '../fopStore/coreStateStore';
import { filterCriteriaMap, filterStatusMap } from './filterMaps';
import { filterNodes } from './filterFunctions';

let initializationCompleted = false;

export const filteredTreeFilesData = derived(
  [coreStateStore, filterCriteriaMap, filterStatusMap],
  ([$coreState, $filterCriteriaMap, $filterStatusMap], set) => {
    if (initializationCompleted) {
      console.log("[FilteredTreeFilesData.ts] filteredTreeFilesData derivation triggered");
      const { filteredData } = filterNodes($coreState, $filterCriteriaMap, $filterStatusMap);
      set(filteredData);
    }
  }
);

export function setFilteredTreeFilesDataInitializationCompleted(value: boolean) {
  initializationCompleted = value;
}
