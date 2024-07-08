<script>
  import { filterCriteria } from '../../../stores/fileMgmt/viewDerivedStore';
  import { filterManager } from '../../../stores/fileMgmt/viewDerivedStore/viewFiltersRouters';
  
  let selectedFilter = filterManager.availableFilters[0];

  function handleFilterChange(event) {
    filterCriteria.set(event.target.value);
  }
</script>

<select bind:value={selectedFilter} on:change={handleFilterChange}>
  {#each filterManager.availableFilters as filter}
    <option value={filter}>{filter}</option>
  {/each}
</select>