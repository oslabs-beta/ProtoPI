<script>
  import { displayState } from '../../../../stores/displayStore';
  import { createEventDispatcher } from 'svelte';

  let isSplit = false;
  const dispatch = createEventDispatcher();

  displayState.subscribe($state => {
    isSplit = $state.isSplit;
    dispatch('updateSplit', { isSplit });
  });

  function toggleSplitView() {
    displayState.update(state => ({ ...state, isSplit: !state.isSplit }));
  }
</script>

<button on:click={toggleSplitView} class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
  {isSplit ? 'Merge View' : 'Split View'}
</button>