<script>
  import TreeNode from './TreeNode.svelte';
  import { createEventDispatcher } from 'svelte';

  export let pathsData = [];

  const dispatch = createEventDispatcher();

  function handleClick(event) {
    console.log('TreeView handleClick:', event.detail);
    dispatch('click', event.detail);
  }

  $: console.log('TreeView pathsData:', pathsData);
</script>

<ul>
  {#each pathsData as { key, value}(key)}
    <TreeNode {key} {value} on:click={handleClick} />
    {#if key === undefined || value === undefined}
      {console.log('TreeView node error:', { key, value})}
    {/if}
  {/each}
</ul>