import type { AppProduct } from '~/api/services/products/types';

import { div, img } from '~/shared/create-element/tags';
import { formatPrice } from '~/shared/utils/format-price';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './product-card.module.css';

const DISCOUNT_PERCENTAGE_VALUE = '-10%';
const BESTSELLER_VALUE = 'Bestseller';

export type ProductCardClickHandler = (product: AppProduct) => void;

export class ProductCard extends BaseComponent implements Component {
  private readonly onNavigateToDetails: ProductCardClickHandler;

  private readonly product: AppProduct;

  public constructor(product: AppProduct, onNavigateToDetails: ProductCardClickHandler) {
    super({ className: styles.card, tagName: 'div' });

    this.product = product;

    this.onNavigateToDetails = onNavigateToDetails;

    this.createHTML();

    this.setupListeners();
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
      this.product.bestSeller ? div({ className: styles.bestSellerLabel }, BESTSELLER_VALUE) : null,
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

  private setupListeners(): void {
    this.addListener('click', () => {
      this.onNavigateToDetails(this.product);
    });
  }
}
