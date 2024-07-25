<script lang="ts">
  import MasterNode from './MasterNode.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { TreeNode as TreeNodeType } from '../../../stores/fileMgmt/tnodeStore';
  import Tooltip from '../../asset-library/tooltip/Tooltip.svelte';
  import { getSvgIconPath } from './common/svgRouter';
  import { getBulletOrArrow } from './common/bulletRouter';

  export let node: TreeNodeType;

  const dispatch = createEventDispatcher();

  let showTooltip = false;
  let tooltipContent = '';
  let tooltipX = 0;
  let tooltipY = 0;

  function toggle() {
    if (node.children.length > 0) {
      dispatch('toggle', { id: node.id });
      node.isOpen = !node.isOpen;
    }
  }

  function getHoverLabel(node) {
    let label = '';
    const summaryItem = node.children.find(child => child.key === 'summary');
    const descriptionItem = node.children.find(child => child.key === 'description');
    const firstItem = node.children[0];

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
    tooltipX = event.clientX + 10;
    tooltipY = event.clientY + 10;
    showTooltip = !!tooltipContent;
  }

  function handleMouseOut() {
    showTooltip = false;
  }

  function handleMouseMove(event) {
    const margin = 10;
    tooltipX = Math.min(event.clientX + margin, window.innerWidth - margin);
    tooltipY = Math.min(event.clientY + margin, window.innerHeight - margin);
  }

  function handleFocus(event) {
    handleMouseOver(event);
  }

  function handleBlur() {
    handleMouseOut();
  }

  $: showTooltip && (tooltipX = Math.min(tooltipX, window.innerWidth - 150));
  $: showTooltip && (tooltipY = Math.min(tooltipY, window.innerHeight - 50));
</script>

<div class="node pl-5 border-l border-dashed border-gray-600">
  <div 
    class="header flex items-start cursor-pointer select-none relative"
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
      {getBulletOrArrow(node.children.length, node.isOpen)}
    </span>
    <span class="icon-container pr-1">
      <img src={getSvgIconPath(node.key)} alt="Icon" class="icon-img fixed-size-icon" />
    </span>
    <div class="content flex-grow hanging-indent">
      {#if node.children.length > 0}
        <span class="label font-bold text-white node-label">
          {node.key}
        </span>
      {:else}
        <div class="dictionary-item">
          <span class="key font-bold text-orange-500">{node.key}:</span>
          <span class="value text-gray-400">{node.value}</span>
        </div>
      {/if}
    </div>
    {#if showTooltip}
      <Tooltip content={tooltipContent} x={tooltipX} y={tooltipY} />
    {/if}
  </div>

  {#if node.isOpen && node.children.length > 0}
    <div class="children pt-1">
      {#each node.children as child (child.id)}
        <MasterNode node={child} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .hanging-indent {
    display: block;
    text-indent: -1em; /* Indent the first line */
    padding-left: 1em; /* Offset the hanging indent */
    margin-left: 0;
  }
  .node-label {
    margin-left: 5px;
  }
  .dictionary-item {
    display: inline; /* Ensure key and value are on the same line */
  }
  .header .icon-container {
    display: flex;
    align-items: center;
    flex-shrink: 0; /* Prevent shrinking */
  }
  .toggle {
    display: inline-block;
    width: 1.5em; /* Fixed width */
    text-align: center;
    font-size: 14px; /* Fixed size */
    line-height: 1.5em; /* Ensure proper vertical alignment */
    flex-shrink: 0; /* Prevent resizing */
  }
  .icon-img.fixed-size-icon {
    width: 12px !important; /* Adjust width as needed */
    height: 12px !important; /* Adjust height as needed */
    flex-shrink: 0; /* Prevent resizing */
    object-fit: contain; /* Ensure it fits within the given dimensions */
    display: block; /* Ensure it's treated as a block element */
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-indent: -1em; /* Apply hanging indent */
    padding-left: 1em; /* Offset the hanging indent */
  }
  .key {
    margin-left: 5px; /* Adjust to match label spacing */
  }
  .value {
    display: inline; /* Ensure value stays on the same line */
  }
  .header {
    align-items: flex-start; /* Align items to the top */
  }
  .dictionary-item {
    align-items: flex-start; /* Align items to the top */
  }
</style>