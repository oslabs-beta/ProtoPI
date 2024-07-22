<script>
  export let active = false;
  import { writable } from 'svelte/store';
  import { IconCaretDown } from '@tabler/icons-svelte';

  const authModes = ['awsv4', 'basic', 'bearer', 'digest', 'oauth2', 'inherit'];
  let selectedAuthMode = writable('basic');

  const handleAuthModeChange = (mode) => {
    selectedAuthMode.set(mode);
  };
</script>

{#if active}
  <div>
    <h2>Authorization</h2>
    <div class="auth-mode-selector">
      <div class="dropdown">
        <button class="dropdown-button">
          Select Auth Mode <IconCaretDown class="icon-caret" size={14} strokeWidth={2} />
        </button>
        <div class="dropdown-content">
          {#each authModes as mode}
            <div class="dropdown-item" on:click={() => handleAuthModeChange(mode)}>{mode}</div>
          {/each}
        </div>
      </div>
    </div>

    {#if $selectedAuthMode === 'awsv4'}
      <div>AWS V4 Auth - Enter your AWS details here</div>
    {:else if $selectedAuthMode === 'basic'}
      <div>Basic Auth - Enter your username and password</div>
    {:else if $selectedAuthMode === 'bearer'}
      <div>Bearer Auth - Enter your token</div>
    {:else if $selectedAuthMode === 'digest'}
      <div>Digest Auth - Enter your digest authentication details</div>
    {:else if $selectedAuthMode === 'oauth2'}
      <div>OAuth2 - Enter your OAuth2 details</div>
    {:else if $selectedAuthMode === 'inherit'}
      <div>Auth inherited from the Collection</div>
    {:else}
      <div>Select an authentication mode to configure</div>
    {/if}
  </div>
{/if}

<style>
  h2 {
    margin-bottom: 10px;
  }
  .auth-mode-selector {
    margin-bottom: 20px;
  }
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