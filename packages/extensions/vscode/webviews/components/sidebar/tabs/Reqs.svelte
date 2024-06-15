<script>
  import { parsedData, fileContent } from '../../../stores/dataStore';
  import DisplayArea from './DisplayArea/DisplayArea.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import YAML from 'yaml';
  
  let data;
  let responsesIncluded = writable(false);

  $: {
    parsedData.subscribe(value => {
    if ($responsesIncluded) {
      // Add responses to parsedData
      data = addResponsesToData(value);
    } else {
      // Use parsedData as is
    data = value;
  }
    console.log('Reqs parsedData:', data);
  });
}

  function addResponsesToData(data) {
    // Load and parse the YAML content from fileContent
    let yamlData;
    fileContent.subscribe(content => {
      yamlData = content;
    });
    return parseYamlResponses(data, yamlData);
  }

  function parseYamlResponses(data, yamlData) {

    const parsedYaml = YAML.parse(yamlData);

    for (const path in parsedYaml.paths) {
      const methods = parsedYaml.paths[path];
      for (const method in methods) {
        if (!data[path]) { // Check if path exists in data
          data[path] = {};
        }
        if (!data[path][method]) { // Check if method exists in data
          data[path][method] = {};
        }
        const responses = methods[method].responses;
        for (const status in responses) {
          if (!data[path][method].responses) {
            data[path][method].responses = {};
          }
          data[path][method].responses[status] = responses[status];
        }
      }
    }
    return data;
  }

  function handleCheckboxChange(event) {
    responsesIncluded.set(event.target.checked);  // Update store value based on checkbox state
  }
</script>

<div>
  <label>
    <input type="checkbox" on:change={handleCheckboxChange}>
    Include Responses
  </label>
</div>

<DisplayArea {data} />