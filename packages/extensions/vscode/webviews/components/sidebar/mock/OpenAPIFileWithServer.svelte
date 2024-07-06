<script>
  export let onClick;
</script>

<div class="p-2">
  <button
    class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full"
    on:click={onClick}
  >
    Open API File With Server
  </button>
</div>