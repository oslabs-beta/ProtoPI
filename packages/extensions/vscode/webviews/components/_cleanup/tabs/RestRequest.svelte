<script>
  import Request from '../../Rest/RequestContent.svelte';
  import Response from '../../Rest/ResponseContent.svelte';
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
