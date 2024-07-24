<!-- <script>
  import { writable } from 'svelte/store';
  import 'github-markdown-css/github-markdown.css';
  import { marked } from 'marked'; 
  import { onMount } from 'svelte';

  export let active = false;

  let isEditing = writable(false);
  let docs = writable('## Sample Documentation\n\nThis is a markdown preview.');
  let displayedTheme = writable('default'); 
  let preferences = writable({ font: { codeFont: 'default' } }); 

  const toggleViewMode = () => {
    isEditing.update(value => !value);
  };

  const handleEdit = (e) => {
    docs.set(e.target.value);
  };

  const handleSave = () => {
    console.log("Save documentation");
  };
</script>

{#if active}
  <div class="mt-1 h-full w-full relative">
    <div class="editing-mode mb-2" role="tab" on:click={toggleViewMode}>
      {#if $isEditing} Preview {:else} Edit {/if}
    </div>

    {#if $isEditing}
      <textarea
        placeholder="Enter documentation"
        on:input={handleEdit}
        bind:value={$docs}
        class="code-editor"
      ></textarea>
      <div class="script-actions">
        <button on:click={handleSave}>Save</button>
      </div>
    {:else}
      <div class="markdown-body" on:dblclick={toggleViewMode}>
        {@html marked($docs)}
      </div>
    {/if}
  </div>
{/if}

<style>
  .markdown-body {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
  }
  .code-editor {
    width: 100%;
    height: 300px;
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
  .editing-mode {
    cursor: pointer;
    color: #007bff;
    user-select: none;
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
</style> -->