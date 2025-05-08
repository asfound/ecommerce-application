import { setProperties } from './helpers';

export type ElementProperties<T extends HTMLElement> = ElementEvents &
  Omit<Partial<T>, 'className'> & { className: string | string[]; signal?: AbortSignal };

export type Tag = keyof HTMLElementTagNameMap;

type ChildNode = Node | null | string | undefined;

type ElementEvents = {
  [K in keyof GlobalEventHandlersEventMap as `on${Capitalize<K>}`]?: (
    event: GlobalEventHandlersEventMap[K],
  ) => void;
};

export function createElementFactory<TName extends Tag>(tag: TName) {
  return function createElement(
    properties?: null | Partial<ElementProperties<HTMLElementTagNameMap[TName]>>,
    ...children: ChildNode[]
  ): HTMLElementTagNameMap[TName] {
    const element = document.createElement(tag);

    if (properties) {
      setProperties(element, properties);
    }

    if (children.length > 0) {
      element.append(...children.filter((child) => child != null));
    }

    return element;
  };
}
