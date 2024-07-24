<script>
  export let url = "";

  function handleUrlChange(event) {
    url = event.target.value;
  }
</script>

<input 
  type="text" 
  bind:value={url} 
  on:input={handleUrlChange} 
  placeholder="Enter URL or paste text" 
  class="border p-2 rounded w-full text-black" 
/>
