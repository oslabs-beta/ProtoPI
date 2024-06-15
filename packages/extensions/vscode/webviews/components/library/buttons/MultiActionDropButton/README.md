# MultiActionDropButton Component

The `MultiActionDropButton` component is a customizable button with a dropdown caret, designed to allow users to perform multiple actions from a single button. This component dynamically adjusts its width based on the length of the provided labels and includes customizable properties for the caret width.

## Features

- Dynamically adjusts width based on the longest label.
- Customizable caret width.
- Supports multiple actions through a dropdown.

## Usage

### Importing the Component

```svelte
  import MultiActionDropButton from './../../library/buttons/MultiActionDropButton/MultiActionDropButton.svelte';
```
## Basic Example

```svelte
  let actions = [
    { label: "Open API file with Server Running", action: () => console.log("Open API with Server Running") },
    { label: "Open API File", action: () => console.log("Open API File") },
    { label: "Start Server Only", action: () => console.log("Start Server Only") }
  ];


<MultiActionDropButton
  actions={actions}
  defaultLabel="Select an action"
  caretWidth="40px" 
/>

```