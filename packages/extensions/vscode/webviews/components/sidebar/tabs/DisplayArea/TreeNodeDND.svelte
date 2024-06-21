<script>
  import { onMount } from 'svelte';
  import Sortable from 'sortablejs';
  export let node;
  export let toggle; // Function passed from parent to handle toggling
  import TreeNodeDND from './TreeNodeDND.svelte';
  console.log('TreeNodeDND: node', node);

  let nestedContainer;

  let sortableOptions = JSON.stringify({
    animation: 150,
    group: `listGroup-${node.id}`
  });

  onMount(() => {
    if (nestedContainer) {
      new Sortable(nestedContainer, {
        handle: '.drag-handle',
        animation: 150,
        group: `listGroup-${node.id}`,
        fallbackOnBody: true,
        ghostClass: 'sortable-ghost',
        onEnd: ({ oldIndex, newIndex }) => {
          const movedItem = node.children.splice(oldIndex, 1)[0];
          node.children.splice(newIndex, 0, movedItem);
          console.log('Nested sortable onEnd: movedItem', movedItem);
        },
      });
    }
  });

  function handleToggle(event) {
    event.stopPropagation();
    toggle(node.id);
  }
</script>

<div class="node-container list-group-item">
  <span class="drag-handle">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="2" rx="1" fill="currentColor"/>
      <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
      <rect x="3" y="19" width="18" height="2" rx="1" fill="currentColor"/>
    </svg>
  </span>
  <span class="caret" on:click={handleToggle}>
      <svg class="{node.isOpen ? 'caret-open' : ''}" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  </span>
  <span class="node-label">{node.key}</span>
</div>
{#if node.isOpen && node.children.length}
  <div class="js-sortable list-group nested {node.isOpen ? 'open' : ''}" bind:this={nestedContainer} data-hs-sortable-options={sortableOptions} >
    {#each node.children as child (child.id)}
      <TreeNodeDND node={child} toggle={toggle} />
    {/each}
  </div>
{:else if node.isOpen && Array.isArray(node.value)}
  <div class="js-sortable list-group nested open" bind:this={nestedContainer} data-hs-sortable-options={sortableOptions} >
    {#each node.value as item, index}
      <TreeNodeDND node={{ id: generateUUID(), key: index, value: item, isOpen: false, children: [] }} toggle={toggle} />
    {/each}
  </div>
{:else if node.isOpen && typeof node.value === 'object'}
  <div class="js-sortable list-group nested open" bind:this={nestedContainer} data-hs-sortable-options={sortableOptions} >
    {#each Object.entries(node.value) as [key, value]}
      <TreeNodeDND node={{ id: generateUUID(), key, value, isOpen: false, children: [] }} toggle={toggle} />
    {/each}
  </div>
{/if}


<style>
  .node-container {
    display: flex;
    align-items: center;
  }
  .drag-handle {
    cursor: grab;
    margin-right: 5px; /* Space between handle and caret */
    display: flex;
    align-items: center;
  }
  .caret {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
  }
  .caret svg {
    transition: transform 0.3s ease;
  }
  .caret-open {
    transform: rotate(90deg);
  }
  .node-label {
    margin-left: 5px;
  }
  .nested {
    display: none;
    list-style-type: none; /* Remove default list styling */
    padding-left: 10px; /* Indent nested items */
  }
  .nested.open {
    display: block;
  }
  .sortable-ghost {
    background-color: #f0f0f0;
    opacity: 0.5;
  }
</style>
