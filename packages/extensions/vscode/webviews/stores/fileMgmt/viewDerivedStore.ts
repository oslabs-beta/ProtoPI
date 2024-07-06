import { writable, derived, type Writable, get } from 'svelte/store';
import { treeFilesData, type TreeNode, type ITreeFileMap } from './tsaveStore';
import { validMethods } from './../../core/static/HttpMethods';
import type { HttpMethod } from './../../core/static/HttpMethods';

export const filterCriteria = writable<string>('');

const filters = {
  contains: (nodes: TreeNode[], criteria: string) => {
    const filteredNodes = nodes.filter(node => node.key.includes(criteria));
    console.log('Filtered nodes using contains:', filteredNodes);
    return filteredNodes;
  },
  paths: (nodes: TreeNode[]) => {
    const pathsNode = nodes.find(node => node.key === 'paths');
    if (pathsNode) {
      console.log('Paths node found:', pathsNode);
      return pathsNode.children || [];
    }
    console.log('Paths node not found');
    return [];
  },
  servers: (nodes: TreeNode[]) => {
    const serversNode = nodes.find(node => node.key === 'servers');
    if (serversNode) {
      console.log('Servers node found:', serversNode);
      return serversNode.children || [];
    }
    console.log('Servers node not found');
    return [];
  },
  components: (nodes: TreeNode[]) => {
    const componentsNode = nodes.find(node => node.key === 'components');
    if (componentsNode) {
      console.log('Components node found:', componentsNode);
      return componentsNode.children || [];
    }
    console.log('Components node not found');
    return [];
  }
};

function filterRouter(criteria: string) {
  if (criteria.startsWith('contains:')) {
    console.log(`Using 'contains' filter with criteria: ${criteria}`);
    return filters.contains;
  } else if (criteria === 'paths') {
    console.log('Using paths filter');
    return filters.paths;
  } else if (criteria === 'servers') {
    console.log('Using servers filter');
    return filters.servers;
  } else if (criteria === 'components') {
    console.log('Using components filter');
    return filters.components;
  } 

  console.log(`Using default 'contains' filter with criteria: ${criteria}`);
  return (nodes: TreeNode[]) => nodes;
}

export const ActiveFilterMap = derived<
  [Writable<ITreeFileMap>, Writable<string>],
  Map<string, Map<string, TreeNode[]>> // Map<fileHash, Map<filterType, filteredNodes>>
>(
  [treeFilesData, filterCriteria],
  ([$treeFilesData, $filterCriteria], set) => {
    console.groupCollapsed('Derived Store Calculation');
    console.log(`Current filter criteria: ${$filterCriteria}`);
    console.log('Tree files data:', $treeFilesData);

    const filterMap = new Map<string, Map<string, TreeNode[]>>();

    Object.entries($treeFilesData).forEach(([fileHash, treeNodes]) => {
      const rootNode = treeNodes[0];
      const nodesToFilter = rootNode.children;
      const fileFilterMap = new Map<string, TreeNode[]>();

      Object.keys(filters).forEach(filterType => {
        const filterFunction = filters[filterType];
        const filteredNodes = filterFunction(nodesToFilter, $filterCriteria.replace(/^[a-z]+:/, ''));
        fileFilterMap.set(filterType, [{ ...rootNode, children: filteredNodes }]);
      });

      filterMap.set(fileHash, fileFilterMap);
    });

    console.log('ActiveFilterMap data:', filterMap);
    set(filterMap);
    console.groupEnd();
  }
);

export const filteredTreeFilesData = derived<
  [Writable<ITreeFileMap>, Writable<string>],
  Writable<TreeNode[]>[]
>(
  [treeFilesData, filterCriteria],
  ([$treeFilesData, $filterCriteria], set) => {
    console.groupCollapsed('Derived Store Calculation');
    console.log(`Current filter criteria: ${$filterCriteria}`);
    console.log('Tree files data:', $treeFilesData);

    if (!$filterCriteria) {
      console.log('No filter criteria provided. Returning original tree data.');
      set(Object.values($treeFilesData).map(treeNodes => writable(treeNodes)));
      console.groupEnd();
      return;
    }

    const criteriaValue = $filterCriteria.replace(/^[a-z]+:/, '');
    console.log(`Extracted filter criteria: ${criteriaValue}`);

    const filterFunction = filterRouter($filterCriteria);

    const filteredData = Object.values($treeFilesData).map(treeNodes => {
      const filteredStore: Writable<TreeNode[]> = writable([]);
      const rootNode = treeNodes[0];
      const nodesToFilter = rootNode.children;
      const filteredNodes = filterFunction(nodesToFilter, criteriaValue);
      console.log(`Filtered nodes for file ${rootNode.key}:`, filteredNodes);
      filteredStore.set([{ ...rootNode, children: filteredNodes }]);
      return filteredStore;
    });

    console.log('Filtered data:', filteredData);
    set(filteredData);
    console.groupEnd();
  }
);

filteredTreeFilesData.subscribe((value: Writable<TreeNode[]>[]) => {
  console.groupCollapsed('Current filteredTreeFilesData:');
  value.forEach(filteredStore => {
    filteredStore.subscribe((treeNodes: TreeNode[]) => {
      const rootNode = treeNodes[0];
      console.groupCollapsed(`Filtered Tree File Name: ${rootNode.key}`);
      console.dir(treeNodes, { depth: null });
      console.groupEnd();
    });
  });
  console.groupEnd();
});

ActiveFilterMap.subscribe((value) => {
  console.groupCollapsed('⭐️🗄️⭐️  Current ActiveFilterMap:');
  for (const [fileHash, filterMap] of value.entries()) {
    for (const [filterType, treeNodes] of filterMap.entries()) {
      const rootNode = treeNodes[0];
      console.groupCollapsed(`['filtertype:${filterType}', 'filename:${rootNode.key}']`);
      console.dir(treeNodes, { depth: null });
      console.groupEnd();
    }
  }
  console.groupEnd();
});

export function getFilteredData(fileHash: string, filterType: string): TreeNode[] {
  const filterMap = get(ActiveFilterMap);
  if (!filterMap.has(fileHash)) {
    console.log(`filehash of ${fileHash} doesn't exist in FilterMap`);
    return [];
  }

  const fileFilterMap = filterMap.get(fileHash);
  if (!fileFilterMap || !fileFilterMap.has(filterType)) {
    console.log(`filtertype of ${filterType} doesn't exist in FilterMap`);
    return [];
  }

  return fileFilterMap.get(filterType) || [];
}
