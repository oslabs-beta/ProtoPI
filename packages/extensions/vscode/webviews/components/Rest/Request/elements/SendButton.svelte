<script>
  export let onSend;
  export let actions = [
    { label: "Save", action: "save" },
    { label: "Save and Send", action: "saveAndSend" },
    { label: "Send", action: "send" },
    { label: "Save As", action: "saveAs" }
  ];

  let showDropdown = false;

  function handleSend(action) {
    if (typeof onSend === 'function') {
      onSend(action);
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

<div class="relative w-full h-full">
  <div class="flex items-center bg-blue-500 text-white rounded w-full hover:bg-blue-600 h-full">
    <button on:click={() => handleSend("send")} class="flex-grow px-3 py-2 text-sm rounded-l h-full">Send</button>
    <div class="w-1/5 flex items-center justify-center bg-blue-700 rounded-r cursor-pointer h-full" on:click={toggleDropdown}>
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  </div>
  {#if showDropdown}
    <div class="absolute right-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
      {#each actions as action}
        <div class="cursor-pointer p-2 hover:bg-gray-200 text-black" on:click={() => handleSend(action.action)}>
          {action.label}
        </div>
      {/each}
    </div>
  {/if}
</div>
