<script>
  import { filterCriteria } from '../../../../stores/fileMgmt/viewStoreInterface';
  import { get } from 'svelte/store';

  export let filterType = '';
  export let isChecked = false;

  function handleChange(event) {
    const currentFilter = get(filterCriteria);
    if (currentFilter === filterType) {
      filterCriteria.set('');
      isChecked = false;
    } else {
      filterCriteria.set(filterType);
      isChecked = true;
    }
  }
</script>

<style>
  :root {
    --switch-width: 40px;
    --switch-height: calc(var(--switch-width) / 2.5);
    --switch-dot-size: calc(var(--switch-height) - 4px);
    --switch-dot-translate: calc(var(--switch-width) - var(--switch-dot-size) - 4px);
  }

  .switch {
    @apply relative inline-block;
    width: var(--switch-width);
    height: var(--switch-height);
  }

  .switch input {
    @apply hidden;
  }

  .slider {
    @apply absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition duration-300;
    border-radius: var(--switch-height);
  }

  .slider:before {
    @apply absolute content-[''] bg-white transition duration-300;
    height: var(--switch-dot-size);
    width: var(--switch-dot-size);
    left: 4px;
    bottom: 2px;
    border-radius: 50%;
  }

  input:checked + .slider {
    @apply bg-blue-500;
  }

  input:checked + .slider:before {
    transform: translateX(var(--switch-dot-translate));
  }
</style>

<label class="switch inline-flex items-center">
  <input type="checkbox" bind:checked={isChecked} on:change={handleChange} />
  <span class="slider"></span>
</label>
