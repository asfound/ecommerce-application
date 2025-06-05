import type { AppProduct } from '~/api/services/products/types';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';

export class CartItem extends BaseComponent implements Component {
  private readonly item: AppProduct;

  public constructor(item: AppProduct) {
    super({ tagName: 'li' });
    this.item = item;
  }

  public createHTML(): void {
    console.warn(this.item);
  }
}
