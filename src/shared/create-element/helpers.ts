import type { ElementProperties, Tag } from './create-element';

import { isString } from '../type-predicates/type-predicates';

export function isEventListener(key: string, value: unknown): value is EventListener {
  return key.startsWith('on') && typeof value === 'function';
}

export function setProperties<TName extends Tag>(
  element: HTMLElementTagNameMap[TName],
  properties: Partial<ElementProperties<HTMLElementTagNameMap[TName]>>,
): void {
  for (const [key, value] of Object.entries(properties)) {
    if (isEventListener(key, value)) {
      const SLICE_START = 2;
      const eventType = key.slice(SLICE_START).toLowerCase();
      element.addEventListener(eventType, value, { signal: properties.signal });
    } else if (key === 'style') {
      Object.assign(element.style, value);
    } else if (key === 'className') {
      if (Array.isArray(value) && value.every((name) => isString(name))) {
        element.classList.add(...value);
      }
      if (isString(value)) {
        element.className = value;
      }
    } else {
      element.setAttribute(key, String(value));
    }
  }
}
