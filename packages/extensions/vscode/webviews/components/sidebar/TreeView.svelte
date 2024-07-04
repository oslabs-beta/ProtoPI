<script lang="ts">
  import TreeNode from './TreeNode.svelte';
  import Sortable from 'sortablejs';
  import { onMount, onDestroy } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import type { TreeNode as TreeNodeType } from '../../stores/fileMgmt/tsaveStore';

  export let content: Writable<TreeNodeType[]>;

  let container: HTMLDivElement | null = null;
  let sortable: Sortable | null = null;
  let treeNodes: TreeNodeType[] = [];

  interface SortableEvent {
    oldIndex?: number;
    newIndex?: number;
  }

  let unsubscribe: () => void = () => {};

  // Correctly manage subscriptions
  $: content, unsubscribe();
$: if (content) {
  console.groupCollapsed('Data Inserted Into UI:');
  unsubscribe = content.subscribe(value => {
    console.groupCollapsed('Value:');
    console.log(value);
    console.groupEnd();
    treeNodes = [...value];
  });
  console.groupEnd();
}



  onMount(() => {
    if (container) {
      sortable = new Sortable(container, {
        handle: '.header',
        animation: 150,
        onEnd: (evt: SortableEvent) => {
          if (evt.oldIndex !== undefined && evt.newIndex !== undefined) {
            reorderContent(evt.oldIndex, evt.newIndex);
          }
        }
      });
    }
  });

  onDestroy(() => {
    sortable?.destroy();
    unsubscribe();
  });

  function reorderContent(oldIndex: number, newIndex: number): void {
    if (oldIndex >= 0 && newIndex >= 0 && oldIndex < treeNodes.length && newIndex < treeNodes.length) {
      const item = treeNodes.splice(oldIndex, 1)[0];
      treeNodes.splice(newIndex, 0, item);
      content.set([...treeNodes]);  // Update the store
    }
  }
</script>

<div bind:this={container}>
    {#each treeNodes as item, index (item.id || index)}
      <TreeNode node={item} />
    {/each}
</div>