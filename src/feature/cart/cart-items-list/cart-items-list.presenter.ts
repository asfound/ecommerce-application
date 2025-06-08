import type { CartService } from '~/api/services/cart/cart.service';
import type { AppCartProduct } from '~/api/services/products/types';

import { mapLineItemToAppCartProduct } from '~/api/services/cart/mappers';
import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';
import { showToast } from '~/shared/utils/show-toast';

import type { CartItemsListView } from './cart-items-list.view';

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
      await this.cartService.removeLineItem({ lineItemKey });
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };

  private async updateView(): Promise<void> {
    try {
      this.view.showLoader();

      const products = await this.cartService.getCartData();

      this.view.createHTML(products, {
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
