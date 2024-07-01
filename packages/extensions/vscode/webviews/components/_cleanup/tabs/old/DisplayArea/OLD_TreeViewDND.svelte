<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Sortable from 'sortablejs';
  import TreeNodeDND from './OLD_TreeNodeDND.svelte';
  import { createTreeStore  } from '../../../../stores/treeStore';
  import { derived } from 'svelte/store';
  import { getNodeLevel } from '../../../../utils/treeUtils';

  export let yamlData = []; // Data prop is provided by the parent component

  const treeStore = createTreeStore(yamlData);
  let container; // DOM element for Sortable
  let sortable;  // Sortable instance

  const items = derived(treeStore, $treeStore => $treeStore);
  
  $: if (yamlData) {
    treeStore.updateItems(yamlData);
    console.log('TreeViewDND: yamlData updated', yamlData);
  }

  onMount(() => {
    sortable = new Sortable(container, {
      handle: '.drag-handle',
      animation: 150,
      group: 'listGroup-root',
      fallbackOnBody: true,
      ghostClass: 'sortable-ghost',
      onMove: (evt) => {
        const sourceLevel = getNodeLevel(evt.dragged);
        const targetLevel = getNodeLevel(evt.related);
        console.log('onMove: sourceLevel, targetLevel', sourceLevel, targetLevel);
        return sourceLevel === targetLevel;
      },
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;

        if (oldIndex === newIndex) {
          console.log('Sortable onEnd: Item returned to original position, no action taken.');
          return; // No need to update if the item is dropped at its original position
        }

        console.log('Sortable onEnd: evt', evt);
        console.log('Sortable onEnd: oldIndex, newIndex', oldIndex, newIndex);

        treeStore.moveItemAndChildren(oldIndex, newIndex);

        console.log('Sortable onEnd: items', $items);
        },
      });
    console.log('TreeViewDND: sortable instance created');
  });

  // Cleanup Sortable instance to prevent memory leaks
  onDestroy(() => {
    if (sortable) {
      sortable.destroy();
      console.log("TreeViewDND: sortable instance destroyed");
    }
  });
</script>

<style>
  .sortable-ghost {
    background-color: #f0f0f0;
    opacity: 0.5;
  }
  .drag-handle {
    cursor: grab;
    display: inline; /* Make the handle inline */
    margin-right: 5px; /* Space between handle and caret */
  }
  .caret, .drag-handle {
    vertical-align: middle; /* Align icons vertically */
  }
  .list-group {
    list-style: none;
    padding-left: 10px; /* Indent nested items */
  }

  .list-group-item {
    margin-bottom: 5px;
    padding: 5px;
    border: 1px solid #ddd;
    background-color: #fff;
    transition: height 0.3s ease;
  }

  .nested {
    list-style: none;
    padding-left: 10px;
    overflow: hidden;
    transition: height 0.3s ease;
  }
  .nested.open {
    height: auto;
  }
  .nested.collapsed {
    height: 0;
  }
</style>

<div class="js-sortable list-group" bind:this={container}>
  {#each $items as item (item.id)}
    <TreeNodeDND node={item} toggle={treeStore.toggleOpen}/>
  {/each}
</div>