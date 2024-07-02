<script>
  import TreeNode from './TreeNode.svelte';

  export let treeData = [];
</script>

<div class="treeview">
  {#each treeData as node}
    <TreeNode nodeId={node.id} label={node.label} children={node.children} summary={node.summary} />
  {/each}
</div>
