/**
 * path: webviews/stores/fileMgmt/fopStore/parsedTreeNodeStore.ts
 */

import { derived } from 'svelte/store';
import { rawFilesData } from './rawFilesStore';
import { processFiles } from './helpers/fileProcessingHelpers';
import type { StoreState, ParsedContent } from './types';

const defaultState: StoreState<ParsedContent> = {
  data: new Map<string, ParsedContent>(),
  loading: true,
  error: null,
};

const parsedTreeNodeData = derived(
  rawFilesData,
  ($rawFilesData, set) => {
    if ($rawFilesData.loading) {
      set({ ...defaultState, loading: true });
    } else if ($rawFilesData.error) {
      set({ ...defaultState, error: $rawFilesData.error });
    } else {
      try {
        const parsedData = processFiles($rawFilesData);

        set({
          data: parsedData,
          loading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        set({ ...defaultState, error: errorMessage, loading: false });
      }
    }
  },
  defaultState
);

export { parsedTreeNodeData };
