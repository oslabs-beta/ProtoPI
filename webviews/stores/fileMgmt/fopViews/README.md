```{
  "fileView": {
    "fileUUID1": {
      "viewId1": {
        "viewNodeUUID1": {
          "base": ["folder1", "subfolderA"],
          "name": "Node 1",
          "value": "File 1 Content",
          "pathUUID": ["uuid-1234"],
          "isOpen": false,
          "children": []
        },
        "viewNodeUUID2": {
          "base": ["folder2", "subfolderB"],
          "name": "Node 2",
          "value": "File 3 Content",
          "pathUUID": ["uuid-5678"],
          "isOpen": true,
          "children": [
            {
              "name": "Child Node 1",
              "value": "Subfile 1 Content",
              "pathUUID": ["uuid-5679"],
              "isOpen": false,
              "children": []
            }
          ]
        }
      },
      "viewId2": {
        // Another set of ViewNodeUUIDs
      }
    },
    "fileUUID2": {
      "viewId3": {
        // ViewNodeUUIDs here
      }
    }
  },
  "projectView": {
    "projectUUID1": {
      "viewId4": {
        // ViewNodeUUIDs here
      }
    }
  }
}
```

```
export interface TreeNode {
  isOpen: boolean;
  children: TreeNode[];
  value: any;
  pathUUID: string[];
}

export interface ViewNode extends TreeNode {
  name: string;  // New to ViewNode
}

export interface ViewRoot extends ViewNode {
  base: string[];  // New to ViewRoot
}
```


# Relationship Between fileView, viewId, and ViewNodeUUID
1. fileView:

- This is a top-level category that organizes views related to individual files. It serves as a container for different file-specific views, where each file is uniquely identified by a fileUUID.
- The fileView itself doesn’t contain any specific filtering or view data but rather organizes the views associated with each file.
2. fileUUID1, fileUUID2, etc.:
- These are unique identifiers for each file within the fileView category. Each fileUUID contains multiple views (e.g., viewId1, viewId2) that represent different perspectives or filtered versions of that file's data.
3. viewId1, viewId2, etc.:
- Each viewId represents a specific view configuration for a file. This could be a particular way the data is filtered, sorted, or structured.
Within each viewId, there are one or more ViewNodeUUID entries, each representing a specific node or set of nodes in the hierarchical data structure.
4. ViewNodeUUID:
- These are unique identifiers for each node or hierarchical view within a viewId.
- Each ViewNodeUUID contains details about the node, such as its base path, name, value, pathUUID, and children. This structure allows you to define the context and the exact data representation for that specific node.

# Difference Between viewId1, viewId2, etc.
viewId1, viewId2, etc. differ primarily in the way they configure the data representation for the file identified by fileUUID1 (or any other file).
For example:
viewId1 could be a view that shows data filtered by base: ["folder1", "subfolderA"] and displays the content of Node 1.
viewId2 might represent the same file but filtered by a different path, showing a different structure or set of nodes.
Each viewId can represent a different filtered view or perspective of the same underlying file data, making it easy to switch between different configurations or representations of that data.
# Can viewIds Have Different Filter Combinations of base Applied?
Yes, the viewIds can have different filter combinations of base applied. Here’s how it could work:

- Per viewId Filtering:
  - Each viewId could represent a different filtering or sorting applied to the base path. For example, viewId1 might show all nodes under ["folder1", "subfolderA"], while viewId2 could show nodes under ["folder2", "subfolderB"].
  - This means that each viewId allows you to pre-define specific filters or paths that should be visible, making it easier to present different aspects of the file’s data without the user having to manually apply filters each time.
- Centralized Filtering:
  - Alternatively, filtering could be handled elsewhere in the application, with the viewIds representing static configurations that are selected based on the user’s needs. In this approach, viewId1, viewId2, etc., would be pre-configured views, and any dynamic filtering would occur outside this structure, applied to the current view after it’s selected.
# Where Should Filtering Appear?
- If Filtering Should Be Dynamic:
  - If the application requires users to frequently apply different filters dynamically, it might be more appropriate to handle filtering outside of the viewId structure. This would keep the viewIds more general, representing different base views that users can further refine with filters as needed.
- If Views Represent Specific Configurations:
  - If each viewId represents a specific, commonly-used configuration (e.g., a particular filtered or sorted view), then filtering can be embedded within the viewId. In this case, viewId1, viewId2, etc., would each represent a different filtered view, and users would select the most appropriate one based on their needs.
# Summary
- fileView organizes views related to specific files, with each fileUUID containing different viewIds that represent specific perspectives or filtered versions of that file's data.
- viewId1, viewId2, etc. can represent different filtered views or configurations of the file’s data, potentially using different base paths.
- Filtering can either be embedded within each viewId for predefined views or handled dynamically elsewhere in the application, depending on the needs and flexibility required by the users.
