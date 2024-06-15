<script>
  import { onMount } from "svelte";
  import "../tailwind.css";
  import SidebarTabs from './sidebar/tabs/SidebarTabs.svelte';
  import { activeTab } from '../stores/tabStore.js';
  import MultiActionDropButton from './../components/library/buttons/MultiActionDropButton/MultiActionDropButton.svelte';
  import { fileContent, parsedData } from '../stores/dataStore';
  import YAML from 'yaml';
  import { writable } from 'svelte/store';

  let fileInput;
  let tsvscode;
  let responsesIncluded = writable(false);

  onMount(() => {
    if (typeof acquireVsCodeApi === "function") {
      tsvscode = acquireVsCodeApi();
      tsvscode.postMessage({
        type: "getFiles",
        value: "info here",
      });
    }
  });

  function handleOpenAPIWithServer() {
    if (tsvscode) {
      tsvscode.postMessage({ type: "openAPIWithServer", value: "" });
    } else {
      alert("This feature is only available in the VS Code extension.");
    }
  }

  function handleOpenAPIWithoutServer() {
    console.log("Open API File triggered");
    openFileDialog(); // For both web browser and VS Code webview
  }

  function handleStartServerOnly() {
    if (tsvscode) {
      tsvscode.postMessage({ type: "startServerOnly", value: "" });
    } else {
      alert("This feature is only available in the VS Code extension.");
    }
  }

  function handleCloseAPIFile() {
    console.log("Closing API file in Sidebar");
    fileContent.set(null);
    parsedData.set(null);
    if (tsvscode) {
      tsvscode.postMessage({ type: "closeAPIFile" });
    } else {
      // Reset file input for browser
      fileInput.value = "";
    }

  }

  function openFileDialog() {
    if (tsvscode) {
      // In VS Code webview
      tsvscode.postMessage({ command: 'openFile' });
    } else {
      // In a browser
      fileInput.click();
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result;
        fileContent.set(content);

        // Parse the YAML file
        try {
          const data = YAML.parse(content);
          parsedData.set(data);
          console.log("File read successfully. Parsed data:", data);
        } catch (error) {
          console.error("Error parsing YAML file:", error);
        }
      };
      reader.readAsText(file);
    } else {
      console.log("No file selected");
    }

  }

  window.addEventListener('message', event => {
    const message = event.data;
    console.log("Message received in Sidebar:", message);
    if (message.command === 'fileContent') {
      const content = message.content;
      fileContent.set(content);

      // Parse the YAML file
      try {
        const data = YAML.parse(content);
        parsedData.set(data);
        console.log("File read successfully. Parsed data:", data);
      } catch (error) {
        console.error("Error parsing YAML file:", error);
      }
    } else if (message.command === 'closeFile') {
      console.log("Closing file in Sidebar")
      fileContent.set(null);
      parsedData.set(null);
      // Reset file input for browser
      fileInput.value = "";
    }
  });

  function handleCheckboxChange(event) {
    responsesIncluded.set(event.target.checked);  // Update store value based on checkbox state
  }

  let actions = [
    { label: "Open API File", action: handleOpenAPIWithoutServer },
    { label: "Close API File", action: handleCloseAPIFile }
  ];
</script>

<!-- Use the new MultiActionDropButton component with caretWidth prop -->
<div class="mb-4">
  <MultiActionDropButton
    actions={actions}
    defaultLabel="Select an action"
    caretWidth="30px"
  />
</div>

<hr class="border-2 my-4" />

<div class="w-full p-5 text-white box-border">
  <SidebarTabs />
</div>

<hr class="border-2 my-4" />

<input type="file" bind:this={fileInput} on:change={handleFileChange} style="display: none;" />

<div>
  <label>
    <input type="checkbox" on:change={handleCheckboxChange}>
    Include Responses
  </label>
</div>