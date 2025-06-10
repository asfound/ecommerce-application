import type { AppCartProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';
import type { CartItemCallbacks } from '~/components/cart-item/cart-item';

import { BaseComponent } from '~/components/base-component/base-component';
import { CartItem } from '~/components/cart-item/cart-item';
import { div, h2, ul } from '~/shared/create-element/tags';
import { formatItemsCount } from '~/shared/utils/format-items-count';

import styles from './cart-items-list.module.css';
import { CART_ITEM_LIST_TEXT } from './constants';

export class CartItemsListView extends BaseComponent implements Component {
  private readonly listElement = ul({ className: styles.list });

  private readonly productsCount = div({ className: styles.count });

  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }

  public createHTML(products: AppCartProduct[], callbacks: CartItemCallbacks): void {
    const fragment = document.createDocumentFragment();

    for (const product of products) {
      fragment.append(new CartItem(product, callbacks).element);
    }

    this.listElement.replaceChildren(fragment);

    const listHeader = div(
      { className: styles.header },
      h2({ className: styles.heading }, CART_ITEM_LIST_TEXT.HEADING),
      this.productsCount,
    );

    this.replaceChildren(listHeader, this.listElement);
  }

  public updateProductsCount(count: number): void {
    this.productsCount.replaceChildren(formatItemsCount(count));
  }
}
