<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import Sortable from 'sortablejs';
  import { v4 as uuidv4 } from 'uuid';

  export let node;
  export let toggle; // Function passed from parent to handle toggling
  export let level = 1; // The nesting level

  let nestedContainer;

  onMount(() => {
    if (nestedContainer) {
      new Sortable(nestedContainer, {
        handle: '.drag-handle',
        animation: 150,
        group: `listGroup-${node.id}`,  // Ensures items can't be dragged between levels
        fallbackOnBody: true,
        ghostClass: 'sortable-ghost',
        onMove: (evt) => {
          const sourceLevel = getNodeLevel(evt.dragged);
          const targetLevel = getNodeLevel(evt.related);
          return sourceLevel === targetLevel;
        },
        onEnd: ({ oldIndex, newIndex }) => {
          if (oldIndex !== newIndex) {
            console.log('Nested sortable onEnd: oldIndex, newIndex', oldIndex, newIndex);
            const movedItem = node.children.splice(oldIndex, 1)[0];
            node.children.splice(newIndex, 0, movedItem);
            console.log('Nested sortable onEnd: movedItem', movedItem);
          }
        },
      });
    }
  });

  function handleToggle(event) {
    event.stopPropagation();
    toggle(node.id);
  }

  function getNodeLevel(element) {
    return parseInt(element.closest('.node-container').getAttribute('data-level'), 10);
  }

  const Lx = `L${level}`;
</script>

<div class="node-container list-group-item" data-level={level}>
  <span class="drag-handle">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="2" rx="1" fill="currentColor"/>
      <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
      <rect x="3" y="19" width="18" height="2" rx="1" fill="currentColor"/>
    </svg>
  </span>
  <span class="level-indicator">{Lx}</span>
  <span class="caret" on:click={handleToggle}>
    <svg class="{node.isOpen ? 'caret-open' : ''}" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="node-label">{node.key}</span>
</div>

{#if node.isOpen && node.children.length}
  <div class="js-sortable list-group nested open" bind:this={nestedContainer} data-level={level + 1}>
    {#each node.children as child (child.id)}
      <TreeNodeDND node={child} toggle={toggle} level={level + 1} />
    {/each}
  </div>
{:else if node.isOpen && Array.isArray(node.value)}
  <div class="js-sortable list-group nested open" bind:this={nestedContainer} data-level={level + 1}>
    {#each node.value as item, index}
      <TreeNodeDND node={{ id: uuidv4(), key: index, value: item, isOpen: false, children: [] }} toggle={toggle} level={level + 1} />
    {/each}
  </div>
{:else if node.isOpen && typeof node.value === 'object'}
  <div class="js-sortable list-group nested open" bind:this={nestedContainer} data-level={level + 1}>
    {#each Object.entries(node.value) as [key, value]}
      <TreeNodeDND node={{ id: uuidv4(), key, value, isOpen: false, children: [] }} toggle={toggle} level={level + 1} />
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
    margin-right: 5px; /* Space between handle and level indicator */
    display: flex;
    align-items: center;
  }
  .level-indicator {
    margin-right: 5px; /* Space between level indicator and caret */
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
  .sortable-ghost {
    background-color: #f0f0f0;
    opacity: 0.5;
  }
</style> -->





<script lang="ts">
  import { onMount } from 'svelte';
  import Sortable from 'sortablejs';
  import TreeNodeDND from './OLD_TreeNodeDND.svelte';

  
  export let node;
  export let toggle; // Function passed from parent to handle toggling
  export let level = 1; // The nesting level

  let nestedContainer;

  onMount(() => {
    if (nestedContainer) {
      new Sortable(nestedContainer, {
        handle: '.drag-handle',
        animation: 150,
        group: `listGroup-${node.id}`,  // Ensures items can't be dragged between levels
        fallbackOnBody: true,
        ghostClass: 'sortable-ghost',
        onMove: (evt) => {
          const sourceLevel = getNodeLevel(evt.dragged);
          const targetLevel = getNodeLevel(evt.related);
          return sourceLevel === targetLevel;
        },
        onEnd: ({ oldIndex, newIndex }) => {
          if (oldIndex !== newIndex) {
            console.log('Nested sortable onEnd: oldIndex, newIndex', oldIndex, newIndex);
            const movedItem = node.children.splice(oldIndex, 1)[0];
            node.children.splice(newIndex, 0, movedItem);
            console.log('Nested sortable onEnd: movedItem', movedItem);
          }
        },
      });
    }
  });

  function handleToggle(event) {
    event.stopPropagation();
    toggle(node.id);
  }

  const Lx = `L${level}`;

</script>

<div class="node-container list-group-item" data-level={level}>
  <span class="drag-handle">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="2" rx="1" fill="currentColor"/>
      <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
      <rect x="3" y="19" width="18" height="2" rx="1" fill="currentColor"/>
    </svg>
  </span>
  <span class="level-indicator">{Lx}</span>
  <span class="caret" on:click={handleToggle}>
    <svg class="{node.isOpen ? 'caret-open' : ''}" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="node-label">{node.key}</span>
</div>
{#if node.isOpen && node.children.length}
  <div class="js-sortable list-group nested open" bind:this={nestedContainer} data-level={level}>
    {#each node.children as child (child.id)}
      <TreeNodeDND node={child} toggle={toggle} level={level + 1} />
    {/each}
  </div>
{:else if node.isOpen && Array.isArray(node.value)}
  <div class="js-sortable list-group nested open" bind:this={nestedContainer} data-level={level}>
    {#each node.value as item, index}
      <TreeNodeDND node={{ id: `${node.id}-${index}`, key: index, value: item, isOpen: false, children: [] }} toggle={toggle} level={level + 1} />
    {/each}
  </div>
{:else if node.isOpen && typeof node.value === 'object'}
  <div class="js-sortable list-group nested open" bind:this={nestedContainer} data-level={level}>
    {#each Object.entries(node.value) as [key, value]}
      <TreeNodeDND node={{ id: `${node.id}-${key}`, key, value, isOpen: false, children: [] }} toggle={toggle} level={level + 1} />
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
    margin-right: 5px; /* Space between handle and level indicator */
    display: flex;
    align-items: center;
  }
  .level-indicator {
    margin-right: 5px; /* Space between level indicator and caret */
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
  .sortable-ghost {
    background-color: #f0f0f0;
    opacity: 0.5;
  }
</style>