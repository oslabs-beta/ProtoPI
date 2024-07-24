<script>
  import { onMount, onDestroy } from 'svelte';
  import Dropdown from './parts/DropdownFeature.svelte';

  export let selectedMethod = "";
  export let methods = [];
  export let showDropdown = false;
  export let onMethodChange;
  export let editButton = false;
  export let hoverDrop = true;

  let filteredMethods = methods;
  let container;
  let inputWidth = 'auto';

  function handleInput(event) {
    const value = event.target.value.toUpperCase();
    selectedMethod = value;
    filteredMethods = methods.filter(method => method.label.toUpperCase().startsWith(value));
    showDropdown = true;
    onMethodChange(selectedMethod);
  }

  function handleMethodSelect(method) {
    selectedMethod = method.label;
    showDropdown = false;
    method.action();
    onMethodChange(selectedMethod);
  }

  function handleClickOutside(event) {
    if (container && !container.contains(event.target)) {
      showDropdown = false;
    }
  }

  function calculateWidth() {
    if (methods.length === 0) {
      inputWidth = 'auto';
      return;
    }
    const longestMethod = methods.reduce((a, b) => (a.label.length > b.label.length ? a : b)).label;
    const span = document.createElement("span");
    span.style.font = "inherit";
    span.style.visibility = "hidden";
    span.style.whiteSpace = "pre";
    span.textContent = longestMethod;
    document.body.appendChild(span);
    inputWidth = `${span.offsetWidth + 40}px`; // 40px for padding
    document.body.removeChild(span);
  }

  onMount(() => {
    calculateWidth();
    document.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<div>
  <div class="relative w-full" bind:this={container}>
    {#if editButton}
      <input 
        type="text" 
        bind:value={selectedMethod} 
        on:input={handleInput} 
        on:focus={() => showDropdown = true}
        placeholder="Enter custom method" 
        class="bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none ease-in-out" 
        style="outline: none; box-shadow: none; width: {inputWidth};"
      />
    {:else}
      <button 
        class="bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none ease-in-out"
        on:click={() => showDropdown = !showDropdown}
        on:mouseover={() => hoverDrop && (showDropdown = true)}
        on:focus={() => hoverDrop && (showDropdown = true)}
        style="outline: none; box-shadow: none; width: {inputWidth};">
        {selectedMethod || 'Select method'}
      </button>
    {/if}
    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
    <Dropdown 
      options={filteredMethods} 
      selectedOption={selectedMethod} 
      showDropdown={showDropdown} 
      onOptionSelect={handleMethodSelect} 
      {editButton}
    />
  </div>
</div>
