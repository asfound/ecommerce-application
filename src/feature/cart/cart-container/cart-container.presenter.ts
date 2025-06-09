import type { CartService } from '~/api/services/cart/cart.service';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { Presenter } from '~/shared/presenter/presenter';

import type { CartContainerView } from './cart-container.view';

import { CartItemsListPresenter } from '../cart-items-list/cart-items-list.presenter';
import { CartItemsListView } from '../cart-items-list/cart-items-list.view';
import { CartTotalsPresenter } from '../cart-totals/cart-totals.presenter';
import { CartTotalsView } from '../cart-totals/cart-totals.view';
import { cartAction } from '../store/actions';
import { cartSelector } from '../store/selectors';
import { cartStore } from '../store/store';

export class CartContainerPresenter extends Presenter<CartContainerView> {
  private readonly cartItemsListPresenter: CartItemsListPresenter;

  private readonly cartService: CartService;

  private readonly cartTotalsPresenter: CartTotalsPresenter;

  public constructor(view: CartContainerView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    this.cartItemsListPresenter = new CartItemsListPresenter(new CartItemsListView(), cartService);
    this.cartTotalsPresenter = new CartTotalsPresenter(new CartTotalsView(), cartService);

    this.cartItemsListPresenter.setTotalsPresenter(this.cartTotalsPresenter);

    this.subscribeItemsCount();
    this.init();
  }

  public override destroy(): void {
    this.cartItemsListPresenter.destroy();
    this.cartTotalsPresenter.destroy();

    super.destroy();
  }

  public async init(): Promise<void> {
    try {
      this.view.showLoader();

      const { items, totalLineItemQuantity, totalPrice } = await this.cartService.getCartData();

      if (totalLineItemQuantity === 0) {
        this.view.showEmptyCart(this.navigateToCatalog);

        return;
      }

      cartAction.setItemsCount(totalLineItemQuantity);

      this.cartItemsListPresenter.initView(items);
      this.cartTotalsPresenter.initView(totalPrice);

      this.view.showCartData(
        this.cartItemsListPresenter.getView().element,
        this.cartTotalsPresenter.getView().element,
      );
    } catch {
      console.warn('error');
    } finally {
      this.view.hideLoader();
    }
  }

  private readonly navigateToCatalog = (): void => {
    Router.instance.navigate(ROUTE_PATH.CATALOG);
  };

  private subscribeItemsCount(): void {
    const unsubscribe = cartStore.subscribe(
      cartSelector.selectItemCount,
      (count) => {
        if (count === 0) {
          this.cartTotalsPresenter.destroy();
          this.cartItemsListPresenter.destroy();
          this.view.showEmptyCart(this.navigateToCatalog);
        }
      },
      { isImmediate: false },
    );

    this.storeSubscription.add(unsubscribe);
  }
}
