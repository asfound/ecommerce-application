import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { CartItemsListPresenter } from '~/feature/cart/cart-items-list/cart-items-list.presenter';
import { CartItemsListView } from '~/feature/cart/cart-items-list/cart-items-list.view';
import { CartTotalsPresenter } from '~/feature/cart/cart-totals/cart-totals.presenter';
import { CartTotalsView } from '~/feature/cart/cart-totals/cart-totals.view';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { div, h1 } from '~/shared/create-element/tags';

import styles from './cart-page.module.css';
export class CartPage extends BaseComponent {
  private readonly cartItemsListPresenter: CartItemsListPresenter;

  private readonly cartTotalsPresenter: CartTotalsPresenter;

  public constructor() {
    super({ className: [CSS_CLASS_NAME.WRAPPER, styles.container], tagName: 'div' });

    this.cartItemsListPresenter = new CartItemsListPresenter(
      new CartItemsListView(),
      SERVICE_HUB.provideCartService(),
    );
    const title = h1({ className: styles.title }, 'Shopping cart');

    const cartItemsContainer = div(
      { className: [styles.block, styles.itemsBlock] },
      title,
      this.cartItemsListPresenter.getView().element,
    );

    this.cartTotalsPresenter = new CartTotalsPresenter(new CartTotalsView());

    this.append(cartItemsContainer, this.cartTotalsPresenter.getView());
  }
}
