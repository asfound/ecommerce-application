import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';

import type { AppProductImage } from '~/api/services/products/types';

import 'swiper/css';
import 'swiper/css/navigation';

import sliderArrowSvg from '~/assets/icons/slider-arrow.svg';
import { div, img } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './image-slider.module.css';

export class ImageSlider extends BaseComponent implements Component {
  private readonly images: AppProductImage[];

  public constructor(images: AppProductImage[]) {
    super({ className: 'swiper', tagName: 'div' });
    this.images = images;

    this.createHTML();
  }

  public createHTML(): void {
    const wrapper = div({ className: 'swiper-wrapper' });

    for (const image of this.images) {
      const slide = div({ className: 'swiper-slide' });
      const imageElement = img({ className: styles.image, src: image.url });

      slide.append(imageElement);
      wrapper.append(slide);
    }

    const buttonPrevious = div(
      { className: ['swiper-button-prev', styles.navigation] },
      createSvgIcon(sliderArrowSvg, [styles.arrow, styles.previous]),
    );

    const buttonNext = div(
      { className: ['swiper-button-next', styles.navigation] },
      createSvgIcon(sliderArrowSvg, styles.arrow),
    );
    this.append(wrapper, buttonNext, buttonPrevious);

    new Swiper(this.element, {
      modules: [Navigation],
      navigation: {
        nextEl: buttonNext,
        prevEl: buttonPrevious,
      },
      slidesPerView: 1,
    });
  }
}
