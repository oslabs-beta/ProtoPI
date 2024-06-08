<script lang="ts">
  import { onMount } from "svelte";
  import "../tailwind.css";

  let requests: Array<{ text: string; test: boolean }> = [];
  let text = "";

  onMount(() => {
    // Send message to Sidebar Provider
    tsvscode.postMessage({
      type: "getFiles",
      value: "info here",
    });
  });

  function startMockDispatcher() {
    tsvscode.postMessage({
      type: "startMock",
      value: "",
    });
  }
</script>

<div class="text-2xl font-bold">Sidebar</div>
<form
  on:submit|preventDefault={() => {
    requests = [{ text, test: true }, ...requests];
  }}
>
  <input bind:value={text} />
  <button on:click={startMockDispatcher}>Submit</button>
</form>

<ul>
  {#each requests as request}
    <li>{JSON.stringify(request)}</li>
  {/each}
</ul>
