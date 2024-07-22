<script>
  import { writable } from 'svelte/store';

  export let active = false;

  // Sample data for demonstration
  let requestScript = writable('console.log("Pre Request Script");');
  let responseScript = writable('console.log("Post Response Script");');

  const handleScriptChange = (e, type) => {
    if (type === 'request') {
      requestScript.set(e.target.value);
    } else {
      responseScript.set(e.target.value);
    }
  };

  const handleRun = () => {
    console.log("Run script");
  };

  const handleSave = () => {
    console.log("Save script");
  };
</script>

{#if active}
  <div>
    <h2>Scripts</h2>
    <div class="script-section">
      <div class="title">Pre Request</div>
      <textarea
        placeholder="Enter pre-request script"
        on:input={(e) => handleScriptChange(e, 'request')}
        bind:value={$requestScript}
      ></textarea>
      <div class="script-actions">
        <button on:click={handleRun}>Run</button>
        <button on:click={handleSave}>Save</button>
      </div>
    </div>
    <div class="script-section">
      <div class="title">Post Response</div>
      <textarea
        placeholder="Enter post-response script"
        on:input={(e) => handleScriptChange(e, 'response')}
        bind:value={$responseScript}
      ></textarea>
      <div class="script-actions">
        <button on:click={handleRun}>Run</button>
        <button on:click={handleSave}>Save</button>
      </div>
    </div>
  </div>
{/if}

<style>
  h2 {
    margin-bottom: 10px;
  }
  .script-section {
    margin-bottom: 20px;
  }
  .title {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: bold;
  }
  textarea {
    width: 100%;
    height: 100px;
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
