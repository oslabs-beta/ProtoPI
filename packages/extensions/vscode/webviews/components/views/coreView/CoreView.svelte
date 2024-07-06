<!-- CoreView.svelte -->
<script lang="ts">
  import { filterCriteria, filteredTreeFilesData } from '../../../stores/fileMgmt/viewDerivedStore'; // Correct import
  import TreeView from './TreeCoreView.svelte';
  import { onDestroy } from 'svelte';
  import { writable, type Writable, get } from 'svelte/store';
  import type { TreeNode } from '../../../stores/fileMgmt/tnodeStore';

  export let isSplit: boolean;

  const leftData = writable<Writable<TreeNode[]>[]>([]);
  const rightData = writable<Writable<TreeNode[]>[]>([]);

  let treeData: Writable<TreeNode[]>[] = [];
  let unsubscribe: () => void;

  function updateData() {
    if (isSplit) {
      leftData.set(treeData);
      rightData.set(treeData);
    } else {
      leftData.set(treeData);
      rightData.set([]);
    }
  }

  unsubscribe = filteredTreeFilesData.subscribe((value: Writable<TreeNode[]>[]) => {
    console.groupCollapsed('viewStore DisplayType Data Listener:');
    console.log('Subscribed filtered data:', value);
    console.groupEnd();

    treeData = value;
    updateData();
  });

  $: if (isSplit !== undefined) {
    updateData();
  }

  onDestroy(() => {
    unsubscribe();
  });

</script>

<div>
  <label for="filter-input">Filter Criteria:</label>
  <input id="filter-input" type="text" bind:value={$filterCriteria} placeholder="Enter filter criteria" />
  
</div>

{#if isSplit}
  <div class="flex">
    <div class="w-1/2 p-2 overflow-hidden">
      {#each $leftData as treeStore}
        {#if get(treeStore) && get(treeStore).length > 0}
          <div>
            <h2>FILENAME: {get(treeStore)[0].key}</h2>
            <TreeView {treeStore} />
          </div>
        {/if}
      {/each}
    </div>
    <div class="w-1/2 p-2 overflow-hidden">
      {#each $rightData as treeStore}
        {#if get(treeStore) && get(treeStore).length > 0}
          <div>
            <h2>FILENAME: {get(treeStore)[0].key}</h2>
            <TreeView {treeStore} />
          </div>
        {/if}
      {/each}
    </div>
  </div>
{:else}
  <div class="w-full p-2 overflow-hidden">
    {#each $leftData as treeStore}
      {#if get(treeStore) && get(treeStore).length > 0}
        <div>
          <h2>FILENAME: {get(treeStore)[0].key}</h2>
          <TreeView {treeStore} />
        </div>
      {/if}
    {/each}
  </div>
{/if}

<style>
/* Add any styles you need here */
</style>
