<script>
  import TreeViewDND from './OLD_TreeViewDND.svelte';
  export let parsedYaml = {};

  let yamlData = [];

  function extractYamlSections(data) {
    console.log("Extracting Sections from data:", data);
    if (data && typeof data === 'object') {
      return data;
    }
    return [];
  }

  $: yamlData = extractYamlSections(parsedYaml);
  console.log('DisplayAreaDND: yamlData after extraction:', yamlData);

  function handleClick(event) {
    selectedData.set(event.detail.node); // Update the store
    console.log("DisplayAreaDND: Selected node data:", event.detail.node);
  }

  function handleClipboardClick(event) {
    selectedData.set(event.detail.node); // Update the store for clipboard data
    console.log("DisplayAreaDND: Clipboard clicked data:", event.detail.node);
  }
</script>

<div>
  <h1>OpenAPI YAML Content</h1>
  {#if yamlData.length > 0}
    <TreeViewDND {yamlData} on:click={handleClick} on:clipboardClick={handleClipboardClick} />
  {:else}
    <p>No YAML data available.</p>
  {/if}
</div>