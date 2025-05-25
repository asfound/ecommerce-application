import type { AppProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';

import styles from './product-details.module.css';

export class ProductDetailsView extends BaseComponent implements Component {
  public constructor() {
    super({ className: ['PRODUCT_DETAILS', styles.productDetails], tagName: 'div' });

    this.setTextContent('PRODUCT DETAILS');
  }

  public createHTML(product: AppProduct): void {
    console.warn(product);
  }
}
