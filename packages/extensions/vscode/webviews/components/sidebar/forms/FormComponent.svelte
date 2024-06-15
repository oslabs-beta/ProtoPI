<script>
  export let requests;
  export let text;
  export let startMockDispatcher;
</script>

<div class="text-2xl font-bold mb-4">Form Buttons</div>

<form
  class="space-y-4"
  on:submit|preventDefault={() => {
    requests = [{ text, test: true }, ...requests];
  }}
>
  <input class="border p-2 rounded w-full" bind:value={text} />
  <button
    class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-700"
    type="submit"
    on:click={startMockDispatcher}
  >
    Submit
  </button>
</form>

<hr class="border-2 border-blue-500 my-4" />

<ul class="list-disc pl-5">
  {#each requests as request}
    <li>{JSON.stringify(request)}</li>
  {/each}
</ul>