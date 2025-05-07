import { BaseComponent } from '~/components/base-component/base-component';

export class LoginPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'div' });

    const heading = new BaseComponent({ tagName: 'h1', textContent: 'Login page' });

    this.append(heading);
  }
}
