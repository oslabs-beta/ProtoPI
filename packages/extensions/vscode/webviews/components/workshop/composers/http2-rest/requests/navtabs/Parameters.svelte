<script>
  import { IconTrash } from '@tabler/icons-svelte';

  // Sample data for demonstration
  let queryParams = [
    { uid: 1, name: 'param1', value: 'value1', enabled: true },
    { uid: 2, name: 'param2', value: 'value2', enabled: false }
  ];

  let pathParams = [
    { uid: 1, name: 'path1', value: 'value1', enabled: true },
    { uid: 2, name: 'path2', value: 'value2', enabled: false }
  ];

  const handleAddQueryParam = () => {
    const newId = queryParams.length ? Math.max(...queryParams.map(p => p.uid)) + 1 : 1;
    queryParams = [...queryParams, { uid: newId, name: '', value: '', enabled: true }];
  };

  const handleRemoveQueryParam = (param) => {
    queryParams = queryParams.filter(p => p.uid !== param.uid);
  };

  const handleQueryParamChange = (e, param, key) => {
    param[key] = key === 'enabled' ? e.target.checked : e.target.value;
    queryParams = [...queryParams];
  };

  const handleAddPathParam = () => {
    const newId = pathParams.length ? Math.max(...pathParams.map(p => p.uid)) + 1 : 1;
    pathParams = [...pathParams, { uid: newId, name: '', value: '', enabled: true }];
  };

  const handleRemovePathParam = (param) => {
    pathParams = pathParams.filter(p => p.uid !== param.uid);
  };

  const handlePathParamChange = (e, param, key) => {
    param[key] = key === 'enabled' ? e.target.checked : e.target.value;
    pathParams = [...pathParams];
  };
</script>

{#if true} <!-- Replace with actual condition for showing this section -->
  <div>
    <h2>Query Parameters</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <td class="name-column">Name</td>
            <td class="value-column">Value</td>
            <td class="enabled-column">Enabled</td>
            <td class="no-border"></td>
          </tr>
        </thead>
        <tbody>
          {#each queryParams as param}
            <tr key={param.uid}>
              <td class="name-column">
                <input
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  value={param.name}
                  on:input={(e) => handleQueryParamChange(e, param, 'name')}
                />
              </td>
              <td class="value-column">
                <input
                  type="text"
                  value={param.value}
                  on:input={(e) => handleQueryParamChange(e, param, 'value')}
                />
              </td>
              <td class="enabled-column">
                <input
                  type="checkbox"
                  checked={param.enabled}
                  on:change={(e) => handleQueryParamChange(e, param, 'enabled')}
                />
              </td>
              <td class="trash-column">
                <button on:click={() => handleRemoveQueryParam(param)}>
                  <IconTrash strokeWidth={1.5} size={20} />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <button class="add-button" on:click={handleAddQueryParam}>
        + <span>Add Param</span>
      </button>
    </div>

    <h2>Path Parameters</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <td class="name-column">Name</td>
            <td class="value-column">Value</td>
            <td class="enabled-column">Enabled</td>
            <td class="no-border"></td>
          </tr>
        </thead>
        <tbody>
          {#each pathParams as param}
            <tr key={param.uid}>
              <td class="name-column">
                <input
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  value={param.name}
                  readonly
                />
              </td>
              <td class="value-column">
                <input
                  type="text"
                  value={param.value}
                  on:input={(e) => handlePathParamChange(e, param, 'value')}
                />
              </td>
              <td class="enabled-column">
                <input
                  type="checkbox"
                  checked={param.enabled}
                  on:change={(e) => handlePathParamChange(e, param, 'enabled')}
                />
              </td>
              <td class="trash-column">
                <button on:click={() => handleRemovePathParam(param)}>
                  <IconTrash strokeWidth={1.5} size={20} />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <button class="add-button" on:click={handleAddPathParam}>
        + <span>Add Path</span>
      </button>
    </div>
  </div>
{/if}

<style>
  .flex {
    display: flex;
  }
  .items-center {
    align-items: center;
  }
  .table-container {
    max-width: 800px;
    margin: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  th, td {
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
  .no-border {
    border-top: none;
    border-right: none;
  }
  .name-column {
    width: 45%;
  }
  .value-column {
    width: 45%;
  }
  .enabled-column {
    width: 5%;
    text-align: center;
  }
  .trash-column {
    width: 5%;
    text-align: center;
  }
  input[type="text"] {
    width: 100%;
    padding: 0.25rem;
    box-sizing: border-box;
    color: black;  /* Ensure text color is visible */
    background-color: white;  /* Ensure background color is visible */
    border: 1px solid #ccc;  /* Add border for better visibility */
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  .add-button {
    margin-bottom: 2rem;
  }
</style>