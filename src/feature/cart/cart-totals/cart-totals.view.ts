import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { InputText } from '~/components/common/input/input-text/input-text';
import { PromoCode } from '~/components/promo-code/promo-code';
import { div, form } from '~/shared/create-element/tags';
import { formatPrice } from '~/shared/utils/format-price';

import styles from './cart-totals.module.css';
import { CART_TOTALS_TEXT } from './constants';

export interface CartTotalsViewProperties {
  discountCodes: string[];
  onApplyPromoCode(code: string): Promise<void>;
  onRemovePromoCode(code: string): Promise<void>;
  prices: {
    discount?: number;
    subtotal: number;
    total: number;
  };
}

export class CartTotalsView extends BaseComponent implements Component {
  private readonly buttonApply = new Button({
    textContent: CART_TOTALS_TEXT.BUTTON_APPLY,
    type: 'submit',
  });

  private readonly cartDiscount = div(null);

  private readonly cartDiscountContainer = div(
    { className: styles.cartPriceContainer },
    'Discount: ',
    this.cartDiscount,
  );

  private readonly cartSubtotal = div(null);

  private readonly cartSubtotalContainer = div(
    { className: styles.cartPriceContainer },
    'Subtotal: ',
    this.cartSubtotal,
  );

  private readonly cartTotal = div(null);

  private readonly cartTotalContainer = div(
    { className: styles.cartPriceContainer },
    'Total: ',
    this.cartTotal,
  );

  private readonly inputPromoCode = new InputText({
    placeholder: CART_TOTALS_TEXT.INPUT_PROMO_PLACEHOLDER,
  });

  private readonly pricesContainer = div(
    { className: styles.pricesContainer },
    this.cartSubtotalContainer,
    this.cartDiscountContainer,
    this.cartTotalContainer,
  );

  private readonly promoCodesForm = form({ className: styles.form });

  private readonly promoCodesContainer = div(
    { className: styles.promoCodesContainer },
    this.promoCodesForm,
  );

  private properties!: CartTotalsViewProperties;

  public constructor() {
    super({ className: styles.cartTotals, tagName: 'div' });

    this.setupListeners();
  }

  public createHTML(properties: CartTotalsViewProperties): void {
    this.properties = properties;

    this.updateTotals(properties.prices);

    this.promoCodesForm.append(this.inputPromoCode.element, this.buttonApply.element);

    this.promoCodesContainer.replaceChildren(
      this.promoCodesForm,
      ...properties.discountCodes.map(
        (discountCode) =>
          new PromoCode({
            code: discountCode,
            onRemove: (code): Promise<void> => properties.onRemovePromoCode(code),
          }).element,
      ),
    );

    this.append(this.promoCodesContainer, this.pricesContainer);
  }

  public updateTotals(totalPrice: CartTotalsViewProperties['prices']): void {
    if (totalPrice.discount) {
      this.cartDiscountContainer.hidden = false;
      this.cartDiscount.textContent = formatPrice(totalPrice.discount);
    } else {
      this.cartDiscountContainer.hidden = true;
    }

    this.cartSubtotal.textContent = formatPrice(totalPrice.subtotal);
    this.cartTotal.textContent = formatPrice(totalPrice.total);
  }

  private async handleDiscountCodeApply(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    try {
      const promoCode = this.inputPromoCode.value.trim();

      await this.properties.onApplyPromoCode(promoCode);

      const discountCode = new PromoCode({
        code: promoCode,
        onRemove: (code): Promise<void> => this.properties.onRemovePromoCode(code),
      });

      this.inputPromoCode.reset();

      this.promoCodesContainer.append(discountCode.element);
    } catch {
      this.inputPromoCode.setErrorMessage('');
    }
  }

  private setupListeners(): void {
    this.promoCodesForm.addEventListener(
      'submit',
      (event) => {
        this.handleDiscountCodeApply(event);
      },
      { signal: this.abortController.signal },
    );
  }
}
