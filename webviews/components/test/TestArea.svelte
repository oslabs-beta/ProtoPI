<!--
  path:  webviews/components/test/TestArea.svelte
-->

<script>
import { coreStateStore } from '../../stores/fileMgmt/fopStore/coreStateStore';
import { viewsStore } from '../../stores/fileMgmt/fopViews/viewsStore';
import { activeViewStore } from '../../stores/fileMgmt/fopViews/activeViewStore';
import { applyFilterAndSaveView } from '../../stores/fileMgmt/fopViews/viewFunctions';
import { exampleFilterFunction } from '../../stores/fileMgmt/fopViews/filters/filterFunctions';

// Apply the example filter and save the view with a specific ID
applyFilterAndSaveView('exampleView', exampleFilterFunction);

// Log the views store after the filter is applied
$: if ($viewsStore && $viewsStore instanceof Map) {
  console.log("Current Views Store Data:", Array.from($viewsStore.entries()));
}

// Log the active view
$: console.log("Current Active View:", $activeViewStore);
</script>

<div>
  <!-- Your UI components go here -->
  <p>Check the console for logs from Views Store and Active View Store.</p>
</div>