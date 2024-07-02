<script>
  import DisplayType from './DisplayType.svelte';
  import { displayState } from '../../stores/displayStore';
  // import SplitViewButton from '../asset-library/buttons/ToOrganizeGeneralize/SplitViewButton.svelte';

  let isSplit = false;

  displayState.subscribe($state => {
    isSplit = $state.isSplit;
  });

  // function handleUpdateSplit(event) {
  //   isSplit = event.detail.isSplit;
  // }
</script>

<!-- <SplitViewButton on:updateSplit={handleUpdateSplit} /> -->

<DisplayType {isSplit} largeText={!isSplit} />