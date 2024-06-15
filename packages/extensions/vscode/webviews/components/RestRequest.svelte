<script>
  import Request from './Rest/RequestContent.svelte';
  import Response from './Rest/ResponseContent.svelte';
</script>

<div class="h-screen flex flex-col">
  <div class="bg-gray-800 text-white p-4 text-center">
    Header Content
  </div>
  <div class="bg-gray-700 text-white flex-grow p-4">
    <div class="flex flex-col gap-4">
      <Request />
      <Response />
    </div>
  </div>
</div>
