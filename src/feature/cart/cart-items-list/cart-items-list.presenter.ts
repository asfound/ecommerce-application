import type { CartService } from '~/api/services/cart/cart.service';
import type { AppCartProduct } from '~/api/services/products/types';

import { mapLineItemToAppCartProduct } from '~/api/services/cart/mappers';
import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';
import { showToast } from '~/shared/utils/show-toast';

import type { CartTotalsPresenter } from '../cart-totals/cart-totals.presenter';
import type { CartItemsListView } from './cart-items-list.view';

import { cartAction } from '../store/actions';

export class CartItemsListPresenter extends Presenter<CartItemsListView> {
  private readonly cartService: CartService;

  private cartTotalsPresenter: CartTotalsPresenter | null = null;

  public constructor(view: CartItemsListView, cartService: CartService) {
    super(view);

    this.cartService = cartService;
  }

  public initView(products: AppCartProduct[]): void {
    this.view.createHTML(products, {
      onDecrementItem: this.handleDecrementItem,
      onIncrementItem: this.handleIncrementItem,
      onRemoveItem: this.handleRemoveItem,
    });
  }

  public setTotalsPresenter(presenter: CartTotalsPresenter): void {
    this.cartTotalsPresenter = presenter;
  }

  private handleDecrementItem = async (
    lineItemKey: string,
    quantity: number,
  ): Promise<AppCartProduct | null> => {
    try {
      const result = await this.cartService.removeLineItem({ lineItemKey, quantity });

      this.cartTotalsPresenter?.updateTotals(result.body);

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

      this.cartTotalsPresenter?.updateTotals(result.body);

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

      this.cartTotalsPresenter?.updateTotals(result.body);

      cartAction.setItemsCount(result.body.lineItems.length);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };
}
