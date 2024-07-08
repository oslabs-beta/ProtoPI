<script>
  import { setFilterCriteria } from '../../../stores/fileMgmt/viewDerivedStore';
  import { filterManager } from '../../../stores/fileMgmt/viewDerivedStore/viewFiltersRouters';
  
  export let fileHash;
  let selectedFilter = filterManager.availableFilters[0];

  function handleFilterChange(event) {
    setFilterCriteria(fileHash, event.target.value);
  }


</script>

<select bind:value={selectedFilter} on:change={handleFilterChange}>
  {#each filterManager.availableFilters as filter}
    <option value={filter}>{filter}</option>
  {/each}
</select>

<style>
  select {
    color: #fff; /* White text color for visibility on a black background */
    background-color: #000; /* Black background */
    border: 2px solid #444; /* Dark gray border to subtly differentiate from the background */
    padding: 8px; /* Padding for better usability and appearance */
    border-radius: 4px; /* Rounded corners for a smoother look */
    font-size: 16px; /* Standard font size for readability */
    cursor: pointer; /* Indicates this is an interactive element */
    width: 100%; /* Full width to match container size, adjust as needed */
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