import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';

import type { AppProductWithInCart } from '~/api/services/products/types';
import type { Component } from '~/components/base-component/types';
import type { ProductCardCallbacks } from '~/components/product-card/product-card';

import sliderArrowSvg from '~/assets/icons/slider-arrow.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { ProductCard } from '~/components/product-card/product-card';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { div } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './slider-bestsellers.module.css';

const PRODUCTS_TO_SLICE = 6;

export class SliderBestsellersView extends BaseComponent implements Component {
  public constructor() {
    super({
      className: ['SLIDER-BESTSELLER', styles.slider, CSS_CLASS_NAME.WRAPPER],
      tagName: 'div',
    });
  }

  public createHTML(products: AppProductWithInCart[], callbacks: ProductCardCallbacks): void {
    const slicedProds = products.slice(0, PRODUCTS_TO_SLICE);

    this.createSlider(slicedProds, callbacks);
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

    requestAnimationFrame(() => {
      new Swiper(swiper, {
        initialSlide: 0,
        modules: [Navigation],
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrevious,
        },
        observeParents: true,
        observer: true,
        slidesPerGroup: 4,
        slidesPerView: 4,
        spaceBetween: 20,
      });
    });
  }
}
