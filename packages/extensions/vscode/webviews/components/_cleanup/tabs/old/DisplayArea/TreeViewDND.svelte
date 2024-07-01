<script>
  import TreeNodeDND from './TreeNodeDND.svelte';
  import { createTreeStore } from '../../../../stores/treeStore';
  import Sortable from 'sortablejs';
  import { onMount, onDestroy } from 'svelte';

  export let yamlData = [];  // Assuming this is the initial data for the tree
  const treeStore = createTreeStore(yamlData);  // Initialize the tree store with YAML data

  let container;  // DOM element reference for Sortable

  // Subscribe to the tree store
  let items = [];
  const unsubscribe = treeStore.subscribe(data => {
    items = data;  // Update items whenever the store changes
  });

  // Set up the Sortable functionality on mount
  let sortable;
  onMount(() => {
    sortable = new Sortable(container, {
      handle: '.drag-handle', // Selector for the drag handle
      animation: 150,          // Animation speed
      onEnd: evt => {
        const { oldIndex, newIndex } = evt;
        if (oldIndex !== newIndex) {
          treeStore.moveItemAndChildren(oldIndex, newIndex);  // Move the item in the store
        }
      }
    });
  });

  // Clean up Sortable and unsubscribe on component destroy
  onDestroy(() => {
    if (sortable) {
      sortable.destroy();
    }
    unsubscribe();  // Important to prevent memory leaks
  });
</script>

<!-- Bind the container element and render each tree node -->
<div bind:this={container}>
  {#each items as item (item.id)}
    <TreeNodeDND node={item} />
  {/each}
</div>