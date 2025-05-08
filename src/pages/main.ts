import { BaseComponent } from '~/components/base-component/base-component';

export class MainPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'div' });

    const heading = new BaseComponent({ tagName: 'h1', textContent: 'Main page' });

    this.append(heading);
  }
}
