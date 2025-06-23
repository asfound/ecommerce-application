import type { Cart } from '@commercetools/platform-sdk';

import type { CartService } from '~/api/services/cart/cart.service';
import type { AppCartProduct } from '~/api/services/products/types';

import { mapLineItemToAppCartProduct } from '~/api/services/cart/mappers';
import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { rootAction } from '~/app/store/actions';
import { Presenter } from '~/shared/presenter/presenter';
import { normalizeError } from '~/shared/utils/normalize-error';
import { showToast } from '~/shared/utils/show-toast';

import type { CartTotalsPresenter } from '../cart-totals/cart-totals.presenter';
import type { CartItemsListView } from './cart-items-list.view';

import { cartAction } from '../store/actions';
import { cartSelector } from '../store/selectors';
import { cartStore } from '../store/store';
import { CART_NOTIFICATION } from './constants';

export class CartItemsListPresenter extends Presenter<CartItemsListView> {
  private readonly cartService: CartService;

  private cartTotalsPresenter: CartTotalsPresenter | null = null;

  public constructor(view: CartItemsListView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    this.setupSubscriptions();
    this.bindViewHandlers();
  }

  public initView(products: AppCartProduct[]): void {
    this.view.createHTML(products, {
      onDecrementItem: this.handleDecrementItem,
      onIncrementItem: this.handleIncrementItem,
      onNavigateToDetails: this.handleNavigateToDetails,
      onRemoveItem: this.handleRemoveItem,
    });
  }

  public setTotalsPresenter(presenter: CartTotalsPresenter): void {
    this.cartTotalsPresenter = presenter;
  }

  private bindViewHandlers(): void {
    this.view.bindClearCartHandler(this.handleClearCartClick);
  }

  private handleClearCartClick = async (): Promise<void> => {
    try {
      const result = await this.cartService.clearCart();

      rootAction.setProductsCount(result.body.totalLineItemQuantity ?? 0);
      cartAction.setItemsCount(result.body.totalLineItemQuantity ?? 0);

      showToast(CART_NOTIFICATION.CART_EMPTIED);
    } catch (error: unknown) {
      showToast(normalizeError(error).message, true);
    }
  };

  private handleDecrementItem = async (
    lineItemKey: string,
    quantity: number,
  ): Promise<AppCartProduct | null> => {
    try {
      const result = await this.cartService.removeLineItem({ lineItemKey, quantity });

      rootAction.setProductsCount(result.body.totalLineItemQuantity ?? 0);
      cartAction.setItemsCount(result.body.totalLineItemQuantity ?? 0);

      this.updateTotals(result.body);

      const item = result.body.lineItems.find((item) => item.key === lineItemKey);
      return item ? mapLineItemToAppCartProduct(item) : null;
    } catch (error: unknown) {
      showToast(normalizeError(error).message, true);

      return null;
    }
  };

  private handleIncrementItem = async (
    quantity: number,
    sku: string,
  ): Promise<AppCartProduct | null> => {
    try {
      const key = crypto.randomUUID();

      const result = await this.cartService.addLineItem({ lineItemKey: key, quantity, sku });

      rootAction.setProductsCount(result.body.totalLineItemQuantity ?? 0);
      cartAction.setItemsCount(result.body.totalLineItemQuantity ?? 0);

      this.updateTotals(result.body);

      const item = result.body.lineItems.find((item) => item.key === sku);
      return item ? mapLineItemToAppCartProduct(item) : null;
    } catch (error: unknown) {
      showToast(normalizeError(error).message, true);

      return null;
    }
  };

  private readonly handleNavigateToDetails = (product: AppCartProduct): void => {
    Router.instance.navigate(ROUTE_PATH.PRODUCT_DETAILS, {
      searchParameters: {
        id: product.productId,
        sku: product.sku,
      },
    });
  };

  private handleRemoveItem = async (lineItemKey: string): Promise<void> => {
    try {
      const result = await this.cartService.removeLineItem({ lineItemKey });

      rootAction.setProductsCount(result.body.totalLineItemQuantity ?? 0);
      cartAction.setItemsCount(result.body.totalLineItemQuantity ?? 0);

      this.updateTotals(result.body);

      showToast(CART_NOTIFICATION.PRODUCT_REMOVED);
    } catch (error: unknown) {
      showToast(normalizeError(error).message, true);
    }
  };

  private setupSubscriptions(): void {
    this.subscribeItemsCount();
  }

  private subscribeItemsCount(): void {
    const unsubscribe = cartStore.subscribe(
      cartSelector.selectItemCount,
      (count) => {
        this.view.updateProductsCount(count);
      },
      { isImmediate: true },
    );

    this.storeSubscription.add(unsubscribe);
  }

  private updateTotals(cart: Cart): void {
    this.cartTotalsPresenter?.updateTotals(cart);
  }
}
