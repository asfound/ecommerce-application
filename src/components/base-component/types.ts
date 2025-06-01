export interface Component {
  createHTML(...parameters: unknown[]): void;
}

export interface Properties<T extends HTMLElement> {
  attributes?: Partial<T>;
  className?: string | string[];
  tagName: TagName;
  textContent?: string;
}

export type TagName = keyof HTMLElementTagNameMap;
