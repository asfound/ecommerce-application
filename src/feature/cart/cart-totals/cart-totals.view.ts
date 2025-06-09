import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { InputText } from '~/components/common/input/input-text/input-text';
import { PromoCode } from '~/components/promo-code/promo-code';
import { div, form, h2 } from '~/shared/create-element/tags';
import { formatPrice } from '~/shared/utils/format-price';

import styles from './cart-totals.module.css';
import { CART_TOTALS_TEXT } from './constants';

export interface CartTotalsViewProperties {
  discountCodes: string[];
  onApplyPromoCode(code: string): Promise<void>;
  onRemovePromoCode(code: string): Promise<void>;
  prices: {
    discounted?: number;
    total: number;
  };
}

export class CartTotalsView extends BaseComponent implements Component {
  private readonly buttonApply = new Button({
    textContent: CART_TOTALS_TEXT.BUTTON_APPLY,
    type: 'submit',
  });

  private readonly inputPromoCode = new InputText({
    placeholder: CART_TOTALS_TEXT.INPUT_PROMO_PLACEHOLDER,
  });

  private readonly priceDiscount = div(null);

  private readonly priceTotal = div(null);

  private readonly pricesContainer = div(
    { className: styles.pricesContainer },
    this.priceDiscount,
    this.priceTotal,
  );

  private readonly promoCodesForm = form({ className: styles.form });

  private readonly promoCodesContainer = div(null, this.promoCodesForm);

  private properties!: CartTotalsViewProperties;

  public constructor() {
    super({ className: styles.cartTotals, tagName: 'div' });

    const heading = h2({ className: styles.heading }, CART_TOTALS_TEXT.HEADING);

    this.append(heading);

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
    this.priceTotal.textContent = formatPrice(totalPrice.total);
    this.priceDiscount.textContent = totalPrice.discounted
      ? formatPrice(totalPrice.discounted)
      : '';
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
