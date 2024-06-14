<script>
  import { treeState } from '../../../../stores/treeState.js';
  import { writable } from 'svelte/store';
  import TreeNode from './TreeNode.svelte';

  export let nodeId;
  export let label;
  export let children = [];
  export let summary = '';

  let isOpen = writable(false);
  let tooltipVisible = writable(false);
  let tooltipX = writable(0);
  let tooltipY = writable(0);
  let currentMethod = writable(null);

  function toggle() {
    isOpen.update(n => !n);
    treeState.update(state => {
      state[nodeId] = !state[nodeId];
      return state;
    });
  }

  function handleKey(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      toggle();
    }
  }

  function showTooltip(event, method) {
    currentMethod.set(method);
    tooltipX.set(event.clientX + 10);
    tooltipY.set(event.clientY - 30);
    tooltipVisible.set(true);
  }

  function hideTooltip() {
    tooltipVisible.set(false);
  }

  function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }
</script>

<style>
  .label {
    cursor: pointer;
    font-weight: bold;
  }
  .content {
    margin-left: 20px;
  }
  .method {
    margin-left: 20px;
  }
  .tooltip {
    position: absolute;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 10px;
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .tooltip.visible {
    visibility: visible;
    opacity: 1;
  }
</style>

<div class="node">
  <div class="label" on:click={toggle} on:keydown={handleKey} role="button" tabindex="0">
    {#if $isOpen} ▼ {:else} ▶ {/if} {label}
  </div>
  {#if $isOpen}
    <div class="content">
      {#if isObject(children) && children.length > 0}
        {#each children as child}
          <svelte:component this="{TreeNode}" nodeId={child.id} label={child.label} children={child.children} summary={child.summary} />
        {/each}
      {:else}
        {#each children as method}
          <div class="method" on:mousemove={(event) => showTooltip(event, method)} on:mouseleave={hideTooltip} role="tooltip">
            {method.label}
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>

{#if $tooltipVisible}
  <span class="tooltip" class:visible={$tooltipVisible} style="left: {$tooltipX}px; top: {$tooltipY}px;">
    {#if $currentMethod}
      {$currentMethod.summary}
    {/if}
  </span>
{/if}