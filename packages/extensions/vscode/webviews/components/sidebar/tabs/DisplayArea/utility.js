import { v4 as uuidv4 } from 'uuid';

export function generateUUID(level) {
  return `L${level}-${uuidv4()}`;
}