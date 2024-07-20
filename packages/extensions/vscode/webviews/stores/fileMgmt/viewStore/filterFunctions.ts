// filterFunctions.ts
import { filterManager } from './filters';
import { type FilterType, type FileFilterStatusMap } from './filters/types';
import { type TreeNode, type TreeFileMap } from './../tnodeStore';
import { writable, type Writable } from 'svelte/store';

export function filterNodes(treeFilesData: TreeFileMap, filterCriteriaMap: Map<string, string>, statusMap: FileFilterStatusMap) {
  if (process.env.NODE_ENV === 'development') {
    console.log("[filterFunctions.ts] filterNodes called with:", treeFilesData, filterCriteriaMap, statusMap);
  }
  
  const filterMap = new Map<string, Map<string, TreeNode[]>>();
  const filteredData: Writable<TreeNode[]>[] = [];

  Object.entries(treeFilesData).forEach(([fileHash, treeNodes]) => {
    const rootNode = treeNodes[0];
    const nodesToFilter = rootNode.children;
    const fileFilterMap = new Map<string, TreeNode[]>();
    const fileStatusMap = statusMap.get(fileHash);
    const filterCriteria = filterCriteriaMap.get(fileHash) || '';
    const criteriaValue = filterCriteria.replace(/^[a-z]+:/, '');

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
    console.log("[filterFunctions.ts]  filterNodes result:", { filterMap, filteredData });
  }

  return { filterMap, filteredData };
}