/**
 * path:  webviews/stores/fileMgmt/viewStore/filters/index.ts
 */

import memoize from 'lodash/memoize';
import type { coreTreeData, TreeNode } from '../fopStore/types';
import type { FilterType, FilterStatus } from './types';

type FilterFunction = (treeData: coreTreeData, criteria?: string) => TreeNode[];

const createFilters = () => {
  const filters: Record<string, FilterFunction> = {

    default: (treeData: coreTreeData) => treeData.TreeNodes,

    paths: memoize((treeData: coreTreeData) => {
      const pathsNode = treeData.TreeNodes.find(node => node.key === 'paths');
      return pathsNode ? pathsNode.children || [] : [];
    }),

    servers: memoize((treeData: coreTreeData) => {
      const serversNode = treeData.TreeNodes.find(node => node.key === 'servers');
      return serversNode ? serversNode.children || [] : [];
    }),

    components: memoize((treeData: coreTreeData) => {
      const componentsNode = treeData.TreeNodes.find(node => node.key === 'components');
      return componentsNode ? componentsNode.children || [] : [];
    }),
  };

  function getFilter(criteria: string): FilterFunction {
    if (filters[criteria]) {
      return filters[criteria];
    }
    return filters.default;
  }

  // ASSIGN AVAILABLE FILTERS TO A VARIABLE
  const availableFilters: FilterType[] = Object.keys(filters) as FilterType[];

  return {
    getFilter,
    filters,
    availableFilters  // EXPORT THE AVAILABLE FILTERS
  };
};

export const filterManager = createFilters();
