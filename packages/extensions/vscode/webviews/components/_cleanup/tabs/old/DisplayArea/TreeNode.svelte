<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  export let key;
  export let value;
  
  const dispatch = createEventDispatcher();
  let isCollapsed = true;
  let tooltipText = '';
  let showTooltip = false;
  let tooltipX = 0;
  let tooltipY = 0;

  function handleClick(item) {
    console.log('TreeNode clicked:', item);
    dispatch('click', { node: item });
  }

  function handleClipboardClick(item) {
    console.log('Clipboard clicked:', item);
    dispatch('clipboardClick', { node: item });
  }

  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }

  function handleMouseEnter(method, details, event) {
    const description = details.summary || details.description || "No summary or description available";
    console.log("Method and details:", method, details); // Debug statement
    tooltipText = `${method.toUpperCase()}: ${description}`;
    showTooltip = true;
    tooltipX = event.clientX + 15; // Offset to the right
    tooltipY = event.clientY + 15; // Offset below
  }

  function handleMouseLeave() {
    showTooltip = false;
  }

  function handleStatusMouseEnter(description, event) {
    tooltipText = description || "No description available";
    showTooltip = true;
    tooltipX = event.clientX + 15; // Offset to the right
    tooltipY = event.clientY + 15; // Offset below
  }

  function getMethodStyle(method) {
    switch (method.toLowerCase()) {
      case 'get':
        return 'color: green; font-weight: bold;';
      case 'post':
        return 'color: blue; font-weight: bold;';
      case 'put':
        return 'color: orange; font-weight: bold;';
      case 'delete':
        return 'color: red; font-weight: bold;';
      case 'patch':
        return 'color: purple; font-weight: bold;';
      case 'options':
        return 'color: teal; font-weight: bold;';
      case 'head':
        return 'color: brown; font-weight: bold;';
      default:
        return 'color: black; font-weight: bold;';
    }
  }

  $: console.log('TreeNode received:', { key, value });
</script>

<style>
  .tree-node {
    cursor: pointer;
    padding: 5px;
    position: relative; /* Needed for positioning tooltip */
  }

  .tree-node:hover {
    background-color: #f0f0f0;
  }

  .collapsed {
    display: none;
  }

  .toggle-icon {
    cursor: pointer;
    margin-right: 5px;
  }

  .tooltip {
    position: fixed; /* Fixed positioning relative to the viewport */
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
  }

  .clipboard-icon {
    cursor: pointer;
    margin-left: 10px;
  }
</style>

<li>
  <div class="tree-node">
    <span class="toggle-icon" on:click={toggleCollapse}>
      {isCollapsed ? '+' : '-'}
    </span>
    <span on:click={toggleCollapse}>
      {key}
    </span>
    <span class="clipboard-icon" on:click={() => handleClipboardClick({ key, value })}>
      📋
    </span>
  </div>
  {#if typeof value === 'object' && value !== null && !isCollapsed}
    <ul>
      {#each Object.entries(value) as [method, details]}
        <li
          class="tree-node"
          on:click={() => handleClick({ key, method, details })}
          on:mouseenter={(e) => handleMouseEnter(method, details, e)}
          on:mouseleave={handleMouseLeave}
          style={getMethodStyle(method)}
        >
          {method.toUpperCase()}
          {#if details.responses}
            <ul>
              {#each Object.entries(details.responses) as [statusCode, response]}
                <li
                  class="tree-node"
                  on:mouseenter={(e) => handleStatusMouseEnter(response.description, e)}
                  on:mouseleave={handleMouseLeave}
                >
                  {statusCode}
                  {#if showTooltip && tooltipText === response.description}
                    <div class="tooltip" style="top: {tooltipY}px; left: {tooltipX}px;">
                      {tooltipText}
                    </div>
                  {/if}
                </li>
              {/each}
            </ul>
          {/if}
          {#if showTooltip && tooltipText.startsWith(method.toUpperCase())}
            <div class="tooltip" style="top: {tooltipY}px; left: {tooltipX}px;">
              {tooltipText}
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</li>