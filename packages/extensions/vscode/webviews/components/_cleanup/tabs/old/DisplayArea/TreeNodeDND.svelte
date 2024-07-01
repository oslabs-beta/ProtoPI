<script>
  import TreeNodeDND from './OLD_TreeNodeDND.svelte'; // Correct path for recursive import
  import { createEventDispatcher } from 'svelte';
  export let node;

  const dispatch = createEventDispatcher();

  // Function to handle the toggle action
  function toggle() {
    dispatch('toggle', { id: node.id });
  }
</script>

<!-- Node structure -->
<div class="node">
  <!-- Node header with toggle icon and label -->
  <div class="header" on:click={toggle}>
    <span class="toggle">{node.isOpen ? '▼' : '►'}</span>
    <span class="label">{node.key}</span>  <!-- Display node key as label -->
  </div>

  <!-- Children nodes are displayed only if the node is open -->
  {#if node.isOpen}
    <div class="children">
      {#each node.children as child (child.id)}
        <TreeNodeDND node={child} />  <!-- Recursive component usage for children -->
      {/each}
    </div>
  {/if}
</div>

<!-- Styling for the TreeNodeDND component -->
<style>
  .node {
    padding-left: 20px;    /* Indent child nodes */
    border-left: 1px dashed #ccc; /* Visual separation of nodes */
  }
  .header {
    cursor: pointer;       /* Indicates the header is clickable */
    user-select: none;     /* Prevent text selection on click */
  }
  .toggle {
    padding-right: 5px;    /* Spacing between toggle icon and label */
  }
  .label {
    font-weight: bold;     /* Make the label more prominent */
  }
  .children {
    padding-top: 5px;      /* Space above child nodes */
  }
</style>
