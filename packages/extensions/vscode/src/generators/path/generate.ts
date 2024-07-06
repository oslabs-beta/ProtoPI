import { dump } from 'js-yaml';

import { OpenAPI, OpenAPIV3_1, OpenAPIV3 } from "../types";

/* const convertResponsesObjectToYaml = (responsesObject: OpenAPIV3_1.ResponsesObject) => {
  try {
    return dump(responsesObject);
  } catch (err) {
    console.error('Error converting to YAML:', err);
    return null;
  }
}; */

/**
 * 
 * @param obj Object to parse.
 * @param cb Callback function to run on each property, however nested.
 * @param toMod Optional variable to modify.
 * @param depth Current nesting level, in case it's relevant to the callback.
 * @returns Either nothing or the modified `toMod` variable.
 */
/*
export function deepObjectForEach(
  obj: Object,
  cb: (
    prop: [string, any],
    depth: number,
    toMod?: any
  ) => string,
  toMod?: any,
  depth = 0
): (any | void) {
  // Array of key-value pair tuples of `obj`
  const props = Object.entries(obj);
  // For each `prop` in `props`...
  props.forEach(prop => {
    // If the value is a non-empty object...
    if (typeof prop[1] === 'object' && Object.keys(prop[1]).length > 0) {
      // Recursive call, pre-incrementing `depth`
      toMod = deepObjectForEach(prop[1], cb, toMod, ++depth);
    } else {
      // If there is a variable to modify...
      if (toMod) {
        // Run the callback on the prop, passing in `toMod`...
        toMod = cb(prop, depth, toMod);
      } else {
        // Run the callback on the prop, without `toMod`
        cb(prop, depth);
      }
    }
  });
  // If there is a modified variable, return it
  return toMod ? toMod : void 0;
};
*/

/**
 * 
 * @param prop Key-value pair tuple.
 * @param depth Nesting level of `prop`, used as a leading-space multiplier.
 * @param toMod String variable to modify.
 * @returns 
 */
/* export function nextGen(
  prop: [string, any],
  depth: number,
  toMod: string
): string {
  // OpenAPI spec file indent (two spaces).
  const s = '  ';
  // Starting indent (inside `responses` field)
  let ss = '      ';
  // Add indents for each nesting level
  for (let i = 0; i < depth; i++) {
    ss += s;
  }
  // `toMod` modification.
  toMod += prop[0] + ':';
  if (typeof prop[1] === 'string') {
    toMod += ' ' + prop[1] + '\n' + ss;
  // } else if (Array.isArray(prop[1])) {
  //   prop[1].forEach(el => {
  //     toMod += el + '\n' + ss;
  //   });
  } else if (typeof prop[1] === 'object') {
    toMod += ': {}';
  }
  return toMod;
} */

export const resps: OpenAPIV3_1.ResponsesObject & OpenAPIV3.ResponsesObject = {
  '200': {
    description: 'Pet updated.',
    content: {
      'application/json': {},
      'application/xml': {}
    }
  },
  '405': {
    description: 'Method Not Allowed',
    content: {
      'application/json': {},
      'application/xml': {}
    }
  }
};

// console.log(convertResponsesObjectToYaml(resps));

export function generatePathSpec(
  path: string,
  // method: OpenAPIV3_1.HttpMethods,
  // operation: types.Operation, // operation includes responses object
  // summary?: string,
  // description?: string,
  // parameters?: types.Parameters
  pathObject: OpenAPIV3_1.PathItemObject
): string {
  // let out = '';
  // switch (method) {
  //   case 'get':

  //     out += 'get:\n  ';

  //     if (summary) {
  //       out += `summary: ${summary}\n  `;
  //     }

  //     if (description) {
  //       out += `description: ${description}\n  `;
  //     }

  //     out += 'responses:\n    ';
  //     if (operation.responses) {
  //       out += convertResponsesObjectToYaml(operation.responses as OpenAPIV3_1.ResponsesObject);
  //     }

  //     break;
  //   default:
  // }

  return `
  ${path}:
  ${dump(pathObject)}`;
}

export const pathItem: OpenAPIV3_1.PathItemObject = {
  get: {
    responses: resps
  }
};

/* console.log(generatePathSpec(
  '/pets',
  // 'get' as OpenAPIV3_1.HttpMethods,
  // {
  //   responses: resps
  // }
  pathItem
)); */