<!-- DisplayArea.svelte  (Tree View Data Input)
  Tree data input through here for Tree View Generation 
-->
<script>
  import CoreView from '../views/coreView/CoreView.svelte';
  import { displayState } from '../../stores/displayStore';
  import FilterDropdown from '../asset-library/dropdown/FilterDropdown.svelte';
  import { 
    filteredTreeFilesData, 
  } from '../../stores/fileMgmt/viewDerivedStore';

  let isSplit = false;
  let treeData = [];

  displayState.subscribe($state => {
    isSplit = $state.isSplit;
    console.log("[DisplayArea.svelte]  Display state updated:", $state);
  });

  filteredTreeFilesData.subscribe($data => {
    treeData = $data || [];
    console.log("[DisplayArea.svelte]  Filtered Tree Files Data updated:", $data);
  });
</script>

<div>
    <!-- Include FilterDropdown at the top -->
    <div class="mb-4">
      <FilterDropdown />
    </div>
  <CoreView 
    {isSplit} 
    {treeData} 
  />

  <hr class="border-2 my-4" />
  <hr class="border-2 my-4" />
</div>
