export interface Component {
  createHTML(): void;
}

export type ElementAttributes<T extends HTMLElement> = {
  [K in keyof T as K extends keyof GlobalEventHandlers ? never : K]: K extends 'style'
    ? Partial<CSSStyleDeclaration>
    : T[K];
};

export interface Properties<T extends HTMLElement> {
  attributes?: ElementAttributes<T>;
  className?: string | string[];
  tagName: TagName;
  textContent?: string;
}

export type TagName = keyof HTMLElementTagNameMap;
