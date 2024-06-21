<script>
  export let node;
  export let toggle; // Function passed from parent to handle toggling
  import TreeNodeDND from './TreeNodeDND.svelte';
  console.log('TreeNodeDND: node', node);

  function handleToggle(event) {
    event.stopPropagation();
    toggle(node.id);
  }
</script>

<div class="node-container">
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
  <span class="node-label">{node.id}</span>
</div>
{#if node.isOpen && node.children.length}
  <ul class="nested {node.isOpen ? 'open' : ''}">
    {#each node.children as child (child.id)}
    <li>
      <TreeNodeDND node={child} toggle={toggle} />
    </li>
    {/each}
  </ul>
{:else if node.isOpen && Array.isArray(node.value)}
  <ul class="nested open">
    {#each node.value as item, index}
      <li>
        <TreeNodeDND node={{ id: index, value: item, isOpen: false, children: [] }} toggle={toggle} />
      </li>
    {/each}
    </ul>
  {:else if node.isOpen && typeof node.value === 'object'}
    <ul class="nested open">
      {#each Object.entries(node.value) as [key, value]}
        <li>
          <TreeNodeDND node={{ id: key, value, isOpen: false, children: [] }} toggle={toggle} />
        </li>
      {/each}
    </ul>
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
    padding-left: 20px; /* Indent nested items */
  }
  .nested.open {
    display: block;
  }
</style>
