import type { AppProduct } from '~/api/services/products/types';

import { div, img } from '~/shared/create-element/tags';
import { formatPrice } from '~/shared/utils/format-price';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './product-card.module.css';

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

    const descriptionElement = div(
      { className: styles.description, title: this.product.description },
      this.product.description,
    );

    const priceElement = div({ className: styles.price }, formatPrice(this.product.price.default));

    const content = div(
      { className: styles.content },
      titleElement,
      descriptionElement,
      priceElement,
    );

    this.append(imageELement, content);
  }
}
