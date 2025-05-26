import type { AppProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { div, h2, img, p } from '~/shared/create-element/tags';
import { formatPrice } from '~/shared/utils/format-price';

import styles from './product-details.module.css';

export class ProductDetailsView extends BaseComponent implements Component {
  public constructor() {
    super({ className: ['PRODUCT_DETAILS', styles.productDetails], tagName: 'div' });
  }

  public createHTML(product: AppProduct): void {
    const slider = this.createImageSlider(product.images);

    const content = this.createContent(product);

    this.append(slider, content);
  }

  private createContent(product: AppProduct): HTMLDivElement {
    const contentContainer = div({ className: styles.contentContainer });

    const headingElement = h2(
      { className: styles.heading },
      `${product.name}${product.weight ? `, ${product.weight}g` : ''}`,
    );

    const pricesContainer = div(
      { className: styles.pricesContainer },
      product.price.discounted
        ? div({ className: styles.discountedPrice }, formatPrice(product.price.discounted))
        : null,
      div(
        { className: product.price.discounted ? styles.oldPrice : styles.defaultPrice },
        formatPrice(product.price.default),
      ),
    );

    const descriptionElement = p({ className: styles.description }, product.description);

    contentContainer.append(headingElement, pricesContainer, descriptionElement);

    return contentContainer;
  }

  private createImageSlider(images: AppProduct['images']): HTMLDivElement {
    const sliderContainer = div({ className: styles.sliderContainer });

    sliderContainer.append(img({ className: styles.sliderImage, src: images[0].url }));

    return sliderContainer;
  }
}
