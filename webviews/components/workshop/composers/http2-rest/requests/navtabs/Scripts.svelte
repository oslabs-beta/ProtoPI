<script>
  import { writable } from 'svelte/store';

  export let active = false;

  let requestScript = writable('console.log("Pre Request Script");');
  let responseScript = writable('console.log("Post Response Script");');

  const handleScriptChange = (e, type) => {
    if (type === 'request') {
      requestScript.set(e.target.value);
    } else {
      responseScript.set(e.target.value);
    }
  };

  const handleRun = () => {
    console.log("Run script");
  };

  const handleSave = () => {
    console.log("Save script");
  };
</script>

<style>
  .textarea-style {
    width: 100%;
    height: 192px; /* 12 * 16px = 192px to match height 48 from Body.svelte */
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    line-height: 1.5; /* Ensuring proper line height */
    color: black; /* Text color set explicitly */
  }
</style>

{#if active}
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-semibold my-4">Pre Request Script</h2>
    <textarea
      class="textarea-style placeholder-gray-500"
      placeholder="Enter pre-request script"
      on:input={(e) => handleScriptChange(e, 'request')}
      bind:value={$requestScript}
    ></textarea>

    <div class="flex justify-start items-center mt-2">
      <button 
      class="w-20 w-auto bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent  text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none ease-in-out flex items-center group"        
      on:click={handleRun}>
        <svg class="fill-current text-gray-300 group-hover:text-gray-500" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2V14.4805L12.9146 8.24024L4 2ZM11.1809 8.24024L4.995 12.5684V3.91209L11.1809 8.24024Z"/>
        </svg>
        <span class="ml-1">Run</span>
      </button>
    
      <button 
      class="w-22 w-auto bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent  text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none ease-in-out flex items-center group"
            on:click={handleSave}>
        <svg class="fill-current text-gray-300 group-hover:text-gray-500" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.353 1.146L14.853 2.646L15 3V14.5L14.5 15H1.5L1 14.5V1.5L1.5 1H13L13.353 1.146ZM2 2V14H14V3.208L12.793 2H11V6H4V2H2ZM8 2V5H10V2H8Z"/>
        </svg>
        <span class="ml-1">Save</span>
      </button>
    </div>


    <h2 class="my-4 text-2xl font-semibold">Post Response Script</h2>
    <textarea
      class="textarea-style placeholder-gray-500"
      placeholder="Enter post-response script"
      on:input={(e) => handleScriptChange(e, 'response')}
      bind:value={$responseScript}
    ></textarea>



    <div class="flex justify-start items-center mt-2">
      <button 
      class="px-4 py-2 w-20 w-auto bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent  text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none ease-in-out flex items-center group"        
      on:click={handleRun}>
        <svg class="fill-current text-gray-300 group-hover:text-gray-500" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2V14.4805L12.9146 8.24024L4 2ZM11.1809 8.24024L4.995 12.5684V3.91209L11.1809 8.24024Z"/>
        </svg>
        <span class="ml-1">Run</span>
      </button>
    
      <button 
      class="px-4 py-2 w-22 w-auto bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent  text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none ease-in-out flex items-center group"
            on:click={handleSave}>
        <svg class="fill-current text-gray-300 group-hover:text-gray-500" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.353 1.146L14.853 2.646L15 3V14.5L14.5 15H1.5L1 14.5V1.5L1.5 1H13L13.353 1.146ZM2 2V14H14V3.208L12.793 2H11V6H4V2H2ZM8 2V5H10V2H8Z"/>
        </svg>
        <span class="ml-1">Save</span>
      </button>
    </div>

  </div>
{/if}
