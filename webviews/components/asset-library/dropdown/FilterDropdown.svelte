<script>
  import { onMount } from 'svelte';
  import { setFilterCriteria } from '../../../stores/fileMgmt/viewStoreInterface';
  import { filterManager } from '../../../stores/fileMgmt/viewStore/filters';
  
  export let fileHash;
  let selectedFilter = filterManager.availableFilters[0];
  let maxWidth = '30px'; // Default max width

  function handleFilterChange(event) {
    setFilterCriteria(fileHash, event.target.value);
  }

  onMount(() => {
    // Fixed width for the caret "button"
    maxWidth = '30px'; // Adjust this value to fit the caret size better if necessary
  });

</script>

<select bind:value={selectedFilter} on:change={handleFilterChange} style="width: {maxWidth};">
  {#each filterManager.availableFilters as filter}
    <option value={filter}>{filter}</option>
  {/each}

  
</select>

<style>
  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 512"%3E%3Cpath fill="%23fff" d="M512 400L100 112h824L512 400z"%3E%3C/path%3E%3C/svg%3E') no-repeat;
    background-position: center center;
    background-size: 24px 16px; /* Adjust size of caret */
    background-color: #000; /* Black background */
    border: 2px solid #444; /* Dark gray border to subtly differentiate from the background */
    padding: 0px; /* Padding for better usability and appearance */

    border-radius: 4px; /* Rounded corners for a smoother look */
    font-size: 16px; /* Font size for options, not visible on button  */
    cursor: pointer; /* Indicates it's clickable */
    color: transparent;  /* Hides the text of the selected item */
    width: 30px; /* Exact width to house the caret */
    height: 30px; /* Exact height to match width for square appearance */
  }

  select:hover {
    border-color: #666; /* Slightly lighter border on hover for a visual response */
  }

  select:focus {
    outline: none; /* Remove default focus outline */
    border-color: #00aaff; /* Bright blue border for clear focus indication */
    box-shadow: 0 0 8px rgba(0, 170, 255, 0.75); /* Blue glow for focus, enhancing visibility */
  }

  option {
    color: #fff; /* Maintaining white text for options */
    background-color: #000; /* Consistent black background for options */
    padding: 8px; /* Padding for better readability */
    font-size: 16px; /* Ensure consistent font size across all options */
  }
</style>