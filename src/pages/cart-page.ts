import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { CartContainerPresenter } from '~/feature/cart/cart-container/cart-container.presenter';
import { CartContainerView } from '~/feature/cart/cart-container/cart-container.view';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';

import styles from './cart-page.module.css';
export class CartPage extends BaseComponent {
  private readonly cartContainerPresenter: CartContainerPresenter;

  public constructor() {
    super({ className: [CSS_CLASS_NAME.WRAPPER, styles.page], tagName: 'div' });

    this.cartContainerPresenter = new CartContainerPresenter(
      new CartContainerView(),
      SERVICE_HUB.provideCartService(),
    );

    this.append(this.cartContainerPresenter.getView());
  }

  public override destroy(): void {
    this.cartContainerPresenter.destroy();

    super.destroy();
  }
}
