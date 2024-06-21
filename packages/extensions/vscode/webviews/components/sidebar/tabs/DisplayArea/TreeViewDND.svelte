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

  $: items = parseItems(yamlData);

  console.log('TreeViewDND: items', items);

  // Parse data to construct a suitable structure for rendering
  function parseItems(data) {
    console.log('Parsing items:', data);
    return data.map(item =>  createItem(item, false));
  }

  function createItem(item, isOpen) {
    console.log('Creating item:', item);
    return {
      id: item.key,
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
  ul {
    list-style: none;
    padding-left: 20px;
  }

  li {
    margin-bottom: 5px;
  }
</style>

<ul bind:this={container}>
  {#each items as item (item.id)}
    <li>
      <TreeNodeDND node={item} toggle={toggleOpen} />
    </li>
  {/each}
</ul>