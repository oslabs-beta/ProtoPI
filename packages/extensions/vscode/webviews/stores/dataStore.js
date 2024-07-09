import { writable } from 'svelte/store';

export const fileContent = writable(null);
export const parsedData = writable(null);
export const selectedData = writable(null);