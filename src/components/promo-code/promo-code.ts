import iconCross from '~/assets/icons/cross.svg';
import { button } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import { BaseComponent } from '../base-component/base-component';
import styles from './promo-code.module.css';

export interface PromoCodeProperties {
  code: string;
  onRemove(code: string): Promise<void>;
}

export class PromoCode extends BaseComponent {
  private readonly deleteIcon = createSvgIcon(iconCross, styles.deleteIcon);

  private readonly buttonRemove = button({ className: styles.deleteButton }, this.deleteIcon);

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
