<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { IconTrash } from '@tabler/icons-svelte';

  export let active = false;
  
  // Sample data for demonstration
  let requestVars = writable([
    { uid: 1, name: 'var1', value: 'value1', enabled: true },
    { uid: 2, name: 'var2', value: 'value2', enabled: false }
  ]);

  let responseVars = writable([
    { uid: 1, name: 'resVar1', value: 'responseValue1', enabled: true },
    { uid: 2, name: 'resVar2', value: 'responseValue2', enabled: false }
  ]);

  const handleAddVar = (varType) => {
    if (varType === 'request') {
      requestVars.update(vars => [...vars, { uid: Date.now(), name: '', value: '', enabled: true }]);
    } else {
      responseVars.update(vars => [...vars, { uid: Date.now(), name: '', value: '', enabled: true }]);
    }
  };

  const handleVarChange = (e, v, type, varType) => {
    if (varType === 'request') {
      requestVars.update(vars =>
        vars.map(_var => {
          if (_var.uid === v.uid) {
            switch (type) {
              case 'name':
                _var.name = e.target.value;
                break;
              case 'value':
                _var.value = e.target.value;
                break;
              case 'enabled':
                _var.enabled = e.target.checked;
                break;
            }
          }
          return _var;
        })
      );
    } else {
      responseVars.update(vars =>
        vars.map(_var => {
          if (_var.uid === v.uid) {
            switch (type) {
              case 'name':
                _var.name = e.target.value;
                break;
              case 'value':
                _var.value = e.target.value;
                break;
              case 'enabled':
                _var.enabled = e.target.checked;
                break;
            }
          }
          return _var;
        })
      );
    }
  };

  const handleRemoveVar = (_var, varType) => {
    if (varType === 'request') {
      requestVars.update(vars => vars.filter(v => v.uid !== _var.uid));
    } else {
      responseVars.update(vars => vars.filter(v => v.uid !== _var.uid));
    }
  };
</script>

{#if active}
  <div>
    <h2>Pre Request Vars</h2>
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
          {#each $requestVars as _var}
            <tr key={_var.uid}>
              <td class="name-column">
                <input
                  type="text"
                  value={_var.name}
                  on:input={(e) => handleVarChange(e, _var, 'name', 'request')}
                  placeholder="Variable Name"
                />
              </td>
              <td class="value-column">
                <input
                  type="text"
                  value={_var.value}
                  on:input={(e) => handleVarChange(e, _var, 'value', 'request')}
                  placeholder="Variable Value"
                />
              </td>
              <td class="enabled-column">
                <input
                  type="checkbox"
                  checked={_var.enabled}
                  on:change={(e) => handleVarChange(e, _var, 'enabled', 'request')}
                />
              </td>
              <td class="trash-column">
                <button on:click={() => handleRemoveVar(_var, 'request')}>
                  <IconTrash strokeWidth={1.5} size={20} />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <button class="add-button" on:click={() => handleAddVar('request')}>
        + Add
      </button>
    </div>

    <h2>Post Response Vars</h2>
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
          {#each $responseVars as _var}
            <tr key={_var.uid}>
              <td class="name-column">
                <input
                  type="text"
                  value={_var.name}
                  on:input={(e) => handleVarChange(e, _var, 'name', 'response')}
                  placeholder="Variable Name"
                />
              </td>
              <td class="value-column">
                <input
                  type="text"
                  value={_var.value}
                  on:input={(e) => handleVarChange(e, _var, 'value', 'response')}
                  placeholder="Variable Value"
                />
              </td>
              <td class="enabled-column">
                <input
                  type="checkbox"
                  checked={_var.enabled}
                  on:change={(e) => handleVarChange(e, _var, 'enabled', 'response')}
                />
              </td>
              <td class="trash-column">
                <button on:click={() => handleRemoveVar(_var, 'response')}>
                  <IconTrash strokeWidth={1.5} size={20} />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <button class="add-button" on:click={() => handleAddVar('response')}>
        + Add
      </button>
    </div>
  </div>
{/if}

<style>
  h2 {
    margin-bottom: 10px;
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
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .add-button {
    margin-bottom: 2rem;
  }
</style>