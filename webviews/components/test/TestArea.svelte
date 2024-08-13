<script>
/**
 * path:  webviews/components/test/TestArea.svelte
 */
  import { coreStateStore } from '../../stores/fileMgmt/fopStore/coreStateStore';

  // Auto-subscribe to the coreStateStore and log its content
  $: if ($coreStateStore && $coreStateStore instanceof Map) {
    console.log("Current Core State Data:", Array.from($coreStateStore.values()));
  } else {
    console.error("Expected $coreStateStore to be a Map, received:", $coreStateStore);
  }

  // Additional debugging information
  $: console.log('Type of $coreStateStore:', typeof $coreStateStore, '; is Map?', $coreStateStore instanceof Map);
</script>
