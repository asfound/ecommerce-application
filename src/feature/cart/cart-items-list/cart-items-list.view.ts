import type { AppCartProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';
import type { CartItemCallbacks } from '~/components/cart-item/cart-item';

import deleteIcon from '~/assets/icons/cross.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { CartItem } from '~/components/cart-item/cart-item';
import { button, div, h2, ul } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { formatItemsCount } from '~/shared/utils/format-items-count';

import styles from './cart-items-list.module.css';
import { BUTTON_TEXT, BUTTON_TITLE, CART_ITEM_LIST_TEXT } from './constants';

export class CartItemsListView extends BaseComponent implements Component {
  private readonly clearCartButton = button(
    { className: styles.button, title: BUTTON_TITLE.CLEAR },
    BUTTON_TEXT.CLEAR,
    createSvgIcon(deleteIcon, styles.deleteIcon),
  );

  private readonly listElement = ul({ className: styles.list });

  private readonly productsCount = div({ className: styles.count });

  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }

  public bindClearCartHandler(handler: () => Promise<void>): void {
    this.clearCartButton.addEventListener(
      'click',
      () => {
        handler();
      },
      { signal: this.abortController.signal },
    );
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
      div({ className: styles.cartInfo }, this.productsCount, this.clearCartButton),
    );

    this.replaceChildren(listHeader, this.listElement);
  }

  public updateProductsCount(count: number): void {
    this.productsCount.replaceChildren(formatItemsCount(count));
  }
}
