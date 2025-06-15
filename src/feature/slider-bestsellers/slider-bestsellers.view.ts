import { Swiper } from 'swiper';

import type { AppProductWithInCart } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';
import type { ProductCardCallbacks } from '~/components/product-card/product-card';

import sliderArrowSvg from '~/assets/icons/slider-arrow.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { ProductCard } from '~/components/product-card/product-card';
import { a, div, h2 } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { SLIDER_BESTSELLER_TEXT, SWIPER_OPTIONS } from './constants';
import styles from './slider-bestsellers.module.css';

export class SliderBestsellersView extends BaseComponent implements Component {
  private readonly linkSeeAll = a(
    { className: styles.seeAll },
    SLIDER_BESTSELLER_TEXT.LINK_SEE_ALL,
  );

  private readonly headingElement = h2(
    { className: styles.heading },
    SLIDER_BESTSELLER_TEXT.BEST_SELLERS,
    this.linkSeeAll,
  );

  public constructor() {
    super({ className: [styles.slider], tagName: 'div' });
  }

  public bindSeeAllHandler(handler: VoidFunction, href: string): void {
    this.linkSeeAll.setAttribute('href', href);

    this.linkSeeAll.addEventListener(
      'click',
      () => {
        handler();
      },
      { signal: this.abortController.signal },
    );
  }

  public createHTML(products: AppProductWithInCart[], callbacks: ProductCardCallbacks): void {
    this.append(this.headingElement);

    this.createSlider(products, callbacks);
  }

  private createProductSlide(
    product: AppProductWithInCart,
    callbacks: ProductCardCallbacks,
  ): HTMLElement {
    const productCard = new ProductCard(product, {
      onAddToCart: async (): Promise<void> => {
        await callbacks.onAddToCart(product);
      },
      onNavigateToDetails: (): void => {
        callbacks.onNavigateToDetails(product);
      },
    });

    return productCard.element;
  }

  private createSlider(products: AppProductWithInCart[], callbacks: ProductCardCallbacks): void {
    const wrapper = div({ className: 'swiper-wrapper' });

    for (const product of products) {
      const slide = div({ className: 'swiper-slide' });

      const productCard = this.createProductSlide(product, callbacks);

      slide.append(productCard);
      wrapper.append(slide);
    }

    const buttonPrevious = div(
      { className: [styles.navigationButton, 'swiper-button-prev'] },
      createSvgIcon(sliderArrowSvg, [styles.arrow, styles.previous]),
    );

    const buttonNext = div(
      { className: [styles.navigationButton, 'swiper-button-next'] },
      createSvgIcon(sliderArrowSvg, styles.arrow),
    );

    const buttonsContainer = div({ className: styles.navigation }, buttonPrevious, buttonNext);

    const swiper = div({ className: ['swiper', styles.swiper] }, wrapper);

    this.append(buttonsContainer, swiper);

    const swiperComponent = new Swiper(swiper, SWIPER_OPTIONS.GET(buttonNext, buttonPrevious));

    requestAnimationFrame(() => {
      swiperComponent.init();
    });
  }
}
