import globeIconPath from './../../../asset-library/svgs/globe.svg';
import dotIconPath from './../../../asset-library/svgs/dot.svg';

export function getSvgIconPath(key: string): string {
  return key === 'paths' ? globeIconPath : dotIconPath;
}
