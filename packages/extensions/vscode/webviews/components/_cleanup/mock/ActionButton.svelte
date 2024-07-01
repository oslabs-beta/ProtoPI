<script>
  export let onOpenAPIWithServer;
  export let onOpenAPIWithoutServer;
  export let onStartServerOnly;

  let showDropdown = false;
  let actions = [
    { label: "Open API file with Server Running", action: onOpenAPIWithServer },
    { label: "Open API File", action: onOpenAPIWithoutServer },
    { label: "Start Server Only", action: onStartServerOnly }
  ];

  let defaultAction = actions[0];

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

<div class="relative w-full">
  <div class="flex items-stretch bg-blue-500 text-white rounded hover:bg-blue-600 h-full">
    <button on:click={() => handleAction(defaultAction.action)} class="flex-grow px-3 py-2 text-sm rounded-l h-full text-left">
      {defaultAction.label}
    </button> 
    <div class="flex items-center justify-center bg-blue-700 rounded-r cursor-pointer h-full w-1/5" on:click={toggleDropdown}>
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  </div>
  {#if showDropdown}
    <div class="absolute left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
      {#each actions as action}
        <div class="cursor-pointer p-2 hover:bg-gray-200 text-black" on:click={() => handleAction(action.action)}>
          {action.label}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .dropdown-button {
    display: flex;
    align-items: center;
    background-color: #3b82f6; /* bg-blue-500 */
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem; /* rounded */
    cursor: pointer;
  }

  .dropdown-button:hover {
    background-color: #2563eb; /* hover:bg-blue-700 */
  }

  .dropdown-menu {
    position: absolute;
    background-color: white;
    border: 1px solid #d1d5db; /* border-gray-300 */
    border-radius: 0.375rem; /* rounded */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* shadow-lg */
    z-index: 10;
    margin-top: 0.5rem;
    left: 0;
  }

  .dropdown-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: black;
  }

  .dropdown-item:hover {
    background-color: #f3f4f6; /* hover:bg-gray-100 */
  }
</style>