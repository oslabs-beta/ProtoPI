<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Sortable from 'sortablejs';
  import { generateUUID } from './utility.js';
  console.log('Before importing TreeNodeDND');
  import TreeNodeDND from './TreeNodeDND.svelte';
  console.log('After importing TreeNodeDND');

  export let yamlData = []; // Data prop is provided by the parent component

  let container; // DOM element for Sortable
  let sortable;  // Sortable instance

  // Structured array to track items with their state
  let items = [];

  let key = 0; // Key to force re-render

  // Ensure items are updated reactively when yamlData changes
  $: items = parseItems(yamlData);

  console.log('TreeViewDND: items', items);

  // Parse data to construct a suitable structure for rendering
  function parseItems(data) {
    console.log('Parsing items:', data);
    return data.map(item =>  createItem(item, false, 1));
  }

  function createItem(item, isOpen, level) {
    const id = `L${level}-${generateUUID(level)}`;
    console.log('Creating item:', item, 'with id:', id);
    return {
      id,
      key: item.key,
      value: item.value,
      isOpen, // All items initially expanded
      children: item.value && Array.isArray(item.value)
                ? item.value.map((value, index) => createItem({ key: index, value }, isOpen, level+1))
                : item.value && typeof item.value === 'object'
                ? Object.entries(item.value).map(([key, value]) =>
                    createItem({ key, value }, isOpen, level+1))
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

  function flattenTree(nodes) {
    let result = [];
    nodes.forEach(node => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        result = result.concat(flattenTree(node.children));
      }
    });
    return result;
  }

  function findItemAndRemove(items, id) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        console.log('Removing item:', items[i]);
        return items.splice(i, 1)[0];
      }
      if (items[i].children && items[i].children.length > 0) {
        const result = findItemAndRemove(items[i].children, id);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  function insertItemAt(items, item, index) {
    if (index >= items.length) {
      items.push(item);
    } else {
      items.splice(index, 0, item);
    }
  }

  function moveItemAndChildren(items, oldIndex, newIndex) {
    const flatItems = flattenTree(items);
    const movedItem = findItemAndRemove(items, flatItems[oldIndex].id);
    if (!movedItem) {
      console.error('moveItemAndChildren: movedItem is undefined');
      return;
    }
    console.log('Moved item:', movedItem);
    insertItemAt(items, movedItem, newIndex);
  }

  function refreshTree() {
    key += 1;
  }

  onMount(() => {
    sortable = new Sortable(container, {
      handle: '.drag-handle',
      animation: 150,
      group: 'listGroup-root',
      fallbackOnBody: true,
      ghostClass: 'sortable-ghost',
      onEnd: ({oldIndex, newIndex}) => {

        moveItemAndChildren(items, oldIndex, newIndex);

        items = [...items];  // Ensure reactivity by reassigning the items array
        refreshTree(); // Force re-render
        console.log('Sortable onEnd: items', items);
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
<div key={key}>
  <div class="js-sortable list-group" bind:this={container}>
    {#each items as item (item.id)}
      <TreeNodeDND node={item} toggle={toggleOpen} generateUUID={generateUUID} level={1}/>
    {/each}
  </div>
</div>
