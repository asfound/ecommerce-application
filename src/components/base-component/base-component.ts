import { isArray, isString } from '~/shared/type-predicates/type-predicates';

import type { Properties } from './types';

import { BASE_COMPONENT_ERROR } from './constants';

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

    if (properties.className && isString(properties.className)) {
      this.setClassName(properties.className);
    }

    if (properties.className && isArray(properties.className)) {
      this.addClassNames(...properties.className);
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

  public addClassNames(...classNames: string[]): void {
    this._element.classList.add(...classNames);
  }

  public addListener(
    type: keyof GlobalEventHandlersEventMap,
    listener: EventListener,
    options?: AddEventListenerOptions,
  ): void {
    this._element.addEventListener(type, listener, {
      ...options,
      signal: this.abortController.signal,
    });
  }

  public append(...children: BaseComponent<HTMLElement>[]): void {
    for (const child of children) {
      if (!(child instanceof BaseComponent)) {
        throw new TypeError(BASE_COMPONENT_ERROR.INCORRECT_CHILD_TYPE);
      }

      this.children.add(child);

      this._element.append(child.element);
    }
  }

  public destroy(): void {
    this.destroyChildren();

    this.abortController.abort();

    this._element.remove();
  }

  public destroyChildren(): void {
    for (const child of this.children) {
      child.destroy();
    }

    this.children.clear();

    this._element.replaceChildren();
  }

  public hasAttribute(name: string): boolean {
    return this._element.hasAttribute(name);
  }

  public removeAttribute(name: string): void {
    this._element.removeAttribute(name);
  }

  public removeClassNames(...classNames: string[]): void {
    this._element.classList.remove(...classNames);
  }

  public replaceChildren(...children: BaseComponent<HTMLElement>[]): void {
    this.destroyChildren();

    this.append(...children);
  }

  public setAttributes(attributes: Partial<TElementType>): void {
    for (const [name, value] of Object.entries(attributes)) {
      this._element.setAttribute(name, String(value));
    }
  }

  public setClassName(className: string): void {
    this._element.className = className;
  }

  public setTextContent(textContent: string): void {
    this._element.textContent = textContent;
  }

  public toggleClassName(className: string, force?: boolean): boolean {
    return this._element.classList.toggle(className, force);
  }
}
