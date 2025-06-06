import type { CartService } from '~/api/services/cart/cart.service';

import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';
import { showToast } from '~/shared/utils/show-toast';

import type { CartItemsListView } from './cart-items-list.view';

export class CartItemsListPresenter extends Presenter<CartItemsListView> {
  private readonly cartService: CartService;

  public constructor(view: CartItemsListView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    this.initView();
  }

  private async initView(): Promise<void> {
    try {
      this.view.showLoader();

      const products = await this.cartService.getCartProducts();
      this.view.createHTML(products);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    } finally {
      this.view.hideLoader();
    }
  }
}
