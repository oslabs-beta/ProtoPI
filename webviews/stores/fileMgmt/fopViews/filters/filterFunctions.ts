/**
 *   path: src/stores/views/filters/filterFunctions.ts
 */

// This file contains specific filter functions that can be applied to the core data.

import memoize from 'lodash/memoize';
import type { coreTreeData } from './../types';

/**
 * exampleFilterFunction:
 * This is an example of a filter function that filters data based on some condition.
 * Memoization is used to cache the results for subsequent calls with the same input data.
 */
export const exampleFilterFunction = memoize((data: Map<string, coreTreeData>): Map<string, coreTreeData> => {
  console.log('Applying exampleFilterFunction:', data);
  const filteredData = new Map([...data].filter(([key, value]) => /* your condition */ true));
  console.log('Filtered data:', filteredData);
  return filteredData;
});
