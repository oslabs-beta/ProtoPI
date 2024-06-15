<script>
  import { onMount } from "svelte";
  import { activeTab } from "../../../stores/tabStore.js";
  import Reqs from "../tabs/Reqs.svelte";
  import SchemasResps from "../tabs/SchemasResps.svelte";

  function setTab(tab) {
    console.log("Setting active tab:", tab);
    activeTab.set(tab);
  }

  $: console.log("Current active tab:", $activeTab);

  onMount(() => {
    console.log("Initial active tab:", $activeTab);
  });
</script>

<div class="flex justify-around text-white mb-5" role="tablist">
  <button
    class="px-5 py-2 cursor-pointer text-center flex-grow transition duration-300 text-base outline-none font-normal border-b-2 border-transparent hover:bg-gray-800 focus:outline-none"
    class:border-b-blue-500={$activeTab === "SchemasResps"}
    role="tab"
    aria-selected={$activeTab === "SchemasResps"}
    on:click={() => setTab("SchemasResps")}
    on:keydown={(e) => e.key === "Enter" && setTab("SchemasResps")}
  >
    Schemas / Resps
  </button>
  <button
    class="px-5 py-2 cursor-pointer text-center flex-grow transition duration-300 text-base outline-none font-normal border-b-2 border-transparent hover:bg-gray-800 focus:outline-none"
    class:border-b-blue-500={$activeTab === "Reqs"}
    role="tab"
    aria-selected={$activeTab === "Reqs"}
    on:click={() => setTab("Reqs")}
    on:keydown={(e) => e.key === "Enter" && setTab("Reqs")}
  >
    Requests
  </button>
</div>

{#if $activeTab === "SchemasResps"}
  <SchemasResps />
{:else if $activeTab === "Reqs"}
  <Reqs />
{/if}
