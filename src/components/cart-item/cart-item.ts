import type { AppCartProduct } from '~/api/services/products/types';

import deleteIcon from '~/assets/icons/cross.svg';
import { a, div, img, span } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { formatPrice } from '~/shared/utils/format-price';
import { normalizeError } from '~/shared/utils/normalize-error';
import { showToast } from '~/shared/utils/show-toast';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import styles from './cart-item.module.css';
import { BUTTON_TEXT, BUTTON_TITLE, QUANTITY_STEP, SINGLE_ITEM } from './constants';

export interface CartItemCallbacks {
  onDecrementItem(lineItemKey: string, quantity: number): Promise<AppCartProduct | null>;
  onIncrementItem(quantity: number, sku: string): Promise<AppCartProduct | null>;
  onNavigateToDetails: ProductCardClickHandler;
  onRemoveItem(lineItemKey: string): Promise<void>;
}

export type ProductCardClickHandler = (product: AppCartProduct) => void;

export class CartItem extends BaseComponent implements Component {
  private readonly callbacks: CartItemCallbacks;

  private readonly decrementItemButton = new Button({
    className: styles.controlButton,
    onClick: async (): Promise<void> => {
      try {
        this.disableQuantityControls();

        const result = await this.callbacks.onDecrementItem(this.item.lineItemKey, QUANTITY_STEP);

        this.updateItem(result);
      } catch (error) {
        showToast(normalizeError(error).message, true);
      }
    },
    textContent: BUTTON_TEXT.DECREMENT,
    type: 'button',
  });

  private item: AppCartProduct;

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
    onClick: async (): Promise<void> => {
      try {
        this.disableQuantityControls();

        const result = await this.callbacks.onIncrementItem(QUANTITY_STEP, this.item.sku);

        this.updateItem(result);
      } catch (error) {
        showToast(normalizeError(error).message, true);
      }
    },
    textContent: BUTTON_TEXT.INCREMENT,
    type: 'button',
  });

  private readonly individualPriceContainer = div({ className: styles.individualPrice });

  private readonly itemTotalPriceContainer = div({ className: styles.totalPrice });

  private readonly quantityLabel = span({ className: styles.quantity });

  public constructor(item: AppCartProduct, callbacks: CartItemCallbacks) {
    super({ className: styles.item, tagName: 'li' });

    this.item = item;
    this.callbacks = callbacks;

    this.createHTML();
  }

  public createHTML(): void {
    this.initButtons();
    this.createIndividualPrice();
    this.updateQuantityControls();
    this.updateTotalPrice();

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
    const promoPrice = this.item.promoCodePrice;
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

    const itemName = a(
      { className: styles.name },
      `${this.item.name}${this.item.weight ? `, ${this.item.weight}g` : ''}`,
    );

    itemImage.addEventListener(
      'click',
      () => {
        this.callbacks.onNavigateToDetails(this.item);
      },
      { signal: this.abortController.signal },
    );

    itemName.addEventListener(
      'click',
      () => {
        this.callbacks.onNavigateToDetails(this.item);
      },
      { signal: this.abortController.signal },
    );

    const itemInfo = div({ className: styles.itemInfo }, itemName, this.individualPriceContainer);

    return div({ className: styles.itemDetails }, itemImage, itemInfo);
  }

  private disableQuantityControls(): void {
    this.incrementItemButton.disable();
    this.decrementItemButton.disable();
  }

  private initButtons(): void {
    this.incrementItemButton.element.title = BUTTON_TITLE.INCREASE;
    this.decrementItemButton.element.title = BUTTON_TITLE.DECREASE;
    this.deleteButton.element.title = BUTTON_TITLE.DELETE;

    this.deleteButton.append(createSvgIcon(deleteIcon, styles.deleteIcon));
  }

  private updateItem(item: AppCartProduct | null): void {
    if (item) {
      this.item = item;
    }

    this.updateQuantityControls();
    this.updateTotalPrice();
  }

  private updateQuantityControls(): void {
    this.incrementItemButton.enable();
    this.decrementItemButton.element.disabled = this.item.quantity === SINGLE_ITEM;
    this.quantityLabel.replaceChildren(this.item.quantity.toString());
  }

  private updateTotalPrice(): void {
    this.itemTotalPriceContainer.replaceChildren();

    if (this.item.promoCodePrice === undefined) {
      this.itemTotalPriceContainer.append(
        div({ className: styles.defaultPrice }, formatPrice(this.item.totalPrice)),
      );
    } else {
      const discountedPriceElement = div(
        { className: styles.discountedPrice },
        formatPrice(this.item.totalPrice),
      );

      const originalPrice = this.item.price.discounted ?? this.item.price.default;

      const originalPriceElement = div(
        { className: styles.oldPrice },
        formatPrice(originalPrice * this.item.quantity),
      );

      this.itemTotalPriceContainer.append(discountedPriceElement, originalPriceElement);
    }
  }
}
