import type { CartService } from '~/api/services/cart/cart.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { CartTotalsView } from './cart-totals.view';

export class CartTotalsPresenter extends Presenter<CartTotalsView> {
  private readonly cartService: CartService;

  public constructor(view: CartTotalsView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    console.warn(this.cartService);
  }
}
