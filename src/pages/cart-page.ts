import { BaseComponent } from '~/components/base-component/base-component';
import { h1 } from '~/shared/create-element/tags';

export class CartPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'main' });

    const title = h1(null, 'cart page');

    this.append(title);
  }
}
