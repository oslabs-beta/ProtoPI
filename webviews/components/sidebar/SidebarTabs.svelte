<script lang='ts'>
  import { currentSidebarTab } from '../../stores/tabStore.ts';
  import MasterView from './views/MasterView.svelte';
  import ResponsesView from './views/ResponsesView.svelte';
  import RequestsView from './views/RequestsView.svelte';

  function setTab(tab) {
    currentSidebarTab.set(tab);
  }

  import SplitViewButton from './../asset-library/buttons/ToOrganizeGeneralize/SplitViewButton.svelte'; // Import the SplitViewButton
  
  export let treeData = [] || [];

  let isSplit = false; 

  function handleUpdateSplit(event) {
    isSplit = event.detail.isSplit;
    console.log('Split View state updated:', isSplit);
  }

</script>
 

<style>
  .tab-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px; /* Space between icon and text */
  }
</style>

<div class="flex justify-around mb-5" role="tablist">
  <button
    class="px-5 py-2 cursor-pointer text-center flex-grow transition duration-300 text-base outline-none font-normal border-b-2 border-transparent hover:bg-gray-800 focus:outline-none tab-button"
    class:border-b-blue-500={$currentSidebarTab === 'Responses'}
    role="tab"
    aria-selected={$currentSidebarTab === 'Responses'}
    on:click={() => setTab('Responses')}
    on:keydown={(e) => e.key === 'Enter' && setTab('Responses')}
  >
    Responses
  </button>
  <button
    class="px-5 py-2 cursor-pointer text-center flex-grow transition duration-300 text-base outline-none font-normal border-b-2 border-transparent focus:outline-none tab-button"
    class:border-b-blue-500={$currentSidebarTab === 'Requests'}
    role="tab"
    aria-selected={$currentSidebarTab === 'Requests'}
    on:click={() => setTab('Requests')}
    on:keydown={(e) => e.key === 'Enter' && setTab('Requests')}
  >
    Requests
  </button>
  <button
  class="px-5 py-2 cursor-pointer text-center flex-grow transition duration-300 text-base outline-none font-normal border-b-2 border-transparent focus:outline-none tab-button"
  class:border-b-blue-500={$currentSidebarTab === 'Master'}
  role="tab"
  aria-selected={$currentSidebarTab === 'Master'}
  on:click={() => setTab('Master')}
  on:keydown={(e) => e.key === 'Enter' && setTab('Master')}
>
  <SplitViewButton on:updateSplit={handleUpdateSplit} /> Master 

</button>
</div>

<div>
  {#if $currentSidebarTab === 'Master'}
    <MasterView {treeData} />
  {:else if $currentSidebarTab === 'Requests'}
    <RequestsView {treeData} />
  {:else if $currentSidebarTab === 'Responses'}
    <ResponsesView {treeData} />
  {/if}
</div>