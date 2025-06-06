import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { CartItemsListPresenter } from '~/feature/cart-items-list/cart-items-list.presenter';
import { CartItemsListView } from '~/feature/cart-items-list/cart-items-list.view';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { div, h1, h2 } from '~/shared/create-element/tags';

import styles from './cart-page.module.css';
export class CartPage extends BaseComponent {
  private readonly cartItemsListPresenter: CartItemsListPresenter;

  public constructor() {
    super({ className: [CSS_CLASS_NAME.WRAPPER, styles.container], tagName: 'div' });

    this.cartItemsListPresenter = new CartItemsListPresenter(
      new CartItemsListView(),
      SERVICE_HUB.provideCartService(),
      SERVICE_HUB.provideProductsService(),
    );
    const title = h1({ className: styles.title }, 'Shopping cart');
    const subtitle = h2(null, 'Total');

    const cartItemsContainer = div(
      { className: [styles.block, styles.itemsBlock] },
      title,
      this.cartItemsListPresenter.getView().element,
    );
    const cartTotalContainer = div({ className: [styles.block, styles.totalBlock] }, subtitle);

    this.append(cartItemsContainer, cartTotalContainer);
  }
}
