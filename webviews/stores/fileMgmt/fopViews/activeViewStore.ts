/**
 *   path: webviews/stores/fileMgmt/fopViews/activeViewStore.ts
 */

// This file defines the activeViewStore which tracks the currently active view.

import { writable } from 'svelte/store';

// activeViewStore: Tracks the currently active view.
export const activeViewStore = writable<string | null>(null);

activeViewStore.subscribe(value => {
  console.log('ActiveViewStore changed:', value);
});