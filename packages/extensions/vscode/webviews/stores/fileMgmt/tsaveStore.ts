//single source of truth for data
//generate a data structure to save nodes
//anything svelte "derives" it's data from here (doesn't duplicate it, uses by reference)
import { writable, type Writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { parsedFilesData, type ParsedFileData, type ParsedFileMap } from './parseStore';

export interface TreeNode {
  id: string;
  key: string;
  value?: any;  // Optional value field to store the actual value
  isOpen: boolean;
  yesChildren: TreeNode[];
  noChildren: TreeNode[];
  path: string[];
}

export interface TreeFileData {
  name: string;
  hash: string;
  store: Writable<TreeNode[]>;
}

export interface TreeFileMap {
  [hash: string]: TreeFileData;
}

function createTreeStore(initialData: Record<string, any>): Writable<TreeNode[]> {
  const { subscribe, set, update } = writable<TreeNode[]>(parseItems(initialData, []));

  function parseItems(data: Record<string, any>, path: string[]): TreeNode[] {
    return Object.entries(data).map(([key, value]) => createItem({ key, keyData: value }, path));
  }

  function createItem(item: { key: string; keyData: any }, parentPath: string[]): TreeNode {
    const newPath = [...parentPath, item.key];
    const id = generateUUID();
    let noChildren: TreeNode[] = [];
    let yesChildren: TreeNode[] = [];

    if (item.keyData && typeof item.keyData === 'object' && !Array.isArray(item.keyData)) {
      // Process non-array objects
      const entries = Object.entries(item.keyData);
      yesChildren = entries
        .filter(([_, val]) => typeof val === 'object' && !Array.isArray(val))
        .map(([key, val]) => createItem({ key, keyData: val }, newPath));

      noChildren = entries
        .filter(([_, val]) => typeof val !== 'object' || Array.isArray(val))
        .map(([key, val]) => ({
          id: generateUUID(),
          key,
          value: val,  // Store the value in a distinct field
          isOpen: false,
          yesChildren: [],
          noChildren: [],
          path: newPath,
        }));
    } else if (Array.isArray(item.keyData)) {
      // Handle arrays differently based on content complexity
      item.keyData.forEach((element, index) => {
        if (typeof element === 'object' && !Array.isArray(element) && Object.keys(element).some(key => typeof element[key] === 'object')) {
          yesChildren.push(createItem({ key: `${item.key}[${index}]`, keyData: element }, newPath));
        } else {
          noChildren.push({
            id: generateUUID(),
            key: `${item.key}[${index}]`,
            value: element,  // Store the value in a distinct field
            isOpen: false,
            yesChildren: [],
            noChildren: [],
            path: newPath,
          });
        }
      });
    } else {
      // Non-object types go directly into noChildren
      noChildren.push({
        id,
        key: item.key,
        value: item.keyData,  // Store the value in a distinct field
        isOpen: false,
        yesChildren: [],
        noChildren: [],
        path: newPath,
      });
    }

    return { id, key: item.key, value: item.keyData, isOpen: false, yesChildren, noChildren, path: newPath };
  }

  function generateUUID(): string {
    return uuidv4();
  }

  return { subscribe, set, update };
}

export const treeFilesData: Writable<TreeFileMap> = writable<TreeFileMap>({});

parsedFilesData.subscribe((parsedFiles: ParsedFileMap) => {
  if (parsedFiles && typeof parsedFiles === 'object') {
    console.groupCollapsed('4️⃣ treeStore::in - from parsedStore:');
    
    const treeData: TreeFileMap = Object.entries(parsedFiles).reduce((acc, [hash, file]: [string, ParsedFileData]) => {
      console.groupCollapsed(`File Name: ${file.name}`);
      console.log('Hash:', file.hash);
      
      const treeStore: Writable<TreeNode[]> = createTreeStore(file.content);
      
      console.groupCollapsed('Tree Store Content (navigable structure):');
      treeStore.subscribe((storeValue: TreeNode[]) => {
        console.dir(storeValue, { depth: null });
      });
      console.groupEnd();
      
      acc[hash] = { name: file.name, hash: file.hash, store: treeStore };
      console.groupEnd();
      
      return acc;
    }, {} as TreeFileMap);
    
    treeFilesData.set(treeData);
    console.groupEnd();
  } else {
    console.error('parsedFiles is not an object:', parsedFiles);
  }
});

treeFilesData.subscribe((value: TreeFileMap) => {
  console.groupCollapsed('5️⃣ treeStore::out - to treefilterStore');

  console.groupCollapsed('Keys of Tree File Map');
  Object.keys(value).forEach(key => console.log(key));
  console.groupEnd();

  Object.entries(value).forEach(([hash, fileData]: [string, TreeFileData]) => {
    console.groupCollapsed(`Tree File Name: ${fileData.name}`);
    console.log('Hash:', hash);

    console.groupCollapsed('Tree Store Content (navigable structure):');
    fileData.store.subscribe((storeValue: TreeNode[]) => {
      console.dir(storeValue, { depth: null });
    });
    console.groupEnd();

    console.groupEnd();
  });
  console.groupEnd();
});

export { createTreeStore };