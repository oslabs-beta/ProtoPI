<script>
  export let nodes = [];
  import TreeNode from './TreeNode.svelte';
</script>

<div class="bg-[#1F1F1F] text-white overflow-y-auto p-4 mt-2.5 border-[#181818] border-4 rounded-2xl h-[20em] box-border">
  {#each nodes as node (node.id)}
    <TreeNode {node} />
  {/each}
</div>