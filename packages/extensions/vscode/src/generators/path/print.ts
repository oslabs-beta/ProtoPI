import fs from 'fs/promises';
import { PathLike } from 'fs';
import path from 'path';

import { OpenAPI as types, OpenAPIV3_1 as subtypes, OpenAPI } from "../types";
import { generatePathSpec, pathItem, resps } from "./generate";

const outPath = path.resolve(__dirname, '../../YAMLs/forTesting.yaml');

const addPathToYaml = async (path: PathLike, pathItem: subtypes.PathItemObject): Promise<void> => {
  await fs.appendFile(outPath, generatePathSpec(path as string, pathItem));
};

addPathToYaml('/pets', pathItem);