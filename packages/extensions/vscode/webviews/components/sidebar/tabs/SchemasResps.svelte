<script>
  import { selectedData } from '../../../stores/dataStore';
  import DisplayAreaDND from './DisplayArea/DisplayAreaDND.svelte';
  import { onDestroy } from 'svelte';

  let parsedYaml = {};

  const unsubscribe = selectedData.subscribe(value => {
    try {
      parsedYaml = value || {}; // Default to an empty object if the value is null
      console.log('Parsed YAML data:', parsedYaml);
    } catch (error) {
      console.error('Error parsing YAML:', error);
    }
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<style>
  h1 {
    font-size: 1.5em;
    margin-bottom: 1em;
  }
</style>

<div>
  <h1>OpenAPI YAML Viewer</h1>
  <DisplayAreaDND {parsedYaml} />
</div>