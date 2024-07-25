<script>
  import MethodDropdownTransparent from '../../../../../asset-library/inputs/FilterActionDrop/MethodDropdownTransparent.svelte';
  import { writable } from 'svelte/store';

  export let active = false;
  let selectedMethod = "awsv4";
  let showDropdown = false;

  // Define the initial content for the textarea
  const initialDetails = `
  AWS V4 Auth - AWS details
  Basic Auth - Username & password
  Bearer Auth - Token
  Digest Auth - Digest Authentication Details
  OAuth2 - OAuth2 Details
  inherited Auth`;

  const authDetails = writable(initialDetails);  // Set the initial content as the value of the store

  const methods = [
  { label: 'awsv4', action: () => {} },
  { label: 'basic', action: () => {} },
  { label: 'bearer', action: () => {} },
  { label: 'digest', action: () => {} },
  { label: 'oauth2', action: () => {} },
  { label: 'SPARQL', action: () => {} },
  { label: 'inherit', action: () => {} }
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
    <h2 class="text-2xl font-semibold my-4 flex-1">Authorization</h2>
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