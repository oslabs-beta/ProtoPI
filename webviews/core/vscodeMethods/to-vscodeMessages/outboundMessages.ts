import {
  initDerivedStore 
} from '../../../stores/fileMgmt/viewStoreInterface';
import { openFilesData, addFile  } from '../../../stores/fileMgmt/openStore';

  let fileInput: HTMLInputElement | null = null;
  let tsvscode: any;

  // function handleOpenAPIWithServer() {
  //   if (tsvscode) {
  //     tsvscode.postMessage({ type: "openAPIWithServer", value: "" });
  //     console.log("PostMessage sent to openAPIWithServer");
  //   } else {
  //     alert("This feature is only available in the VS Code extension.");
  //   }
  // }

  // function handleOpenAPIWithoutServer() {
  //   // if (process.env.NODE_ENV === 'development') {
  //   //   console.log("[Sidebar.svelte]  Open API File triggered");
  //   // };
  //   openFileDialog(); // For both web browser and VS Code webview
  // }

  // function handleStartServerOnly() {
  //   if (tsvscode) {
  //     tsvscode.postMessage({ type: "startServerOnly", value: "" });
  //     console.log("PostMessage sent to startServerOnly");
  //   } else {
  //     alert("This feature is only available in the VS Code extension.");
  //   }
  // }

  export function setFileInput(element: HTMLInputElement) {
    fileInput = element;
  }

  export function handleCloseAPIFile() {
    console.log("Closing API file in Sidebar");
    // fileContent.set(null);
    // parsedData.set(null);
    // selectedData.set(null);
    // console.log("fileContent, parsedData, and selectedData set to null");
    if (tsvscode) {
      tsvscode.postMessage({ type: "closeAPIFile" });
      console.log("PostMessage sent to closeAPIFile");
    } else {
      // Reset file input for browser
      if (fileInput) {
        fileInput.value = "";
        console.log("File input reset for browser");
      } else {
        console.error("File input element not found");
      }
    }
  }

  export function openFileDialog() {
    if (tsvscode) {
      // In VS Code webview
      tsvscode.postMessage({ command: 'openFile' });
      console.log("PostMessage sent to openFile in VS Code webview");
    } else {
      // In a browser
      if (fileInput) {
        fileInput.click();
        // if (process.env.NODE_ENV === 'development'){
        //   console.log("[Sidebar.svelte]  File input clicked in browser");
        // };
      } else {
        console.error("File input element not found");
      }
    }
  }

  export function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target) {
            addFile({ name: file.name, content: e.target.result as string });
            initDerivedStore();
          }
        };
        reader.readAsText(file as Blob);
      });
    }
  }
  