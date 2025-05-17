import type { AppProduct } from '~/api/services/products/types';

import { div, img } from '~/shared/create-element/tags';
import { formatPrice } from '~/shared/utils/format-price';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './product-card.module.css';

const DISCOUNT_PERCENTAGE_VALUE = '-10%';

export class ProductCard extends BaseComponent implements Component {
  private readonly product: AppProduct;

  public constructor(product: AppProduct) {
    super({ className: styles.card, tagName: 'div' });

    this.product = product;

    this.createHTML();
  }

  public createHTML(): void {
    const imageContainer = div(
      { className: styles.imageContainer },
      img({
        alt: this.product.image.label,
        className: styles.image,
        src: this.product.image.url,
      }),
      this.product.price.discounted
        ? div({ className: styles.discountLabel }, DISCOUNT_PERCENTAGE_VALUE)
        : null,
    );

    const titleElement = div({ className: styles.title }, this.product.name);

    const descriptionElement = div(
      { className: styles.description, title: this.product.description },
      this.product.description,
    );

    const pricesContainer = div(
      { className: styles.pricesContainer },
      this.product.price.discounted
        ? div({ className: styles.discountedPrice }, formatPrice(this.product.price.discounted))
        : null,
      div(
        { className: this.product.price.discounted ? styles.oldPrice : styles.defaultPrice },
        formatPrice(this.product.price.default),
      ),
    );

    const content = div(
      { className: styles.content },
      titleElement,
      descriptionElement,
      pricesContainer,
    );

    this.append(imageContainer, content);
  }
}
