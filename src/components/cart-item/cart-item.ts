import type { AppCartProduct } from '~/api/services/products/types';

import deleteIcon from '~/assets/icons/cross.svg';
import { button, div, img, span } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { formatPrice } from '~/shared/utils/format-price';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import styles from './cart-item.module.css';
import { BUTTON_TEXT, SINGLE_ITEM } from './constants';

export class CartItem extends BaseComponent implements Component {
  private readonly addItemButton = new Button({
    className: styles.controlButton,
    textContent: BUTTON_TEXT.INCREMENT,
    type: 'button',
  });

  private readonly decrementItemButton = new Button({
    className: styles.controlButton,
    textContent: BUTTON_TEXT.DECREMENT,
    type: 'button',
  });

  private readonly item: AppCartProduct;

  public constructor(item: AppCartProduct) {
    super({ className: styles.item, tagName: 'li' });

    this.item = item;

    this.createHTML();
  }

  public createHTML(): void {
    const itemDetails = this.createItemDetails();

    if (this.item.quantity === SINGLE_ITEM) {
      this.decrementItemButton.disable();
    }

    const quantityControls = div(
      { className: styles.quantityControls },
      this.decrementItemButton.element,
      span({ className: styles.quantity }, this.item.quantity.toString()),
      this.addItemButton.element,
    );

    const itemTotalPrice = div(
      { className: styles.totalPrice },
      span(
        null,
        formatPrice((this.item.price.discounted ?? this.item.price.default) * this.item.quantity),
      ),
    );

    const deleteButton = button(
      { className: styles.deleteButton },
      createSvgIcon(deleteIcon, styles.deleteIcon),
    );

    const itemControls = div(
      { className: styles.itemControls },
      quantityControls,
      itemTotalPrice,
      deleteButton,
    );

    this.append(itemDetails, itemControls);
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
      div(
        { className: styles.price },
        formatPrice(this.item.price.discounted ?? this.item.price.default),
      ),
    );

    return div({ className: styles.itemDetails }, itemImage, itemInfo);
  }
}
