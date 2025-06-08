import type { AppDiscountCode } from '~/api/services/discount-codes/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { div, h3, img, p } from '~/shared/create-element/tags';

import { DISCOUNT_CODE_IMAGE_MAP, EVEN_CHECK_MODULO, IMAGE_POSITION } from './constants';
import styles from './discount-codes.module.css';

type ImagePosition = (typeof IMAGE_POSITION)[keyof typeof IMAGE_POSITION];

export class DiscountCodesView extends BaseComponent implements Component {
  public constructor() {
    super({
      className: ['DISCOUNT-CODES', CSS_CLASS_NAME.WRAPPER],
      tagName: 'div',
    });
  }

  public createHTML(codes: AppDiscountCode[]): void {
    for (const [index, code] of Object.entries(codes)) {
      this.append(
        this.createDiscountCodeCart(
          code,
          Number.parseInt(index) % EVEN_CHECK_MODULO === 0
            ? IMAGE_POSITION.RIGHT
            : IMAGE_POSITION.LEFT,
        ),
      );
    }
  }

  private createDiscountCodeCart(
    code: AppDiscountCode,
    imagePosition: ImagePosition,
  ): HTMLDivElement {
    const nameElement = h3({ className: styles.name }, code.name);

    const descriptionElement = p({ className: styles.description }, code.description);

    const imageElement = img({
      alt: code.name,
      className: styles.image,
      src: DISCOUNT_CODE_IMAGE_MAP.get(code.code),
    });

    return div(
      { className: [styles.cardContainer, styles[imagePosition]] },
      imageElement,
      nameElement,
      descriptionElement,
      code.code,
    );
  }
}
