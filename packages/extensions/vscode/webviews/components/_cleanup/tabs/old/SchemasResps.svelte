<script>
  import { selectedData } from '../../../stores/dataStore';
  // import DisplayAreaDND from './DisplayArea/DisplayAreaDND.svelte';
  import { onDestroy } from 'svelte';



  import DisplayArea from './refactor/DisplayArea.svelte';

  let parsedYaml = {};

  const unsubscribe = selectedData.subscribe(value => {
    try {
      console.log('Parsed YAML data with UUIDs:', parsedYaml);
    } catch (error) {
      console.error('Error parsing YAML:', error);
    }
  });


  onDestroy(() => {
    unsubscribe();
  });
</script>

<!-- <style>
  h1 {
    font-size: 1.5em;
    margin-bottom: 1em;
  }
</style> -->

<div>
  <!-- <h1>OpenAPI YAML Viewer</h1> -->
  <!-- <DisplayAreaDND {parsedYaml} /> -->
  <!-- <h1>Multi-file YAML Viewer</h1> -->
  <DisplayArea />
</div>