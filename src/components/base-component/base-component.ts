import type { ElementAttributes, Properties } from './types';

export class BaseComponent<TElementType extends HTMLElement = HTMLDivElement> {
  public get element(): TElementType {
    return this._element;
  }

  protected abortController = new AbortController();

  private readonly _element: TElementType;

  private readonly children = new Set<BaseComponent<HTMLElement>>();

  public constructor(
    properties: Properties<TElementType>,
    ...children: BaseComponent<HTMLElement>[]
  ) {
    this._element = document.createElement(properties.tagName) as TElementType;

    if (properties.className) {
      this.setClassName(properties.className);
    }

    if (properties.textContent) {
      this.setTextContent(properties.textContent);
    }

    if (properties.attributes) {
      this.setAttributes(properties.attributes);
    }

    if (children.length > 0) {
      this.append(...children);
    }
  }

  protected addClassNames(...classNames: string[]): void {
    this._element.classList.add(...classNames);
  }

  protected addListener(
    type: keyof GlobalEventHandlersEventMap,
    listener: EventListener,
    options?: AddEventListenerOptions,
  ): void {
    this._element.addEventListener(type, listener, {
      ...options,
      signal: this.abortController.signal,
    });
  }

  protected append(...children: BaseComponent<HTMLElement>[]): void {
    for (const child of children) {
      if (!(child instanceof BaseComponent)) {
        throw new TypeError('Child must be a Component instance');
      }

      this.children.add(child);

      this._element.append(child.element);
    }
  }

  protected destroy(): void {
    this.destroyChildren();

    this.abortController.abort();

    this._element.remove();
  }

  protected destroyChildren(): void {
    for (const child of this.children) {
      child.destroy();
    }

    this.children.clear();
  }

  protected hasAttribute(name: string): boolean {
    return this._element.hasAttribute(name);
  }

  protected removeAttribute(name: string): void {
    this._element.removeAttribute(name);
  }

  protected removeClassName(className: string): void {
    this._element.classList.remove(className);
  }

  protected replaceChildren(...children: BaseComponent<HTMLElement>[]): void {
    this.destroyChildren();

    this.append(...children);
  }

  // Можно удалить если что
  protected setAttribute(name: string, value: string): void {
    this._element.setAttribute(name, value);
  }

  protected setAttributes(attributes: ElementAttributes<TElementType>): void {
    for (const [name, value] of Object.entries(attributes)) {
      this.setAttribute(name, String(value));
    }
  }

  protected setClassName(className: string | string[]): void {
    if (Array.isArray(className)) {
      this._element.classList.add(...className);
    } else {
      this._element.className = className;
    }
  }

  protected setTextContent(textContent: string): void {
    this._element.textContent = textContent;
  }

  protected toggleClassName(className: string, force?: boolean): boolean {
    return this._element.classList.toggle(className, force);
  }
}
