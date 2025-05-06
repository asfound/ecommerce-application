import type {
  AddAttributes,
  AddClassList,
  AddTextContent,
  CreateDOMElement,
} from '~/components/base-component/base-component-types.ts';

export abstract class BaseComponent<TagType extends keyof HTMLElementTagNameMap, Options> {
  protected element: HTMLElementTagNameMap[TagType];

  private abortController: AbortController;

  protected constructor(options?: Options) {
    this.element = this.createComponentNode(options);
    this.abortController = new AbortController();
  }

  public addListener<EventType extends keyof HTMLElementEventMap>(
    type: EventType,
    listener: (event: Event) => void,
    options?: AddEventListenerOptions | boolean,
  ): void {
    const listenerOptions =
      typeof options === 'object'
        ? { ...options, signal: this.abortController.signal }
        : { capture: options, signal: this.abortController.signal };

    this.element.addEventListener(type, listener, listenerOptions);
  }

  public appendElement(...children: Element[]): void {
    this.element.append(...children);
  }

  public clearElement(): void {
    this.element.replaceChildren();
  }

  public destroy(): void {
    this.element.remove();
    this.removeAllListeners();
  }

  public getNode(): HTMLElementTagNameMap[TagType] {
    return this.element;
  }

  public removeListener<EventType extends keyof HTMLElementEventMap>(
    type: EventType,
    listener: (event: Event) => void,
    options?: AddEventListenerOptions | boolean,
  ): void {
    this.element.removeEventListener(type, listener, options);
  }

  protected addAttributes: AddAttributes = (attributes, element?) => {
    element = this.getTargetElement(element);
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }
  };

  protected addClassList: AddClassList = (classList, element?) => {
    element = this.getTargetElement(element);
    element.classList.add(...classList);
  };

  protected addTextContent: AddTextContent = (textContent, element?) => {
    element = this.getTargetElement(element);
    element.textContent = textContent;
  };

  protected abstract createComponentNode(options?: Options): HTMLElementTagNameMap[TagType];

  protected createDOMElement: CreateDOMElement = ({
    attributes,
    classList,
    tagName,
    textContent,
  }) => {
    const element = document.createElement(tagName);
    if (classList) {
      this.addClassList(classList, element);
    }
    if (attributes) {
      this.addAttributes(attributes, element);
    }
    if (textContent) {
      this.addTextContent(textContent, element);
    }

    return element;
  };

  protected getTargetElement(element?: Element): Element {
    return element ?? this.element;
  }

  protected removeAllListeners(): void {
    this.abortController.abort();
    this.abortController = new AbortController();
  }
}
