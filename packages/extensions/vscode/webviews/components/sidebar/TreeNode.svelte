<script lang="ts">
  import TreeNodeDND from './TreeNode.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { TreeNode as TreeNodeType } from '../../stores/fileMgmt/tsaveStore';
  import globeIconPath from '../asset-library/svgs/globe.svg'; // Import the SVG file
  import Tooltip from '../asset-library/tooltip/Tooltip.svelte'; // Import the Tooltip component

  export let node: TreeNodeType;

  const dispatch = createEventDispatcher();

  let showTooltip = false;
  let tooltipContent = '';
  let tooltipX = 0;
  let tooltipY = 0;

  function toggle() {
    dispatch('toggle', { id: node.id });
    node.isOpen = !node.isOpen;
  }

  function getHoverLabel(node) {
    let label = '';
    const summaryItem = node.noChildren.find(child => child.key === 'summary');
    const descriptionItem = node.noChildren.find(child => child.key === 'description');
    const firstItem = node.noChildren[0];

    if (summaryItem) {
      label = summaryItem.value;
    } else if (descriptionItem) {
      label = descriptionItem.value;
    } else if (firstItem) {
      label = `${firstItem.key}: ${firstItem.value}`;
    }

    return label;
  }

  function handleMouseOver(event) {
    tooltipContent = getHoverLabel(node);
    console.log('Hovering over node:', node.key, 'Label:', tooltipContent);
    tooltipX = event.clientX + 10; // Adjust as needed to position the tooltip
    tooltipY = event.clientY + 10; // Adjust as needed to position the tooltip
    showTooltip = !!tooltipContent; // Show tooltip only if there's content
  }

  function handleMouseOut() {
    showTooltip = false;
  }

  function handleMouseMove(event) {
    const margin = 10; // Margin from the edges
    tooltipX = Math.min(event.clientX + margin, window.innerWidth - margin);
    tooltipY = Math.min(event.clientY + margin, window.innerHeight - margin);
  }

  function handleFocus(event) {
    handleMouseOver(event);
  }

  function handleBlur() {
    handleMouseOut();
  }

  // console.log('Rendering node:', node);
</script>

<div class="node pl-5 border-l border-dashed border-gray-600">
  <div 
    class="header flex items-center cursor-pointer select-none relative"
    role="button"
    tabindex="0"
    on:click={toggle}
    on:keydown={(e) => e.key === 'Enter' && toggle()}
    on:mouseover={handleMouseOver}
    on:mousemove={handleMouseMove}
    on:mouseout={handleMouseOut}
    on:focus={handleFocus}
    on:blur={handleBlur}
  >
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
    <span class="label font-bold text-white node-label">
      {node.key}
    </span>
    {#if showTooltip}
      <Tooltip content={tooltipContent} x={tooltipX} y={tooltipY} />
    {/if}
  </div>

  {#if node.isOpen}
    <div class="children pt-1">
      {#each node.noChildren as child (child.id)}
        <div class="no-children" style="padding-left: {node.level * 28}px">
          <div class="dictionary-item hanging-indent">
            <span class="key font-bold text-orange-500">{child.key}:</span>
            <span class="value text-gray-400">{child.value}</span>
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
  .node-label {
    margin-left: 5px;
  }
</style>