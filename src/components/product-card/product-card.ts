import { div, img } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './product-card.module.css';

// TODO: remove/replace
const PRICE = {
  DIVIDER: 100,
  PRECISION: 2,
} as const;

export interface ProductCardProperties {
  description: string;
  imageURL: string;
  name: string;
  price: number;
}

export class ProductCard extends BaseComponent implements Component {
  private readonly properties: ProductCardProperties;

  public constructor(properties: ProductCardProperties) {
    super({ className: styles.card, tagName: 'div' });

    this.properties = properties;

    this.createHTML();
  }

  public createHTML(): void {
    const imageELement = img({
      className: styles.image,
      src: this.properties.imageURL,
    });

    const titleElement = div({ className: styles.title }, this.properties.name);

    const descriptionElement = div({ className: styles.description }, this.properties.description);

    const priceElement = div(
      { className: styles.price },
      '$' + (this.properties.price / PRICE.DIVIDER).toFixed(PRICE.PRECISION),
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
