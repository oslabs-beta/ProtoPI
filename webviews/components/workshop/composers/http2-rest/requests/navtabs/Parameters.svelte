<script>

  let queryParams = [
    { uid: 1, name: 'param1', value: 'value1', enabled: true },
    { uid: 2, name: 'param2', value: 'value2', enabled: false }
  ];

  let pathParams = [
    { uid: 1, name: 'path1', value: 'value1', enabled: true },
    { uid: 2, name: 'path2', value: 'value2', enabled: false }
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
</style>

<div class="max-w-4xl mx-auto">
  <h2 class="text-2xl font-semibold my-4">Query Parameters</h2>
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
            <button 
              class="justify-center bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none ease-in-out flex items-center group"                    
              on:click={() => handleRemoveParam(queryParams, (updated) => queryParams = updated, param.uid)}
              style="outline: none; box-shadow: none;"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3H12H13V4H12V13L11 14H4L3 13V4H2V3H5V2C5 1.73478 5.10531 1.48038 5.29285 1.29285C5.48038 1.10531 5.73478 1 6 1H9C9.26522 1 9.51962 1.10531 9.70715 1.29285C9.89469 1.48038 10 1.73478 10 2V3ZM9 2H6V3H9V2ZM4 13H11V4H4V13ZM6 5H5V12H6V5ZM7 5H8V12H7V5ZM9 5H10V12H9V5Z"/>
              </svg>
            </button>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    <div class="flex justify-center items-center button-container pb-10 mt-2 pt-1">
      <button 
        class="max-w-xs justify-center bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent  text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none ease-in-out flex items-center group"        
        on:click={() => handleAddParam(queryParams, (updated) => queryParams = updated)}
        style="outline: none; box-shadow: none;">
        + Add Query Param
      </button>
    </div>
  </div>

  <h2 class="text-2xl font-semibold my-4">Path Parameters</h2>
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
            <button 
              class="justify-center bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none ease-in-out flex items-center group"                    
              on:click={() => handleRemoveParam(pathParams, (updated) => pathParams = updated, param.uid)}
              style="outline: none; box-shadow: none;"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3H12H13V4H12V13L11 14H4L3 13V4H2V3H5V2C5 1.73478 5.10531 1.48038 5.29285 1.29285C5.48038 1.10531 5.73478 1 6 1H9C9.26522 1 9.51962 1.10531 9.70715 1.29285C9.89469 1.48038 10 1.73478 10 2V3ZM9 2H6V3H9V2ZM4 13H11V4H4V13ZM6 5H5V12H6V5ZM7 5H8V12H7V5ZM9 5H10V12H9V5Z"/>
              </svg>
            </button>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    <div class="flex justify-center items-center button-container pb-10 mt-2 pt-1">
      <button 
        class="max-w-xs justify-center bg-transparent p-0 border-none hover:bg-transparent focus:bg-transparent active:bg-transparent  text-white hover:text-gray-500 font-semibold py-2 px-4 focus:outline-none ease-in-out flex items-center group"              
        on:click={() => handleAddParam(pathParams, (updated) => pathParams = updated)}
        style="outline: none; box-shadow: none;">
        + Add Path Param
      </button>
    </div>
  </div>
</div>