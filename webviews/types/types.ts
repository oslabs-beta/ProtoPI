export interface TreeNode {
  readonly id: string;
  key: string;
  value?: any;
  isOpen: boolean;
  children: TreeNode[];
  path: string[];
  readonly fileHash: string;
  nodeHash: string;
  parentId: string | null;
  level: number;
}