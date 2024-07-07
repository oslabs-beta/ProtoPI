import { treeFilesData, type ITreeFileMap, type TreeNode } from './tnodeStore';

treeFilesData.subscribe((value: ITreeFileMap) => {
  console.groupCollapsed('📚6️⃣📚 [tsaveStore]  data in  (from tnodeStore)');

  console.groupCollapsed('Keys of Tree File Map (Entering)');
  Object.keys(value).forEach(key => console.log(key));
  console.groupEnd();

  Object.entries(value).forEach(([fileHash, treeNodes]: [string, TreeNode[]]) => {
    const rootNode = treeNodes[0];
    console.groupCollapsed(`Tree File Name (Entering): ${rootNode.key}`);
    console.log('File Hash:', rootNode.id);

    console.groupCollapsed('Tree Store Content (Entering, navigable structure):');
    console.dir(treeNodes, { depth: null });
    console.groupEnd();

    console.groupEnd();
  });
  console.groupEnd();
});

treeFilesData.subscribe((value: ITreeFileMap) => {
  console.groupCollapsed('📚7️⃣📚 [tsaveStore.ts]  data out  (to treefilterStore)');

  console.groupCollapsed('Keys of Tree File Map (Exiting)');
  Object.keys(value).forEach(key => console.log(key));
  console.groupEnd();

  Object.entries(value).forEach(([fileHash, treeNodes]: [string, TreeNode[]]) => {
    const rootNode = treeNodes[0];
    console.groupCollapsed(`Tree File Name (Exiting): ${rootNode.key}`);
    console.log('File Hash:', rootNode.id);

    console.groupCollapsed('Tree Store Content (Exiting, navigable structure):');
    console.dir(treeNodes, { depth: null });
    console.groupEnd();

    console.groupEnd();
  });
  console.groupEnd();
});

export { treeFilesData };