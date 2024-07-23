<script>
  import { IconTrash } from '@tabler/icons-svelte';

  let queryParams = [
    { uid: 1, name: 'var1', value: 'value1', enabled: true },
    { uid: 2, name: 'var2', value: 'value2', enabled: false }
  ];

  let pathParams = [
    { uid: 1, name: 'resVar1', value: 'value1', enabled: true },
    { uid: 2, name: 'resVar2', value: 'value2', enabled: false }
  ];

  function handleAddParam(paramList, setter) {
    const newId = paramList.length ? Math.max(...paramList.map(p => p.uid)) + 1 : 1;
    setter([...paramList, { uid: newId, name: '', value: '', enabled: true }]);
  }

  function handleRemoveParam(paramList, setter, uid) {
    setter(paramList.filter(param => param.uid !== uid));
  }

  function handleParamChange(param, key, event) {
    param[key] = key === 'enabled' ? event.target.checked : event.target.value;
  }
</script>

<style>
  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #007BFF;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    margin-right: 8px;
  }
  input[type="text"] {
    width: 95%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .action-button, .icon-button {
    background-color: transparent;
    border: none;
    color: white;
    text-decoration: none;
    cursor: pointer;
    padding: 10px 20px;
    font-weight: bold;
    transition: color 0.3s, background-color 0.3s;
  }
  .action-button:hover, .icon-button {
    color: #ccc;
    background-color: transparent;
  }
  .icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
</style>

<div class="max-w-4xl mx-auto">
  <h2 class="text-2xl font-semibold my-4">Pre Request Vars</h2>
  <div>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="py-2 px-4 text-center"></th>
          <th class="py-2 px-4 text-left">Name</th>
          <th class="py-2 px-4 text-left">Value</th>
          <th class="py-2 px-4 text-center">Enabled</th>
          <th class="py-2 px-4"></th>
        </tr>
      </thead>
      <tbody>
        {#each queryParams as param, index (param.uid)}
        <tr class="border-b">
          <td class="p-2 text-center">
            <div class="circle">{index + 1}</div>
          </td>
          <td class="p-2">
            <input type="text" class="w-full p-1 border rounded text-black bg-white" placeholder="Enter a param" bind:value={param.name}
                   on:input={(e) => handleParamChange(param, 'name', e)} />
          </td>
          <td class="p-2">
            <input type="text" class="w-full p-1 border rounded text-black bg-white" placeholder="Enter a value" bind:value={param.value}
                   on:input={(e) => handleParamChange(param, 'value', e)} />
          </td>
          <td class="p-2 text-center">
            <input type="checkbox" class="align-middle" bind:checked={param.enabled}
                   on:change={(e) => handleParamChange(param, 'enabled', e)} />
          </td>
          <td class="p-2 text-center">
            <button class="bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent focus:outline-none"
                    on:click={() => handleRemoveParam(queryParams, (updated) => queryParams = updated, param.uid)}
                    style="outline: none; box-shadow: none;">
              <IconTrash strokeWidth={1.5} size={24} />
            </button>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    <div class="button-container">
      <button class="bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none transition duration-300 ease-in-out"
        on:click={() => handleAddParam(queryParams, (updated) => queryParams = updated)}
        style="outline: none; box-shadow: none;">
        + Add Pre Request Var
      </button>
    </div>
  </div>

  <h2 class="text-2xl font-semibold my-4">Post Response Vars</h2>
  <div>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="py-2 px-4 text-center"></th>
          <th class="py-2 px-4 text-left">Name</th>
          <th class="py-2 px-4 text-left">Value</th>
          <th class="py-2 px-4 text-center">Enabled</th>
          <th class="py-2 px-4"></th>
        </tr>
      </thead>
      <tbody>
        {#each pathParams as param, index (param.uid)}
        <tr class="border-b">
          <td class="p-2 text-center">
            <div class="circle">{index + 1}</div>
          </td>
          <td class="p-2">
            <input type="text" class="w-full p-1 border rounded text-black bg-white" placeholder="Enter a path" bind:value={param.name}
                   on:input={(e) => handleParamChange(param, 'name', e)} />
          </td>
          <td class="p-2">
            <input type="text" class="w-full p-1 border rounded text-black bg-white" placeholder="Enter a value" bind:value={param.value}
                   on:input={(e) => handleParamChange(param, 'value', e)} />
          </td>
          <td class="p-2 text-center">
            <input type="checkbox" class="align-middle" bind:checked={param.enabled}
                   on:change={(e) => handleParamChange(param, 'enabled', e)} />
          </td>
          <td class="p-2 text-center ">
            <button class="bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent focus:outline-none"
                    on:click={() => handleRemoveParam(pathParams, (updated) => pathParams = updated, param.uid)}
                    style="outline: none; box-shadow: none;">
              <IconTrash strokeWidth={1.5} size={24} />
            </button>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    <div class="button-container">
      <button class="bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none transition duration-300 ease-in-out"
      on:click={() => handleAddParam(pathParams, (updated) => pathParams = updated)}
      style="outline: none; box-shadow: none;">
      + Add Pre Request Var
     </button>
    </div>
  </div>
</div>
