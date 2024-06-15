<script>
  import Tab from './Tab.svelte';

  export let activeTab;
  const tabs = ["Request", "Response"];

  function selectTab(event) {
    activeTab = event.detail;
  }
</script>

<div class="bg-gray-300 p-2 flex space-x-2">
  {#each tabs as tab}
    <Tab {tab} {activeTab} on:select={selectTab} />
  {/each}
</div>