/**
 * path:  webviews/stores/fileMgmt/fopStore/types.ts
 */


export interface ParsedContent {
  [key: string]: any;
}

// Defines the structure for file information, now including node maps
export interface FileInfo<T> {
  readonly fileHash: string;
  readonly fileUUID: string;
  readonly fileName: string; 
  content: T;
  wasPassedToCoreState: boolean;
  
  // Properties to hold additional data for tree nodes
  nodeUuidToNodeMap: Map<string, TreeNode>; 
  pathUuidToNodeMap: Map<string, TreeNode>;
  treeNodeMap: TreeNode[];
}

// Extends FileInfo to include parsed content and optionally debug information
export interface ParsedFileInfo<T> extends FileInfo<T> {
  parsedContentDebug?: string;
}

// Represents a node in a hierarchical tree structure, commonly used for displaying file directories or similar structures
export interface TreeNode {
  isOpen: boolean;
  children: TreeNode[];
  value: any; 
  pathUUID: string[]; 
}

// Generic interface for store states in Svelte applications
export interface StoreState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

// Defines the structure for core tree data used in the coreStateStore
export interface coreTreeData {
  fileHash: string;
  fileName: string;
  fileUUID: string;
  readonly nodeUuidToNodeMap: Map<string, TreeNode>;
  readonly pathUuidToNodeMap: Map<string, TreeNode>;
  TreeNodes: TreeNode[];
}