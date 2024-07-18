import { OpenAPI, OpenAPIV3_1 } from '../types';
import doc from './sampleDocument';

import { generatePath } from '../path/generate';
import { printPath } from '../path/print';

describe('Generators Test Suite', () => {
	// vscode.window.showInformationMessage('Start generators tests.');
  
  test('generatePath produces a string', () => {
    const output = generatePath(doc);
    // assert.ok(typeof output === 'string', 'output is not a string');
    expect(typeof output).toBe('string');
  });
});
