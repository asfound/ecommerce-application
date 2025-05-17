import type { AppProduct } from '~/api/services/products/types';

import { div, img } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './product-card.module.css';

// TODO: remove/replace
const PRICE = {
  DIVIDER: 100,
  PRECISION: 2,
} as const;

export class ProductCard extends BaseComponent implements Component {
  private readonly product: AppProduct;

  public constructor(product: AppProduct) {
    super({ className: styles.card, tagName: 'div' });

    this.product = product;

    this.createHTML();
  }

  public createHTML(): void {
    const imageELement = img({
      alt: this.product.image.label,
      className: styles.image,
      src: this.product.image.url,
    });

    const titleElement = div({ className: styles.title }, this.product.name);

    const descriptionElement = div({ className: styles.description }, this.product.description);

    const priceElement = div(
      { className: styles.price },
      '$' + (this.product.price.default / PRICE.DIVIDER).toFixed(PRICE.PRECISION),
    );

    const content = div(
      { className: styles.content },
      titleElement,
      descriptionElement,
      priceElement,
    );

    this.append(imageELement, content);
  }
}
