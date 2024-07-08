// src/filters.ts

import memoize from 'lodash/memoize';
import type { TreeNode } from './../tnodeStore';
import type { FilterType, FilterStatus } from './types';

type FilterFunction = (nodes: TreeNode[], criteria?: string) => TreeNode[];

const createFilters = () => {
  const filters: Record<string, FilterFunction> = {
    contains: memoize((nodes: TreeNode[], criteria: string) => {
      return nodes.filter(node => node.key.includes(criteria));
    }),
    paths: memoize((nodes: TreeNode[]) => {
      const pathsNode = nodes.find(node => node.key === 'paths');
      return pathsNode ? pathsNode.children || [] : [];
    }),
    servers: memoize((nodes: TreeNode[]) => {
      const serversNode = nodes.find(node => node.key === 'servers');
      return serversNode ? serversNode.children || [] : [];
    }),
    components: memoize((nodes: TreeNode[]) => {
      const componentsNode = nodes.find(node => node.key === 'components');
      return componentsNode ? componentsNode.children || [] : [];
    }),
    default: (nodes: TreeNode[]) => nodes
  };

  function getFilter(criteria: string): FilterFunction {
    if (criteria.startsWith('contains:')) {
      return filters.contains;
    } else if (filters[criteria]) {
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