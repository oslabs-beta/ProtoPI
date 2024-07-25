<script>
  export let options = [];
  export let selectedOption = '';
  export let showDropdown = false;
  export let onOptionSelect;

  function selectOption(option) {
    selectedOption = option.label;
    showDropdown = false;
    option.action();
    onOptionSelect(option);
  }
</script>

<div class="relative w-full">
  {#if showDropdown && options.length > 0}
    <div class="absolute bg-white border rounded mt-1 shadow-lg z-10 w-full">
      {#each options as option}
        <div 
          class="cursor-pointer p-2 hover:bg-gray-200 text-black" 
          role="button" 
          tabindex="0"
          on:mousedown={() => selectOption(option)}>
          {option.label}
        </div>
      {/each}
    </div>
  {/if}
</div>
