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

  import { currentHttp2Tab } from './../../../../../stores/tabStore';

  const tabs = ['Params', 'Body', 'Headers', 'Authorization', 'Vars', 'Scripts', 'Test', 'Documentation'];

  function changeTab(tab) {
    currentHttp2Tab.set(tab);
  }
</script>

<div class="client-form-tabs">
  {#each tabs as tab}
    <div
      class="client-form-tab"
      class:tab-active={$currentHttp2Tab === tab}
      role="tab"
      on:click={() => $currentHttp2Tab = tab}
      tabindex="0"  
      on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { $currentHttp2Tab = tab; e.preventDefault(); } }}  
    >
      {tab}
    </div>
  {/each}
</div>
<div class="tab-content">
  <svelte:component this={
        $currentHttp2Tab === 'Params' ? Params :
        $currentHttp2Tab === 'Body' ? Body :
        $currentHttp2Tab === 'Headers' ? Headers :
        $currentHttp2Tab === 'Authorization' ? Authorization :
        $currentHttp2Tab === 'Vars' ? Vars :
        $currentHttp2Tab === 'Scripts' ? Scripts :
        $currentHttp2Tab === 'Test' ? Test :
        $currentHttp2Tab === 'Documentation' ? Documentation : null
      } 
      active={$currentHttp2Tab === $currentHttp2Tab}
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