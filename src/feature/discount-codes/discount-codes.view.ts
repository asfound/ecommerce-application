import type { AppDiscountCode } from '~/api/services/discount-codes/types';
import type { Component } from '~/components/base-component/types';

import iconCopy from '~/assets/icons/copy.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { div, h3, img, p } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { showToast } from '~/shared/utils/show-toast';

import {
  DISCOUNT_CODE_IMAGE_MAP,
  DISCOUNT_CODE_NOTIFICATION,
  EVEN_CHECK_MODULO,
  IMAGE_POSITION,
} from './constants';
import styles from './discount-codes.module.css';

type ImagePosition = (typeof IMAGE_POSITION)[keyof typeof IMAGE_POSITION];

export class DiscountCodesView extends BaseComponent implements Component {
  public constructor() {
    super({
      className: [styles.container, CSS_CLASS_NAME.WRAPPER],
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

    const copyElement = createSvgIcon(iconCopy, styles.icon);

    copyElement.addEventListener(
      'click',
      () => {
        globalThis.navigator.clipboard.writeText(code.code);
        showToast(DISCOUNT_CODE_NOTIFICATION.CODE_COPIED(code.code));
      },
      { signal: this.abortController.signal },
    );

    const codeElement = div({ className: styles.code }, code.code, copyElement);

    const cardContent = div(
      { className: styles.cardContent },
      nameElement,
      descriptionElement,
      codeElement,
    );

    const imageElement = img({
      alt: code.name,
      className: styles.image,
      src: DISCOUNT_CODE_IMAGE_MAP.get(code.code),
    });

    return div(
      { className: [styles.cardContainer, styles[imagePosition]] },
      div({ className: styles.imageContainer }, imageElement),
      cardContent,
    );
  }
}
