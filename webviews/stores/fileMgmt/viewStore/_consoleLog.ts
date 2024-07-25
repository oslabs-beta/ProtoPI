// _consoleLog.ts

import { get } from 'svelte/store';
import { filterCriteriaMap, filterStatusMap } from './filterMaps';
import { treeFilesData as tsaveStore } from './../tsaveStore';
import { ActiveFilterMap } from './activeFilterMap';
import { filteredTreeFilesData } from './filteredTreeFilesData';

export function initializeDebugging() {
  // if (process.env.NODE_ENV === 'development') {
    console.log('[viewStore] Initializing filterStatusMap...');

    const logState = (trigger: string) => {
      console.groupCollapsed(`⭐️🗄️⭐️ [viewStore] [trigger, ${trigger}]  State of All Stores`);
      console.groupCollapsed('Current Stores');
      console.log('Current filterCriteriaMap:', get(filterCriteriaMap), 'Triggered by changes in filter criteria map.');
      console.log('Current filterStatusMap:', get(filterStatusMap), 'Triggered by updates in filter status map.');
      console.log('Current tsaveStore:', get(tsaveStore), 'Triggered by updates in tree files data.');
      console.groupEnd();

      console.groupCollapsed('Active Filter Map');
      console.log('Derived ActiveFilterMap:', get(ActiveFilterMap), 'Reflects the active filters applied.');
      console.groupEnd();

      console.groupCollapsed('Filtered Tree Files Data');
      console.log('Derived filteredTreeFilesData:', get(filteredTreeFilesData), 'Reflects the tree files data after applying active filters.');
      console.groupEnd();
      console.groupEnd();
    };

    filterCriteriaMap.subscribe(() => logState('filterCriteriaMap'));
    filterStatusMap.subscribe(() => logState('filterStatusMap'));
    tsaveStore.subscribe(() => logState('tsaveStore'));
    ActiveFilterMap.subscribe(() => logState('ActiveFilterMap'));
    filteredTreeFilesData.subscribe(() => logState('filteredTreeFilesData'));
  // }
}