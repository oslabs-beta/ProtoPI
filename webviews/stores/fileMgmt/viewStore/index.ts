/**
 *   path:  webviews/stores/fileMgmt/viewStore/index.ts
 */

// EXTERNAL EXPORTS
export {
  filterCriteriaMap,
  filterStatusMap
} from './filterMaps';

export {
  filteredTreeFilesData
} from './filteredTreeFilesData';

export {
  ActiveFilterMap
} from './activeFilterMap';

export {
  initDerivedStore,
  setFilterCriteria,
  toggleFilter
} from './storeFunctions';