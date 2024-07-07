import { writable, type Writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { parsedFilesData, type ParsedFileData, type ParsedFileMap } from './parseStore';
import CryptoJS from 'crypto-js';

export interface ITreeFileMap {
  [fileHash: string]: TreeNode[];
}

export interface TreeNode {
  readonly id: string;
  key: string;
  value?: any;
  isOpen: boolean;
  children: TreeNode[];
  path: string[];
  fileHash: string;      // Hash from the filename
  nodeHash: string;  // Hash based on the node
  parentId: string | null; // ID of the parent node
  level: number;     // Level based on the path length
}

const treeFilesData: Writable<ITreeFileMap> = writable<ITreeFileMap>({});

function createTreeStore(initialData: Record<string, any>, fileHash: string, name: string): Writable<TreeNode[]> {
  const rootNode: TreeNode = {
    id: fileHash,
    key: name,
    value: null,
    isOpen: true,
    children: parseItems(initialData, [fileHash], fileHash),
    path: [fileHash],
    fileHash: fileHash,
    nodeHash: generateHash(name),
    parentId: null,
    level: 1,
  };

  const { subscribe, set, update } = writable<TreeNode[]>([rootNode]);

  function parseItems(data: Record<string, any>, path: string[], parentHash: string): TreeNode[] {
    return Object.entries(data).map(([key, value]) => createItem({ key, keyData: value }, path, parentHash));
  }

  function createItem(item: { key: string; keyData: any }, parentPath: string[], parentHash: string): TreeNode {
    const newPath = [...parentPath, item.key];
    const id = generateUUID();
    const nodeHash = generateHash(item.key);
    const parentId = parentHash;
    const level = newPath.length;

    let children: TreeNode[] = [];

    if (item.keyData && typeof item.keyData === 'object' && !Array.isArray(item.keyData)) {
      children = parseItems(item.keyData, newPath, nodeHash);
    } else if (Array.isArray(item.keyData)) {
      item.keyData.forEach((element, index) => {
        children.push(createItem({ key: `${item.key}[${index}]`, keyData: element }, newPath, nodeHash));
      });
    } else {
      children = [];
    }

    return { id, key: item.key, value: item.keyData, isOpen: false, children, path: newPath, fileHash: parentHash, nodeHash, parentId, level };
  }

  function generateUUID(): string {
    return uuidv4();
  }

  function generateHash(input: string): string {
    return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
  }

  return { subscribe, set, update };
}

parsedFilesData.subscribe((parsedFiles: ParsedFileMap) => {
  if (parsedFiles && typeof parsedFiles === 'object') {
    console.groupCollapsed('📚4️⃣📚 [tnodeStore.ts]  data in  (from parsedStore)');

    const treeData: ITreeFileMap = Object.entries(parsedFiles).reduce((acc, [fileHash, file]: [string, ParsedFileData]) => {
      console.groupCollapsed(`File Name: ${file.name}`);
      console.log('Hash:', file.fileHash);

      const treeStore: Writable<TreeNode[]> = createTreeStore(file.content, file.fileHash, file.name);

      treeStore.subscribe((storeValue: TreeNode[]) => {
        acc[fileHash] = storeValue;
      });

      console.groupCollapsed('Tree Store Content (navigable structure):');
      treeStore.subscribe((storeValue: TreeNode[]) => {
        console.dir(storeValue, { depth: null });
      });
      console.groupEnd();

      console.groupEnd();

      return acc;
    }, {} as ITreeFileMap);

    treeFilesData.set(treeData);
    console.groupEnd();
  } else {
    console.error('parsedFiles is not an object:', parsedFiles);
  }
});

treeFilesData.subscribe((value: ITreeFileMap) => {
  console.groupCollapsed('📚5️⃣📚 [tnodeStore.ts]  data out (to tsaveStore)');

  console.groupCollapsed('Keys of Tree File Map');
  Object.keys(value).forEach(key => console.log(key));
  console.groupEnd();

  Object.entries(value).forEach(([fileHash, treeNodes]: [string, TreeNode[]]) => {
    const rootNode = treeNodes[0];
    console.groupCollapsed(`Tree File Name: ${rootNode.key}`);
    console.log('Hash:', rootNode.id);

    console.groupCollapsed('Tree Store Content (navigable structure):');
    console.dir(treeNodes, { depth: null });
    console.groupEnd();

    console.groupEnd();
  });
  console.groupEnd();
});

export { createTreeStore, treeFilesData, type TreeNode, type ITreeFileMap };