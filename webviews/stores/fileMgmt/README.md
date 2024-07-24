

# Project Documentation

## Overview

This project involves managing tree file data and applying filters to them using Svelte stores. The code is modularized into several files to manage various aspects of the functionality.

## Data Flow
1. Initialization: `initDerivedStore` initializes the filter status map and sets the initialization flag.
2. Setting Criteria: `setFilterCriteria` updates the filter criteria for a specific file.
3. Toggling Filters: `toggleFilter` toggles the enabled status of a filter for a specific file.
4. Deriving Data:
  - `ActiveFilterMap` and `filteredTreeFilesData` derive their data based on the tree files data, filter criteria, and filter status.
  - These derived stores use the `filterNodes` function to filter the data.
5. Subscriptions: Components subscribe to these stores and get updated filtered data whenever the stores change.

Through the modularization, each functionality is isolated, making is easier to manage and understand. 

## Files and Their Responsibilities

### 1. `tsaveStore.ts`

**Purpose**: Manages the subscription to `treeFilesData` from `tnodeStore` and logs the data at different stages.

**Key Functions**:
- Subscribes to `treeFilesData` and logs its content.


### 2. `tnodeStore.ts`
**Purpose**: Defines the structure of tree nodes and the treeFilesData store.

**Key Types**:

- `TreeNode`: Represents a node in the tree.
- `TreeFileMap`: Maps file hashes to arrays of `TreeNode`.

### 3. `filterFunctions.ts`
**Purpose**: Contains the logic for filtering tree nodes based on criteria and status maps.

**Key Functions**:

- `filterNodes`: Filters tree nodes based on criteria and status maps.

### 4. `filterMaps.ts`
**Purpose**: Manages writable stores for filter criteria and status maps and initializes the filter status map.

**Key Functions**:
- `initFilterStatusMap`: Initializes the filter status map with data and filters.

### 5. `activeFilterMap.ts`
**Purpose**: Defines the derived store `ActiveFilterMap` which filters the data based on active filters.

**Key Functions**:
- `ActiveFilterMap`: Derived store to filter data.


### 6. `filteredTreeFilesData.ts`
**Purpose**: Defines the derived store `filteredTreeFilesData` which filters the data and provides the filtered data.

**Key Functions**:

- `filteredTreeFilesData`: Derived store to filter data and provide filtered data.

### 7. `storeFunctions.ts`
**Purpose**: Contains functions to initialize derived stores, set filter criteria, and toggle filters.

**Key Functions**:

- `initDerivedStore`: Initializes derived stores.
- `setFilterCriteria`: Sets filter criteria for a file.
- `toggleFilter`: Toggles a filter for a file.

### 8. `index.ts`
**Purpose**: Acts as an interface to re-export stores and functions from other files.

**Exports**:

- `filterCriteriaMap`, `filterStatusMap` from `filterMaps`.
- `filteredTreeFilesData` from `filteredTreeFilesData`.
- `ActiveFilterMap` from `activeFilterMap`.
- `initDerivedStore`, `setFilterCriteria`, `toggleFilter` from `storeFunctions`.


