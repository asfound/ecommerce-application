import type { AppProduct, AppProductWithInCart } from '~/api/services/products/types';

import { div } from '~/shared/create-element/tags';
import { calculateDiscountPercent } from '~/shared/utils/calculate-discount';
import { formatPrice } from '~/shared/utils/format-price';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import { Loader } from '../common/loader/loader';
import { BUTTON_CART_TEXT } from './constants';
import styles from './product-card.module.css';

const BESTSELLER_VALUE = 'Bestseller';

export interface ProductCardCallbacks {
  onAddToCart(product: AppProduct): Promise<void>;
  onNavigateToDetails: ProductCardClickHandler;
}

export type ProductCardClickHandler = (product: AppProduct) => void;

export class ProductCard extends BaseComponent implements Component {
  private readonly buttonCart = new Button({
    onClick: (): void => {
      this.handleAddToCartClick();
    },
    textContent: '',
    type: 'button',
  });

  private readonly callbacks: ProductCardCallbacks;

  private readonly loaderComponent = new Loader({ size: 'small' });

  private readonly product: AppProductWithInCart;

  public constructor(product: AppProductWithInCart, callbacks: ProductCardCallbacks) {
    super({ className: styles.card, tagName: 'li' });

    this.product = product;

    this.callbacks = callbacks;

    this.buttonCart.addClassNames(styles.buttonCart);
    this.updateButtonCartState();

    this.createHTML();

    this.setupListeners();
  }

  public createHTML(): void {
    const imageContainer = this.createImageContainer();

    const titleElement = div(
      { className: styles.title },
      `${this.product.name}${this.product.weight ? `, ${this.product.weight}g` : ''}`,
    );

    const descriptionElement = div(
      { className: styles.description, title: this.product.description },
      this.product.description,
    );

    const pricesContainer = div(
      { className: styles.pricesContainer },
      this.product.price.discounted
        ? div({ className: styles.discountedPrice }, formatPrice(this.product.price.discounted))
        : null,
      div(
        { className: this.product.price.discounted ? styles.oldPrice : styles.defaultPrice },
        formatPrice(this.product.price.default),
      ),
    );

    const content = div(
      { className: styles.content },
      titleElement,
      descriptionElement,
      pricesContainer,
      this.buttonCart.element,
    );

    this.append(imageContainer, content);
  }

  private createImageContainer(): HTMLDivElement {
    this.loaderComponent.show();

    const imageContainer = div(
      { className: styles.imageContainer },
      this.loaderComponent.element,
      div(
        { className: styles.labels },
        this.product.bestSeller
          ? div({ className: styles.bestSellerLabel }, BESTSELLER_VALUE)
          : null,
        this.product.price.discounted
          ? div(
              { className: styles.discountLabel },
              calculateDiscountPercent(
                this.product.price.default,
                this.product.price.discounted ?? 0,
              ),
            )
          : null,
      ),
    );

    const image = new Image();
    image.classList.add(styles.image);
    image.src = this.product.image.url;

    image.addEventListener(
      'load',
      () => {
        imageContainer.append(image);
        this.loaderComponent.hide();
      },
      { signal: this.abortController.signal },
    );

    return imageContainer;
  }

  private async handleAddToCartClick(): Promise<void> {
    this.setProcessingState(true);

    try {
      await this.callbacks.onAddToCart(this.product);
      this.setButtonToInCartState();
    } catch {
      this.setButtonToDefaultState();
    } finally {
      this.setProcessingState(false);
    }
  }

  private setButtonToDefaultState(): void {
    this.buttonCart.enable();
    this.buttonCart.setTextContent(BUTTON_CART_TEXT.ADD_TO_CART);
  }

  private setButtonToInCartState(): void {
    this.buttonCart.disable();
    this.buttonCart.setTextContent(BUTTON_CART_TEXT.IN_CART);
  }

  private setProcessingState(isProcessing: boolean): void {
    if (isProcessing) {
      this.addClassNames(styles.processing);
      this.buttonCart.disable();
      this.buttonCart.replaceChildren(this.loaderComponent.element);
      this.loaderComponent.show();
    } else {
      this.removeClassNames(styles.processing);
      this.loaderComponent.hide();
    }
  }

  private setupListeners(): void {
    this.addListener('click', (event) => {
      if (event.target !== this.buttonCart.element) {
        this.callbacks.onNavigateToDetails(this.product);
      }
    });
  }

  private updateButtonCartState(): void {
    if (this.product.inCart) {
      this.setButtonToInCartState();
    } else {
      this.setButtonToDefaultState();
    }
  }
}
