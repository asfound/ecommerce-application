export type AddAttributes = (attributes: Record<string, string>, element?: Element) => void;

export type AddClassList = (classList: string[], element?: Element) => void;

export type AddTextContent = (textContent: string, element: Element) => void;

export type CreateDOMElement = <TagType extends keyof HTMLElementTagNameMap>({
  attributes,
  classList,
  tagName,
  textContent,
}: ElementOptions<TagType>) => HTMLElementTagNameMap[TagType];

export interface ElementOptions<TagType> extends Options {
  tagName: TagType;
  textContent?: string;
}

interface Options {
  attributes?: Record<string, string>;
  classList?: string[];
}
