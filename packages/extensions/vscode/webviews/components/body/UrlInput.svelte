<script>
  export let url;
</script>

<div>
  <label for="url-input" class="block text-sm font-medium text-gray-700">URL</label>
  <input id="url-input" type="text" bind:value={url} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
</div>