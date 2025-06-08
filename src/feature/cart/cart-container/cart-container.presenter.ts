import type { CartService } from '~/api/services/cart/cart.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { CartContainerView } from './cart-container.view';

export class CartContainerPresenter extends Presenter<CartContainerView> {
  private readonly cartService: CartService;

  public constructor(view: CartContainerView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    console.warn(this.cartService);
  }
}
