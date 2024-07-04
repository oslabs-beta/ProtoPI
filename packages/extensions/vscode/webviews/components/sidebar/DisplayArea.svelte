<script>
  import DisplayType from './DisplayType.svelte';
  import { displayState } from '../../stores/displayStore';

  let isSplit = false;

  displayState.subscribe($state => {
    isSplit = $state.isSplit;
  });

</script>

<DisplayType {isSplit} largeText={!isSplit} />