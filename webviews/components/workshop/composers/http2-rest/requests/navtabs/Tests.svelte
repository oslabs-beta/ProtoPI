<script>
  import { writable } from 'svelte/store';

  export let active = false;
  
  // Sample data for demonstration
  let tests = writable('console.log("Write your tests here");');

  const handleEdit = (e) => {
    tests.set(e.target.value);
  };

  const handleRun = () => {
    console.log("Run tests");
  };

  const handleSave = () => {
    console.log("Save tests");
  };
</script>

{#if active}
  <div>
    <h2>Tests</h2>
    <textarea
      placeholder="Enter test scripts"
      on:input={handleEdit}
      bind:value={$tests}
    ></textarea>
    <div class="script-actions">
      <button on:click={handleRun}>Run</button>
      <button on:click={handleSave}>Save</button>
    </div>
  </div>
{/if}

<style>
  h2 {
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    font-family: monospace;
  }
  .script-actions {
    display: flex;
    gap: 10px;
  }
  button {
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
</style>