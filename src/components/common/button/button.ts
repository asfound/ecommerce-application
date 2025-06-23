import { BaseComponent } from '~/components/base-component/base-component';

import styles from './button.module.css';

export interface ButtonProperties {
  className?: string;
  onClick?(): Promise<void> | void;
  textContent: string;
  type: HTMLButtonElement['type'];
}

export class Button extends BaseComponent<HTMLButtonElement> {
  private readonly properties;

  public constructor(properties: ButtonProperties) {
    super({
      attributes: { type: properties.type },
      className: styles.button,
      tagName: 'button',
      textContent: properties.textContent,
    });

    this.properties = properties;

    if (this.properties.className) {
      this.addClassNames(this.properties.className);
    }

    this.setupListeners();
  }

  public disable(): void {
    this.setAttributes({ disabled: true });
  }

  public enable(): void {
    this.removeAttribute('disabled');
  }

  private setupListeners(): void {
    this.addListener('click', () => {
      this.properties.onClick?.();
    });
  }
}
