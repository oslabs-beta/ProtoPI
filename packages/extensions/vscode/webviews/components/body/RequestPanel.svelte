<script>
  import UrlInput from './UrlInput.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let url = "";
  let method = "GET";
  let body = "";
</script>

<div class="space-y-4">
  <UrlInput bind:url />
  <div>
    <label for="method-select" class="block text-sm font-medium text-gray-700">Method</label>
    <select id="method-select" bind:value={method} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      <option>GET</option>
      <option>POST</option>
      <option>PUT</option>
      <option>DELETE</option>
    </select>
  </div>
  <div>
    <label for="body-textarea" class="block text-sm font-medium text-gray-700">Body</label>
    <textarea id="body-textarea" bind:value={body} rows="5" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
  </div>
  <button class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" on:click={() => dispatch('sendRequest', { url, method, body })}>Send</button>
</div>