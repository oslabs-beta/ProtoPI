<script>
  import { onMount } from "svelte";
  import AddressInput from "./elements/AddressInput.svelte";
  import MethodDropdown from "./elements/MethodDropdown.svelte";
  import SendButton from "./elements/SendButton.svelte";

  let selectedMethod = "GET";
  let url = "";
  let defaultAction = "send";
  let showDropdown = false;

  let response = "";

  onMount(() => {
    window.addEventListener("message", (event) => {
      const message = event.data;
      switch (message.type) {
        case "sendFetchResponse":
          console.log("fetch response here", JSON.stringify(message.data));
          response = JSON.stringify(message.data);
          break;
        case "error":
          response = "Error fetching";
          break;
      }
    });
  });

  function handleSend(action) {
    // Placeholder function for sending request
    console.log(`Action: ${action}, Method: ${selectedMethod}, URL: ${url}`);
    tsvscode.postMessage({
      type: "makeFetchRequest",
      value: { requestUrl: url, method: selectedMethod },
    });
  }

  function onMethodChange(method) {
    selectedMethod = method;
  }
</script>

<div class="flex items-center space-x-4 w-full h-12">
  <div class="flex-shrink-0 w-32">
    <MethodDropdown
      bind:selectedMethod
      methods={["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]}
      bind:showDropdown
      {onMethodChange}
    />
  </div>
  <div class="flex items-center space-x-4 w-full h-12">
    <AddressInput bind:url />
  </div>
  <div class="flex-shrink-0 w-40 h-full">
    <SendButton onSend={handleSend} />
  </div>
  <div class="flex-shrink-0 w-12 h-full">
    <!-- Additional div to create an extra column -->
  </div>
</div>
