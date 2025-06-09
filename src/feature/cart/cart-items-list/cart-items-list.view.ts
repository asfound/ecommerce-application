import type { AppCartProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';
import type { CartItemCallbacks } from '~/components/cart-item/cart-item';

import { BaseComponent } from '~/components/base-component/base-component';
import { CartItem } from '~/components/cart-item/cart-item';
import { h2, ul } from '~/shared/create-element/tags';

import styles from './cart-items-list.module.css';
import { CART_ITEM_LIST_TEXT } from './constants';

export class CartItemsListView extends BaseComponent implements Component {
  private readonly heading = h2({ className: styles.heading }, CART_ITEM_LIST_TEXT.HEADING);

  private readonly listElement = ul({ className: styles.list });

  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }

  public createHTML(products: AppCartProduct[], callbacks: CartItemCallbacks): void {
    for (const product of products) {
      this.listElement.append(new CartItem(product, callbacks).element);
    }

    this.replaceChildren(this.heading, this.listElement);
  }
}
