import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { h2 } from '~/shared/create-element/tags';

import { DISCOUNT_CODES_TEXT } from './constants';
import styles from './discount-codes.module.css';

export class DiscountCodesView extends BaseComponent implements Component {
  private readonly headingElement = h2({ className: styles.heading }, DISCOUNT_CODES_TEXT.HEADING);

  public constructor() {
    super({
      className: ['DISCOUNT-CODES', CSS_CLASS_NAME.WRAPPER],
      tagName: 'div',
    });
  }

  public createHTML(): void {
    this.append(this.headingElement);
  }
}
