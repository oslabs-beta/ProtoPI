/**
 *   path: webviews/stores/fileMgmt/fopViews/viewsStore.ts
 */

import { writable } from 'svelte/store';
import type { ViewNode } from './types';

// viewsStore: Store that manages different "views" of the filtered/modified data.
export const viewsStore = writable<Map<string, Map<string, ViewNode[]>>>(new Map());

// activeViewStore: Tracks the currently active view.
export const activeViewStore = writable<string | null>(null);
