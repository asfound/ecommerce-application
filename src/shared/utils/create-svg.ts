export function createSvgIcon(iconName: string, className?: string | string[]): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

  use.setAttribute('href', `#${iconName}`);
  svg.append(use);

  if (className) {
    if (Array.isArray(className)) {
      svg.setAttribute('class', className.join(' '));
    } else {
      svg.setAttribute('class', className);
    }
  }

  return svg;
}
