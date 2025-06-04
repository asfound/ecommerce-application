import type { AppProduct, AppProductWithInCart } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';

import huhGif from '~/assets/img/huh-cat.gif';
import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { InputRadio } from '~/components/common/input/input-radio/input-radio';
import { Loader } from '~/components/common/loader/loader';
import { ImageSlider } from '~/components/image-slider/image-slider';
import { BUTTON_CART_TEXT } from '~/components/product-card/constants';
import { modalService } from '~/services/modal/modal.service';
import { div, h2, h3, img, p } from '~/shared/create-element/tags';
import { formatPrice } from '~/shared/utils/format-price';

import {
  BESTSELLER_LABEL,
  NOT_FOUND_MESSAGE,
  PRODUCT_DETAILS_TEXT,
  PRODUCT_TYPE,
} from './constants';
import styles from './product-details.module.css';

export interface ProductDetailsViewProperties {
  currentSKU: string;
  onAddToCart(product: AppProductWithInCart): Promise<void>;
  onRemoveFromCart(product: AppProductWithInCart): Promise<void>;
  onWeightChange(sku: string): void;
  product: AppProductWithInCart;
}

export class ProductDetailsView extends BaseComponent implements Component {
  private readonly buttonCart = new Button({ textContent: '', type: 'button' });

  private readonly buttonCartLoader = new Loader({ size: 'small' });

  private readonly container = div({ className: styles.productDetails });

  private contentContainer = div(null);

  private readonly inputComponents = new Set<InputRadio>();

  private readonly leftContainer = div({ className: styles.leftContainer });

  private readonly loader = new Loader({ size: 'medium' });

  private readonly notFoundHeading = p({ className: styles.notFoundDescription });

  private readonly notFoundWidget = div(
    { className: styles.notFoundWidget },
    img({ className: styles.notFoundGif, src: huhGif }),
    this.notFoundHeading,
  );

  private productData: AppProductWithInCart | undefined = undefined;

  private properties: null | ProductDetailsViewProperties = null;

  private readonly rightContainer = div({ className: styles.rightContainer });

  private weightInputs: HTMLDivElement | null = null;

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.buttonCart.addClassNames(styles.buttonCart);

    this.append(this.loader, modalService.getView());

