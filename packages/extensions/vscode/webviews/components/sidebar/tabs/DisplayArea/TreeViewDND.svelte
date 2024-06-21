<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Sortable from 'sortablejs';
  console.log('Before importing TreeNodeDND');
  import TreeNodeDND from './TreeNodeDND.svelte';
  console.log('After importing TreeNodeDND');

  export let yamlData = []; // Data prop is provided by the parent component

  let container; // DOM element for Sortable
  let sortable;  // Sortable instance

  // Structured array to track items with their state
  let items = [];

  // Ensure items are updated reactively when yamlData changes
  $: items = parseItems(yamlData);

  console.log('TreeViewDND: items', items);

  // Generate a unique identifier
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Parse data to construct a suitable structure for rendering
  function parseItems(data) {
    console.log('Parsing items:', data);
    return data.map(item =>  createItem(item, false));
  }

  function createItem(item, isOpen) {
    console.log('Creating item:', item);
    return {
      id: generateUUID(),
      key: item.key,
      value: item.value,
      isOpen, // All items initially expanded
      children: item.value && Array.isArray(item.value)
                ? item.value.map((value, index) => createItem({ key: index, value }, isOpen))
                : item.value && typeof item.value === 'object'
                ? Object.entries(item.value).map(([key, value]) =>
                    createItem({ key, value }, isOpen))
                : []
    };
  }
  function toggleOpen(id) {
    updateOpenState(items, id);
    items = [...items]; // Ensure reactivity by reassigning the items array
  }

  function updateOpenState(items, id) {
    items.forEach(item => {
      if (item.id === id) {
        item.isOpen = !item.isOpen;
      }
      if (item.children.length) {
        updateOpenState(item.children, id);
      }
    });
  }

  onMount(() => {
    sortable = new Sortable(container, {
      handle: '.drag-handle',
      animation: 150,
      group: 'listGroup-root',
      fallbackOnBody: true,
      ghostClass: 'sortable-ghost',
      onEnd: ({oldIndex, newIndex}) => {
        const movedItem = items.splice(oldIndex, 1)[0];
        items.splice(newIndex, 0, movedItem);
        console.log('Sortable onEnd: movedItem', movedItem);
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
    padding-left: 20px; /* Indent nested items */
  }

  .list-group-item {
    margin-bottom: 5px;
    padding: 5px;
    border: 1px solid #ddd;
    background-color: #fff;
  }
</style>

<div class="js-sortable list-group" bind:this={container}>
  {#each items as item (item.id)}
    <TreeNodeDND node={item} toggle={toggleOpen} />
  {/each}
</div>