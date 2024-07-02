<script>
  // Input stuff
  import Request from './RequestContent.svelte';
  // Data coming in from sidebar (testing)
  import Response from './ResponseContent.svelte';
</script>

<div class="h-screen flex flex-col">
  <div class="p-4 text-center">
    Header Content
  </div>
  <div class="flex-grow p-4">
    <div class="flex flex-col gap-4">
      <Request />
      <Response />
    </div>
  </div>
</div>
