<script>
  export let selectedMethod;
  export let methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
  export let showDropdown;
  export let onMethodChange;
  let filteredMethods = methods;

  function handleInput(event) {
    const value = event.target.value.toUpperCase();
    selectedMethod = value;
    filteredMethods = methods.filter(method => method.startsWith(value));
    showDropdown = true;
    onMethodChange(selectedMethod);
  }

  function selectMethod(method) {
    selectedMethod = method;
    showDropdown = false;
    onMethodChange(selectedMethod);
  }
</script>

<div class="relative w-full">
  <input 
    type="text" 
    bind:value={selectedMethod} 
    on:input={handleInput} 
    on:focus={() => showDropdown = true}
    on:blur={() => setTimeout(() => showDropdown = false, 200)}
    placeholder="Enter custom method" 
    class="border p-2 rounded w-full text-black pr-10" 
  />
  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>
  {#if showDropdown && filteredMethods.length > 0}
    <div class="absolute bg-white border rounded mt-1 shadow-lg z-10 w-full">
      {#each filteredMethods as method}
        <div 
          class="cursor-pointer p-2 hover:bg-gray-200 text-black" 
          role="button" 
          tabindex="0"
          on:mousedown={() => selectMethod(method)}>
          {method}
        </div>
      {/each}
    </div>
  {/if}
</div>