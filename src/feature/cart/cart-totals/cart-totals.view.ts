import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { InputText } from '~/components/common/input/input-text/input-text';
import { button, div, form, h2 } from '~/shared/create-element/tags';
import { formatPrice } from '~/shared/utils/format-price';

import styles from './cart-totals.module.css';
import { CART_TOTALS_TEXT } from './constants';

export interface CartTotalsViewProperties {
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

    this.promoCodesForm.append(this.inputPromoCode.element, this.buttonApply.element);

    this.priceTotal.textContent = formatPrice(properties.prices.total);
    this.priceDiscount.textContent = properties.prices.discounted
      ? formatPrice(properties.prices.discounted)
      : '';

    this.append(this.promoCodesContainer, this.pricesContainer);
  }

  private setupListeners(): void {
    this.promoCodesForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();

        const promoCode = this.inputPromoCode.value.trim();

        const promoCodeElement = div(
          { className: styles.promoCodeElement },
          promoCode,
          button(
            {
              onClick: () => {
                this.properties.onRemovePromoCode(promoCode);

                promoCodeElement.remove();
              },
              signal: this.abortController.signal,
            },
            CART_TOTALS_TEXT.BUTTON_REMOVE,
          ),
        );

        this.properties.onApplyPromoCode(this.inputPromoCode.value.trim());

        this.inputPromoCode.reset();

        this.promoCodesContainer.append(promoCodeElement);
      },
      { signal: this.abortController.signal },
    );
  }
}
