import type { Cart } from '@commercetools/platform-sdk';

import { isError } from 'lodash';

import type { CartService } from '~/api/services/cart/cart.service';
import type { AppCartData } from '~/api/services/products/types';

import { CART_ERROR_MESSAGE } from '~/api/services/cart/constants';
import { Presenter } from '~/shared/presenter/presenter';
import { showToast } from '~/shared/utils/show-toast';

import type { CartTotalsView, CartTotalsViewProperties } from './cart-totals.view';

import { CART_NOTIFICATION } from './constants';

export class CartTotalsPresenter extends Presenter<CartTotalsView> {
  private readonly cartService: CartService;

  public constructor(view: CartTotalsView, cartService: CartService) {
    super(view);

    this.cartService = cartService;

    console.warn(this.cartService);
  }

  public initView(
    cartData: Omit<AppCartData, 'cart' | 'items' | 'totalLineItemQuantity'>,
    cart: Cart,
  ): void {
    this.view.createHTML({
      discountCodes: cartData.discountCodes,
      onApplyPromoCode: this.handleApplyPromoCode,
      onRemovePromoCode: this.handleRemovePromoCode,
      prices: this.calculateTotals(cart),
    });
  }

  public updateTotals(cart: Cart): void {
    this.view.updateTotals(this.calculateTotals(cart));
  }

  private calculateTotals(cart: Cart): CartTotalsViewProperties['prices'] {
    let subtotal = 0;

    for (const item of cart.lineItems) {
      const itemPrice = item.price.discounted?.value.centAmount ?? item.price.value.centAmount;
      subtotal += itemPrice * item.quantity;
    }

    const total = cart.totalPrice.centAmount;

    const discount = subtotal - total;

    return discount === 0 ? { subtotal, total } : { discount, subtotal, total };
  }

  private readonly handleApplyPromoCode = async (code: string): Promise<void> => {
    try {
      const { body } = await this.cartService.applyDiscountCode({ code });

      this.updateTotals(body);

      showToast(CART_NOTIFICATION.CODE_APPLIED(code));
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }

      throw new Error(CART_ERROR_MESSAGE.CODE_ALREADY_APPLIED(code));
    }
  };

  private readonly handleRemovePromoCode = async (code: string): Promise<void> => {
    try {
      const { body } = await this.cartService.removeDiscountCode({ code });

      this.updateTotals(body);

      showToast(CART_NOTIFICATION.CODE_REMOVED(code));
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };
}
