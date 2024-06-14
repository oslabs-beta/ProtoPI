<script>
  import { onMount } from "svelte";
  import "../tailwind.css";

  import SidebarTabs from './sidebar/tabs/SidebarTabs.svelte';
  import { activeTab } from '../stores/tabStore.js';

  import SchemasResps from './sidebar/tabs/SchemasResps.svelte';
  import Reqs from './sidebar/tabs/Reqs.svelte';
  import OpenAPIFileWithServer from './sidebar/mock/OpenAPIFileWithServer.svelte';
  import OpenAPIFileWithoutServer from './sidebar/mock/OpenAPIFileWithoutServer.svelte';
  import StartServerOnly from './sidebar/mock/StartServerOnly.svelte';
  import ValidateOpenAPIFile from './sidebar/mock/ValidateOpenAPIFile.svelte';

  import FormComponent from './sidebar/forms/FormComponent.svelte';

  let requests = [];
  let text = "";

  onMount(() => {
    tsvscode.postMessage({
      type: "getFiles",
      value: "info here",
    });
  });

  function startMockDispatcher() {
    tsvscode.postMessage({
      type: "startMock",
      value: "",
    });
  }

  function handleButtonClick(action) {
    tsvscode.postMessage({ type: action, value: "" });
  }
</script>

<div class="w-full p-5 bg-gray-900 text-white box-border">
  <SidebarTabs />
  {#if $activeTab === 'SchemasResps'}
    <SchemasResps />
  {:else if $activeTab === 'Reqs'}
    <Reqs />
  {/if}
</div>

<hr class="border-2 border-blue-500 my-4" />

<div class="flex flex-col gap-2 mb-4">
  <OpenAPIFileWithServer class="cursor-pointer" on:click={() => handleButtonClick("openAPIWithServer")} />
  <OpenAPIFileWithoutServer class="cursor-pointer" on:click={() => handleButtonClick("openAPIWithoutServer")} />
  <StartServerOnly class="cursor-pointer" on:click={() => handleButtonClick("startServerOnly")} />
  <ValidateOpenAPIFile class="cursor-pointer" on:click={() => handleButtonClick("validateOpenAPIFile")} />
</div>

<hr class="border-2 border-blue-500 my-4" />

<FormComponent class="w-full" bind:requests bind:text={text} {startMockDispatcher} />