export function getBulletOrArrow(childrenLength: number, isOpen: boolean): string {
  if (childrenLength > 0) {
    return isOpen ? '▼' : '►';
  }
  return '•';
}