<script>
  import TreeView from './TreeView.svelte';
  import { selectedData } from '../../../../stores/dataStore';

  export let data;

  let pathsData = [];

  function extractPaths(data) {
    console.log("Extracting paths from data:", data);
    if (data && data.paths) {
      return Object.entries(data.paths).map(([key, value]) => ({
        key,
        value
      }));
    }
    return [];
  }

  $: pathsData = extractPaths(data);
  console.log('DisplayArea pathsData after extraction:', pathsData);

  function handleClick(event) {
    selectedData.set(event.detail.node); // Update the store
    console.log("Selected node data:", event.detail.node);
  }

  function handleClipboardClick(event) {
    selectedData.set(event.detail.node); // Update the store for clipboard data
    console.log("Clipboard clicked data:", event.detail.node);
  }
</script>

<div>
  <h1>API Endpoints</h1>
  {#if pathsData.length > 0}
    <TreeView {pathsData} on:click={handleClick} on:clipboardClick={handleClipboardClick} />
  {:else}
    <p>No paths data available.</p>
  {/if}
</div>
