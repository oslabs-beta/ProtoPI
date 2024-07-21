<script>

  /**  FROM
   * from-vscodeMessageRouter - a router to route msgs from VSCode 
   * when running the extension
  */
 import { 
   vscodeEventRouter 
  } from '../core/vsCodeMethods/from-vscodeMessagesRouter';

  /**  TO
   * to-vscodeMessages - are message that are sent to vscode extension
  */
 import { 
   handleCloseAPIFile,
    openFileDialog,
    handleFileChange,
    setFileInput,
  } from '../core/vsCodeMethods/to-vscodeMessages';

  import "../tailwind.css";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';

  import MultiActionDropButton from './asset-library/buttons/MultiActionDropButton/MultiActionDropButton.svelte';
  import DisplayArea from './sidebar/DisplayArea.svelte';

  let fileInput;
  let tsvscode;

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

    setFileInput(fileInput);
  });

  /**
   * VSCODE ROUTER Call
  */
  window.addEventListener('message', event => {
    const message = event.data;
    console.log("Message received in Sidebar:", message);

    vscodeEventRouter(message, fileInput);    // CALL VSCODEMESSAGESROUTER TOHANDLE THE MESSAGE
  })

  let actions = [
    { label: "Open API File", action: openFileDialog },
    { label: "Close API File", action: handleCloseAPIFile }
  ];

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

  <hr class="border-2 my-4" />

  <div class="w-full p-5 text-white box-border">
    <DisplayArea />
  </div>

  <hr class="border-2 my-4" />

  <input type="file" bind:this={fileInput} on:change={handleFileChange} style="display: none;" />
</div>