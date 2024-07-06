<!-- RequestsView.svelte -->
<script lang="ts">
  import { filterCriteria } from '../../../stores/fileMgmt/viewDerivedStore';
  import TreeReqView from './TreeReqView.svelte';
  import { onDestroy } from 'svelte';
  import { writable, get } from 'svelte/store';
  import type { TreeNode as TreeNodeType } from '../../../stores/fileMgmt/tnodeStore';

  export let isSplit: boolean;

  const leftData = writable<TreeNodeType[]>([]);
  const rightData = writable<TreeNodeType[]>([]);

  let treeData: TreeNodeType[] = [];
  let unsubscribe: () => void;

  function updateData() {
    if (isSplit) {
      console.log('Setting both leftData and rightData with treeData:', treeData);
      leftData.set(treeData);
      rightData.set(treeData);
    } else {
      console.log('Setting leftData with treeData and clearing rightData:', treeData);
      leftData.set(treeData);
      rightData.set([]);
    }
  }

  unsubscribe = filteredTreeFilesData.subscribe((value: TreeNodeType[]) => {
    console.groupCollapsed('viewStore DisplayType Data Listener:');
    console.log('Subscribed filtered data:', value);
    console.groupEnd();

    treeData = value;
    updateData();
  });

  $: if (isSplit !== undefined) {
    console.log('isSplit changed, updating data');
    updateData();
  }

  onDestroy(() => {
    console.log('Component is being destroyed, unsubscribing from store');
    unsubscribe();
  });

  function toggleSplitView() {
    isSplit = !isSplit;
  }

  let leftDataValue: TreeNodeType[] = [];
  let rightDataValue: TreeNodeType[] = [];

  $: leftDataValue = get(leftData);
  $: rightDataValue = get(rightData);
</script>

<div>
  <label for="filter-input">Filter Criteria:</label>
  <input id="filter-input" type="text" bind:value={$filterCriteria} placeholder="Enter filter criteria" />
  
  <label for="split-toggle">Toggle Split View</label>
  <input id="split-toggle" type="checkbox" bind:checked={isSplit} on:change={toggleSplitView} />
</div>

{#if isSplit}
  <div class="flex">
    <div class="w-1/2 p-2 overflow-hidden">
      {#if leftDataValue && leftDataValue.length > 0}
        <div>
          <h2>FILENAME: {leftDataValue[0]?.key}</h2>
          <TreeReqView openAPISchema={leftDataValue} />
        </div>
      {:else}
        <div>No data available for left view</div>
      {/if}
    </div>
    <div class="w-1/2 p-2 overflow-hidden">
      {#if rightDataValue && rightDataValue.length > 0}
        <div>
          <h2>FILENAME: {rightDataValue[0]?.key}</h2>
          <TreeReqView openAPISchema={rightDataValue} />
        </div>
      {:else}
        <div>No data available for right view</div>
      {/if}
    </div>
  </div>
{:else}
  <div class="w-full p-2 overflow-hidden">
    {#if leftDataValue && leftDataValue.length > 0}
      <div>
        <h2>FILENAME: {leftDataValue[0]?.key}</h2>
        <TreeReqView openAPISchema={leftDataValue} />
      </div>
    {:else}
      <div>No data available</div>
    {/if}
  </div>
{/if}

<style>
/* Add any styles you need here */
</style>
