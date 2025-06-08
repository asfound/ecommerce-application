import type { CartService } from '~/api/services/cart/cart.service';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { Presenter } from '~/shared/presenter/presenter';

import type { CartContainerView } from './cart-container.view';

import { CartItemsListPresenter } from '../cart-items-list/cart-items-list.presenter';
import { CartItemsListView } from '../cart-items-list/cart-items-list.view';
import { CartTotalsPresenter } from '../cart-totals/cart-totals.presenter';
import { CartTotalsView } from '../cart-totals/cart-totals.view';

export class CartContainerPresenter extends Presenter<CartContainerView> {
  private readonly cartItemsListPresenter: CartItemsListPresenter;

  private readonly cartService: CartService;

  private readonly cartTotalsPresenter: CartTotalsPresenter;

  public constructor(view: CartContainerView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    this.cartItemsListPresenter = new CartItemsListPresenter(new CartItemsListView(), cartService);
    this.cartTotalsPresenter = new CartTotalsPresenter(new CartTotalsView(), cartService);

    this.init();
  }

  public override destroy(): void {
    this.cartItemsListPresenter.destroy();
    this.cartTotalsPresenter.destroy();

    super.destroy();
  }

  public async init(): Promise<void> {
    try {
      const { items } = await this.cartService.getCartData();

      if (items.length === 0) {
        this.view.showEmptyCart(this.navigateToCatalog);
      }
    } catch {
      console.warn('error');
    }
  }

  private readonly navigateToCatalog = (): void => {
    Router.instance.navigate(ROUTE_PATH.CATALOG);
  };
}
