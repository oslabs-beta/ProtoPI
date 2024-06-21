<script lang='ts'>
  import RequestMetaHeader from './RequestMetaHeader.svelte';
  import Tabs from './Tabs.svelte';
  import RequestPanel from './RequestPanel.svelte';
  import ResponsePanel from './ResponsePanel.svelte';
  import { onMount } from 'svelte';

  export let className = "";
  let activeTab = "Request";
</script>

<div class={className}>
  <RequestMetaHeader class="flex-shrink-0" />
  <Tabs bind:activeTab class="flex-shrink-0" />
  {#if activeTab === "Request"}
    <RequestPanel class="flex-grow p-4 overflow-auto" />
  {:else if activeTab === "Response"}
    <ResponsePanel class="flex-grow p-4 overflow-auto" />
  {/if}
</div>

