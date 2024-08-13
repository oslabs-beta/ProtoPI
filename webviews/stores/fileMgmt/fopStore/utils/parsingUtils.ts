/**  
 * path:  webviews/stores/fileMgmt/fopStore/utils/parsingUtils.ts
 * parsingUtils.ts: Contains utility functions for parsing data (e.g., YAML to JSON).
 */

import { parse as yamlParse } from 'yaml';

export function parseYAML(content: string): any {
  console.groupCollapsed('parseYAML Output');
  console.log('Input Content:', content);
  const parsedContent = yamlParse(content);
  console.log('Parsed Content:', parsedContent);
  console.groupEnd();
  return parsedContent;
}