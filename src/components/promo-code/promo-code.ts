import { button } from '~/shared/create-element/tags';

import { BaseComponent } from '../base-component/base-component';
import styles from './promo-code.module.css';

export interface PromoCodeProperties {
  code: string;
  onRemove(code: string): Promise<void>;
}

export class PromoCode extends BaseComponent {
  private readonly buttonRemove = button(null, 'Remove');

  private readonly properties: PromoCodeProperties;

  public constructor(properties: PromoCodeProperties) {
    super({ className: styles.promoCode, tagName: 'div', textContent: properties.code.trim() });

    this.properties = properties;

    this.append(this.buttonRemove);

    this.setupListeners();
  }

  private setupListeners(): void {
    this.buttonRemove.addEventListener(
      'click',
      () => {
        this.properties.onRemove(this.properties.code);

        this.destroy();
      },
      { signal: this.abortController.signal },
    );
  }
}
