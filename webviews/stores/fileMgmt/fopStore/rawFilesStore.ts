/**
 * path: webviews/stores/fileMgmt/fopStore/rawFilesStore.ts
 */

import { writable } from 'svelte/store';
import type { StoreState, FileInfo } from './types';

// Default state for raw files
const defaultRawState: StoreState<Map<string, FileInfo<string>>> = {
  data: new Map<string, FileInfo<string>>(),
  loading: false,
  error: null,
};

// Writable store to hold raw files data
const rawFilesData = writable<StoreState<Map<string, FileInfo<string>>>>(defaultRawState);

// Function to process raw files and update the rawFilesData
export function processRawFiles(files: Map<string, FileInfo<string>>) {
  rawFilesData.update(state => {
    files.forEach((file, uuid) => {

      state.data.set(uuid, {
        ...file,
        wasPassedToCoreState: false,
      });
    });

    return {
      ...state,
      data: new Map(state.data),
      loading: false,
      error: null,
    };
  });
}

export { rawFilesData };