<script>
  import { writable } from 'svelte/store';
  let currentTab = writable('Query');
  const tabs = ['Query', 'Headers', 'Body', 'Test'];

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
  {#if $currentTab === 'Query'}
      <h2>Query</h2>
    <div class='form-field query'>
      <input type="checkbox" class='input-cbox param-cbox' tabindex='-1' />
      <input type="text" class='parameter1' placeholder="Parameter" />
      <input type="text" class='value1' placeholder="Value" />
    </div>
    <div title="delete" class="icon-del icon-del-param disable-drop"></div>
    
    <div class='form-field query'>
      <input type="checkbox" class='input-cbox param-cbox' tabindex='-1' />
      <input type="text" class='parameter1' placeholder="Parameter" />
      <input type="text" class='value1' placeholder="Value" />
    </div>

    <div class='form-field query'>
      <input type="checkbox" class='input-cbox param-cbox' tabindex='-1' />
      <input type="text" class='parameter1' placeholder="Parameter" />
      <input type="text" class='value1' placeholder="Value" />
    </div>
  {/if}

  {#if $currentTab === 'Headers'}

     <h2>HTTP Headers</h2>
    <div class='form-field headers'>
      <input type="checkbox" class='input-cbox param-cbox' tabindex='-1' />
      <input type="text" class='parameter1' placeholder="Header" />
      <input type="text" class='value1' placeholder="Value" />
    </div>
    
    <div class='form-field headers'>
      <input type="checkbox" class='input-cbox param-cbox' tabindex='-1' />
      <input type="text" class='parameter1' placeholder="Header" />
      <input type="text" class='value1' placeholder="Value" />
    </div>
    
    <div class='form-field headers'>
      <input type="checkbox" class='input-cbox param-cbox' tabindex='-1' />
      <input type="text" class='parameter1' placeholder="Header" />
      <input type="text" class='value1' placeholder="Value" />

    </div>
  {/if}


  {#if $currentTab === 'Body'}
    <div class="tab-content">
      <h2>JSON</h2>
      <textarea class='ace-text-input' wrap='off' autocorrect='off' 
      ></textarea>
    </div>
  {/if}

  {#if $currentTab === 'Test'}
    <div>
      <h2>Test</h2>
      <input type="text" placeholder="Enter test details" />
      <button class="text-white p-2 rounded" on:click={() => console.log('Clicked Test Button ')}>Test</button
      >
    </div>
  {/if}
</div>

<!-- <style>

.active{
    background-color: chartreuse;
    border-top: 2px solid yellow;
}
</style> -->

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
