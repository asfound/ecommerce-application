import type { AppProduct } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { InputRadio } from '~/components/common/input/input-radio/input-radio';
import { Loader } from '~/components/common/loader/loader';
import { div, h2, h3, img, p } from '~/shared/create-element/tags';
import { formatPrice } from '~/shared/utils/format-price';

import styles from './product-details.module.css';

export interface ProductDetailsViewProperties {
  currentSKU: string;
  product: AppProduct;
}

export class ProductDetailsView extends BaseComponent implements Component {
  private contentContainer = div(null);

  private readonly leftContainer = div({ className: styles.leftContainer });

  private readonly loader = new Loader({ size: 'medium' });

  private productData: AppProduct | undefined = undefined;

  private readonly rightContainer = div({ className: styles.rightContainer });

  private weightInputs: HTMLDivElement | null = null;

  public constructor() {
    super({ className: ['PRODUCT_DETAILS', styles.productDetails], tagName: 'div' });

    this.append(this.loader);
  }

  public createHTML(properties: ProductDetailsViewProperties): void {
    this.productData =
      properties.product.sku === properties.currentSKU
        ? properties.product
        : properties.product.variants.find((p) => p.sku === properties.currentSKU);

    if (!this.productData) {
      return;
    }

    this.leftContainer.append(this.createImageSlider(this.productData.images));

    this.contentContainer.replaceChildren(this.createContent(this.productData));

    this.weightInputs = this.createWeightInputs(properties.product, properties.currentSKU);

    this.rightContainer.append(this.contentContainer, this.weightInputs ?? '');

    this.append(this.leftContainer, this.rightContainer);
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

    sliderContainer.append(img({ className: styles.sliderImage, src: images[0].url }));

    return sliderContainer;
  }

  private createWeightInputs(appProduct: AppProduct, sku: string): HTMLDivElement | null {
    if (appProduct.productType !== 'coffee') {
      return null;
    }

    const allVariants = [appProduct, ...appProduct.variants];

    const radioInputs = allVariants.map((product) => {
      const inputRadio = new InputRadio({
        label: `${(product.weight ?? '').toString()}g`,
        name: 'weight',
      });

      inputRadio.setChecked(product.sku === sku);

      return inputRadio.element;
    });

    const inputsContainer = div(
      { className: styles.inputsContainer },
      h3({ className: styles.weightTitle }, 'Weight:'),
      ...radioInputs,
    );

    return inputsContainer;
  }
}
