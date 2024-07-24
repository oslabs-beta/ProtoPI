<script lang="ts">
  import TreeNode from '../nodes/MasterNode.svelte';
  import Sortable from 'sortablejs';
  import { onMount, onDestroy } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import type { TreeNode as TreeNodeType } from '../../../stores/fileMgmt/tnodeStore';

  export let treeStore: Writable<TreeNodeType[]>;

  let container: HTMLDivElement | null = null;
  let sortable: Sortable | null = null;
  let treeNodes: TreeNodeType[] = [];

  let unsubscribe: () => void = () => {};

  $: if (treeStore) {
    unsubscribe();
    unsubscribe = treeStore.subscribe(value => {
      treeNodes = [...value];
      console.groupCollapsed('Data Inserted Into UI:');
      console.log(treeNodes);
      console.groupEnd();
    });
  }

  onMount(() => {
    if (container) {
      sortable = new Sortable(container, {
        handle: '.header',
        animation: 150,
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;
          if (oldIndex !== undefined && newIndex !== undefined) {
            reorderContent(oldIndex, newIndex);
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
      treeStore.set([...treeNodes]);  // Update the store
    }
  }
</script>

<div bind:this={container}>
  {#each treeNodes as item, index (item.id || index)}
    <TreeNode node={item} />
  {/each}
</div>
