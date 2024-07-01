<script lang="ts">
  import TreeNodeDND from './TreeNode.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { TreeNode as TreeNodeType } from '../../../../stores/treeStore';
  import globeIconPath from '../asset-library/svgs/globe.svg'; // Import the SVG file

  export let node: TreeNodeType;

  const dispatch = createEventDispatcher();

  function toggle() {
    dispatch('toggle', { id: node.id });
    node.isOpen = !node.isOpen;
  }

  console.log('Rendering node:', node);
</script>

<div class="node pl-5 border-l border-dashed border-gray-600">
  <div class="header flex items-center cursor-pointer select-none" on:click={toggle}>
    <span class="toggle pr-1 text-yellow-500">
      {node.isOpen ? '▼' : '►'}
    </span>
    <span class="icon pr-1">
      {#if node.key === 'paths'}
        <img src={globeIconPath} alt="Globe icon" class="w-4 h-4" />
      {:else if node.yesChildren.length > 0}
        <i class="has-children text-blue-500">📁</i>
      {:else}
        <i class="no-children text-green-500">📄</i>
      {/if}
    </span>
    <span class="label font-bold text-white">
      {node.key}
    </span>
  </div>

  {#if node.isOpen}
    <div class="children pt-1">
      {#each Object.entries(node.noChildren) as [key, value]}
        <div class="no-children" style="padding-left: {node.level * 28}px">
          <div class="dictionary-item hanging-indent">
            <span class="key font-bold text-orange-500">{key}:</span>
            <span class="value text-gray-400">{JSON.stringify(value)}</span>
          </div>
        </div>
      {/each}
      {#each node.yesChildren as child (child.id)}
        <TreeNodeDND node={child} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .hanging-indent {
    text-indent: -1em;
    padding-left: 1em;
    margin-left: 1em;
  }
</style>