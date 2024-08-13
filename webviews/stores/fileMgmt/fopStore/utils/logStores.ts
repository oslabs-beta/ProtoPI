/**
 * path:  webviews/stores/fileMgmt/fopStore/utils/logStores.ts
 */

import { get } from 'svelte/store';

import { rawFilesData } from '../rawFilesStore';
import { parsedTreeNodeData } from '../parsedTreeNodeStore';
import { coreStateStore } from '../coreStateStore';

import { filterCriteriaMap, filterStatusMap } from '../../viewStore/filterMaps';
import { filteredTreeFilesData } from '../../viewStore/filteredTreeFilesData';
import { ActiveFilterMap } from '../../viewStore/activeFilterMap';

import { viewsStore } from '../../fopViews/viewsStore';
import { activeViewStore } from '../../fopViews/activeViewStore';

// Function to log the entire map of raw files
function logRawFilesMap() {
  const state = get(rawFilesData);
  console.groupCollapsed('🗺️ [rawFilesStore] Entire Raw Files Map:');
  console.log(state);
  console.groupEnd();
}

// Function to log the entire map of parsed files
function logParsedFilesMap() {
  const state = get(parsedTreeNodeData);
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

// Function to log the filter criteria map
function logFilterCriteriaMap() {
  const state = get(filterCriteriaMap);
  console.groupCollapsed('🔍 [FilterCriteriaMap] Current Filter Criteria Map:');
  console.log(state);
  console.groupEnd();
}

// Function to log the filter status map
function logFilterStatusMap() {
  const state = get(filterStatusMap);
  console.groupCollapsed('⚙️ [FilterStatusMap] Current Filter Status Map:');
  console.log(state);
  console.groupEnd();
}

// Function to log the filtered tree files data
function logFilteredTreeFilesData() {
  const state = get(filteredTreeFilesData);
  console.groupCollapsed('🌳 [FilteredTreeFilesData] Filtered Tree Files Data:');
  console.log(state);
  console.groupEnd();
}

// Function to log the active filter map
function logActiveFilterMap() {
  const state = get(ActiveFilterMap);
  console.groupCollapsed('🚦 [ActiveFilterMap] Active Filter Map:');
  console.log(state);
  console.groupEnd();
}

// Function to log the entire views store
function logViewsStore() {
  const state = get(viewsStore);
  console.groupCollapsed('🖼️ [ViewsStore] All Views:');
  console.log(Array.from(state.entries()));
  console.groupEnd();
}

// Function to log the current active view
function logActiveViewStore() {
  const state = get(activeViewStore);
  console.groupCollapsed('🔍 [ActiveViewStore] Current Active View:');
  console.log(state);
  console.groupEnd();
}

// Export all logging functions together for easier import in other parts of the application
export function logAllData() {
  logRawFilesMap();
  logParsedFilesMap();
  logCoreStateDataMap();
  logFilterCriteriaMap();
  logFilterStatusMap();
  logFilteredTreeFilesData();
  logActiveFilterMap();
  logViewsStore();
  logActiveViewStore();
}