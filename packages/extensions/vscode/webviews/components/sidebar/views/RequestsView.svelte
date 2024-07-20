<script lang='ts'>

  import MasterTreeView from './MasterTreeView.svelte';
  import type { TreeNode } from '../../../types/types';

  export let treeData: TreeNode[] = [];

  const isDevelopment: boolean = (import.meta.env.MODE === 'development');

</script>

<div>
  {#if treeData && treeData.length > 0}
    {#if isDevelopment}
      <p>[DevMode] File opened ... RequestsView.svelte rendered ... </p>
    {/if}
    {#each treeData as node}
      <MasterTreeView treeStore={node} />
    {/each}
  {:else}
    <p class="text-white">Error parsing OpenAPI specification.</p>
  {/if}
</div>