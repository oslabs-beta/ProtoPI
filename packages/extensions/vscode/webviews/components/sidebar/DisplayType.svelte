<script lang="ts">
  import { filteredTreeFilesData, type TreeFileData } from '../../stores/treefilterStore';
  import TreeView from './TreeView.svelte';
  import { onDestroy } from 'svelte';

  export let isSplit: boolean;

  let treeData: TreeFileData[] = [];
  let leftData: TreeFileData[] = [];
  let rightData: TreeFileData[] = [];

  const unsubscribe = filteredTreeFilesData.subscribe(value => {
    console.log('Subscribed filtered data:', value);
    treeData = value;
    updateData();
  });

  function updateData() {
    if (isSplit) {
      leftData = treeData;
      rightData = treeData;
    } else {
      leftData = treeData;
      rightData = [];
    }
  }

  $: if (isSplit !== undefined) {
    updateData();
  }

  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if isSplit}
  <div class="flex">
    <div class="w-1/2 p-2 overflow-hidden">
      {#each leftData as file}
        <div>
          <h2>FILENAME: {file.name}</h2>
          <TreeView content={file.store} />
        </div>
      {/each}
    </div>
    <div class="w-1/2 p-2 overflow-hidden">
      {#each rightData as file}
        <div>
          <h2>FILENAME: {file.name}</h2>
          <TreeView content={file.store} />
        </div>
      {/each}
    </div>
  </div>
{:else}
  <div class="w-full p-2 overflow-hidden">
    {#each leftData as file}
      <div>
        <h2>FILENAME: {file.name}</h2>
        <TreeView content={file.store} />
      </div>
    {/each}
  </div>
{/if}