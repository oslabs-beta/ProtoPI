/**
 * path:  webviews/stores/fileMgmt/fopStore/utils/fileUtils.ts
 * fileUtils.ts: Contains utility functions related to file handling, such as creating file hashes.
 */

import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid'; 

export function generateHash(input: string): string {
  const hash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
  return hash;
}

export function generateUUID(): string {
  const uuid = uuidv4();
  return uuid;
}