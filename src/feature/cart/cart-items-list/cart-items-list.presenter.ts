import type { CartService } from '~/api/services/cart/cart.service';
import type { AppCartProduct } from '~/api/services/products/types';

import { mapLineItemToAppCartProduct } from '~/api/services/cart/mappers';
import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';
import { showToast } from '~/shared/utils/show-toast';

import type { CartItemsListView } from './cart-items-list.view';

import { cartAction } from '../store/actions';

export class CartItemsListPresenter extends Presenter<CartItemsListView> {
  private readonly cartService: CartService;

  public constructor(view: CartItemsListView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    this.updateView();
  }

  private handleDecrementItem = async (
    lineItemKey: string,
    quantity: number,
  ): Promise<AppCartProduct | null> => {
    try {
      const result = await this.cartService.removeLineItem({ lineItemKey, quantity });
      cartAction.setItemsCount(result.body.lineItems.length);

      const item = result.body.lineItems.find((item) => item.key === lineItemKey);
      return item ? mapLineItemToAppCartProduct(item) : null;
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }

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
      cartAction.setItemsCount(result.body.lineItems.length);

      const item = result.body.lineItems.find((item) => item.key === sku);
      return item ? mapLineItemToAppCartProduct(item) : null;
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }

      return null;
    }
  };

  private handleRemoveItem = async (lineItemKey: string): Promise<void> => {
    try {
      const result = await this.cartService.removeLineItem({ lineItemKey });
      cartAction.setItemsCount(result.body.lineItems.length);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };

  private async updateView(): Promise<void> {
    try {
      this.view.showLoader();

      const cartData = await this.cartService.getCartData();

      cartAction.setItemsCount(cartData.items.length);

      this.view.createHTML(cartData.items, {
        onDecrementItem: this.handleDecrementItem,
        onIncrementItem: this.handleIncrementItem,
        onRemoveItem: this.handleRemoveItem,
      });
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    } finally {
      this.view.hideLoader();
    }
  }
}
