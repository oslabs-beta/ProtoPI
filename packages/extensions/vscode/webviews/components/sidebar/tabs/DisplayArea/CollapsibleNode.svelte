
<script>
  export let label;
  export let content;
  export let level = 0;

  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
  }

  function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }
</script>

<div class="node" style="margin-left: {level * 20}px;">
  <div class="cursor-pointer font-bold" on:click={toggle} role="button" tabindex="0">
    {isOpen ? '▼' : '▶'} {label}
  </div>
  {#if isOpen}
    <div class="ml-5">
      {#if isObject(content)}
        {#each Object.keys(content) as key}
          <CollapsibleNode label={key} content={content[key]} level={level + 1} />
        {/each}
      {:else}
        {content}
      {/if}
    </div>
  {/if}
</div>
