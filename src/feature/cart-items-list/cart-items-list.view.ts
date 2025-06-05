import type { AppProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { Loader } from '~/components/common/loader/loader';

import styles from './cart-items-list.module.css';

export class CartItemsListView extends BaseComponent<HTMLUListElement> implements Component {
  private readonly loaderComponent = new Loader({ size: 'small' });

  public constructor() {
    super({ className: styles.list, tagName: 'ul' });
  }

  public createHTML(products: AppProduct[]): void {
    console.warn(products);
  }

  public hideLoader(): void {
    this.loaderComponent.hide();
  }

  public showLoader(): void {
    this.replaceChildren(this.loaderComponent);
    this.loaderComponent.show();
  }
}
