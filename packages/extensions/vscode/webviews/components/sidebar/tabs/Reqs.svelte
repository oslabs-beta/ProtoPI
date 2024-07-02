<script>
  import TreeView from './DisplayArea/TreeView.svelte';
  import { yamlContent } from '../../dummyData/openapiContent.js';
  import yaml from 'js-yaml';

  let filterText = ''; 


  let parsedData = yaml.load(yamlContent);

  let treeData = Object.keys(parsedData.paths).map(path => ({
    id: path,
    label: path,
    children: Object.keys(parsedData.paths[path]).map(method => ({
      id: `${path}-${method}`,
      label: method.toUpperCase(),
      summary: parsedData.paths[path][method].summary,
    }))
  }));

  function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }
</script>

<div>
  <input type="text" class="rounded-full px-2 py-1 border-2 border-dashed border-blue-500 focus:border-solid focus:border-blue-500 outline-none transition duration-200" bind:value={filterText} placeholder="Filter Reqs ...">
</div>
<div class="rounded-2xl h-80 overflow-y-auto bg-gray-900 p-2 border-5 border-gray-800 mt-5">
  {#if treeData}
    <TreeView {treeData} />
  {:else}
    <p class="text-white">Error parsing OpenAPI specification.</p>
  {/if}
</div>