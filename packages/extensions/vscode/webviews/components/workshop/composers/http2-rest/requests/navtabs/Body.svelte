<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import RequestBodyMode from './Body/RequestBodyMode.svelte';

  export let active = false;

  const bodyContent = writable('');
  const bodyMode = writable('none');

  const handleBodyModeChange = (mode) => {
    bodyMode.set(mode);
  };

  const handleBodyContentChange = (e) => {
    bodyContent.set(e.target.value);
  };
</script>

{#if active}
  <div>
    <h2>Request Body</h2>
    <RequestBodyMode on:modeChange={handleBodyModeChange} />
    <textarea
      placeholder="Enter body content"
      on:input={handleBodyContentChange}
    ></textarea>
  </div>
{/if}

<style>
  h2 {
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
</style>
