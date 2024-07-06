<script>
  import CoreView from '../views/coreView/CoreView.svelte';
  // import RequestsView from '../views/requestsView/RequestsView.svelte';
  import { displayState } from '../../stores/displayStore';

  let isSplit = false;

  displayState.subscribe($state => {
    isSplit = $state.isSplit;
  });
</script>

<CoreView {isSplit} largeText={!isSplit} />
<hr class="border-2 my-4" />
<hr class="border-2 my-4" />
<!-- <RequestsView {isSplit} largeText={!isSplit} /> -->