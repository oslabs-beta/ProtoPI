<script>
  import { createEventDispatcher } from 'svelte';
  import { IconCaretDown } from '@tabler/icons-svelte';

  const dispatch = createEventDispatcher();

  const handleModeChange = (mode) => {
    dispatch('modeChange', mode);
  };
</script>

<div class="dropdown">
  <button class="dropdown-button">
    Select Body Mode <IconCaretDown class="icon-caret" size={14} strokeWidth={2} />
  </button>
  <div class="dropdown-content">
    <div class="dropdown-item" on:click={() => handleModeChange('json')}>JSON</div>
    <div class="dropdown-item" on:click={() => handleModeChange('xml')}>XML</div>
    <div class="dropdown-item" on:click={() => handleModeChange('text')}>Text</div>
    <div class="dropdown-item" on:click={() => handleModeChange('formUrlEncoded')}>Form URL Encoded</div>
    <div class="dropdown-item" on:click={() => handleModeChange('multipartForm')}>Multipart Form</div>
    <div class="dropdown-item" on:click={() => handleModeChange('sparql')}>SPARQL</div>
    <div class="dropdown-item" on:click={() => handleModeChange('none')}>No Body</div>
  </div>
</div>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-button {
    background-color: #f9f9f9;
    color: black;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .icon-caret {
    margin-left: 10px;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }
  .dropdown-item {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  .dropdown-item:hover {
    background-color: #f1f1f1;
  }
</style>
