import type { AppDiscountCode } from '~/api/services/discount-codes/types';
import type { Component } from '~/components/base-component/types';

import iconCopy from '~/assets/icons/copy.svg';
import { BaseComponent } from '~/components/base-component/base-component';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { a, div, h2, h3, img, p, span } from '~/shared/create-element/tags';
import { createSvgIcon } from '~/shared/utils/create-svg';
import { showToast } from '~/shared/utils/show-toast';

import {
  CODE_HINT,
  DISCOUNT_CODE_IMAGE_MAP,
  DISCOUNT_CODE_NOTIFICATION,
  EVEN_CHECK_MODULO,
  HEADING_TEXT,
  IMAGE_POSITION,
  LINK_TEXT,
} from './constants';
import styles from './discount-codes.module.css';

type ImagePosition = (typeof IMAGE_POSITION)[keyof typeof IMAGE_POSITION];

export class DiscountCodesView extends BaseComponent implements Component {
  private readonly linkGoToCart = a({ className: styles.link }, LINK_TEXT);

  public constructor() {
    super({
      className: [CSS_CLASS_NAME.WRAPPER, styles.section],
      tagName: 'section',
    });
  }

  public bindGoToCartClick(handler: VoidFunction, href: string): void {
    this.linkGoToCart.setAttribute('href', href);

    this.linkGoToCart.addEventListener(
      'click',
      () => {
        handler();
      },
      { signal: this.abortController.signal },
    );
  }

  public createHTML(codes: AppDiscountCode[]): void {
    const container = div({ className: styles.container });

    for (const [index, code] of Object.entries(codes)) {
      container.append(
        this.createDiscountCodeCart(
          code,
          Number.parseInt(index) % EVEN_CHECK_MODULO === 0
            ? IMAGE_POSITION.RIGHT
            : IMAGE_POSITION.LEFT,
        ),
      );
    }
    this.append(h2({ className: styles.heading }, HEADING_TEXT, this.linkGoToCart), container);
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
        this.handlePromoCodeCopy(code.code);
      },
      { signal: this.abortController.signal },
    );

    const codeElement = div(
      { className: styles.code },
      span({ className: styles.hint }, CODE_HINT),
      code.code,
      copyElement,
    );

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

  private async handlePromoCodeCopy(code: string): Promise<void> {
    try {
      await globalThis.navigator.clipboard.writeText(code);
      showToast(DISCOUNT_CODE_NOTIFICATION.CODE_COPIED(code));
    } catch {
      showToast(DISCOUNT_CODE_NOTIFICATION.CODE_COPY_FAILED(code));
    }
  }
}
