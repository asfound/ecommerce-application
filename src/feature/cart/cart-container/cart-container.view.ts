import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { div, p } from '~/shared/create-element/tags';

import styles from './cart-container.module.css';
import { CART_CONTAINER_TEXT } from './constants';

export class CartContainerView extends BaseComponent {
  private readonly buttonCatalog = new Button({
    className: styles.button,
    textContent: CART_CONTAINER_TEXT.BUTTON,
    type: 'button',
  });

  private readonly emptyCartElement = div(
    { className: styles.emptyCart },
    p(null, CART_CONTAINER_TEXT.CART_EMPTY),
    p(null, CART_CONTAINER_TEXT.CART_EXPLORE),
    this.buttonCatalog.element,
  );

  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }

  public override destroy(): void {
    this.buttonCatalog.destroy();

    super.destroy();
  }

  public showEmptyCart(navigateHandler: VoidFunction): void {
    this.buttonCatalog.addListener('click', navigateHandler);

    this.replaceChildren(this.emptyCartElement);
  }
}
