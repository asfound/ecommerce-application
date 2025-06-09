import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { Loader } from '~/components/common/loader/loader';
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

  private readonly loaderComponent = new Loader({ size: 'small' });

  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }

  public override destroy(): void {
    this.buttonCatalog.destroy();

    super.destroy();
  }

  public hideLoader(): void {
    this.loaderComponent.hide();
  }

  public showCartData(productsBlock: HTMLElement, pricesBlock: HTMLElement): void {
    this.replaceChildren(productsBlock, pricesBlock);
  }

  public showEmptyCart(navigateHandler: VoidFunction): void {
    this.buttonCatalog.addListener('click', navigateHandler);

    this.replaceChildren(this.emptyCartElement);
  }

  public showLoader(): void {
    this.replaceChildren(this.loaderComponent);
    this.loaderComponent.show();
  }
}
