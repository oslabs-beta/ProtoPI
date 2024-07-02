<script>
  // import Header from './body/Header.svelte';
  // import MainContent from './body/MainContent.svelte';
  import RestRequest from './workshops/rest/RestRequest.svelte';

  // let activeTab = 'rest';
</script>

<div>
  <!-- <div class="flex mb-4">
    <button class={`flex-1 p-4 cursor-pointer text-center ${activeTab === 'rest' ? 'bg-gray-700' : 'bg-gray-600'}`} on:click={() => activeTab = 'rest'}>Rest Request</button>
    <button class={`flex-1 p-4 cursor-pointer text-center ${activeTab === 'hello' ? 'bg-gray-700' : 'bg-gray-600'}`} on:click={() => activeTab = 'hello'}>Hello World</button>
  </div>
  {#if activeTab === 'rest'} -->
    <RestRequest />
  <!-- {:else if activeTab === 'hello'}
    <div class="h-screen flex flex-col"> -->
      <!-- <Header /> -->
      <!-- <MainContent className="flex-grow" />
    </div>
  {/if} -->

</div>
