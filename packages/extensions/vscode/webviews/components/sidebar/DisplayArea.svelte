<!-- DisplayArea.svelte  (Tree View Data Input)
  Tree data input through here for Tree View Generation 
-->
<script lang='ts'>
  import SidebarTabs from './SidebarTabs.svelte'
  // import MasterView from './views/MasterView.svelte';
  // import { displayState } from '../../stores/displayStore';
  import type { TreeNode } from '../../types/types';
  import { 
    filteredTreeFilesData, 
  } from '../../stores/fileMgmt/viewDerivedStore';

  let treeData = [] || [];

  filteredTreeFilesData.subscribe($data => {
    treeData = $data || [];
    console.log("[DisplayArea.svelte]  Filtered Tree Files Data updated:", $data);
  });
</script>

<div>

  <SidebarTabs 
    {treeData} 
  />
</div>
