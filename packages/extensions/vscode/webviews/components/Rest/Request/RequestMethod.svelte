<script>
  import MethodDropdown from './elements/MethodDropdown.svelte';
  import AddressInput from './elements/AddressInput.svelte';
  import SendButton from './elements/SendButton.svelte';

  let selectedMethod = "GET";
  let url = "";
  let defaultAction = "send";
  let showDropdown = false;

  function handleSend(action) {
    // Placeholder function for sending request
    console.log(`Action: ${action}, Method: ${selectedMethod}, URL: ${url}`);
  }

  function onMethodChange(method) {
    selectedMethod = method;
  }
</script>

<div class="flex items-center space-x-4 w-full h-12">
  <div class="flex-shrink-0 w-32">
    <MethodDropdown 
      bind:selectedMethod={selectedMethod} 
      methods={["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]}
      bind:showDropdown={showDropdown}
      onMethodChange={onMethodChange}
    />
  </div>
  <div class="flex items-center space-x-4 w-full h-12">
    <AddressInput bind:url={url} />
  </div>
  <div class="flex-shrink-0 w-40 h-full">
    <SendButton onSend={handleSend} />
  </div>
  <div class="flex-shrink-0 w-12 h-full">
    <!-- Additional div to create an extra column -->
  </div>
</div>