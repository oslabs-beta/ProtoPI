<!-- CoreView.svelte  (Tree Splitting Enabling View)
  This View enables side-by-side Tree Splitting View
  The intent is to manage data passing logic here.
-->

<script lang="ts">

  import MasterTreeView from './MasterTreeView.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { writable, get, type Writable } from 'svelte/store';
  import FilterDropdown from '../../asset-library/dropdown/FilterDropdown.svelte';
  import { displayState } from '../../../stores/displayStore';


  import type { TreeNode } from '../../../types/types';


  let isSplit: boolean = false;
  
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

  displayState.subscribe($state => {
    isSplit = $state.isSplit;
    console.log("[MasterView.svelte]  Display state updated:", $state);
  });

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
            <div class="inline-block mb-4">
              <FilterDropdown fileHash={get(treeStore)[0].fileHash}/>
              <span class="filename-label">FILENAME:</span>
            </div>
            <h2 class="inline">{get(treeStore)[0].key}</h2>
            <MasterTreeView {treeStore} />
          </div>
          <hr class="border-2 my-4" />
        {/if}
      {/each}
    </div>
    <div class="w-1/2 p-2 overflow-hidden">
      {#each $rightData as treeStore}
        {#if get(treeStore) && get(treeStore).length > 0}
          <div>
            <div class="inline-block mb-4">
              <FilterDropdown fileHash={get(treeStore)[0].fileHash}/>
              <span class="filename-label">FILENAME:</span>
            </div>
            <h2 class="inline">{get(treeStore)[0].key}</h2>
            <MasterTreeView {treeStore} />
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
          <div class="inline-block mb-4">
            <FilterDropdown fileHash={get(treeStore)[0].fileHash}/>
            <span class="filename-label">FILENAME:</span>
          </div>
          <h2 class="inline">{get(treeStore)[0].key}</h2>
          <MasterTreeView {treeStore} />
        </div>
        <hr class="border-2 my-4" />
      {/if}
    {/each}
  </div>
{/if}