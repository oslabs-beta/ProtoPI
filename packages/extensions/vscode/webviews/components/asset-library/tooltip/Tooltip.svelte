<script lang="ts">
  export let content: string = '';
  export let x: number = 0;
  export let y: number = 0;

  // Add a class based on the length of the content
  $: tooltipClass = content.length > 25 ? 'tooltip long-content' : 'tooltip';
</script>

<div class={tooltipClass} style="left: {x}px; top: {y}px;">
  {content}
</div>

<style>
  .tooltip {
    position: fixed; /* Use fixed position to overlay content */
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 5px;
    white-space: nowrap;
    z-index: 1000; /* Ensure tooltip is above other content */
    pointer-events: none; /* Prevents the tooltip from interfering with mouse events */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); /* Added shadow for better visibility */
  }
  .tooltip.long-content {
    white-space: normal;
    max-width: 200px; /* Adjust the maximum width as needed */
    word-wrap: break-word;
  }
</style>