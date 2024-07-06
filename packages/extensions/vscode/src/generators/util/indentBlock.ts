export function indentBlock(block: string, spaces: number = 2): string {
  while (spaces > 0) {
    block.replaceAll('\n', ' \n');
  }
  return block;
}