import { writable, derived, type Writable } from 'svelte/store';
import { treeFilesData, type TreeFileData, type TreeNode } from './treeStore';

// Define a writable store for the filter criteria
export const filterCriteria = writable<string>('');

// Define the filterRouter function
function filterRouter(criteria: string) {
  // Define your filter functions here
  const filters = {
    contains: (nodes: TreeNode[], criteria: string) => {
      const filteredNodes = nodes.filter(node => node.key.includes(criteria));
      console.log('Filtered nodes using contains:', filteredNodes);
      return filteredNodes;
    },    requests: (nodes: TreeNode[]) => {
      // Extract nodes under "paths" and put them as root nodes
      const pathsNode = nodes.find(node => node.key === 'paths');
      if (pathsNode) {
        console.log('Paths node found:', pathsNode);
        return pathsNode.yesChildren || [];
      }
      console.log('Paths node not found');
      return [];
    }
    // Add more filter functions as needed
    // e.g., startsWith, endsWith, custom logic, etc.
  };

  // Determine which filter to use based on criteria
  if (criteria.startsWith('contains:')) {
    console.log(`Using 'contains' filter with criteria: ${criteria}`);
    return filters.contains;
  } else if (criteria === 'requests') {
    console.log('Using requests filter');
    return filters.requests;
  }
  // Add more routing logic as needed
  console.log(`Using default 'contains' filter with criteria: ${criteria}`);
  return (nodes: TreeNode[]) => nodes; // Default filter function
}

// Create a derived store to filter tree data based on the filter criteria
export const filteredTreeFilesData = derived(
  [treeFilesData, filterCriteria],
  ([$treeFilesData, $filterCriteria]) => {
    console.groupCollapsed('Derived Store Calculation');
    console.log(`Current filter criteria: ${$filterCriteria}`);

    if (!$filterCriteria) {
      console.log('No filter criteria provided. Returning original tree data.');
      console.groupEnd();
      return $treeFilesData.map(file => ({
        ...file,
        store: file.store
      }));
    }

    // Extract the actual filter criteria from the input
    const criteriaValue = $filterCriteria.replace(/^[a-z]+:/, '');
    console.log(`Extracted filter criteria: ${criteriaValue}`);

    const filterFunction = filterRouter($filterCriteria);

    const filteredData = $treeFilesData.map(file => {
      // Filter logic to create a new writable store for each file
      const filteredStore: Writable<TreeNode[]> = writable([]);
      file.store.subscribe(nodes => {
        const filteredNodes = filterFunction(nodes, criteriaValue);
        console.log(`Filtered nodes for file ${file.name}:`, filteredNodes);
        filteredStore.set([...filteredNodes]); // Force reactivity update by creating a new array

      });
      return { ...file, store: filteredStore };
    });

    console.groupEnd();
    return filteredData;
  }
);

// Log the filtered data for debugging
filteredTreeFilesData.subscribe((value: TreeFileData[]) => {
  console.groupCollapsed('Current filteredTreeFilesData:');
  value.forEach((file: TreeFileData) => {
    console.groupCollapsed(`Filtered Tree File Name: ${file.name}`);
    file.store.subscribe((storeValue: TreeNode[]) => {
      console.groupCollapsed('Filtered Tree Nodes:');
      console.dir(storeValue, { depth: null });
      console.groupEnd();
    });
    console.groupEnd();
  });
  console.groupEnd();
});