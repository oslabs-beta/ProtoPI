<script>
  import DisplayType from './DisplayType.svelte';
  import SplitViewButton from '../asset-library/buttons/ToOrganize/SplitViewButton.svelte';

  import { displayState } from '../../stores/displayStore';

  let isSplit = false;

  displayState.subscribe($state => {
    isSplit = $state.isSplit;
  });

  function handleUpdateSplit(event) {
    isSplit = event.detail.isSplit;
  }
</script>

<SplitViewButton on:updateSplit={handleUpdateSplit} />

<DisplayType {isSplit} largeText={!isSplit} />