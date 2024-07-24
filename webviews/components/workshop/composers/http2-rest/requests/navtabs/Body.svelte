<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let active = false;

  const bodyContent = writable('');
  const bodyMode = writable('JSON');
  const showDropdown = writable(false);

  const handleBodyModeChange = (mode) => {
    bodyMode.set(mode);
  };

  const handleBodyContentChange = (e) => {
    bodyContent.set(e.target.value);
  };
</script>

{#if active}
  <div class="p-4">
    <h2 class="mb-2 text-lg font-bold">Request Body</h2>
    <div class="relative inline-block">
      <button
        class="bg-gray-200 text-black px-4 py-2 border border-gray-400 rounded flex items-center"
        on:click={() => showDropdown.update(value => !value)}
      >
        { $bodyMode }
        <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {#if $showDropdown}
        <div class="absolute bg-gray-200 mt-2 w-full border border-gray-400 rounded shadow-lg z-10">
          {#each ['JSON', 'XML', 'Text', 'Form URL Encoded', 'Multipart Form', 'SPARQL', 'No Body'] as method}
            <div
              class="py-2 px-4 cursor-pointer hover:bg-gray-300"
              on:click={() => {
                handleBodyModeChange(method);
                showDropdown.set(false);
              }}
            >
              {method}
            </div>
          {/each}
        </div>
      {/if}
    </div>
    <textarea
      class="w-full h-48 mt-2 p-2 border border-gray-300 rounded-lg text-sm"
      placeholder="Enter body content"
      on:input={handleBodyContentChange}
    ></textarea>
  </div>
{/if}

<style>
  /* Additional Tailwind CSS classes can be added directly to elements as needed */
</style>
