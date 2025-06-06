import { BaseComponent } from '~/components/base-component/base-component';
import { h2 } from '~/shared/create-element/tags';

import styles from './cart-totals.module.css';

export class CartTotalsView extends BaseComponent {
  public constructor() {
    super({ className: styles.cartTotals, tagName: 'div' });

    const titleElement = h2(null, 'Total');

    this.append(titleElement);
  }
}
