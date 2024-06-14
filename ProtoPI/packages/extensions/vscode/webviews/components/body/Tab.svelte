<script>
  import { createEventDispatcher } from 'svelte';
  
  export let tab;
  export let activeTab;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("select", tab);
  }
</script>

<button
  class="px-4 py-2 rounded-t bg-gray-400 text-white hover:bg-gray-500 focus:outline-none {activeTab === tab ? 'bg-gray-500' : ''}"
  on:click={handleClick}
>
  {tab}
</button>