<script>
  import { displayState } from '../../../../stores/displayStore';
  import { createEventDispatcher } from 'svelte';
  import Tooltip from './../../tooltip/Tooltip.svelte';

  let isSplit = false;
  let showTooltip = false;
  let tooltipContent = '';
  let tooltipX = 0;
  let tooltipY = 0;
  const dispatch = createEventDispatcher();

  displayState.subscribe($state => {
    isSplit = $state.isSplit;
    tooltipContent = isSplit ? 'Merge Views' : 'Split Views';
    dispatch('updateSplit', { isSplit });
  });

  function toggleSplitView() {
    displayState.update(state => ({ ...state, isSplit: !state.isSplit }));
  }

  function handleMouseEnter(event) {
    showTooltip = true;
    tooltipContent = isSplit ? 'Merge Views' : 'Split Views';
    tooltipX = event.clientX + 10;
    tooltipY = event.clientY + 10;
  }

  function handleMouseLeave() {
    showTooltip = false;
  }

  function handleMouseMove(event) {
    tooltipX = event.clientX + 10;
    tooltipY = event.clientY + 10;
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleSplitView();
      event.preventDefault(); // Prevent default scroll behavior for space key
    }
  }
</script>

<style>
  .icon-container {
    display: inline-block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    position: relative;
    color: yellow; /* Set the color to yellow */
  }

  .icon {
    width: 100%;
    height: 100%;
  }

  .icon-container:hover {
    border-color: #666;
  }

  .icon-container:focus {
    outline: none;
    border-color: #00aaff;
    box-shadow: 0 0 8px rgba(0, 170, 255, 0.75);
  }
</style>

<div 
  class="icon-container" 
  on:click={toggleSplitView} 
  on:mouseenter={handleMouseEnter} 
  on:mouseleave={handleMouseLeave} 
  on:mousemove={handleMouseMove} 
  on:keydown={handleKeyDown}
  tabindex="0"
  role="button"
>
  {#if isSplit}
    <svg class="icon" viewBox="0 0 24 24">
      <g>
        <rect x="2" y="4" width="9" height="16" fill="currentColor"/>
        <rect x="13" y="4" width="9" height="16" fill="currentColor"/>
      </g>
    </svg>
  {:else}
    <svg class="icon" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
    </svg>
  {/if}
  {#if showTooltip}
    <Tooltip content={tooltipContent} x={tooltipX} y={tooltipY} />
  {/if}
</div>
