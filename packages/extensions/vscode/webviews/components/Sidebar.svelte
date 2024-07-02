<script>
  import { onMount } from "svelte";
  import "../tailwind.css";
  // import SidebarTabs from './sidebar/tabs/SidebarTabs.svelte';
  import { activeTab } from '../stores/tabStore.js';
  import MultiActionDropButton from './asset-library/buttons/MultiActionDropButton/MultiActionDropButton.svelte';
  import { fileContent, parsedData, selectedData } from '../stores/dataStore';
  import YAML from 'yaml';
  import { writable } from 'svelte/store';
  import { openFilesData } from '../stores/fileMgmt/openStore';
  import DisplayArea from './sidebar/DisplayArea.svelte';
  import SliderButton from './asset-library/buttons/ToOrganizeGeneralize/SliderButton.svelte';
  import { filterCriteria } from '../stores/fileMgmt/treefilterStore'; // Import the filterCriteria store
  import SplitViewButton from './asset-library/buttons/ToOrganizeGeneralize/SplitViewButton.svelte'; // Import the SplitViewButton

  let fileInput;
  let tsvscode;
  let responsesIncluded = writable(false);
  let isSplit = false; 

  onMount(() => {
    if (typeof acquireVsCodeApi === "function") {
      if (!window.vscode) {
        tsvscode = acquireVsCodeApi();
        tsvscode.postMessage({
          type: "getFiles",
          value: "info here",
        });
        console.log("VS Code API acquired");
      } else {
      tsvscode = window.vscode;
      console.log("Using existing VS Code API instance");
    }
      console.log("VS Code API acquired and postMessage sent to getFiles");
    }
  });

  function handleUpdateSplit(event) {
    isSplit = event.detail.isSplit;
    console.log('Split View state updated:', isSplit);
  }

  function handleOpenAPIWithServer() {
    if (tsvscode) {
      tsvscode.postMessage({ type: "openAPIWithServer", value: "" });
      console.log("PostMessage sent to openAPIWithServer");
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
      console.log("PostMessage sent to startServerOnly");
    } else {
      alert("This feature is only available in the VS Code extension.");
    }
  }

  function handleCloseAPIFile() {
    console.log("Closing API file in Sidebar");
    fileContent.set(null);
    parsedData.set(null);
    selectedData.set(null);
    console.log("fileContent, parsedData, and selectedData set to null");
    if (tsvscode) {
      tsvscode.postMessage({ type: "closeAPIFile" });
      console.log("PostMessage sent to closeAPIFile");
    } else {
      // Reset file input for browser
      fileInput.value = "";
      console.log("File input reset for browser");
    }
  }

  function openFileDialog() {
    if (tsvscode) {
      // In VS Code webview
      tsvscode.postMessage({ command: 'openFile' });
      console.log("PostMessage sent to openFile in VS Code webview");
    } else {
      // In a browser
      fileInput.click();
      console.log("File input clicked in browser");
    }
  }

  function handleFileChange(event) {
    const files = event.target.files;
    if (files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          openFilesData.update(currentFiles => {
            if (!Array.isArray(currentFiles)) {
              currentFiles = [];
            }
            return [
              ...currentFiles,
              { name: file.name, content: e.target.result }
            ];
          });
        };
        reader.readAsText(file);
      });
    }
  }

  window.addEventListener('message', event => {
    const message = event.data;
    console.log("Message received in Sidebar:", message);
    if (message.command === 'fileContent') {
      const content = message.content;
      fileContent.set(content);
      
      // Log the file content in a collapsed group
      console.groupCollapsed("File content set in fileContent store via message:");
      console.log(content);
      console.groupEnd();

      // Parse the YAML file
      try {
        const data = YAML.parse(content);
        parsedData.set(data);
        selectedData.set(data); 
        console.log("File read successfully via message. Parsed data set in parsedData and selectedData:", data);
      } catch (error) {
        console.error("Error parsing YAML file:", error);
      }
    } else if (message.command === 'closeFile') {
      console.log("Closing file in Sidebar via message");
      fileContent.set(null);
      parsedData.set(null);
      selectedData.set(null);
      console.log("fileContent, parsedData, and selectedData set to null via message");
      // Reset file input for browser
      fileInput.value = "";
      console.log("File input reset for browser via message");
    }
  });

  function handleCheckboxChange(event) {
    responsesIncluded.set(event.target.checked);  // Update store value based on checkbox state
    console.log("responsesIncluded set to", event.target.checked);
  }

  let actions = [
    { label: "Open API File", action: handleOpenAPIWithoutServer },
    { label: "Close API File", action: handleCloseAPIFile }
  ];

  let isRequestsFilter = false;

  function handleFilterChange(event) {
    isRequestsFilter = event.target.checked;
    filterCriteria.set(isRequestsFilter ? 'requests' : ''); // Update the filter criteria based on the toggle state
    console.log('Filter Criteria Set:', isRequestsFilter ? 'requests' : '');
  }
</script>

<div>
    <!-- Use the new MultiActionDropButton component with caretWidth prop -->
  <div class="mb-4">
    <MultiActionDropButton
      actions={actions}
      defaultLabel="Select an action"
      caretWidth="30px"
    />
  </div>

  <hr class="border-2 my-4" />

  <SplitViewButton on:updateSplit={handleUpdateSplit} />
  <SliderButton {isRequestsFilter} onChange={handleFilterChange} />

  <hr class="border-2 my-4" />

  <div class="w-full p-5 text-white box-border">
    <!-- <SidebarTabs /> -->
    <DisplayArea />
  </div>

  <hr class="border-2 my-4" />

  <input type="file" bind:this={fileInput} on:change={handleFileChange} style="display: none;" />
</div>