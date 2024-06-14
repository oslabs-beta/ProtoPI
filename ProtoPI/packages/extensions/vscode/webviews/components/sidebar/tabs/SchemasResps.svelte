<script>
  let filterText = '';
</script>

<div>
  <input type="text" class="rounded-full px-2 py-1 border-2 border-dashed border-blue-500 focus:border-solid focus:border-blue-500 outline-none transition duration-200" bind:value={filterText} placeholder="Filter Resps ...">
</div>
<div class="h-80 overflow-y-auto bg-white p-2 border border-gray-300 mt-5">
  <!-- Content filtered based on filterText --> 
</div>