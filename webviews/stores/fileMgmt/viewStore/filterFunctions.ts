import { get } from 'svelte/store';
import { filterManager } from './filters';
import { type FilterType, type FileFilterStatusMap, type TreeNode, type coreTreeData } from '../fopStore/types';
import { coreStateStore } from '../fopStore/coreStateStore';
import { writable, type Writable } from 'svelte/store';

export function filterNodes(coreState: Map<string, coreTreeData>, filterCriteriaMap: Map<string, string>, statusMap: FileFilterStatusMap) {
  const filterMap = new Map<string, Map<string, TreeNode[]>>();
  const filteredData: Writable<TreeNode[]>[] = [];

  coreState.forEach((treeData, uuid) => {
    const rootNode = treeData.TreeNodes[0];
    const nodesToFilter = rootNode.children;
    const fileFilterMap = new Map<string, TreeNode[]>();
    const fileStatusMap = statusMap.get(treeData.fileUUID);
    const filterCriteria = filterCriteriaMap.get(treeData.fileUUID) || '';
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

    filterMap.set(treeData.fileUUID, fileFilterMap);

    const filteredStore: Writable<TreeNode[]> = writable([]);
    const filterFunction = filterManager.getFilter(filterCriteria);
    const filteredNodes = filterFunction(nodesToFilter, criteriaValue);
    filteredStore.set([{ ...rootNode, children: filteredNodes }]);
    filteredData.push(filteredStore);
  });

  return { filterMap, filteredData };
}