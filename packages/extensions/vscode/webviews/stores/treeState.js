import { writable } from 'svelte/store';

export const fileContent = writable('');
export const parsedData = writable({});
export const selectedNode = writable(null);