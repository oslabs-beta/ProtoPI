<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { IconTrash } from '@tabler/icons-svelte';

  export let active = false;

  // Sample data for demonstration
  let headers = writable([
    { uid: 1, name: 'Content-Type', value: 'application/json', enabled: true },
    { uid: 2, name: 'Authorization', value: 'Bearer token', enabled: false }
  ]);

  const addHeader = () => {
    headers.update((headers) => [
      ...headers,
      { uid: Date.now(), name: '', value: '', enabled: true }
    ]);
  };

  const handleHeaderChange = (e, header, type) => {
    headers.update((headers) =>
      headers.map((h) => {
        if (h.uid === header.uid) {
          switch (type) {
            case 'name':
              h.name = e.target.value;
              break;
            case 'value':
              h.value = e.target.value;
              break;
            case 'enabled':
              h.enabled = e.target.checked;
              break;
          }
        }
        return h;
      })
    );
  };

  const removeHeader = (header) => {
    headers.update((headers) => headers.filter((h) => h.uid !== header.uid));
  };
</script>

{#if active}
  <div>
    <h2>Headers</h2>
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
          {#each $headers as header}
            <tr key={header.uid}>
              <td class="name-column">
                <input
                  type="text"
                  value={header.name}
                  on:input={(e) => handleHeaderChange(e, header, 'name')}
                  placeholder="Header Name"
                />
              </td>
              <td class="value-column">
                <input
                  type="text"
                  value={header.value}
                  on:input={(e) => handleHeaderChange(e, header, 'value')}
                  placeholder="Header Value"
                />
              </td>
              <td class="enabled-column">
                <input
                  type="checkbox"
                  checked={header.enabled}
                  on:change={(e) => handleHeaderChange(e, header, 'enabled')}
                />
              </td>
              <td class="trash-column">
                <button on:click={() => removeHeader(header)}>
                  <IconTrash strokeWidth={1.5} size={20} />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <button class="add-button" on:click={addHeader}>
        + Add Header
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
  .items-center {
    align-items: center;
  }
  .add-button {
    margin-bottom: 2rem;
  }
</style>