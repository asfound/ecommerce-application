import type { AppCartProduct } from '~/api/services/products/types';

import deleteIcon from '~/assets/icons/cross.svg';
import { div, img, span } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { formatPrice } from '~/shared/utils/format-price';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import styles from './cart-item.module.css';
import { BUTTON_TEXT, BUTTON_TITLE, QUANTITY_STEP, SINGLE_ITEM } from './constants';

export interface CartItemCallbacks {
  onDecrementItem(lineItemKey: string, quantity: number): Promise<AppCartProduct | null>;
  onIncrementItem(quantity: number, sku: string): Promise<AppCartProduct | null>;
  onRemoveItem(lineItemKey: string): Promise<void>;
}

export class CartItem extends BaseComponent implements Component {
  private readonly callbacks: CartItemCallbacks;

  private item: AppCartProduct;

  private readonly decrementItemButton = new Button({
    className: styles.controlButton,
    onClick: (): void => {
      this.disableQuantityControls();
      this.callbacks.onDecrementItem(this.item.lineItemKey, QUANTITY_STEP).then((result) => {
        this.updateItem(result);
      });
    },
    textContent: BUTTON_TEXT.DECREMENT,
    type: 'button',
  });

  private readonly deleteButton = new Button({
    className: styles.deleteButton,
    onClick: (): void => {
      this.callbacks.onRemoveItem(this.item.lineItemKey);
      this.destroy();
    },
    textContent: '',
    type: 'button',
  });

  private readonly incrementItemButton = new Button({
    className: styles.controlButton,
    onClick: (): void => {
      this.disableQuantityControls();
      this.callbacks.onIncrementItem(QUANTITY_STEP, this.item.sku).then((result) => {
        this.updateItem(result);
      });
    },
    textContent: BUTTON_TEXT.INCREMENT,
    type: 'button',
  });

  private readonly individualPriceContainer = div({ className: styles.pricesContainer });

  private readonly itemTotalPriceContainer = div({ className: styles.totalPrice });

  private readonly quantityLabel = span({ className: styles.quantity });

  public constructor(item: AppCartProduct, callbacks: CartItemCallbacks) {
    super({ className: styles.item, tagName: 'li' });

    this.item = item;
    this.callbacks = callbacks;

    this.incrementItemButton.element.title = BUTTON_TITLE.INCREASE;
    this.decrementItemButton.element.title = BUTTON_TITLE.DECREASE;
    this.deleteButton.element.title = BUTTON_TITLE.DELETE;

    this.deleteButton.append(createSvgIcon(deleteIcon, styles.deleteIcon));

    this.createHTML();
  }

  public createHTML(): void {
    this.createIndividualPrice();
    this.updateItemElements();

    const itemDetails = this.createItemDetails();

    const quantityControls = div(
      { className: styles.quantityControls },
      this.decrementItemButton.element,
      this.quantityLabel,
      this.incrementItemButton.element,
    );

    const itemControls = div(
      { className: styles.itemControls },
      quantityControls,
      this.itemTotalPriceContainer,
      this.deleteButton.element,
    );

    this.append(itemDetails, itemControls);
  }

  private createIndividualPrice(): void {
    this.individualPriceContainer.replaceChildren();

    const { price } = this.item;
    const basePrice = price.default;
    const promoPrice = this.item.discountedPrice;
    const internalSalePrice = price.discounted;

    const currentPrice = promoPrice ?? internalSalePrice ?? basePrice;
    const isPromoApplied = promoPrice !== undefined;

    const currentPriceElement = div(
      { className: isPromoApplied ? styles.discountedPrice : styles.defaultPrice },
      formatPrice(currentPrice),
    );

    this.individualPriceContainer.append(currentPriceElement);

    if (currentPrice < basePrice) {
      const oldPriceElement = div({ className: styles.oldPrice }, formatPrice(basePrice));
      this.individualPriceContainer.append(oldPriceElement);
    }
  }

  private createItemDetails(): HTMLDivElement {
    const itemImage = img({
      alt: this.item.image.label,
      className: styles.image,
      src: this.item.image.url,
    });

    const itemInfo = div(
      { className: styles.itemInfo },
      div(
        { className: styles.name },
        `${this.item.name}${this.item.weight ? `, ${this.item.weight}g` : ''}`,
      ),
      this.individualPriceContainer,
    );

    return div({ className: styles.itemDetails }, itemImage, itemInfo);
  }

  private disableQuantityControls(): void {
    this.incrementItemButton.disable();
    this.decrementItemButton.disable();
  }

  private updateItem(item: AppCartProduct | null): void {
    if (item) {
      this.item = item;
    }

    this.updateItemElements();
  }

  private updateItemElements(): void {
    this.incrementItemButton.enable();
    this.decrementItemButton.element.disabled = this.item.quantity === SINGLE_ITEM;

    this.quantityLabel.replaceChildren(this.item.quantity.toString());
    this.itemTotalPriceContainer.replaceChildren(formatPrice(this.item.totalPrice));
  }
}
