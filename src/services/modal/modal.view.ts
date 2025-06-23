import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';

import { CSS_CLASS_NAME } from '../../shared/constants/constants';
import { button, div } from '../../shared/create-element/tags';
import styles from './modal.module.css';

export interface ModalProperties {
  content: HTMLElement;
}

export class ModalView extends BaseComponent implements Component {
  private readonly closeButton = button({
    className: styles.button,
    onClick: (): void => {
      this.close();
    },
    textContent: '',
    type: 'button',
  });

  private readonly containerElement = div({ className: styles.container });

  private properties: ModalProperties | null = null;

  public constructor() {
    super({ className: styles.backdrop, tagName: 'div' });

    this.setupListeners();
  }

  public close(): void {
    this.removeClassNames(styles.visible);
    document.body.classList.remove(CSS_CLASS_NAME.NO_SCROLL);

    this.replaceChildren();
  }

  public createHTML(): void {
    if (this.properties) {
      this.containerElement.replaceChildren(
        div({ className: styles.content }, this.properties.content),
      );
    }

    this.replaceChildren(this.closeButton, this.containerElement);
  }

  public open(): void {
    this.addClassNames(styles.visible);
    document.body.classList.add(CSS_CLASS_NAME.NO_SCROLL);
  }

  public setProperties(properties: ModalProperties): void {
    this.properties = properties;
  }

  private setupListeners(): void {
    this.addListener('click', (event) => {
      if (event.target === this.element) {
        this.close();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape' && this.element.classList.contains(styles.visible)) {
        this.close();
      }
    });
  }
}
