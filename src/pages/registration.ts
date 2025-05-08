import { BaseComponent } from '~/components/base-component/base-component';

export class RegistrationPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'div' });

    const heading = new BaseComponent({ tagName: 'h1', textContent: 'Registration page' });

    this.append(heading);
  }
}
