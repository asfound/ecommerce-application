import type { AppCartProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';
import type { CartItemCallbacks } from '~/components/cart-item/cart-item';

import { BaseComponent } from '~/components/base-component/base-component';
import { CartItem } from '~/components/cart-item/cart-item';
import { Loader } from '~/components/common/loader/loader';

import styles from './cart-items-list.module.css';

export class CartItemsListView extends BaseComponent<HTMLUListElement> implements Component {
  private readonly loaderComponent = new Loader({ size: 'small' });

  public constructor() {
    super({ className: styles.list, tagName: 'ul' });
  }

  public createHTML(products: AppCartProduct[], callbacks: CartItemCallbacks): void {
    if (products.length > 0) {
      for (const product of products) {
        this.append(new CartItem(product, callbacks));
      }
    } else {
      console.warn('no products');
    }
  }

  public hideLoader(): void {
    this.loaderComponent.hide();
  }

  public showLoader(): void {
    this.replaceChildren(this.loaderComponent);
    this.loaderComponent.show();
  }
}
