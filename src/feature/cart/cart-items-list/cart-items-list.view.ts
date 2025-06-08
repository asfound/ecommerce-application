import type { AppCartProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';
import type { CartItemCallbacks } from '~/components/cart-item/cart-item';

import { BaseComponent } from '~/components/base-component/base-component';
import { CartItem } from '~/components/cart-item/cart-item';
import { Loader } from '~/components/common/loader/loader';
import { h2, ul } from '~/shared/create-element/tags';

import styles from './cart-items-list.module.css';

export class CartItemsListView extends BaseComponent implements Component {
  private readonly heading = h2({ className: styles.heading }, 'Products');

  private readonly listElement = ul({ className: styles.list });

  private readonly loaderComponent = new Loader({ size: 'small' });

  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }

  public createHTML(products: AppCartProduct[], callbacks: CartItemCallbacks): void {
    for (const product of products) {
      this.listElement.append(new CartItem(product, callbacks).element);
    }

    this.replaceChildren(this.heading, this.listElement);
  }

  public hideLoader(): void {
    this.loaderComponent.hide();
  }

  public showLoader(): void {
    this.replaceChildren(this.loaderComponent);
    this.loaderComponent.show();
  }
}
