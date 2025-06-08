import type { CartService } from '~/api/services/cart/cart.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { CartTotalsView } from './cart-totals.view';

export class CartTotalsPresenter extends Presenter<CartTotalsView> {
  private readonly cartService: CartService;

  public constructor(view: CartTotalsView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    this.initView();
  }

  private readonly handleApplyPromoCode = async (code: string): Promise<void> => {
    await Promise.resolve();
    console.warn('Apply promo code:', code);
  };

  private readonly handleRemovePromoCode = async (code: string): Promise<void> => {
    await Promise.resolve();
    console.warn('Remove promo code:', code);
  };

  private async initView(): Promise<void> {
    const cart = await this.cartService.getCurrentCart();

    this.view.createHTML({
      onApplyPromoCode: this.handleApplyPromoCode,
      onRemovePromoCode: this.handleRemovePromoCode,
      prices: {
        discounted: cart.body.discountOnTotalPrice?.discountedAmount.centAmount,
        total: cart.body.totalPrice.centAmount,
      },
    });
  }
}
