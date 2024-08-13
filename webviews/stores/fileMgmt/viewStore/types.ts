/**
 * path:  webviews/stores/fileMgmt/viewStore/filters/types.ts
 */

// TODO CONNECTION
// import type { TreeNode } from '../tnodeStore';

export type FilterType = 'contains' | 'paths' | 'servers' | 'components';

export interface FilterStatus {
  enabled: boolean;
}

export type FileFilterStatusMap = Map<string, Map<FilterType, FilterStatus>>; // Map<fileHash, Map<filterType, FilterStatus>>