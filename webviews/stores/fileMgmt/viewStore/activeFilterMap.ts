/**
 *   path:  webviews/stores/fileMgmt/viewStore/activeFilterMap.ts
 */

import { derived } from 'svelte/store';
import { coreStateStore } from '../fopStore/coreStateStore';
import { filterCriteriaMap, filterStatusMap } from './filterMaps';
import { filterNodes } from './filterFunctions';

let initializationCompleted = false;

export const ActiveFilterMap = derived(
  [coreStateStore, filterCriteriaMap, filterStatusMap],
  ([$coreState, $filterCriteriaMap, $filterStatusMap], set) => {
    if (initializationCompleted) {
      console.log("[ActiveFilterMap.ts] ActiveFilterMap derivation triggered");
      const { filterMap } = filterNodes($coreState, $filterCriteriaMap, $filterStatusMap);
      set(filterMap);
    }
  }
);

export function setActiveFilterMapInitializationCompleted(value: boolean) {
  initializationCompleted = value;
}