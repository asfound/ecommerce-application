import type { Cart } from '@commercetools/platform-sdk';

import type { CartService } from '~/api/services/cart/cart.service';
import type { AppCartData } from '~/api/services/products/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { CartTotalsView, CartTotalsViewProperties } from './cart-totals.view';

export class CartTotalsPresenter extends Presenter<CartTotalsView> {
  private readonly cartService: CartService;

  public constructor(view: CartTotalsView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    console.warn(this.cartService);
  }

  public initView(cartData: Omit<AppCartData, 'items' | 'totalLineItemQuantity'>): void {
    this.view.createHTML({
      discountCodes: cartData.discountCodes,
      onApplyPromoCode: this.handleApplyPromoCode,
      onRemovePromoCode: this.handleRemovePromoCode,
      prices: {
        discounted: cartData.totalPrice.discounted,
        total: cartData.totalPrice.default,
      },
    });
  }

  public updateTotals(cart: Cart): void {
    this.view.updateTotals(this.calculateTotals(cart));
  }

  private calculateTotals(cart: Cart): CartTotalsViewProperties['prices'] {
    return { total: cart.totalPrice.centAmount };
  }

  private readonly handleApplyPromoCode = async (code: string): Promise<void> => {
    await Promise.resolve();
    console.warn('Apply promo code:', code);
  };

  private readonly handleRemovePromoCode = async (code: string): Promise<void> => {
    await Promise.resolve();
    console.warn('Remove promo code:', code);
  };
}
