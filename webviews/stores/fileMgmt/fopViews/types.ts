// path: webviews/stores/fileMgmt/fopStore/types.ts

export interface TreeNode {
  isOpen: boolean;
  children: TreeNode[];
  value: any; 
  pathUUID: string[]; 
}

export interface coreTreeData {
  fileHash: string;
  fileName: string;
  fileUUID: string;
  readonly nodeUuidToNodeMap: Map<string, TreeNode>;
  readonly pathUuidToNodeMap: Map<string, TreeNode>;
  TreeNodes: TreeNode[];
}

export interface ViewNode {
  key: string;       // Key from uuidToNodeMap
  value: TreeNode;   // Value from TreeNodes array
  nodeUUID: string;  // UUID from TreeNode.pathUUID[]
}


