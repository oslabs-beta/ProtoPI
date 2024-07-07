<!-- DisplayArea.svelte  (Tree View Data Input)
  Tree data input through here for Tree View Generation 
-->
<script>
  import CoreView from '../views/coreView/CoreView.svelte';
  import { displayState } from '../../stores/displayStore';
  import { filteredTreeFilesData } from '../../stores/fileMgmt/viewDerivedStore';

  let isSplit = false;
  let treeData = [];

  displayState.subscribe($state => {
    isSplit = $state.isSplit;
  });

  filteredTreeFilesData.subscribe($data => {
    treeData = $data;
  });

</script>

<div>
  <CoreView 
    {isSplit} 
    {treeData} 
  />

  <hr class="border-2 my-4" />
  <hr class="border-2 my-4" />
</div>
