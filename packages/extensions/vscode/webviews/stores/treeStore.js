import { writable } from 'svelte/store';

export function createTreeStore(initialData) {
  const { subscribe, set, update } = writable(parseItems(initialData));

  function parseItems(data) {
    return data.map((item, index) => createItem(item, false, 1, `root-${index}`));
  }

  function createItem(item, isOpen, level, idPrefix) {
    const id = generateUUID(level, idPrefix);
    return {
      id,
      key: item.key,
      value: item.value,
      isOpen, // All items initially expanded
      children: item.value && Array.isArray(item.value)
        ? item.value.map((value, index) => createItem({ key: index, value }, isOpen, level + 1, `${idPrefix}-${index}`))
        : item.value && typeof item.value === 'object'
        ? Object.entries(item.value).map(([key, value], index) =>
            createItem({ key, value }, isOpen, level + 1, `${idPrefix}-${key}`))
        : []
    };
  }

  function toggleOpen(id) {
    update(items => {
      updateOpenState(items, id);
      return [...items]; // Ensure reactivity by reassigning the items array
    });
  }

  function updateOpenState(items, id) {
    items.forEach(item => {
      if (item.id === id) {
        item.isOpen = !item.isOpen;
      }
      if (item.children.length) {
        updateOpenState(item.children, id);
      }
    });
  }

  function moveItemAndChildren(oldIndex, newIndex) {
    update(items => {
      const flatItems = flattenTree(items);
      const movedItem = findItemAndRemove(items, flatItems[oldIndex].id);
      if (movedItem) {
        insertItemAt(items, movedItem, newIndex);
      }
      return [...items]; // Ensure reactivity by reassigning the items array
    });
  }

  function flattenTree(nodes) {
    let result = [];
    nodes.forEach(node => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        result = result.concat(flattenTree(node.children));
      }
    });
    return result;
  }

  function findItemAndRemove(items, id) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        return items.splice(i, 1)[0];
      }
      if (items[i].children.length > 0) {
        const result = findItemAndRemove(items[i].children, id);
        if (result) {
          return result;
        }
      }
    }
  }

  function insertItemAt(items, item, index) {
    if (index >= items.length) {
      items.push(item);
    } else {
      items.splice(index, 0, item);
    }
  }

  function generateUUID(level, prefix) {
    return `${prefix}-${'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })}`;
  }

  return {
    subscribe,
    toggleOpen,
    moveItemAndChildren
  };
}