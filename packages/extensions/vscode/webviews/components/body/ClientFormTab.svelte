<script>
  import { writable } from 'svelte/store';
  let currentTab = writable('Test');
  const tabs = ['Query', 'Headers', 'Auth', 'Body', 'Test'];

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
    <div>
      <h2>Query</h2>
      <input type="text" placeholder="Enter query parameters" />
    </div>
  {/if}

  {#if $currentTab === 'Headers'}
    <div>
      <h2>Headers</h2>
      <input type="text" placeholder="Enter headers" />
    </div>
  {/if}

  {#if $currentTab === 'Auth'}
    <div>
      <h2>Auth</h2>
      <input type="text" placeholder="Enter authentication details" />
    </div>
  {/if}

  {#if $currentTab === 'Body'}
    <div>
      <h2>Body</h2>
      <input type="text" placeholder="Enter details" />
    </div>
  {/if}

  {#if $currentTab === 'Test'}
    <div>
      <h2>Test</h2>
      <input type="text" placeholder="Enter test details" />
      <button class="bg-blue-500 text-white p-2 rounded" on:click={() => console.log('Clicked Test Button ')}>Test</button
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
