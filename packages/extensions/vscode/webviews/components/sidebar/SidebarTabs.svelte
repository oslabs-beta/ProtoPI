<script>
  import { activeTab } from '../../stores/tabStore.js';
  import MasterView from './views/MasterView.svelte'
  function setTab(tab) {
    activeTab.set(tab);
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

<div class="flex justify-around bg-gray-900 text-white mb-5" role="tablist">
  <button
    class="px-5 py-2 cursor-pointer bg-gray-900 text-center flex-grow transition duration-300 text-base outline-none font-normal border-b-2 border-transparent hover:bg-gray-800 focus:outline-none tab-button"
    class:border-b-blue-500={$activeTab === 'Responses'}
    role="tab"
    aria-selected={$activeTab === 'Responses'}
    on:click={() => setTab('Responses')}
    on:keydown={(e) => e.key === 'Enter' && setTab('Responses')}
  >
    Responses
  </button>
  <button
    class="px-5 py-2 cursor-pointer bg-gray-900 text-center flex-grow transition duration-300 text-base outline-none font-normal border-b-2 border-transparent hover:bg-gray-800 focus:outline-none tab-button"
    class:border-b-blue-500={$activeTab === 'Requests'}
    role="tab"
    aria-selected={$activeTab === 'Requests'}
    on:click={() => setTab('Requests')}
    on:keydown={(e) => e.key === 'Enter' && setTab('Requests')}
  >
    Requests
  </button>
  <button
  class="px-5 py-2 cursor-pointer bg-gray-900 text-center flex-grow transition duration-300 text-base outline-none font-normal border-b-2 border-transparent hover:bg-gray-800 focus:outline-none tab-button"
  class:border-b-blue-500={$activeTab === 'Master'}
  role="tab"
  aria-selected={$activeTab === 'Master'}
  on:click={() => setTab('Master')}
  on:keydown={(e) => e.key === 'Enter' && setTab('Master')}
>
  <SplitViewButton on:updateSplit={handleUpdateSplit} /> Master 

</button>
</div>

<div>
  {#if $activeTab === 'Master'}
    <MasterView 
      {treeData} 
    />
  {/if}
</div>