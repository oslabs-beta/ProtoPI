<script>
  import { writable } from 'svelte/store';
  import Authorization from './navtabs/Authorization.svelte';
  import Body from './navtabs/Body.svelte';
  import Headers from './navtabs/Headers.svelte';
  import Params from './navtabs/Parameters.svelte';
  import Vars from './navtabs/Variables.svelte';
  import Scripts from './navtabs/Scripts.svelte';
  import Test from './navtabs/Tests.svelte'; 
  import Documentation from './navtabs/Documentation.svelte';

  let currentTab = writable('Test');
  const tabs = ['Params', 'Body', 'Headers', 'Authorization', 'Vars', 'Scripts', 'Test', 'Documentation'];

  function changeTab(tab) {
    currentTab.set(tab);
  }
</script>

<div class="client-form-tabs">
  {#each tabs as tab}
    <div
      class="client-form-tab"
      class:tab-active={$currentTab === tab}
      on:click={() => changeTab(tab)}
    >
      {tab}
    </div>
  {/each}
</div>
<div class="tab-content">
  <svelte:component this={
        $currentTab === 'Params' ? Params :
        $currentTab === 'Body' ? Body :
        $currentTab === 'Headers' ? Headers :
        $currentTab === 'Authorization' ? Authorization :
        $currentTab === 'Vars' ? Vars :
        $currentTab === 'Scripts' ? Scripts :
        $currentTab === 'Test' ? Test :
        $currentTab === 'Documentation' ? Documentation : null
      } 
      active={$currentTab === $currentTab}
  />
</div>

<style>
  .client-form-tabs {
    display: flex;
    cursor: pointer;
  }
  .client-form-tab {
    padding: 1%;
    border: 1px solid #ccc;
    border-radius: 12px 2px 0px 0px;
    border-bottom: none;
    font-weight: 700;
  }
  .tab-active {
    background-color: #5f6158;
    border-top: 2px solid #007acc;
  }
  .tab-content {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>