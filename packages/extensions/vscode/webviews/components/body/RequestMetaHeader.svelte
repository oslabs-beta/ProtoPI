<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="p-4 bg-gray-300 flex justify-between items-center">
  <div class="flex items-center space-x-2">
    <div class="dropdown">
      <button class="bg-gray-400 text-white p-2 rounded">GET</button>
    </div>
    <div class="flex-grow">
      <input
        type="text"
        placeholder="Enter URL or paste text"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
  <div class="flex items-center space-x-2">
    <button class="bg-blue-500 text-white p-2 rounded">Send</button>
    <button class="bg-gray-400 text-white p-2 rounded">Save</button>
    <button class="bg-gray-400 text-white p-2 rounded">Share</button>
  </div>
</div>