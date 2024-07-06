<script>
  import RequestMethod from './Request/RequestMethod.svelte';
  import ClientFormTab from '../../body/ClientFormTab.svelte';
</script>

<div class="request w-full bg-gray-700 p-4 rounded">
  <RequestMethod />
  <hr class="border-2 my-4" />
  <ClientFormTab />
</div>