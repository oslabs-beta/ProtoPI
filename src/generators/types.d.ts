// import { Uri } from "vscode";

// export type ReqMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace';
// export type ParamLoc = 'query' | 'header' | 'path' | 'cookie';

// export interface Operation {
//   tags?: string[],
//   summary?: string,
//   description?: string,
//   externalDocs?: ExternalDocs,
//   operationId?: string,                    // This is a unique operation name like 'getUserById'
//   parameters?: (Parameter | Reference)[],
//   requestBody?: ReqBody | Reference
// }

// export interface Parameter {
//   name: string,
//   in: ParamLoc,
//   description?: string,
//   required?: boolean,
//   deprecated?: boolean,
//   allowEmptyValue?: boolean
// }

// export interface ExternalDocs {
//   description?: string,
//   url: URL
// }

// export interface Reference {
//   $ref: Uri,
//   summary?: string,
//   description?: string
// }

// export interface ReqBody {
//   description?: string,
//   content: 
// }

// export interface Media {
//   schema
// }

export { OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';