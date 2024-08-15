<script lang='ts'>

  import MasterTreeView from './MasterTreeView.svelte';
  import type { TreeNode } from '../../../types/types';

  export let treeData: TreeNode[] = [];

  // const isDevelopment: boolean = (import.meta.env.MODE === 'development');
  const isDevelopment: boolean = false;

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
    <p class="text-white">[RequestsView] Open a file.  Or, if you tired, there's  maybe an error parsing OpenAPI specification.</p>
  {/if}
</div>