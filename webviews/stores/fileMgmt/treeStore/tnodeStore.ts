// // tnodeStore.ts
// import { writable, type Writable } from 'svelte/store';
// import { v4 as uuidv4 } from 'uuid';
// import { type ParsedFileData, type ParsedFileMap } from './parseStore'; // Correct path to types
// import { parsedFilesData } from './parseStore';  // Ensure this is the correct import path
// import CryptoJS from 'crypto-js';

// export interface TreeNode {
//   readonly id: string;
//   key: string;
//   value?: any;
//   isOpen: boolean;
//   children: TreeNode[];
//   path: string[];
//   readonly fileHash: string;
//   nodeHash: string;
//   parentId: string | null;
//   level: number;
// }

// export interface TreeFileMap {
//   [fileHash: string]: TreeNode[];
// }

// // Directly exporting treeFilesData
// export const treeFilesData: Writable<{[fileHash: string]: TreeNode[]}> = writable({});

// function createTreeStore(fileContent: Record<string, any>, hash: string, fileName: string): Writable<TreeNode[]> {
//   const rootNode: TreeNode = {
//     id: uuidv4(),
//     key: fileName,
//     value: null,
//     isOpen: true,
//     children: parseItems(fileContent, [fileName], hash, null),
//     path: [fileName],
//     fileHash: hash,
//     nodeHash: generateHash(fileName),
//     parentId: null,
//     level: 1,
//   };
//   return writable<TreeNode[]>([rootNode]);
// }

// function parseItems(data: Record<string, any>, path: string[], fileHash: string, parentId: string | null): TreeNode[] {
//   return Object.entries(data).map(([key, value]) =>
//     createItem({ key, keyData: value }, path, fileHash, parentId));
// }

// function createItem(item: { key: string; keyData: any }, parentPath: string[], fileHash: string, parentId: string | null): TreeNode {
//   const newPath = [...parentPath, item.key];
//   const nodeHash = generateHash(item.key + newPath.join('/'));
//   return {
//     id: uuidv4(),
//     key: item.key,
//     value: item.keyData,
//     isOpen: false,
//     children: typeof item.keyData === 'object' ? parseItems(item.keyData, newPath, fileHash, uuidv4()) : [],
//     path: newPath,
//     fileHash,
//     nodeHash,
//     parentId,
//     level: newPath.length
//   };
// }

// function generateHash(input: string): string {
//   return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
// }

// parsedFilesData.subscribe((parsedFiles: ParsedFileMap) => {
//   if (parsedFiles && typeof parsedFiles === 'object') {
//     console.groupCollapsed('📚4️⃣📚 [tnodeStore.ts] data in (from parsedStore)');

//     const treeData: {[fileHash: string]: Writable<TreeNode[]>} = Object.entries(parsedFiles).reduce((acc, [fileHash, file]: [string, ParsedFileData]) => {
//       console.groupCollapsed(`File Name: ${file.name}`);
//       console.log('Hash:', fileHash);

//       const treeStore: Writable<TreeNode[]> = createTreeStore(file.content, fileHash, file.name);

//       treeStore.subscribe((storeValue: TreeNode[]) => {
//         acc[fileHash] = storeValue;
//       });

//       console.groupCollapsed('Tree Store Content (navigable structure):');
//       treeStore.subscribe((storeValue: TreeNode[]) => {
//         console.dir(storeValue, { depth: null });
//       });
//       console.groupEnd();

//       console.groupEnd();

//       return acc;
//     }, {} as {[fileHash: string]: Writable<TreeNode[]>});

//     treeFilesData.set(treeData);
//     console.groupEnd();
//   } else {
//     console.error('parsedFilesData subscription received invalid data:', parsedFiles);
//   }
// });

// treeFilesData.subscribe((value: {[fileHash: string]: TreeNode[]}) => {
//   console.groupCollapsed('📚5️⃣📚 [tnodeStore.ts] data out (to tsaveStore)');

//   console.groupCollapsed('Keys of Tree File Map');
//   Object.keys(value).forEach(key => console.log(key));
//   console.groupEnd();

//   Object.entries(value).forEach(([fileHash, treeNodes]: [string, TreeNode[]]) => {
//     const rootNode = treeNodes[0];
//     console.groupCollapsed(`Tree File Name: ${rootNode.key}`);
//     console.log('Hash:', rootNode.id);

//     console.groupCollapsed('Tree Store Content (navigable structure):');
//     console.dir(treeNodes, { depth: null });
//     console.groupEnd();

//     console.groupEnd();
//   });
//   console.groupEnd();
// });
