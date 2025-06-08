import type { CartService } from '~/api/services/cart/cart.service';
import type { AppCartData } from '~/api/services/products/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { CartTotalsView } from './cart-totals.view';

export class CartTotalsPresenter extends Presenter<CartTotalsView> {
  private readonly cartService: CartService;

  public constructor(view: CartTotalsView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    console.warn(this.cartService);
  }

  public initView(totalPrice: AppCartData['totalPrice']): void {
    this.view.createHTML({
      onApplyPromoCode: this.handleApplyPromoCode,
      onRemovePromoCode: this.handleRemovePromoCode,
      prices: {
        discounted: totalPrice.discounted,
        total: totalPrice.default,
      },
    });
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
