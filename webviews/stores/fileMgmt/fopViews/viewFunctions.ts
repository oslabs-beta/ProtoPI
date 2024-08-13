/**
 *   path: webviews/stores/fileMgmt/fopViews/viewFunctions.ts
 */

// This file contains functions for applying filters, saving views, loading views, and switching between views.

import { get } from 'svelte/store';
import { coreStateStore } from '../fopStore/coreStateStore';
import { viewsStore } from './viewsStore';
import { activeViewStore } from './activeViewStore'; // Correctly import activeViewStore
import type { coreTreeData } from './types';
import { getFilter } from './filters/filterManager';

/**
 * applyFilterAndSaveView:
 * Applies a filter to the core data and saves the filtered data under a specified view ID.
 * The filterFunction could be memoized if it involves expensive operations.
 */
export function applyFilterAndSaveView(viewId: string, filterFunction: (data: Map<string, coreTreeData>) => Map<string, coreTreeData>) {
  const coreData = get(coreStateStore);
  const filteredData = filterFunction(coreData);

  console.log('Applying filter and saving view:', {
    viewId,
    coreData,
    filteredData,
  });

  viewsStore.update(views => {
    views.set(viewId, filteredData);
    console.log('Views store updated:', views);
    return views;
  });
}
/**
 * loadView:
 * Loads a view's filtered data from viewsStore into coreStateStore when a view is selected.
 * This function does not need memoization as it involves direct state manipulation.
 */

export function loadView(viewId: string) {
  const views = get(viewsStore);
  const viewData = views.get(viewId);

  console.log(`Loading view "${viewId}":`, viewData);

  if (viewData) {
    coreStateStore.set(viewData);
    activeViewStore.set(viewId);
    console.log('CoreState and ActiveView stores updated:', {
      coreState: viewData,
      activeView: viewId,
    });
  } else {
    console.warn(`View with ID "${viewId}" not found in viewsStore.`);
  }
}

/**
 * switchView:
 * Switches the current view by loading the corresponding view's data into coreStateStore.
 * Again, no need for memoization here.
 */
export function switchView(viewId: string) {
  console.log(`Switching to view "${viewId}"`);
  loadView(viewId);
}