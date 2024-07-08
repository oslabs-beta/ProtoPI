<!-- CoreView.svelte  (Tree Splitting Enabling View)
  This View enables side-by-side Tree Splitting View
  The intent is to manage data passing logic here.
-->

<script lang="ts">

  import TreeCoreView from './TreeCoreView.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { writable, get, type Writable } from 'svelte/store';
  import FilterDropdown from '../../asset-library/dropdown/FilterDropdown.svelte';

  import type { TreeNode } from '../../../stores/fileMgmt/tnodeStore';

  export let isSplit: boolean;
  export let treeData: Writable<TreeNode[]>[];

  const leftData = writable<Writable<TreeNode[]>[]>([]);
  const rightData = writable<Writable<TreeNode[]>[]>([]);

  let leftDataUnsubscribe = () => {};
  let rightDataUnsubscribe = () => {};

  function updateData() {
    if (isSplit) {
      leftData.set(treeData);
      rightData.set(treeData);
    } else {
      leftData.set(treeData);
      rightData.set([]);
    }
  }


  $: if (treeData && isSplit !== undefined) {
    updateData();
  }
  onMount(() => {
    leftDataUnsubscribe = leftData.subscribe(data => {
      data.forEach(store => {
        const nodeArray = get(store);
        if (nodeArray && nodeArray.length > 0 && nodeArray[0].fileHash) {
          console.log("Left data loaded with file hash:", nodeArray[0].fileHash);
        } else {
          console.log("No valid nodeHash found in left data.");
        }
      });
    });

    rightDataUnsubscribe = rightData.subscribe(data => {
      data.forEach(store => {
        const nodeArray = get(store);
        if (nodeArray && nodeArray.length > 0 && nodeArray[0].fileHash) {
          console.log("Right data loaded with file hash:", nodeArray[0].fileHash);
        } else {
          console.log("No valid nodeHash found in right data.");
        }
      });
    });
  });

  onDestroy(() => {
    leftDataUnsubscribe(); // Unsubscribe from leftData store
    rightDataUnsubscribe(); // Unsubscribe from rightData store
    // unsubscribe();
  });

</script>



{#if isSplit}
  <div class="flex">
    <div class="w-1/2 p-2 overflow-hidden">
      {#each $leftData as treeStore}
        {#if get(treeStore) && get(treeStore).length > 0}
          <div>
            <div class="mb-4">
              <FilterDropdown fileHash={get(treeStore)[0].fileHash}/>
            </div>
            <h2>FILENAME: {get(treeStore)[0].key}</h2>
            <TreeCoreView {treeStore} />
          </div>
          <hr class="border-2 my-4" />
        {/if}
      {/each}
    </div>
    <div class="w-1/2 p-2 overflow-hidden">
      {#each $rightData as treeStore}
        {#if get(treeStore) && get(treeStore).length > 0}
          <div>
            <div class="mb-4">
              <FilterDropdown fileHash={get(treeStore)[0].fileHash}/>
            </div>
            <h2>FILENAME: {get(treeStore)[0].key}</h2>
            <TreeCoreView {treeStore} />
          </div>
          <hr class="border-2 my-4" />
        {/if}
      {/each}
    </div>
  </div>
{:else}
  <div class="w-full p-2 overflow-hidden">
    {#each $leftData as treeStore}
      {#if get(treeStore) && get(treeStore).length > 0}
        <div>
          <div class="mb-4">
            <FilterDropdown fileHash={get(treeStore)[0].fileHash}/>
          </div>
          <h2>FILENAME: {get(treeStore)[0].key}</h2>
          <TreeCoreView {treeStore} />
        </div>
        <hr class="border-2 my-4" />
      {/if}
    {/each}
  </div>
{/if}