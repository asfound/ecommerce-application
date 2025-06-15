import type { AppCartProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';
import type { CartItemCallbacks } from '~/components/cart-item/cart-item';
import type { ModalService } from '~/services/modal/modal.service';

import deleteIcon from '~/assets/icons/cross.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { CartItem } from '~/components/cart-item/cart-item';
import { Button } from '~/components/common/button/button';
import { button, div, h2, p, ul } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { formatItemsCount } from '~/shared/utils/format-items-count';

import styles from './cart-items-list.module.css';
import { BUTTON_TEXT, BUTTON_TITLE, CART_ITEM_LIST_TEXT, CART_MODAL_TITLE } from './constants';

export class CartItemsListView extends BaseComponent implements Component {
  private readonly clearCartButton = button(
    { className: styles.button, title: BUTTON_TITLE.CLEAR },
    BUTTON_TEXT.CLEAR,
    createSvgIcon(deleteIcon, styles.deleteIcon),
  );

  private readonly listElement = ul({ className: styles.list });

  private readonly modalService: ModalService;

  private readonly productsCount = div({ className: styles.count });

  public constructor(modalService: ModalService) {
    super({ className: styles.container, tagName: 'div' });

    this.modalService = modalService;
  }

  public bindClearCartHandler(handler: () => Promise<void>): void {
    this.clearCartButton.addEventListener(
      'click',
      () => {
        this.handleClearCart(handler);
      },
      {
        signal: this.abortController.signal,
      },
    );
  }

  public createHTML(products: AppCartProduct[], callbacks: CartItemCallbacks): void {
    const fragment = document.createDocumentFragment();

    for (const product of products) {
      fragment.append(new CartItem(product, callbacks).element);
    }

    this.listElement.replaceChildren(fragment);

    const listHeader = div(
      { className: styles.header },
      h2({ className: styles.heading }, CART_ITEM_LIST_TEXT.HEADING),
      div({ className: styles.cartInfo }, this.productsCount, this.clearCartButton),
    );

    this.replaceChildren(listHeader, this.listElement);
  }

  public updateProductsCount(count: number): void {
    this.productsCount.replaceChildren(formatItemsCount(count));
  }

  private createModalContent(onConfirm: VoidFunction, onCancel: VoidFunction): HTMLDivElement {
    const buttonCancel = new Button({
      className: styles.modalButton,
      onClick: onCancel,
      textContent: BUTTON_TEXT.CANCEL,
      type: 'button',
    });

    const buttonConfirm = new Button({
      className: styles.modalButton,
      onClick: (): void => {
        buttonConfirm.disable();
        buttonCancel.disable();
        onConfirm();
      },
      textContent: BUTTON_TEXT.CONFIRM,
      type: 'button',
    });

    const modalText = p({ className: styles.message }, CART_MODAL_TITLE);

    const modalContent = div(
      { className: styles.modalContent },
      modalText,
      buttonCancel.element,
      buttonConfirm.element,
    );

    return modalContent;
  }

  private handleClearCart(handler: () => Promise<void>): void {
    this.modalService.open({
      content: this.createModalContent(
        () => {
          handler().finally(() => {
            this.modalService.close();
          });
        },
        () => {
          this.modalService.close();
        },
      ),
    });
  }
}
