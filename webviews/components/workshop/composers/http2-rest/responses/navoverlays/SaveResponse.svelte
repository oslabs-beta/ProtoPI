<script>
  export let size;

  let sizeToDisplay = '';
  $: if (size > 1024) {
    let kb = Math.floor(size / 1024);
    let decimal = Math.round(((size % 1024) / 1024).toFixed(2) * 100);
    sizeToDisplay = `${kb}.${decimal}KB`;
  } else {
    sizeToDisplay = `${size}B`;
  }
</script>

<!-- StyledWrapper can be a div with specific styles for this example -->
<div class="styled-wrapper">
  {sizeToDisplay}
</div>

<style>
  .styled-wrapper {
    padding: 8px 16px;
    background-color: #f0f0f0; /* Light grey background */
    border: 1px solid #ccc; /* Slight border for emphasis */
    border-radius: 4px; /* Rounded corners for aesthetic */
    display: inline-block; /* Ensure it only takes up as much space as needed */
    font-family: Arial, sans-serif; /* Standard readable font */
    font-size: 14px; /* Legible font size */
    color: #333; /* Dark grey text for contrast */
    margin-left: 4px; /* Space from the left side */
  }
</style>
