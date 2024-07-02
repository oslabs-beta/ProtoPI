<script lang="ts">
  import TreeNode from './TreeNode.svelte';
  import Sortable from 'sortablejs';
  import { onMount, onDestroy } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import type { TreeNode as TreeNodeType } from '../../../../stores/treeStore';

  export let content: Writable<TreeNodeType[]>;  // Accept the store as a prop

  let container: HTMLDivElement | null = null;
  let sortable: Sortable | null = null;
  let treeNodes: TreeNodeType[] = [];

  interface SortableEvent {
    oldIndex?: number;
    newIndex?: number;
  }

  let unsubscribe: () => void;

  // Subscribe to content store and update treeNodes
  $: {
    if (unsubscribe) unsubscribe();
    unsubscribe = content.subscribe(value => {
      console.log('TreeView content:', value);
      treeNodes = [...value];
    });
  }

  onMount(() => {
    if (container) {
      sortable = new Sortable(container, {
        handle: '.header',
        animation: 150,
        onEnd: (evt: SortableEvent) => {
          // Ensure oldIndex and newIndex are defined before using them
          if (evt.oldIndex !== undefined && evt.newIndex !== undefined) {
            reorderContent(evt.oldIndex, evt.newIndex);
          }
        }
      });
    }
  });

  onDestroy(() => {
    sortable?.destroy();
    if (unsubscribe) unsubscribe();
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
    {#each treeNodes as item (item.id)}
      <TreeNode node={item} />
    {/each}
</div>
