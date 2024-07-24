// src/stores/displayStore.ts
import { writable } from 'svelte/store';

interface DisplayState {
  isSplit: boolean;
  leftData: any[];   // Define the type according to your data structure
  rightData: any[];
}

const initialState: DisplayState = {
  isSplit: false,
  leftData: [],
  rightData: []
};

export const displayState = writable<DisplayState>(initialState);