<script>
  // Input stuff
  import Requests from './requests/Requests.svelte';
  // Data coming in from sidebar (testing)
  import Responses from './responses/Responses.svelte';
</script>

<div class="h-screen flex flex-col">
  <div class="flex-grow p-4">
    <div class="flex flex-col gap-4">
      <Requests />
      <Responses />
    </div>
  </div>
</div>
