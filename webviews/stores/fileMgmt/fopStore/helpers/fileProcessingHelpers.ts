/**
 * path: webviews/stores/fileMgmt/fopStore/helpers/fileProcessingHelpers.ts
 */

import { parseYAML } from '../utils/parsingUtils';
import type { FileInfo, ParsedFileInfo, TreeNode, StoreState, ParsedContent } from '../types';
import { generateUUID } from '../utils/fileUtils';

// Converts parsed content into a tree structure
function convertToTreeNodes(parsedFile: ParsedFileInfo<ParsedContent>): TreeNode[] {
    function createNode(key: string, value: any, pathUUID: string[]): TreeNode {
      const nodeUUID = generateUUID();
      const newPathUUID = [...pathUUID, nodeUUID];

      const children: TreeNode[] = [];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          Object.keys(value).forEach(childKey => {
              children.push(createNode(childKey, value[childKey], newPathUUID));
          });
      }

      return {
          isOpen: false,
          value: value, // Store the actual value here
          pathUUID: newPathUUID,
          children,
      };
    }

    const rootNodes: TreeNode[] = [];
    if (parsedFile.content && typeof parsedFile.content === 'object') {
        Object.keys(parsedFile.content).forEach(key => {
            rootNodes.push(createNode(key, parsedFile.content[key], []));
        });
    }

    const rootUUID = generateUUID();
    const rootNode: TreeNode = {
        isOpen: false,
        value: "root",
        pathUUID: [rootUUID],
        children: rootNodes,
    };

    return [rootNode];
}

// Processes and parses the file content
function processAndParseFile(file: FileInfo<string | ParsedContent>): { error: string | null, parsedFile: ParsedFileInfo<ParsedContent> | null } {
    if (file.wasPassedToCoreState) {
        return { error: null, parsedFile: null }; // Skip already processed files
    }

    try {
        let parsedContent: ParsedContent | null = null;

        if (typeof file.content === 'object') {
            parsedContent = file.content as ParsedContent;
        } else if (typeof file.content === 'string') {
            parsedContent = parseYAML(file.content); // Assuming parseYAML is a function to parse YAML content
        }

        if (!parsedContent) {
            return { error: 'Parsed content is null', parsedFile: null };
        }

        return { error: null, parsedFile: { ...file, content: parsedContent } };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred during parsing";
        return { error: errorMessage, parsedFile: null };
    }
}

// Creates file metadata including tree node maps
export function createFileMetadata(file: ParsedFileInfo<ParsedContent>, treeNodes: TreeNode[]): ParsedFileInfo<ParsedContent> {
    const nodeUuidToNodeMap = new Map<string, TreeNode>();
    const pathUuidToNodeMap = new Map<string, TreeNode>();

    function traverseAndIndexNodes(node: TreeNode) {
        const nodeUUID = node.pathUUID[node.pathUUID.length - 1];
        const pathUUIDKey = node.pathUUID.join('-');

        nodeUuidToNodeMap.set(nodeUUID, node);
        pathUuidToNodeMap.set(pathUUIDKey, node);

        node.children.forEach(child => traverseAndIndexNodes(child));
    }

    treeNodes.forEach(node => traverseAndIndexNodes(node));

    return {
        ...file,
        nodeUuidToNodeMap,
        pathUuidToNodeMap,
        treeNodeMap: treeNodes,
    };
}

// Processes all raw files, generating their parsed counterparts
export function processFiles($rawFilesData: StoreState<Map<string, FileInfo<string>>>): Map<string, ParsedFileInfo<ParsedContent>> {
    const parsedData = new Map<string, ParsedFileInfo<ParsedContent>>();

    if ($rawFilesData.data && $rawFilesData.data instanceof Map) {
        $rawFilesData.data.forEach((file, uuid) => {
            if (!file.wasPassedToCoreState) {
                const { parsedFile, error } = processAndParseFile(file);
                if (!parsedFile) {
                    console.error(`Error parsing file: ${error}`);
                    return;
                }

                const treeNodes = convertToTreeNodes(parsedFile);
                const fileInfoWithMetadata = createFileMetadata(parsedFile, treeNodes);

                parsedData.set(uuid, fileInfoWithMetadata);
            }
        });
    } else {
        console.error('Error: $rawFilesData.data is undefined or not a Map');
    }

    return parsedData;
}