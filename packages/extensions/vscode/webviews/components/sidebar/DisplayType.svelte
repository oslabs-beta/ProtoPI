<script lang="ts">
  import { filteredTreeFilesData, type TreeFileData } from '../../stores/fileMgmt/viewDerivedStore';
  import TreeView from './TreeView.svelte';
  import { onDestroy } from 'svelte';
  import { writable, type Unsubscriber } from 'svelte/store';

  export let isSplit: boolean;

  let treeData: TreeFileData[] = [];
  let leftData = writable<TreeFileData[]>([]);
  let rightData = writable<TreeFileData[]>([]);
  let unsubscribe: Unsubscriber;

  function updateData() {
    if (isSplit) {
      leftData.set(treeData);
      rightData.set(treeData);
    } else {
      leftData.set(treeData);
      rightData.set([]);
    }
  }

  $: if (isSplit !== undefined) {
    updateData();
  }

  unsubscribe = filteredTreeFilesData.subscribe(value => {
    console.groupCollapsed('viewStore DisplayType Data Listener:');
    console.log('Subscribed filtered data:', value);
    console.groupEnd();

    treeData = value;
    updateData();
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if isSplit}
  <div class="flex">
    <div class="w-1/2 p-2 overflow-hidden">
      {#each $leftData as file}
        <div>
          <h2>FILENAME: {file.name}</h2>
          <TreeView content={file.store} />
        </div>
      {/each}
    </div>
    <div class="w-1/2 p-2 overflow-hidden">
      {#each $rightData as file}
        <div>
          <h2>FILENAME: {file.name}</h2>
          <TreeView content={file.store} />
        </div>
      {/each}
    </div>
  </div>
{:else}
  <div class="w-full p-2 overflow-hidden">
    {#each $leftData as file}
      <div>
        <h2>FILENAME: {file.name}</h2>
        <TreeView content={file.store} />
      </div>
    {/each}
  </div>
{/if}

<style>
</style>