    this.setupListeners();
  }

  public appendBreadcrumbs(element: HTMLElement): void {
    this.element.prepend(element);
  }

  public createHTML(properties: ProductDetailsViewProperties): void {
    this.productData =
      properties.product.sku === properties.currentSKU
        ? properties.product
        : properties.product.variants.find((p) => p.sku === properties.currentSKU);

    this.properties = properties;

    if (!this.productData) {
      this.properties = null;
      this.showNotFoundWidget(NOT_FOUND_MESSAGE);
      return;
    }

    this.leftContainer.append(this.createImageSlider(this.productData.images));

    this.contentContainer.replaceChildren(this.createContent(this.productData));

    this.weightInputs = this.createWeightInputs(properties);

    this.updateButtonCartState();

    this.rightContainer.append(
      this.contentContainer,
      this.weightInputs ?? '',
      this.buttonCart.element,
    );

    this.container.append(this.leftContainer, this.rightContainer);
    this.append(this.container);
  }

  public override destroy(): void {
    this.buttonCart.destroy();

    for (const input of this.inputComponents) input.destroy();

    this.inputComponents.clear();

    super.destroy();
  }

  public hideLoader(): void {
    this.loader.hide();
  }

  public scrollToTop(): void {
    window.scrollTo({ top: 0 });
  }

  public showLoader(): void {
    this.loader.show();
  }

  public showNotFoundWidget(message: string): void {
    this.notFoundHeading.textContent = message;
    this.replaceChildren(this.notFoundWidget);
  }

  private createContent(product: AppProduct): HTMLDivElement {
    const headingElement = h2(
      { className: styles.heading },
      `${product.name}${product.weight ? `, ${product.weight}g` : ''}`,
    );

    const pricesContainer = div(
      { className: styles.pricesContainer },
      product.price.discounted
        ? div({ className: styles.discountedPrice }, formatPrice(product.price.discounted))
        : null,
      div(
        { className: product.price.discounted ? styles.oldPrice : styles.defaultPrice },
        formatPrice(product.price.default),
      ),
      product.bestSeller ? div({ className: styles.bestseller }, BESTSELLER_LABEL) : null,
    );

    const descriptionElement = p({ className: styles.description }, product.description);

    const contentContainer = div(
      { className: styles.contentContainer },
      headingElement,
      pricesContainer,
      descriptionElement,
    );

    return contentContainer;
  }

  private createImageSlider(images: AppProduct['images']): HTMLDivElement {
    const sliderContainer = div({ className: styles.sliderContainer });

    sliderContainer.append(new ImageSlider({ images, location: 'page' }).element);

    return sliderContainer;
  }

  private createWeightInputs(properties: ProductDetailsViewProperties): HTMLDivElement | null {
    if (properties.product.productType !== PRODUCT_TYPE.COFFEE) {
      return null;
    }

    const allVariants = [properties.product, ...properties.product.variants];

    const radioInputs = allVariants.map((product) => {
      const inputRadio = new InputRadio({
        label: PRODUCT_DETAILS_TEXT.INPUT_LABEL(product.weight),
        name: 'weight',
      });

      inputRadio.addListener('change', () => {
        this.productData = product;

        properties.onWeightChange(product.sku);

        this.contentContainer.replaceChildren(this.createContent(product));

        this.updateButtonCartState();
      });

      inputRadio.setChecked(product.sku === properties.currentSKU);

      this.inputComponents.add(inputRadio);

      return inputRadio.element;
    });

    const inputsContainer = div(
      { className: styles.inputsContainer },
      h3({ className: styles.weightTitle }, PRODUCT_DETAILS_TEXT.WEIGHT),
      ...radioInputs,
    );

    return inputsContainer;
  }

  private disableInputs(): void {
    for (const input of this.inputComponents) input.setDisabled(true);
  }

  private enableInputs(): void {
    for (const input of this.inputComponents) input.setDisabled(false);
  }

  private async handleButtonCartClick(): Promise<void> {
    if (!this.productData) {
      return;
    }

    this.setProcessingState(true);

    try {
      if (this.productData.inCart) {
        await this.properties?.onRemoveFromCart(this.productData);
        this.productData.inCart = false;
        this.setButtonToDefaultState();
      } else {
        await this.properties?.onAddToCart(this.productData);
        this.productData.inCart = true;
        this.setButtonToInCartState();
      }
    } catch {
      this.updateButtonCartState();
    } finally {
      this.setProcessingState(false);
    }
  }

  private setButtonToDefaultState(): void {
    this.buttonCart.setTextContent(BUTTON_CART_TEXT.ADD_TO_CART);
  }

  private setButtonToInCartState(): void {
    this.buttonCart.setTextContent(BUTTON_CART_TEXT.REMOVE_FROM_CART);
  }

  private setProcessingState(isProcessing: boolean): void {
    if (isProcessing) {
      this.disableInputs();

      this.buttonCart.replaceChildren(this.buttonCartLoader);
      this.buttonCart.disable();
      this.buttonCartLoader.show();
    } else {
      this.enableInputs();

      this.buttonCart.enable();
      this.buttonCartLoader.hide();
    }
  }

  private setupListeners(): void {
    this.buttonCart.addListener('click', () => {
      this.handleButtonCartClick();
    });
  }

  private updateButtonCartState(): void {
    if (!this.productData) {
      return;
    }

    if (this.productData.inCart) {
      this.setButtonToInCartState();
    } else {
      this.setButtonToDefaultState();
    }
  }
}
