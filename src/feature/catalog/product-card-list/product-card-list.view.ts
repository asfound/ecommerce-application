import type { AppProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';
import type { ProductCardClickHandler } from '~/components/product-card/product-card';

import { BaseComponent } from '~/components/base-component/base-component';
import { ProductCard } from '~/components/product-card/product-card';

import styles from './product-card-list.module.css';

export class ProductCardListView extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.list, tagName: 'ul' });
  }

  public createHTML(products: AppProduct[], onNavigateToDetails: ProductCardClickHandler): void {
    this.replaceChildren(
      ...products.map((product) => new ProductCard(product, onNavigateToDetails)),
    );
  }
}
