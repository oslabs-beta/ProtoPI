<script>
  import { onMount, afterUpdate } from "svelte";
  export let actions = [];
  export let defaultLabel = "Select an action";
  export let caretWidth = "40px"; // Width of the caret section

  let showDropdown = false;
  let defaultAction = actions.length > 0 ? actions[0] : { label: defaultLabel, action: () => {} };
  let remainingActions = actions.slice(1);
  let buttonWidth = 'auto';

  // Determine the width based on the longest label if width is not provided
  function determineWidth() {
    let labels = actions.map(action => action.label).concat([defaultLabel]);
    let longestLabel = labels.reduce((longest, label) => {
      return label.length > longest.length ? label : longest;
    }, "");

    // Create a temporary element to measure the text width
    const tempEl = document.createElement('span');
    tempEl.style.visibility = 'hidden';
    tempEl.style.position = 'absolute';
    tempEl.style.whiteSpace = 'nowrap';
    tempEl.textContent = longestLabel;
    document.body.appendChild(tempEl);
    const textWidth = tempEl.offsetWidth;
    document.body.removeChild(tempEl);

    return `${textWidth-10}px`; // No extra padding added here
  }

  function setButtonWidth() {
    buttonWidth = `calc(${determineWidth()} + ${caretWidth} + 16px)`; // +16px for left padding
  }

  onMount(setButtonWidth);
  afterUpdate(setButtonWidth);

  function handleAction(action) {
    if (typeof action === 'function') {
      action();
    }
    showDropdown = false;
  }

  function toggleDropdown(event) {
    event.stopPropagation();
    showDropdown = !showDropdown;
  }

  function hideDropdown() {
    showDropdown = false;
  }

  // Hide the dropdown when clicking outside
  document.addEventListener('click', hideDropdown);
</script>

<div class="relative inline-flex" style="width: {buttonWidth};">
  <div class="flex items-stretch bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
    <button on:click={() => handleAction(defaultAction.action)} class="px-4 py-2 text-sm rounded-l text-left truncate" style="flex: 1;">
      {defaultAction.label}
    </button> 
    <button aria-expanded={showDropdown} class="flex items-center justify-center bg-blue-700 rounded-r cursor-pointer" style="width: {caretWidth};" on:click={toggleDropdown}>
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
  </div>
  {#if showDropdown && remainingActions.length > 0}
    <div role="menu" class="absolute left-0 top-full mt-1 bg-white border rounded shadow-lg z-10" style="width: {buttonWidth};">
      {#each remainingActions as action}
        <button role="menuitem" tabindex="0" class="cursor-pointer px-4 py-2 text-sm hover:bg-gray-200 text-black" on:click={() => handleAction(action.action)}>
          {action.label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>

/*  UNUSED
  .dropdown-button {
    display: inline-flex;
    align-items: center;
    background-color: #3b82f6; 
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
  }

  .dropdown-button:hover {
    background-color: #2563eb; 
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.25rem;
    background-color: white;
    border: 1px solid #d1d5db; 
    border-radius: 0.375rem; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 100%; 
  }

  .dropdown-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: black;
    font-size: 0.875rem; 
  }

  .dropdown-item:hover {
    background-color: #f3f4f6;
  }

  button {
    white-space: nowrap; 
  }
  */

</style>