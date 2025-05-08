import { BaseComponent } from '~/components/base-component/base-component';

export class NotFoundPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'div' });

    const heading = new BaseComponent({ tagName: 'h1', textContent: 'Not found page' });

    this.append(heading);
  }
}
