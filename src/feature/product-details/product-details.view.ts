import type { AppProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';

import huhGif from '~/assets/img/huh-cat.gif';
import { BaseComponent } from '~/components/base-component/base-component';
import { InputRadio } from '~/components/common/input/input-radio/input-radio';
import { Loader } from '~/components/common/loader/loader';
import { ImageSlider } from '~/components/image-slider/image-slider';
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
  onWeightChange(sku: string): void;
  product: AppProduct;
}

export class ProductDetailsView extends BaseComponent implements Component {
  private readonly container = div({ className: styles.productDetails });

  private contentContainer = div(null);

  private readonly leftContainer = div({ className: styles.leftContainer });

  private readonly loader = new Loader({ size: 'medium' });

  private readonly notFoundHeading = p({ className: styles.notFoundDescription });

  private readonly notFoundWidget = div(
    { className: styles.notFoundWidget },
    img({ className: styles.notFoundGif, src: huhGif }),
    this.notFoundHeading,
  );

  private productData: AppProduct | undefined = undefined;

  private readonly rightContainer = div({ className: styles.rightContainer });

  private weightInputs: HTMLDivElement | null = null;

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.append(this.loader, modalService.getView());
  }

  public appendBreadcrumbs(element: HTMLElement): void {
    this.element.prepend(element);
  }

  public createHTML(properties: ProductDetailsViewProperties): void {
    this.productData =
      properties.product.sku === properties.currentSKU
        ? properties.product
        : properties.product.variants.find((p) => p.sku === properties.currentSKU);

    if (!this.productData) {
      this.showNotFoundWidget(NOT_FOUND_MESSAGE);
      return;
    }

    this.leftContainer.append(this.createImageSlider(this.productData.images));

    this.contentContainer.replaceChildren(this.createContent(this.productData));

    this.weightInputs = this.createWeightInputs(properties);

    this.rightContainer.append(this.contentContainer, this.weightInputs ?? '');

    this.container.append(this.leftContainer, this.rightContainer);
    this.append(this.container);
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
        properties.onWeightChange(product.sku);

        this.contentContainer.replaceChildren(this.createContent(product));
      });

      inputRadio.setChecked(product.sku === properties.currentSKU);

      return inputRadio.element;
    });

    const inputsContainer = div(
      { className: styles.inputsContainer },
      h3({ className: styles.weightTitle }, PRODUCT_DETAILS_TEXT.WEIGHT),
      ...radioInputs,
    );

    return inputsContainer;
  }
}
