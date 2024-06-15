<script>
  import { selectedData } from '../../stores/selectedDataStore';

  let clipboardData = null;
  let fetchData = null;

  $: selectedData.subscribe(value => {
    if (value) {
      if (value.method) {
        fetchData = value;
        clipboardData = null;
      } else {
        clipboardData = value;
        fetchData = null;
      }
      console.log('ResponseContent received selected data:', value);
    } else {
      clipboardData = null;
      fetchData = null;
    }
  });
</script>

<div>
  <h1>Response Content</h1>
  {#if clipboardData}
    <div class="max-h-96 overflow-y-auto">
      <h2>Clipboard Data</h2>
      <pre class="whitespace-pre-wrap">{JSON.stringify(clipboardData, null, 2)}</pre>
    </div>
  {/if}
  {#if fetchData}
    <div class="max-h-96 overflow-y-auto">
      <h2>Fetch Method Data</h2>
      <pre class="whitespace-pre-wrap">{JSON.stringify(fetchData, null, 2)}</pre>
    </div>
  {/if}
  {#if !clipboardData && !fetchData}
    <p>No data selected.</p>
  {/if}
</div>