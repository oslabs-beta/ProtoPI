/**
 *   IMPORT STATEMENTS
 */
import { writable, derived, type Writable, get  } from 'svelte/store';
import { treeFilesData as tsaveStore } from './tsaveStore';
    // Relabelled as tsaveStore to indicate in present file what file data is coming from

import { type TreeNode, type ITreeFileMap } from './tnodeStore';
import { filterManager } from './viewDerivedStore/viewFiltersRouters';
import type { FilterType, FileFilterStatusMap } from './viewDerivedStore/types';


/**
 *   STORE DECLARATIONS
 */
export const filterCriteria = writable<string>('');
export const filterStatusMap: Writable<FileFilterStatusMap> = writable(new Map());
let initializationCompleted = false; 



/**
 *   DERIVED STORES
 */

//  MAP OF FILTERED DATA
export const ActiveFilterMap = derived(
  [tsaveStore, filterCriteria, filterStatusMap],
  ([$treeFilesData, $filterCriteria, $filterStatusMap], set) => {
    if (initializationCompleted){
      if (process.env.NODE_ENV === 'development'){
        console.log("[viewDerivedStore.ts] ActiveFilterMap derivation triggered");
        console.log("[viewDerivedStore.ts] ActiveFilterMap data:", $treeFilesData, $filterCriteria, $filterStatusMap);
      };
      const { filterMap } = filterNodes($treeFilesData, $filterCriteria, $filterStatusMap);
      set(filterMap);
    }
  }
);

//  FILTERED DATA
export const filteredTreeFilesData = derived(
  [tsaveStore, filterCriteria, filterStatusMap],
  ([$treeFilesData, $filterCriteria, $filterStatusMap], set) => {
    if (process.env.NODE_ENV === 'development'){
      console.log("[viewDerivedStore.ts]  filteredTreeFilesData derivation triggered");
      console.log("[viewDerivedStore.ts]  filteredTreeFilesData data:", $treeFilesData, $filterCriteria, $filterStatusMap);
    };
    if (initializationCompleted) {
      const { filteredData } = filterNodes($treeFilesData, $filterCriteria, $filterStatusMap);
      set(filteredData);
    }
  }
);

/**
 * INITIALIZATION
 */

export function initDerivedStore() {
  if (process.env.NODE_ENV === 'development'){
    console.log("[viewDerivedStore.ts] Initializing Derived Store");
  };
  initFilterStatusMap(get(tsaveStore), ['contains', 'paths', 'servers', 'components']);
  initializationCompleted = true;
  if (process.env.NODE_ENV === 'development') {
    console.log("[viewDerivedStore.ts] Derived Store Initialization Completed");
  }
}

function initFilterStatusMap(treeFilesData: ITreeFileMap, filters: FilterType[]) {
  if (process.env.NODE_ENV === 'development'){
    console.log("[viewDerivedStore.ts] Initializing Filter Status Map with:", treeFilesData, filters);
  };
  const statusMap: FileFilterStatusMap = new Map();

  Object.keys(treeFilesData).forEach(fileHash => {
    const fileFilterMap = new Map<FilterType, { enabled: boolean }>();
    filters.forEach(filter => {
      fileFilterMap.set(filter, { enabled: false });
    });
    statusMap.set(fileHash, fileFilterMap);
  });

  filterStatusMap.set(statusMap);
  if (process.env.NODE_ENV === 'development') {
    console.log('[viewDerivedStore.ts]  filterStatusMap initialized:', get(filterStatusMap));
  };
}


/**
 *   DEBUGGING AND CONSOLE LOGGING
 */
if (process.env.NODE_ENV === 'development'){
  console.log('[viewDerivedStore.ts]  Initializing filterStatusMap...');
};

if (process.env.NODE_ENV === 'development'){
  const logState = (trigger: string) => {
    console.groupCollapsed(`⭐️🗄️⭐️ [viewDerivedStore.ts] [trigger, ${trigger}]  State of All Stores`);
    console.groupCollapsed('Current Stores');
    console.log('Current filterCriteria:', get(filterCriteria), 'Triggered by changes in filter criteria.');
    console.log('Current filterStatusMap:', get(filterStatusMap), 'Triggered by updates in filter status map.');
    console.log('Current tsaveStore:', get(tsaveStore), 'Triggered by updates in tree files data.');
    console.groupEnd();

    console.groupCollapsed('Active Filter Map');
    console.log('Derived ActiveFilterMap:', get(ActiveFilterMap), 'Reflects the active filters applied.');
    console.groupEnd();

    console.groupCollapsed('Filtered Tree Files Data');
    console.log('Derived filteredTreeFilesData:', get(filteredTreeFilesData), 'Reflects the tree files data after applying active filters.');
    console.groupEnd();
    console.groupEnd();
  };

  filterCriteria.subscribe(() => logState('filterCriteria'));
  filterStatusMap.subscribe(() => logState('filterStatusMap'));
  tsaveStore.subscribe(() => logState('tsaveStore'));
  ActiveFilterMap.subscribe(() => logState('ActiveFilterMap'));
  filteredTreeFilesData.subscribe(() => logState('filteredTreeFilesData'));
}


/**
 *  FILTER FUNCTIONS
 */
function filterNodes(treeFilesData: ITreeFileMap, filterCriteria: string, statusMap: FileFilterStatusMap) {
  if (process.env.NODE_ENV === 'development') {
    console.log("[viewDerivedStore.ts] filterNodes called with:", treeFilesData, filterCriteria, statusMap);
  }
  const criteriaValue = filterCriteria.replace(/^[a-z]+:/, '');

  const filterMap = new Map<string, Map<string, TreeNode[]>>();
  const filteredData: Writable<TreeNode[]>[] = [];

  Object.entries(treeFilesData).forEach(([fileHash, treeNodes]) => {
    const rootNode = treeNodes[0];
    const nodesToFilter = rootNode.children;
    const fileFilterMap = new Map<string, TreeNode[]>();
    const fileStatusMap = statusMap.get(fileHash);

    if (fileStatusMap) {
      fileStatusMap.forEach((status, filterType) => {
        if (status.enabled) {
          const filterFunction = filterManager.filters[filterType];
          const filteredNodes = filterFunction(nodesToFilter, criteriaValue);
          fileFilterMap.set(filterType, [{ ...rootNode, children: filteredNodes }]);
        }
      });
    }

    filterMap.set(fileHash, fileFilterMap);

    const filteredStore: Writable<TreeNode[]> = writable([]);
    const filterFunction = filterManager.getFilter(filterCriteria);
    const filteredNodes = filterFunction(nodesToFilter, criteriaValue);
    filteredStore.set([{ ...rootNode, children: filteredNodes }]);
    filteredData.push(filteredStore);
  });

  if (process.env.NODE_ENV === 'development') {
    console.log("[viewDerivedStore.ts]  filterNodes result:", { filterMap, filteredData });
  }

  return { filterMap, filteredData };
}

export function toggleFilter(fileHash: string, filterType: FilterType) {
  filterStatusMap.update(statusMap => {
    const fileStatusMap = statusMap.get(fileHash);
    if (fileStatusMap) {
      const currentStatus = fileStatusMap.get(filterType);
      if (currentStatus) {
        fileStatusMap.set(filterType, { enabled: !currentStatus.enabled });
        if (process.env.NODE_ENV === 'development') {
          console.log(`[viewDerivedStore.ts]  Toggled filter: ${filterType} for fileHash: ${fileHash} to ${!currentStatus.enabled}`, 'This log indicates a filter status change.');
        };
      }
    }
    return statusMap;
  });
}