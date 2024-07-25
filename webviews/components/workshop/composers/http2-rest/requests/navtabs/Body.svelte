<script>
  import MethodDropdownTransparent from '../../../../../asset-library/inputs/FilterActionDrop/MethodDropdownTransparent.svelte';
  import { writable } from 'svelte/store';

  export let active = false;
  let selectedMethod = "JSON";
  let showDropdown = false;

  // Define the initial content for the textarea
  const initialDetails = ``;

  const authDetails = writable(initialDetails);  

  const methods = [
  { label: 'JSON', action: () => {} },
  { label: 'XML', action: () => {} },
  { label: 'Text', action: () => {} },
  { label: 'Form URL Encoded', action: () => {} },
  { label: 'Multipart Form', action: () => {} },
  { label: 'SPARQL', action: () => {} },
  { label: 'No Body', action: () => {} }
];

  function onMethodChange(method) {
    selectedMethod = method;
    showDropdown = false;
  }

  function handleAuthDetailsChange(event) {
    authDetails.set(event.target.value);
  }
</script>

<style>
  .textarea-black {
    color: black; /* Explicitly setting the text color */
  }
</style>

<div class="{active ? 'block' : 'hidden'} max-w-4xl mx-auto">
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-semibold my-4 flex-1">Request Body</h2>
    <div class="flex flex-1 justify-center items-center">
        <MethodDropdownTransparent
          bind:selectedMethod={selectedMethod}
          methods={methods}
          showDropdown={showDropdown}
          {onMethodChange}
        />
    </div>
  </div>
  <textarea
    class="w-full h-48 mt-2 p-2 border border-gray-300 rounded-lg text-sm textarea-black"
    placeholder="Enter authorization details"
    bind:value={$authDetails}
    on:input={handleAuthDetailsChange}
  ></textarea>
</div>