import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';

import type { AppProductImage } from '~/api/services/products/types';

import 'swiper/css';
import 'swiper/css/navigation';

import sliderArrowSvg from '~/assets/icons/slider-arrow.svg';
import { modalService } from '~/services/modal/modal.service';
import { div, img } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './image-slider.module.css';

export class ImageSlider extends BaseComponent implements Component {
  private readonly images: AppProductImage[];

  private readonly startIndex;

  public constructor(images: AppProductImage[], startIndex = 0) {
    super({ className: styles.slider, tagName: 'div' });

    this.images = images;
    this.startIndex = startIndex;

    this.createHTML();
  }

  public createHTML(): void {
    const wrapper = div({ className: 'swiper-wrapper' });

    for (const [index, image] of this.images.entries()) {
      const slide = div({ className: 'swiper-slide' });
      const imageElement = img({ className: styles.image, src: image.url });

      imageElement.addEventListener('click', () => {
        modalService.open({ content: new ImageSlider(this.images, index).element });
      });

      slide.append(imageElement);
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
        initialSlide: this.startIndex,
        modules: [Navigation],
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrevious,
        },
        slidesPerView: 1,
      });
    });
  }
}
