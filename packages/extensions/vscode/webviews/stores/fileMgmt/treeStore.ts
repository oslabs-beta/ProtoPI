import { writable, type Writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { parsedFilesData, type ParsedFileData } from './parseStore';

export interface TreeNode {
  id: string;
  key: string;
  isOpen: boolean;
  yesChildren: TreeNode[]; 
  noChildren: Record<string, any>; 
  path: string[]; // Array to store the path as a property
}

export interface TreeFileData {
  name: string;
  store: Writable<TreeNode[]>; // Updated type
}

function createTreeStore(initialData: Record<string, any>): Writable<TreeNode[]> {
  const { subscribe, set, update } = writable<TreeNode[]>(parseItems(initialData, []));

  function parseItems(data: Record<string, any>, path: string[]): TreeNode[] {
    return Object.entries(data).map(([key, value]) => createItem({ key, keyData: value }, path));
  }

  function createItem(item: { key: string; keyData: any }, parentPath: string[]): TreeNode {
    const newPath = [...parentPath, item.key]; // Update path with the current key
    const id = generateUUID(); // Generate a UUID for the node
    let noChildren: Record<string, any> = {}; // Renamed from "values"
    let yesChildren: TreeNode[] = []; // Renamed from "children"

    if (item.keyData && typeof item.keyData === 'object') {
      if (Array.isArray(item.keyData)) {
        // Handle arrays differently based on content complexity
        item.keyData.forEach((element, index) => {
          if (typeof element === 'object' && Object.keys(element).some(key => typeof element[key] === 'object')) {
            // If any element of the array is a complex object, treat it as a child
            yesChildren.push(createItem({ key: `${item.key}[${index}]`, keyData: element }, newPath));
          } else {
            // Simple arrays or arrays of primitives stay in noChildren
            if (!noChildren[item.key]) noChildren[item.key] = [];
            noChildren[item.key].push(element);
          }
        });
      } else {
        // Process non-array objects
        const entries = Object.entries(item.keyData);
        yesChildren = entries
          .filter(([_, val]) => typeof val === 'object' && !Array.isArray(val))
          .map(([key, val]) => createItem({ key, keyData: val }, newPath));
        
        noChildren = Object.fromEntries(entries.filter(([key, _]) => !yesChildren.some(child => child.key === key)));
      }
    } else {
      // Non-object types go directly into noChildren
      noChildren[item.key] = item.keyData;
    }

    return { id, key: item.key, isOpen: false, yesChildren, noChildren, path: newPath };
  }

  function generateUUID(): string {
    return uuidv4(); // Simplified UUID generation without path information
  }

  return { subscribe, set, update };
}

export const treeFilesData: Writable<TreeFileData[]> = writable<TreeFileData[]>([]);

parsedFilesData.subscribe((parsedFiles: ParsedFileData[]) => {
  const treeData: TreeFileData[] = parsedFiles.map((file: ParsedFileData) => {
    const treeStore: Writable<TreeNode[]> = createTreeStore(file.content);
    return { name: file.name, store: treeStore };
  });
  treeFilesData.set(treeData);
});

treeFilesData.subscribe((value: TreeFileData[]) => {
  console.groupCollapsed('Current treeFilesData:');
  value.forEach((file: TreeFileData) => {
    console.groupCollapsed(`Tree File Name: ${file.name}`);
    file.store.subscribe((storeValue: TreeNode[]) => {
      console.dir(storeValue, { depth: null }); // Use console.dir to log a navigable structure
    });
    console.groupEnd();
    console.log('Tree Store:', file.store);
  });
  console.groupEnd();
});

export { createTreeStore };