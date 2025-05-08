export type Tag = keyof HTMLElementTagNameMap;

type ChildNode = Node | null | string | undefined;

type Properties<T extends Tag> = Partial<HTMLElementTagNameMap[T]>;

export function createElementFactory<T extends Tag>(tag: T) {
  return function createElement(
    properties?: Properties<T>,
    children?: ChildNode[],
  ): HTMLElementTagNameMap[T] {
    const element = document.createElement(tag);

    if (properties) {
      Object.assign(element, properties);
    }

    if (children) {
      element.append(...children.filter((child) => child != null));
    }

    return element;
  };
}
