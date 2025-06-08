import { BaseComponent } from '~/components/base-component/base-component';

export class CartContainerView extends BaseComponent {
  public constructor() {
    super({ tagName: 'div', textContent: 'container' });
  }
}
